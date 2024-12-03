import Content from "./Content";
import ContentRef from "./ContentRef";
import Diem from "./Diem";

interface Props {
    content: any;
    parent: any;
    isRef?: boolean;
}

const Khoan: React.FC<Props> = ({ content, parent, isRef = true }) => {
    return (
        <div className="flex flex-col gap-2">
            {isRef && content.reference.length > 0 ? (
                <ContentRef content={content} parent={parent}>
                    <p className="body-5">{content.value}</p>
                </ContentRef>
            ) : (
                <p className="body-5">{content.value}</p>
            )}
            {content.content?.map((item: any, index: number) => {
                const name: string = item.name;

                if (name && item.name.includes("diem"))
                    return (
                        <Diem
                            key={index}
                            content={item}
                            parent={parent}
                            isRef={isRef}
                        />
                    );

                return (
                    <Content
                        key={index}
                        content={item}
                        parent={parent}
                        isRef={isRef}
                    />
                );
            })}
        </div>
    );
};

export default Khoan;
