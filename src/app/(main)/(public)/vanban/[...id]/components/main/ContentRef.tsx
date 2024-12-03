"use client";
import { Modal } from "antd";
import { useState } from "react";
import ContentRefModal from "./ContentRefModal";

interface Props {
    children: React.ReactNode;
    content: any;
    parent: any;
}

const ContentRef: React.FC<Props> = ({ children, content, parent }) => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleCancel = () => {
        setIsOpenModal(false);
    };

    const handleOk = () => {
        setIsOpenModal(false);
    };
    return (
        <>
            <div
                className="bg-yellow-300 p-1 -mx-1 lg:p-2 lg:-mx-2 rounded hover:cursor-pointer hover:underline italic "
                onClick={() => setIsOpenModal(true)}
            >
                {children}
            </div>
            <div className="">
                {isOpenModal && (
                    <Modal
                        // visible={true} // Set this to control modal visibility
                        footer={null} // If you don't want a footer, set it to null
                        style={{ padding: "20px" }}
                        width={"90%"} // Set the desired width here
                        open={isOpenModal}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        closable={false}
                        modalRender={(node) => <div className="">{node}</div>}
                        className=""
                    >
                        <ContentRefModal
                            onClose={handleCancel}
                            content={content}
                            parent={parent}
                        ></ContentRefModal>
                    </Modal>
                )}
            </div>
        </>
    );
};

export default ContentRef;
