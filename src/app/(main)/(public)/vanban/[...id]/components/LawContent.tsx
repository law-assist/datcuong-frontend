import Chuong from "./main/Chuong";
import Dieu from "./main/Dieu";
import Muc from "./main/Muc";
import Phan from "./main/Phan";
import TieuMuc from "./main/TieuMuc";

interface Props {
    content: any[];
}

const LawContent: React.FC<Props> = ({ content }) => {
    return (
        <div className="flex flex-col gap-2">
            {content &&
                content.map((item, index) => {
                    const name: string = item.name;
                    if (name.includes("phan"))
                        return <Phan key={index} content={item} />;

                    if (name.includes("chuong")) {
                        return <Chuong key={index} content={item} />;
                    }

                    if (name.includes("muc"))
                        return <Muc key={index} content={item} />;

                    if (name.includes("tieuMuc"))
                        return <TieuMuc key={index} content={item} />;

                    if (name.includes("dieu"))
                        return <Dieu key={index} content={item} />;

                    if (name.includes("tieumuc"))
                        return <TieuMuc key={index} content={item} />;

                    if (name.includes("muc"))
                        return <Muc key={index} content={item} />;

                    return;
                })}
        </div>
    );
};

export default LawContent;
