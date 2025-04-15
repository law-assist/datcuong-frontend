import Content from "./Content";
import ContentRef from "./ContentRef";

interface Props {
    parent: any;
    content: any;
    isRef?: boolean;
}

const Diem: React.FC<Props> = ({ content, parent, isRef = true }) => {
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

export default Diem;
