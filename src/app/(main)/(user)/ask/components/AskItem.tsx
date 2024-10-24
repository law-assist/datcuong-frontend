import { REQUEST_STATUS_MAPPING } from "src/constants/constant";

interface AskItemProps {
    request: any;
    onClick?: (item: any) => void;
}

export const AskItem: React.FC<AskItemProps> = ({ request, onClick }) => {
    return (
        <div
            className="grid grid-cols-3 gap-2 items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => onClick?.(request)}
        >
            <div className="flex flex-col col-span-2 gap-2 hover:cursor-pointer">
                <span className="hover:underline text-xl font-semibold text-primary truncate">
                    {request.title}
                </span>
                <p>{request.content}</p>
                <strong>Xem thêm {" >>> "}</strong>
            </div>
            <div className="flex flex-row gap-4 text-center">
                <span className="flex flex-col gap-2">
                    <strong>Trạng thái: </strong>
                    <p className={`${request.status}`}>
                        {REQUEST_STATUS_MAPPING[request.status]}
                    </p>
                </span>

                <span className="flex flex-col gap-2">
                    <strong>Luật sư hỗ trợ: </strong>
                    <span>
                        {request.userResponseId ? request.userResponseId : ""}
                    </span>
                </span>

                <span className="flex flex-col gap-2">
                    <strong>Thời gian gửi câu hỏi: </strong>
                    <span>{request.createdAt}</span>
                </span>
            </div>
        </div>
    );
};
