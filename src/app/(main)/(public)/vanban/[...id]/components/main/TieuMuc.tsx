interface Props {
    content: any;
}

const TieuMuc: React.FC<Props> = ({ content }) => {
    console.log(content);
    return <h1>chương</h1>;
};

export default TieuMuc;
