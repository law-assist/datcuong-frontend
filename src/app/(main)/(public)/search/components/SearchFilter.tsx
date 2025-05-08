/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
//
"use client";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    CATEGORY_MAPPING,
    DEPARTMENT_MAPPING,
    FIELD_MAPPING,
} from "src/constants/constant";
import dayjs from "src/utils/dayjs.util";

const { Option } = Select;

function SearchFilter() {
    const [form] = Form.useForm();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const q = searchParams.get("q") ?? "";
    const field = searchParams.get("field") ?? "";
    const category = searchParams.get("category") ?? "";
    const department = searchParams.get("department") ?? "";
    const year = searchParams.get("year") ?? "";

    // const [name, setName] = useState<string>(q);

    const handleSubmit = (values: any) => {
        const currentParams = new URLSearchParams(searchParams.toString());

        values.name
            ? currentParams.set("q", values.name.trim())
            : currentParams.delete("q");
        values.field
            ? currentParams.set("field", values.field)
            : currentParams.delete("field");
        values.category
            ? currentParams.set("category", values.category)
            : currentParams.delete("category");
        values.department
            ? currentParams.set("department", values.department)
            : currentParams.delete("department");
        values.year
            ? currentParams.set("year", values.year.format("YYYY"))
            : currentParams.delete("year");
        currentParams.delete("page");

        router.push(`${pathname}?${currentParams.toString()}` as any, {
            scroll: false,
        });

        setIsFormVisible(false);
    };

    useEffect(() => {
        form.setFieldsValue({ name: q });
    }, [q]);

    return (
        <div className="flex flex-col gap-2 text-center bg-white rounded-xl p-4 w-fit h-fit">
            <span
                className="font-bold text-primary text-xl hover:underline cursor-pointer"
                onClick={() => setIsFormVisible(!isFormVisible)}
            >
                Tìm kiếm nâng cao {" ^-^ "}
                {isFormVisible ? <UpOutlined /> : <DownOutlined />}
            </span>

            {isFormVisible && (
                <>
                    <Form
                        form={form}
                        name="law search"
                        layout="horizontal"
                        style={{ minWidth: "100%" }}
                        initialValues={{
                            name: q,
                            category: category ? category : undefined,
                            field: field ? field : undefined,
                            department: department ? department : undefined,
                            year: year ? dayjs(year) : undefined,
                        }}
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
                            <Select
                                placeholder="Lĩnh vực"
                                allowClear
                                showSearch
                            >
                                {Object.entries(FIELD_MAPPING).map(
                                    ([key, value]) => (
                                        <Option key={key} value={value}>
                                            {value}
                                        </Option>
                                    )
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item name="category" style={{ marginBottom: 8 }}>
                            <Select
                                placeholder="Loại văn bản"
                                allowClear
                                showSearch
                            >
                                {Object.entries(CATEGORY_MAPPING).map(
                                    ([key, value]) => (
                                        <Option key={key} value={value}>
                                            {value}
                                        </Option>
                                    )
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="department"
                            style={{ marginBottom: 8 }}
                        >
                            <Select
                                placeholder="Cơ quan ban hành"
                                allowClear
                                showSearch
                            >
                                {Object.entries(DEPARTMENT_MAPPING).map(
                                    ([key, value]) => (
                                        <Option key={key} value={value}>
                                            {value}
                                        </Option>
                                    )
                                )}
                            </Select>
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
                </>
            )}
        </div>
    );
}

export default SearchFilter;
