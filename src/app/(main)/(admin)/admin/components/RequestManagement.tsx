import React from "react";
import { Pagination, PaginationProps } from "antd";

import { AskItem } from "./AskItem";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "src/libs/utils";
import { getSession } from "next-auth/react";

function RequestManagement() {
        const searchParams = useSearchParams();
        const router = useRouter();
        const pathname = usePathname();
    
        const page = searchParams.get("page") ?? "1";
        const size = 5;
    
        const onPageChange: PaginationProps["onChange"] = (pageNumber: number) => {
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.set("page", pageNumber.toString());
    
            router.push(`${pathname}?${currentParams.toString()}` as any, {
                scroll: false,
            });
        };
    
        const params = new URLSearchParams({
            page,
            size: size.toString(),
        });
    
        const {
            data: response,
            error,
            isLoading: swrLoading,
        } = useSWR(
            `/request/user?${params.toString()}`,
            (url: string) => fetcher(url),
            {
                revalidateIfStale: false,
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
            }
        );
    
        if (error) {
            return <div>Đã có lỗi xảy ra</div>;
        }
    
    
        if (swrLoading) {
            return (
                <div>
                    <p className="italic text-primary p-4">Vui lòng chờ ....</p>
                </div>
            );
        }
    
        if (!response) {
            return null;
        }

        // const handleReject = (id: number) => {
        //     console.log("Reject request with id:", id);
        //   };
          
        const handleConnect = (id: number) => {
            console.log("Connect lawyer for request id:", id);
        };
        

        const handleReject = async (id: string) => {
        if (!confirm("Bạn có chắc muốn xóa request này không?")) return;
        console.log(id);
        try {
            const session = await getSession();
            const accessToken = session?.user?.accessToken;
            console.log(session);

            if (!accessToken) {
                alert("Phiên đăng nhập đã hết hạn.");
            return;
            }

            const res = await fetch(`http://localhost:5000/request/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                });
                
            if (!res.ok) {
                throw new Error("Delete failed");
            }

        } catch (error) {
            console.error("Error deleting request:", error);
            alert("Đã xảy ra lỗi khi xóa request");
        }
    };

    return (
        <div className="p-4">
            <div className="space-y-4">
                {response.data &&
                response.data.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="flex items-start justify-between bg-white shadow rounded-md p-4"
                    >
                    <AskItem request={item} />

                    <div className="flex flex-col gap-2 ml-4">
                        <button
                            onClick={() => handleReject(item._id)}
                            className="w-40 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                        Từ chối yêu cầu
                        </button>
                        <button
                            onClick={() => handleConnect(item.id)}
                            className="w-40 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                        Kết nối luật sư
                        </button>
                    </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 px-4">
                <Pagination
                defaultCurrent={page ? Number(page) : 1}
                total={response.total}
                showSizeChanger={false}
                pageSize={size}
                align="end"
                onChange={onPageChange}
                />
            </div>
            </div>
    );
}

export default RequestManagement;
