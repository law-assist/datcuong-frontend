"use client";
import React, { useState } from "react";
import { Button, notification, Select, Typography } from "antd";
import { FIELD_MAPPING } from "src/constants/constant";
import { updateUserProfile } from "src/app/(auth)/apis/user.api";
import { mutate } from "swr";
interface EditFieldModalProps {
    user: any;
    onClose: () => void;
}

const { Title } = Typography;

const { Option } = Select;

const EditFieldModal: React.FC<EditFieldModalProps> = ({ user, onClose }) => {
    const [api, contextHolder] = notification.useNotification();

    const [fields, setFields] = useState<string[]>(user.fields);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (value: string[]) => {
        setFields(value);
    };

    const handleUpdate = () => {
        console.log(fields);
        setLoading(true);
        updateUserProfile({ ...user, fields })
            .then((res) => {
                console.log("res", res);
                api.success({
                    message: "Cập nhật thông tin thành công",
                    duration: 2,
                });
                mutate(
                    (key) =>
                        typeof key === "string" &&
                        key.startsWith("/user/user-profile")
                );
            })
            .catch((error) => {
                console.log("error", error);
                if (error.message === "user_not_updated") {
                    api.warning({
                        message: "Thông tin chưa được cập nhật",
                        description: error.message,
                        duration: 2,
                    });
                } else {
                    api.error({
                        message: "Cập nhật thông tin thất bại",
                        description: error.message,
                        duration: 2,
                    });
                }
            });
        setLoading(false);
        onClose();
    };

    return (
        <div className="flex flex-col gap-2">
            {contextHolder}

            <Title
                level={4}
                className="flex items-center justify-center !text-primary"
            >
                Lĩnh vực
            </Title>
            <div className="flex flex-row gap-2">
                <div className="flex-grow">
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Chọn lĩnh vực"
                        defaultValue={fields}
                        onChange={handleChange}
                        className="border-2 border-primary rounded-md"
                    >
                        {Object.entries(FIELD_MAPPING).map(([key, value]) => (
                            <Option key={key} value={value}>
                                {value}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col gap-3 justify-end">
                    <Button
                        type="primary"
                        disabled={loading}
                        onClick={handleUpdate}
                    >
                        Cập nhật lĩnh vưc
                    </Button>

                    <Button danger onClick={onClose} disabled={loading}>
                        Hủy bỏ
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditFieldModal;
