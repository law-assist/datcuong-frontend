"use client";
import React from "react";

type Props = {
    content: string[];
};

const LawExtend: React.FC<Props> = ({ content }) => {
    // const htmlContent = content.join("");

    return (
        <div className="w-full flex flex-col gap-1">
            {content.map((item: string, index) => {
                if (item.includes("<tbody>")) {
                    return (
                        <div className="w-full overflow-x-auto" key={index}>
                            <table
                                dangerouslySetInnerHTML={{
                                    __html: item,
                                }}
                                className="w-full border-collapse border border-gray-300"
                            />
                        </div>
                    );
                }
                return (
                    <div
                        key={index}
                        dangerouslySetInnerHTML={{
                            __html: item,
                            // .replace("\n", "")
                            // .replace(
                            //     "<!--VABWAFAATABfADIAMAAyADQAMQAxADIAMwA=-->",
                            //     ""
                            // ),
                        }}
                    />
                );
            })}
        </div>
    );
};

export default LawExtend;
