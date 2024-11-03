interface Props {
    content: any;
}

const Phan: React.FC<Props> = ({ content }) => {
    console.log(content);
    return <h1>chương</h1>;
};

export default Phan;
