/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ContentRefItem from "./ContentRefItem";

interface Props {
    content: any;
}

const ContentRefList: React.FC<Props> = ({ content }) => {
    const references = content.reference;
    return (
        <>
            <div className="flex flex-col gap-4">
                {references.length > 0 &&
                    references.map((item: any, index: number) => {
                        return (
                            <ContentRefItem
                                key={index}
                                reference={item}
                            ></ContentRefItem>
                        );
                    })}
            </div>
        </>
    );
};

export default ContentRefList;
