/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";

import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useSession } from "next-auth/react";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

interface ProfileProps {
    user: any;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const { data: session } = useSession();
    console.log(session);
    return (
        <Form name="info">
            <Form.Item<FieldType> label="Username" name="username">
                <Input value={session?.user?.fullName} />
            </Form.Item>

            <Form.Item<FieldType> label="Password" name="password">
                <Input value={user.fullName} />
            </Form.Item>
        </Form>
    );
};

export default Profile;
