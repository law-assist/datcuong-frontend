/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
//
"use client";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function SearchFilter() {
    const [form] = Form.useForm();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const q = searchParams.get("q") ?? "";

    // const [name, setName] = useState<string>(q);

    const handleSubmit = (values: any) => {
        console.log(values);
        const currentParams = new URLSearchParams(searchParams.toString());

        values.name && currentParams.set("q", values.name.trim());
        values.field && currentParams.set("field", values.field);
        values.category && currentParams.set("category", values.category);
        values.department && currentParams.set("department", values.department);
        values.year && currentParams.set("year", values.year.format("YYYY"));
        currentParams.delete("page");

        router.push(`${pathname}?${currentParams.toString()}` as any, {
            scroll: false,
        });
    };

    useEffect(() => {
        form.setFieldsValue({ name: q });
    }, [q]);

    return (
        <div className="flex flex-col gap-2 text-center bg-white rounded-3xl p-4 w-fit h-fit">
            <p className="font-bold text-primary text-xl">Tìm kiếm nâng cao</p>
            <Form
                form={form}
                name="law search"
                layout="horizontal"
                style={{ minWidth: "100%" }}
                initialValues={{ name: q }}
                requiredMark={false}
                colon={false}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="name"
                    style={{ marginBottom: 8 }}
                    className="w-full"
                >
                    <Input placeholder="Nhập từ khóa" size="large" />
                </Form.Item>

                <Form.Item name="field" style={{ marginBottom: 8 }}>
                    <Select placeholder="Lĩnh vưc" />
                </Form.Item>

                <Form.Item name="category" style={{ marginBottom: 8 }}>
                    <Select placeholder="Loại văn bản" />
                </Form.Item>

                <Form.Item name="department" style={{ marginBottom: 8 }}>
                    <Select placeholder="Cơ quan ban hành" />
                </Form.Item>

                <Form.Item name="year" style={{ marginBottom: 8 }}>
                    <DatePicker
                        className="w-full"
                        placeholder="Thời gian"
                        picker="year"
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    style={{ marginTop: 8 }}
                >
                    Tìm kiếm
                </Button>
            </Form>
        </div>
    );
}

export default SearchFilter;
