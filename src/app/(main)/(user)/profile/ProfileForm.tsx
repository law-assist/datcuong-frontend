/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";

import { Button, DatePicker, Form, Input, notification } from "antd";
import dayjs from "dayjs";
import { updateUserProfile } from "src/app/(auth)/apis/user.api";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

interface ProfileProps {
    user: any;
    isEdit?: boolean;
}

const dateFormat = "DD/MM/YYYY";

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = (values: any) => {
        setLoading(true);
        updateUserProfile(values)
            .then((res) => {
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
                        description: "Không có thông tin được thay đổi",
                        duration: 2,
                    });
                } else {
                    api.error({
                        message: "Cập nhật thông tin thất bại",
                        description: error.message,
                        duration: 2,
                    });
                }
                form.resetFields();
            });
        setIsEdit(false);
        setLoading(false);
    };

    return (
        <div className="flex-grow flex flex-col gap-4 w-full md:w-5/6 lg:w-2/3 xl:w-1/2 m-auto bg-white px-4 py-4">
            {contextHolder}
            <div className="flex flex-row justify-between">
                <span className="text-primary text-xl border-s-4 pl-2 border-primary flex items-center">
                    Thông tin tài khoản
                </span>
                {!isEdit && (
                    <Button
                        // type="primary"
                        style={{
                            fontSize: "16px",
                            color: "#1890ff",
                            fontWeight: "bold",
                        }}
                        className="text-primary font-bold"
                        onClick={() => setIsEdit(!isEdit)}
                    >
                        Chỉnh sửa
                    </Button>
                )}
            </div>

            <Form
                form={form}
                name="user-info"
                layout="horizontal"
                style={{ minWidth: "100%", maxWidth: 6 }}
                initialValues={{
                    ...user,
                    dob: user.dob ? dayjs(user.dob) : null,
                    remember: true,
                }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                requiredMark={false}
                colon={false}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    style={{ marginBottom: 4 }}
                >
                    <Input disabled={!isEdit} />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    style={{ marginBottom: 4 }}
                >
                    <Input disabled={!isEdit} />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    style={{ marginBottom: 4 }}
                >
                    <Input disabled={!isEdit} max={10} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    style={{ marginBottom: 4 }}
                >
                    <Input disabled={!isEdit} />
                </Form.Item>

                <Form.Item label="Năm sinh" name="dob">
                    {/* <Input type="date" disabled={!isEdit} /> */}
                    <DatePicker
                        disabled={!isEdit}
                        // defaultValue={dayjs(user.dob)}
                        // value={dayjs(user.dob)}
                        format={dateFormat}
                    />
                </Form.Item>

                {isEdit && (
                    <div className="flex flex-row gap-2 justify-end">
                        <Button
                            type="default"
                            // htmlType="submit"
                            onClick={() => {
                                form.resetFields(); // Reset form fields to their initial values
                                setIsEdit(false); // Exit edit mode
                            }}
                            disabled={loading}
                            danger
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={loading}
                        >
                            Xác nhận
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default Profile;
