import { z } from "zod";

export const SignUpSchema = z
    .object({
        email: z
            .string({
                required_error: "Email không được để trống",
            })
            .email({ message: "Định dạng email không hợp lệ" }),
        name: z
            .string({
                required_error: "Tên không được để trống",
            })
            .min(1, { message: "Tên phải chứa ít nhất 1 ký tự" })
            .max(52, { message: "Tên không được vượt quá 52 ký tự" }),
        phone: z
            .string({
                required_error: "SDT không được để trống",
            })
            .regex(
                /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                "Số điện thoại không hợp lệ"
            ),
        confirmPassword: z.string({
            required_error: " Mật khẩu không được để trống",
        }),
        password: z
            .string({
                required_error: " Mật khẩu không được để trống",
            })
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
            )
            .min(8, { message: "Mật khẩu phải chứa ít nhất 8 ký tự" })
            .max(20, { message: "Mật khẩu không được vượt quá 20 ký tự" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu phải trùng khớp",
        path: ["confirmPassword"],
    });
