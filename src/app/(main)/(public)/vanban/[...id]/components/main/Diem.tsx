import Content from "./Content";

interface Props {
    content: any;
}

const Diem: React.FC<Props> = ({ content }) => {
    console.log(content);
    return (
        <div className="flex flex-col gap-2">
            <p className="body-5">{content.title}</p>
            {content.content.map((item: any, index: number) => {
                if (index === 0) return null;
                return <Content key={index} content={item} />;
            })}
        </div>
    );
};

export default Diem;
