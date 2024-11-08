import Content from "./Content";
import Khoan from "./Khoan";

interface Props {
    content: any;
}

const Dieu: React.FC<Props> = ({ content }) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="body-5 font-bold">{content.value}</p>
            {content.content.map((item: any, index: number) => {
                const name: string = item.name;

                if (name && item.name.includes("khoan"))
                    return <Khoan key={index} content={item} />;

                return <Content key={index} content={item} />;
            })}
        </div>
    );
};

export default Dieu;
