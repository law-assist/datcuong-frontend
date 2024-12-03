interface LawFooterProps {
    footer: any[];
}

const LawFooter: React.FC<LawFooterProps> = ({ footer }) => {
    const splitRegex = /\t| {2}/;
    const length = footer.length;
    const leftItems = footer[0].value.split(splitRegex);
    let rightItems = leftItems;
    if (length === 2) {
        rightItems = footer[1].value.split(splitRegex);
    }

    return (
        <div className="w-full body-5 grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
                {length === 2 &&
                    leftItems.map((item: any, index: number) => {
                        if (index === 0) {
                            return (
                                <strong key={index} className="body-5">
                                    {item}
                                </strong>
                            );
                        }
                        return (
                            <p className="body-5" key={index}>
                                {item}
                            </p>
                        );
                    })}
            </div>
            <div className="flex flex-col gap-1 items-center">
                {rightItems.map((item: any, index: number) => {
                    return (
                        <strong key={index} className="body-5">
                            {item}
                        </strong>
                    );
                })}
            </div>
        </div>
    );
};

export default LawFooter;
