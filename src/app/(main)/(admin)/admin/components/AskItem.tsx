import { REQUEST_STATUS_MAPPING } from "src/constants/constant";
import { formatDateToString } from "src/libs/utils";

interface AskItemProps {
    request: any;
    onClick?: (item: any) => void;
}

export const AskItem: React.FC<AskItemProps> = ({ request }) => {
    const color =
        request.status === "pending"
            ? "text-yellow-500"
            : request.status === "starting"
            ? "text-green-500"
            : request.status === "reject"
            ? "text-red-500"
            : "text-blue-500";

    return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-2 my-2 py-2 px-4 shadow-md cursor-pointer border-b border-gray-200 rounded-lg">
        <div className="flex flex-col lg:col-span-2 gap-2 hover:cursor-pointer">
            <span className="hover:underline text-xl font-semibold text-primary line-clamp-2 hover:line-clamp-none">
                {request.title}
            </span>
            <p className="line-clamp-2 hover:line-clamp-none whitespace-pre-wrap">
                {request.content}
            </p>
            <strong>Xem thêm {" >>> "}</strong>
        </div>

        <div className="flex flex-row gap-4 text-center flex-wrap">
            <span className="flex flex-col gap-2">
                <strong>Trạng thái: </strong>
                <p className={`${color} hover:underline`}>
                    {REQUEST_STATUS_MAPPING[request.status]}
                </p>
            </span>

            <span className="flex flex-col gap-2">
                <strong>Luật sư hỗ trợ: </strong>
                <span className="text-primary hover:underline">
                    {request?.userResponse?.fullName ?? ""}
                </span>
            </span>

            <span className="flex flex-col gap-2">
                <strong>Thời gian gửi câu hỏi: </strong>
                <span>
                    {formatDateToString(new Date(request.createdAt))}
                </span>
            </span>
        </div>
    </div>
);
};
