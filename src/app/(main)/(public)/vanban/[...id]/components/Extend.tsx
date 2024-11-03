interface LawHeaderProps {
    header: any[];
}

const LawHeader: React.FC<LawHeaderProps> = ({ header }) => {
    return (
        <div className="w-full body-5 flex flex-col gap-2">
            <div className="grid grid-cols-5 items-center ">
                <div className="col-span-2 flex flex-col gap-1 items-center">
                    <strong className="body-5">{header[0].value}</strong>
                    <strong className="body-5"> --------</strong>
                </div>
                <div className="col-span-3 flex flex-col gap-1 items-center">
                    <strong className="body-5">
                        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </strong>
                    <strong className="body-5">
                        Độc lập - Tự do - Hạnh phúc
                    </strong>
                    <strong className="body-5"> --------------- </strong>
                </div>
            </div>
            <div className="grid grid-cols-5">
                <span className="col-span-2 body-5 justify-self-center">
                    {header[2].value}
                </span>
                <span className="col-span-3 body-5 justify-self-end">
                    {header[3].value}
                </span>
            </div>
        </div>
    );
};

export default LawHeader;
