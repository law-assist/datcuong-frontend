interface Props {
    content: any;
}

const Chuong: React.FC<Props> = ({ content }) => {
    return (
        <div className="flex flex-col ">
            <strong className="body-5">{content.title}</strong>
            <p className="text-center font-bold">{content.content[0].value}</p>
        </div>
    );
};

export default Chuong;
