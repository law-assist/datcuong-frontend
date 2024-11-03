interface Props {
    content: any;
}

const Content: React.FC<Props> = ({ content }) => {
    console.log(content.value);
    if (content.value.startsWith("“"))
        return <strong className="body-5">{content.value}</strong>;
    return <p className="body-5">{content.value}</p>;
};

export default Content;
