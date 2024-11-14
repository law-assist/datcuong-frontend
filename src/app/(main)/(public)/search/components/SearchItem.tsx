import Link from "next/link";

interface SearchItemProps {
    law: any;
}

export const SearchItem: React.FC<SearchItemProps> = ({ law }) => {
    return (
        <Link
            href={`/vanban/${law._id}`}
            className="flex flex-col lg:grid lg:grid-cols-3 gap-2 py-2 px-4 hover:bg-gray-100 cursor-pointer"
        >
            <div className="flex flex-col lg:col-span-2 gap-2">
                <span className="hover:underline text-xl font-semibold text-primary line-clamp-2 hover:line-clamp-none">
                    {law.name}
                </span>
                <p className="hover:text-primary">Xem thêm {" >>> "}</p>
            </div>
            <div className="flex flex-col gap-1">
                <span className="flex flex-row gap-1">
                    <p>Cơ quan ban hành: </p>
                    <strong className="overflow-hidden text-ellipsis whitespace-nowrap hover:overflow-visible hover:whitespace-normal my-auto">
                        {law.department}
                    </strong>
                </span>

                <span className="flex flex-row gap-1">
                    <p>Loại văn bản: </p>
                    <strong>{law.category}</strong>
                </span>

                <span className="flex flex-row gap-1">
                    <p>Lĩnh vực: </p>
                    <strong className="overflow-hidden text-ellipsis whitespace-nowrap hover:overflow-visible hover:whitespace-normal my-auto">
                        {law.fields.join(", ")}
                    </strong>
                </span>
            </div>
        </Link>
    );
};
