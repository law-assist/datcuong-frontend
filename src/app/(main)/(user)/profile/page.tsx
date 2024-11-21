//
"use client";
import Image from "next/image";
import React, { useState } from "react";

// import fb from "public/icon/facebook.svg";

import Profile from "./ProfileForm";
import useSWR from "swr";
import { fetcher } from "src/libs/utils";
import { redirect } from "next/navigation";
import { FileAddOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import EditFieldModal from "./EditFieldModal";

function Page() {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleCancel = () => {
        setIsOpenModal(false);
    };

    const handleOk = () => {
        setIsOpenModal(false);
    };
    const {
        data: response,
        error,
        isLoading: swrLoading,
    } = useSWR(`/user/user-profile`, (url: string) => fetcher(url), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    if (error) {
        redirect("/home");
    }

    if (swrLoading) {
        return (
            <div>
                <p className="italic text-primary p-4">Vui lòng chờ ....</p>
            </div>
        );
    }
    console.log(response);

    return (
        <div className=" bg-violet-100 flex flex-grow flex-col items-center gap-2 py-2 my-2 rounded-xl">
            <span className="text-2xl font-semibold w-3/4 lg:w-2/3 xl:w-1/2">
                Tài khoản của bạn
            </span>

            <div className="flex flex-row gap-4 w-3/4 lg:w-2/3 xl:w-1/2 m-auto bg-white px-8 py-4 ">
                <Image
                    src={response?.avatarUrl || "/icon/facebook.svg"}
                    alt="user"
                    width={100}
                    height={100}
                    layout="fixed"
                    className="rounded-full w-24 h-24"
                />
                {response.role === "lawyer" ? (
                    <div className="flex flex-col gap-2 flex-grow">
                        <p>
                            Bạn đang là{" "}
                            <strong className="text-primary">
                                Người Tư Vấn Pháp Luật
                            </strong>{" "}
                            của{" "}
                            <strong className="text-primary">
                                XinchaoVietNam
                            </strong>
                        </p>
                        <span className="flex flex-row gap-2 ">
                            <strong className="text-center items-center flex min-w-16">
                                Lĩnh vực tư vấn:
                            </strong>
                            <p className="text-primary flex-grow text-center items-center flex line-clamp-2 hover:line-clamp-none">
                                {response.fields && response.fields.join(", ")}
                            </p>
                            <div className="items-end flex">
                                <Button
                                    type="primary"
                                    style={{ height: 24, padding: 4 }}
                                    onClick={() => setIsOpenModal(true)}
                                >
                                    {/* <FolderAddOutlined /> */}
                                    Thêm lĩnh vực
                                    <FileAddOutlined />
                                </Button>
                            </div>
                        </span>
                        <div className="">
                            {isOpenModal && (
                                <Modal
                                    // visible={true} // Set this to control modal visibility
                                    footer={null} // If you don't want a footer, set it to null
                                    style={{ padding: "20px" }}
                                    open={isOpenModal}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    closable={false}
                                    modalRender={(node) => (
                                        <div className="">{node}</div>
                                    )}
                                    className=""
                                >
                                    <EditFieldModal
                                        user={response}
                                        onClose={handleCancel}
                                    ></EditFieldModal>
                                </Modal>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <p>
                            Bạn đang là{" "}
                            <strong className="text-primary">Thành viên</strong>{" "}
                            của{" "}
                            <strong className="text-primary">
                                XinchaoVietNam
                            </strong>
                        </p>

                        <p>
                            Bạn sẽ được trải nghiệm các dịch vụ{" "}
                            <strong className="text-primary">
                                Tiện ích văn bản
                            </strong>{" "}
                            của chúng tôi hoàn toàn miễn phí
                        </p>
                    </div>
                )}
            </div>

            {response && <Profile user={response} />}
        </div>
    );
}

export default Page;
