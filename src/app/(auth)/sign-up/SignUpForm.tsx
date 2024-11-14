/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, message, notification, Tooltip } from "antd";
import { useEffect, useState } from "react";

import { cn } from "src/libs/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import s from "../sign-up/signUp.module.scss";

import Errors from "src/components/errors/errors";
import { SignUpSchema } from "src/zod-schemas/signup-schema";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import fb from "public/icon/icon-facebook.svg";
import gg from "public/icon/icon-google.svg";
import { signUpUser } from "../apis/auth.api";

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
    const [api, contextHolder] = notification.useNotification();

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const {
        control,
        handleSubmit,
        formState: { errors },
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm<SignUpSchemaType>({
        resolver: zodResolver(SignUpSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: any) => {
        // setLoading(true);
        const dataBody = {
            fullName: data.name,
            email: data.email,
            password: data.password,
            // role: "user",
            phoneNumber: data.phone,
            // address: "Hanoi",
            // dob: "2021-01-01",
        };

        const res = await signUpUser(dataBody);
        if (res.statusCode === 201) {
            api.success({
                message: "Đăng ký tài khoản thành công",
                description: "Vui lòng đăng nhập để sử dụng dịch vụ",
                duration: 3,
                showProgress: true,
            });

            // wait 3s to redirect to login page
            setTimeout(() => {
                router.push(`/login` as any);
            }, 2000);

            // router.push(`/login` as any);
        } else {
            api.error({
                message: res.message || "Đăng ký tài khoản thất bại",
                description: "Vui lòng thử lại",
                duration: 3,
                showProgress: true,
            });
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <div className="mx-auto w-4/5 md:w-1/2 lg:w-3/5  bg-white my-4">
                <h2 className="bg-primary text-white text-center py-3 2xl:py-6">
                    XinChaoVietNam
                </h2>
                <div className="border--primary-400 mx-auto border p-4 grid lg:grid-cols-3">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="border--primary-400 xl:border-r xl:border-primary xl:pr-5 flex flex-col gap-2 lg:col-span-2"
                    >
                        <div className={cn(s.main, "flex flex-col gap-2")}>
                            <div
                                className={cn(
                                    s.inputContainers,
                                    "flex flex-col"
                                )}
                            >
                                <label
                                    htmlFor="name"
                                    className="text-lg leading-6 text-primary"
                                >
                                    Họ và tên
                                </label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="name"
                                            placeholder="Nhập họ và tên"
                                            {...field}
                                        />
                                    )}
                                />
                                {<Errors error={errors.name} />}
                            </div>

                            <div
                                className={cn(
                                    s.inputContainers,
                                    "flex flex-col"
                                )}
                            >
                                <label
                                    htmlFor="email"
                                    className="mb-2 text-lg leading-6 text-primary"
                                >
                                    Email
                                </label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="email"
                                            placeholder="Nhập email"
                                            {...field}
                                        />
                                    )}
                                />
                                {<Errors error={errors.email} />}
                            </div>
                            <div
                                className={cn(
                                    s.inputContainers,
                                    "flex flex-col"
                                )}
                            >
                                <label
                                    htmlFor="phone"
                                    className="mb-2 text-lg leading-6 text-primary"
                                >
                                    Số điện thoại
                                </label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{ pattern: /^[0-9]*$/ }}
                                    render={({ field }) => (
                                        <Input
                                            id="phone"
                                            placeholder="Nhập số điện thoại"
                                            {...field}
                                        />
                                    )}
                                />
                                <span className="h-3 text-red-500">
                                    {<Errors error={errors.phone} />}
                                </span>
                            </div>
                            <div
                                className={cn(
                                    s.inputContainers,
                                    " flex flex-col"
                                )}
                            >
                                <label
                                    htmlFor="password"
                                    className="mb-2 text-lg leading-6 text-primary"
                                >
                                    Mật khẩu
                                </label>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <Input.Password
                                            placeholder="Nhập mật khẩu"
                                            id="password"
                                            iconRender={(visible) =>
                                                visible ? (
                                                    <EyeTwoTone />
                                                ) : (
                                                    <EyeInvisibleOutlined />
                                                )
                                            }
                                            {...field}
                                        />
                                    )}
                                />
                                {<Errors error={errors.password} />}
                            </div>
                            <div
                                className={cn(
                                    s.inputContainers,
                                    "flex flex-col"
                                )}
                            >
                                <label
                                    htmlFor="confirmPassword"
                                    className="text-lg leading-6 text-primary"
                                >
                                    Xác nhận mật khẩu
                                </label>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <Input.Password
                                            placeholder="Nhập xác nhận mật khẩu"
                                            id="confirmPassword"
                                            iconRender={(visible) =>
                                                visible ? (
                                                    <EyeTwoTone />
                                                ) : (
                                                    <EyeInvisibleOutlined />
                                                )
                                            }
                                            {...field}
                                        />
                                    )}
                                />
                                {<Errors error={errors.confirmPassword} />}
                            </div>
                        </div>
                        <div className="my-2">
                            <Link
                                href={`/login`}
                                className="mb-3 cursor-pointer text-base font-normal text-gray-600 hover:underline underline-offset-4 hover:text-primary text-end justify-end flex flex-row gap-2"
                            >
                                Quay về trang{" "}
                                <span className=" text-primary font-medium underline">
                                    Đăng nhập
                                </span>
                            </Link>
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="w-full items-center m-auto mt-2"
                                loading={loading}
                            >
                                Đăng kí
                            </Button>
                        </div>
                    </form>
                    <div className="mt-10 flex flex-col items-center justify-start xl:pl-5">
                        <span>Hoặc đăng nhập bằng</span>
                        <div className="mt-4 flex items-center">
                            <div className="mr-5 w-fit cursor-pointer rounded-full bg-primary-500 p-3">
                                <Tooltip title="Facebook">
                                    <Image
                                        src={fb}
                                        alt="Facebook"
                                        width={24}
                                        height={24}
                                    />
                                </Tooltip>
                            </div>

                            <div className="w-fit cursor-pointer rounded-full bg-primary-500 p-3">
                                <Tooltip title="Google">
                                    <Image
                                        src={gg}
                                        alt="Google"
                                        width={24}
                                        height={24}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mb-4  text-center px-4 py-2">
                    Lưu ý: Nếu bạn là{" "}
                    <strong className=" text-primary">Luật sư</strong> và muốn
                    là{" "}
                    <strong className=" text-primary">
                        Người tư vấn pháp luật
                    </strong>{" "}
                    của{" "}
                    <strong className=" text-primary">XinchaoVietNam</strong>thì
                    hãy <span className=" text-alerts-red">Liên hệ</span> với
                    chúng tôi nhé!
                </p>
            </div>
        </>
    );
}
