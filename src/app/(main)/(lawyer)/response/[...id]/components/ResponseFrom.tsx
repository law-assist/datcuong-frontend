/* eslint-disable @typescript-eslint/no-unused-vars */
//
"use client";
import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    DatePicker,
    Form,
    GetProp,
    Input,
    notification,
    Select,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import { useState } from "react";
import { sendRequest, sendResponse } from "src/app/api/askLawyer.api";
import { FIELD_MAPPING } from "src/constants/constant";
import { mutate } from "swr";

const { TextArea } = Input;

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface ResponseFromProps {
    id: string;
}

const ResponseFrom = ({ id }: ResponseFromProps) => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const [loading, setLoading] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("files[]", file as FileType);
        });
        setUploading(true);
        fetch("https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                api.success({
                    message: "upload successfully.",
                });
            })
            .catch(() => {
                api.error({
                    message: "upload failed.",
                });
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        accept: ".jpg,.jpeg,.png,.doc,.docx,.pdf",
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const isImageOrDocOrPdf =
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "application/pdf" ||
                file.type === "application/msword" ||
                file.type ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

            if (!isImageOrDocOrPdf) {
                api.error({
                    message: "Chỉ chấp nhận file ảnh hoặc tài liệu",
                });
                return false;
            }

            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };

    const handleSubmit = (values: any) => {
        const { fileList, ...rest } = values;
        setLoading(true);
        sendResponse(id, rest)
            .then((res) => {
                if (res.message === "success") {
                    api.success({
                        message: "Gửi câu hỏi thành công",
                        duration: 2,
                    });
                    mutate(
                        (key) =>
                            typeof key === "string" &&
                            key.startsWith("/request/user?")
                    );
                    mutate(
                        (key) =>
                            typeof key === "string" &&
                            key.startsWith("/request/lawyer/")
                    );
                } else {
                    api.error({
                        message: "Gửi câu hỏi thất bại",
                        description: res.message,
                        duration: 2,
                    });
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
        form.resetFields();
        setLoading(false);
    };

    return (
        <div className="p-2 shadow-2xl rounded border pt-2 border-gray-300">
            <Form
                form={form}
                name="ask-form"
                layout="vertical"
                onFinish={handleSubmit}
            >
                {contextHolder}
                <Form.Item
                    required
                    label="Nội dung câu trả lời"
                    name="content"
                    style={{ marginBottom: 4 }}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập nội dung trả lời",
                        },
                        {
                            max: 2000,
                            message: "Nội dung không quá 2000 ký tự",
                        },
                    ]}
                >
                    <TextArea
                        showCount
                        maxLength={2000}
                        // onChange={onChange}
                        placeholder="Nội dung câu trả lời"
                        style={{ height: 200, whiteSpace: "pre-wrap" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Tệp tài liệu đính kèm"
                    name="fileList"
                    // style={{ marginBottom: 4 }}
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Chọn tài liệu</Button>
                    </Upload>
                    {/* <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? "Vui lòng chờ" : "Tải lên tài liệu"}
                </Button> */}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Gửi câu trả lời
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ResponseFrom;
