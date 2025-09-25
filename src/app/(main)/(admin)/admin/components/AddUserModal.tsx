import { Modal, Form, Input, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

type User = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
  status: string;
};

const NODE_ENV = process.env.NODE_ENV;
const API_HOST =
    NODE_ENV === "production"
        ? process.env.NEXT_SERVER_API_HOST
        : process.env.BACKEND_API_HOST ??
          process.env.NEXT_PUBLIC_API_HOST ??
          process.env.API_HOST;

interface AddUserModalProps {
  visible: boolean;
  onCancel: () => void;
  onUserAdded: (newUser: User) => void;
}

function AddUserModal({ visible, onCancel, onUserAdded }: AddUserModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Password validation regex: at least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordValidator = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Vui lòng nhập mật khẩu!"));
    }
    if (value.length < 8) {
      return Promise.reject(new Error("Mật khẩu phải chứa ít nhất 8 ký tự!"));
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(new Error("Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa!"));
    }
    if (!/[a-z]/.test(value)) {
      return Promise.reject(new Error("Mật khẩu phải chứa ít nhất 1 chữ cái viết thường!"));
    }
    if (!/\d/.test(value)) {
      return Promise.reject(new Error("Mật khẩu phải chứa ít nhất 1 số!"));
    }
    return Promise.resolve();
  };

  // Phone number validation: only digits
  const phoneNumberValidator = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Vui lòng nhập số điện thoại!"));
    }
    if (!/^\d+$/.test(value)) {
      return Promise.reject(new Error("Số điện thoại chỉ được chứa các chữ số!"));
    }
    return Promise.resolve();
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const session = await getSession();
      const accessToken = session?.user?.accessToken;

      if (!accessToken) {
        alert("Phiên đăng nhập đã hết hạn.");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_HOST}/auth/register`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      onUserAdded(response.data.data);
      form.resetFields();
      onCancel();
      setLoading(false);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Đã xảy ra lỗi khi thêm người dùng.");
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm người dùng mới"
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Thêm"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ validator: phoneNumberValidator }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ validator: passwordValidator }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
        >
          <Select placeholder="Chọn vai trò">
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="lawyer">Lawyer</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddUserModal;