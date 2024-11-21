interface Props {
    content: any;
}

const Muc: React.FC<Props> = ({ content }) => {
    return <p className="font-bold body-5">{content.value}</p>;
};

export default Muc;
