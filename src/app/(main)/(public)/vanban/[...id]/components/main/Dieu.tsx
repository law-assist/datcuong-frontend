import Content from "./Content";
import ContentRef from "./ContentRef";
import Khoan from "./Khoan";

interface Props {
    content: any;
    isRef?: boolean;
}

const Dieu: React.FC<Props> = ({ content, isRef = true }) => {
    return (
        <div className="flex flex-col gap-2">
            {isRef && content.reference.length > 0 ? (
                <ContentRef content={content} parent={content}>
                    <p className="body-5 font-bold">{content.value}</p>
                </ContentRef>
            ) : (
                <p className="body-5 font-bold">{content.value}</p>
            )}

            {content.content?.map((item: any, index: number) => {
                const name: string = item.name;

                if (name && item.name.includes("khoan"))
                    return (
                        <Khoan
                            key={index}
                            content={item}
                            parent={content}
                            isRef={isRef}
                        />
                    );

                return (
                    <Content
                        key={index}
                        content={item}
                        parent={content}
                        isRef={isRef}
                    />
                );
            })}
        </div>
    );
};

export default Dieu;
