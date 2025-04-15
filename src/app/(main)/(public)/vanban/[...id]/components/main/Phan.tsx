import Content from "./Content";
import ContentRef from "./ContentRef";

interface Props {
    content: any;
    isRef?: boolean;
}

const Phan: React.FC<Props> = ({ content, isRef = true }) => {
    return (
        <span className="flex flex-col ">
            {isRef && content.reference.length > 0 ? (
                <ContentRef content={content} parent={content}>
                    <strong className="body-5">{content.value}</strong>
                </ContentRef>
            ) : (
                <strong className="body-5">{content.value}</strong>
            )}
            <strong className="body-5">{content.value}</strong>
            <p className="text-center font-bold body-5">
                {content.content?.map((item: any, index: number) => {
                    return (
                        <Content
                            key={index}
                            content={item}
                            parent={content}
                            isRef={isRef}
                        />
                    );
                })}
            </p>
        </span>
    );
};

export default Phan;
