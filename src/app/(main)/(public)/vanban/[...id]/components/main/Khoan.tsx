import Content from "./Content";
import Diem from "./Diem";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface Props {
    content: any;
}

const Khoan: React.FC<Props> = ({ content }) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="body-5">{content.value}</p>
            {content.content.map((item: any, index: number) => {
                const name: string = item.name;
                if (index === 0) return null;
                if (name && item.name.includes("diem"))
                    return <Diem key={index} content={item} />;

                return <Content key={index} content={item} />;
            })}
        </div>
    );
};

export default Khoan;
