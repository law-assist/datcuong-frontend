import ContentRef from "./ContentRef";

interface Props {
    content: any;
    isRef?: boolean;
}

const Muc: React.FC<Props> = ({ content, isRef = true }) => {
    return (
        <>
            {isRef && content.reference.length > 0 ? (
                <ContentRef content={content} parent={content}>
                    <p className="body-5 font-bold">{content.value}</p>
                </ContentRef>
            ) : (
                <p className="body-5 font-bold">{content.value}</p>
            )}
        </>
    );
};

export default Muc;
