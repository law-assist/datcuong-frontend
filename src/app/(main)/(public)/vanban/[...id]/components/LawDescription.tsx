import { isUpperCase } from "src/libs/utils";

interface LawDescriptionProps {
    description: any[];
}

const LawDescription: React.FC<LawDescriptionProps> = ({ description }) => {
    return (
        <div className="w-full body-5 flex flex-col gap-2">
            {description.map((item, index) => {
                if (index === 0) {
                    return (
                        <strong key={index} className="w-full text-center">
                            {item.value}
                        </strong>
                    );
                }
                if (index === 1) {
                    return (
                        <span key={index} className="body-5 w-full text-center">
                            {item.value}
                        </span>
                    );
                }

                if (isUpperCase(item.value)) {
                    return (
                        <strong
                            key={index}
                            className="body-5 w-full text-center"
                        >
                            {item.value}
                        </strong>
                    );
                }

                return (
                    <span key={index} className="body-5">
                        {item.value}
                    </span>
                );
            })}
        </div>
    );
};

export default LawDescription;
