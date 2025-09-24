"use client";

import { Modal, Input, Button, Form, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

const NODE_ENV = process.env.NODE_ENV;
const API_HOST =
  NODE_ENV === "production"
    ? process.env.NEXT_SERVER_API_HOST
    : process.env.BACKEND_API_HOST ??
      process.env.NEXT_PUBLIC_API_HOST ??
      process.env.API_HOST;

interface AddLawModalProps {
  visible: boolean;
  onCancel: () => void;
  onLawAdded: (newLaw: any) => void;
}

const AddLawModal = ({ visible, onCancel }: AddLawModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { url: string }) => {
    setLoading(true);
    try {
      const session = await getSession();
      const accessToken = session?.user?.accessToken;

      if (!accessToken) {
        alert("Phiên đăng nhập đã hết hạn.");
        setLoading(false);
        return;
      }

      console.log("URL:", values.url); 
      const response = await axios.post(
        `${API_HOST}/crawler/url`,
        { url: values.url },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            Accept: "*/*",
          },
        }
      );

      if (response.status === 400 ) {
        throw new Error("Văn bản đã tồn tại");
      }

      if (response.data?.message) {

        message.success("Văn bản đã được thêm thành công!");
      }

    } catch (error: any) {
      console.error("Error adding law:", error);
      alert(
        error.response?.data?.message?.join(", ") || "Đã xảy ra lỗi khi thêm văn bản"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm Văn Bản"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="url" 
          label="Đường dẫn của văn bản"
          rules={[
            { required: true, message: "Vui lòng nhập đường dẫn văn bản" },
            { type: "url", message: "Vui lòng nhập một URL hợp lệ" },
          ]}
        >
          <Input placeholder="Nhập URL văn bản (e.g., https://example.com)" />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Thêm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLawModal;