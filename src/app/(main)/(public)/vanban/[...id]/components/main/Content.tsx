import ContentRef from "./ContentRef";

interface Props {
    parent: any;
    content: any;
    isRef?: boolean;
}

const Content: React.FC<Props> = ({ content, parent, isRef = true }) => {
    if (content.reference.length > 0 && isRef) {
        return (
            <ContentRef content={content} parent={parent}>
                {content.value.startsWith("“") ? (
                    <strong className="body-5">{content.value}</strong>
                ) : (
                    <p className="body-5">{content.value}</p>
                )}
            </ContentRef>
        );
    }
    if (content.value.startsWith("“"))
        return <strong className="body-5">{content.value}</strong>;
    return <p className="body-5">{content.value}</p>;
};

export default Content;
