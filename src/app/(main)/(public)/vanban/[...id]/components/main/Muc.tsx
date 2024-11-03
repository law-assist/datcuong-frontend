interface Props {
    content: any;
}

const Muc: React.FC<Props> = ({ content }) => {
    console.log(content);
    return <h1>chương</h1>;
};

export default Muc;
