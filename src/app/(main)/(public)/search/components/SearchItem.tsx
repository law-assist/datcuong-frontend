interface SearchItemProps {
    law: any;
    onClick?: (item: any) => void;
}

export const SearchItem: React.FC<SearchItemProps> = ({ law, onClick }) => {
    console.log(law);
    return (
        <div
            className="grid grid-cols-3 gap-2 items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => onClick?.(law)}
        >
            <div className="flex flex-col col-span-2 gap-2">
                <span className="hover:underline text-xl font-semibold text-primary">
                    {law.name}
                </span>
                <p>Xem thêm {" >>> "}</p>
            </div>
            <div className="flex flex-col gap-1">
                <span className="flex flex-row gap-1">
                    <p>Cơ quan ban hành: </p>
                    <strong>{law.department}</strong>
                </span>

                <span className="flex flex-row gap-1">
                    <p>Loại văn bản: </p>
                    <strong>{law.category}</strong>
                </span>

                <span className="flex flex-row gap-1">
                    <p>Số hiệu văn bản: </p>
                    <strong>{law.numberDoc}</strong>
                </span>
            </div>
        </div>
    );
};
