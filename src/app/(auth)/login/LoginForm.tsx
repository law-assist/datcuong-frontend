/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, notification } from "antd";

import TextError from "src/components/error/TextError";
import { cn } from "src/libs/utils";
import { loginSchema } from "src/zod-schemas/login-schema";

import fb from "public/icon/icon-facebook.svg";
import gg from "public/icon/icon-google.svg";

import { z } from "zod";
import s from "./login.module.scss";
type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm<FormData>({
        mode: "onBlur",
    });
    const { data: session } = useSession();

    if (session?.user) {
        const redirect = searchParams.get("redirect") ?? "/home";
        router.push(redirect as any);
    }

    async function onFocus() {
        setErrorMessage("");
    }

    async function onSubmit({ username, password }: FormData) {
        setLoading(true);
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });
        setLoading(false);
        if (!res?.ok) {
            setErrorMessage("Tài khoản hoặc mật khẩu không đúng");
            return;
        }

        api.success({
            message: "Đăng nhập thành công",
            placement: "top",
            showProgress: true,
            pauseOnHover: false,
        });
    }

    return (
        <>
            {contextHolder}
            <div className="mx-auto w-4/5 md:w-1/2 lg:w-3/5  bg-white my-8 rounded-3xl">
                <h2 className="bg-primary text-white text-center py-3 xl:py-6">
                    XinChaoVietNam
                </h2>
                <div className="border--primary-400 mx-auto border p-4 grid lg:grid-cols-2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={
                            (s.formContainer,
                            "xl:border-r xl:border-primary xl:pr-5")
                        }
                    >
                        <div
                            className={cn(
                                s.inputContainer,
                                "flex flex-col space-y-1"
                            )}
                        >
                            <label
                                htmlFor="username"
                                className="mb-2 text-lg leading-6 text-primary"
                            >
                                Email
                            </label>
                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="username"
                                        placeholder="Nhập email"
                                        className=""
                                        status={errorMessage ? "error" : ""}
                                        {...field}
                                        onFocus={onFocus}
                                    />
                                )}
                            />
                        </div>
                        <div
                            className={cn(
                                s.inputContainer,
                                "mb-2 mt-4 flex flex-col space-y-1"
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
                                        status={errorMessage ? "error" : ""}
                                        {...field}
                                        onFocus={onFocus}
                                    />
                                )}
                            />
                        </div>
                        <TextError error={errorMessage} />

                        <Link
                            href={"/reset-password" as any}
                            className="text-blue-500"
                        >
                            Quên mật khẩu ?
                        </Link>

                        <Button
                            htmlType="submit"
                            className="mb-6 mt-2 w-full bg-alerts-red text-blue-500"
                            disabled={isSubmitting}
                            loading={loading}
                            // danger
                            type="primary"
                            color="primary"
                        >
                            Đăng nhập
                        </Button>
                    </form>
                    <div className=" flex flex-col items-center justify-center xl:pl-5">
                        <span>Hoặc đăng nhập bằng</span>
                        <div className="mt-4 flex items-center">
                            <div className="mr-5 w-fit cursor-pointer rounded-full bg-primary-500 p-3">
                                <Image src={fb} alt="" width={24} height={24} />
                            </div>

                            <div className="w-fit cursor-pointer rounded-full bg-primary-500 p-3">
                                <Image src={gg} alt="" width={24} height={24} />
                            </div>
                        </div>
                    </div>
                </div>
                <p className=" text-center items-center pb-8">
                    Bạn chưa có tài khoản đăng nhập?{" "}
                    <Link
                        href={`/sign-up`}
                        className="mt-3 cursor-pointer text-base font-medium text-primary-600 underline underline-offset-4"
                    >
                        Đăng ký tại đây!
                    </Link>
                </p>
            </div>
        </>
    );
}
