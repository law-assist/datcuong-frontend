interface Props {
    content: any;
}

const Chuong: React.FC<Props> = ({ content }) => {
    return (
        <span className="flex flex-col ">
            <strong className="body-5">{content.value}</strong>
            <p className="text-center font-bold body-5">
                {content.content[0].value}
            </p>
        </span>
    );
};

export default Chuong;
