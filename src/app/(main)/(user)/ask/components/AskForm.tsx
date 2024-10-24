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
import { sendReQuest } from "src/app/api/askLawyer.api";
import { FIELD_MAPPING } from "src/constants/constant";

const { TextArea } = Input;

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const AskForm = () => {
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
        console.log(rest);
        setLoading(true);
        sendReQuest(rest)
            .then((res) => {
                if (res.message === "success") {
                    api.success({
                        message: "Gửi câu hỏi thành công",
                        duration: 2,
                    });
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
        <Form
            form={form}
            name="ask-form"
            layout="vertical"
            onFinish={handleSubmit}
        >
            {contextHolder}
            <Form.Item
                required
                label="Tiêu đề"
                name="title"
                style={{ marginBottom: 4 }}
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tiêu đề",
                    },
                    {
                        max: 120,
                        message: "Tiêu đề không quá 120 ký tự",
                    },
                ]}
            >
                <Input showCount maxLength={120} placeholder="Đặt câu hỏi" />
            </Form.Item>
            <Form.Item
                required
                label="Nội dung câu hỏi"
                name="content"
                style={{ marginBottom: 4 }}
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập nội dung câu hỏi",
                    },
                    {
                        max: 1000,
                        message: "Nội dung không quá 1000 ký tự",
                    },
                ]}
            >
                <TextArea
                    showCount
                    maxLength={1000}
                    // onChange={onChange}
                    placeholder="Mô tả câu hỏi"
                    style={{ height: 200 }}
                />
            </Form.Item>

            <Form.Item
                required
                label="Lĩnh vực cần tư vấn"
                name="field"
                style={{ marginBottom: 0 }}
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn lĩnh vực cần tư vấn",
                    },
                ]}
            >
                <Select placeholder="Lĩnh vưc cần tư vấn" allowClear showSearch>
                    {/* <Option key="" value="">
                        Lĩnh vực cần tư vấn
                    </Option> */}
                    {Object.entries(FIELD_MAPPING).map(([key, value]) => (
                        <Option key={key} value={value}>
                            {value}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <p className="p-2 text-sm italic pt-0 mb-4">
                Để chúng tôi kết nối với luật sư phù hợp với câu hỏi của bạn
                nhé!
            </p>

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
                    Gửi câu hỏi
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AskForm;
