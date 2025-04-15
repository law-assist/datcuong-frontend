//
import Image from "next/image";

import map from "public/images/map.png";

function Greeting() {
    return (
        <div className="grid grid-cols-2 gap-4 pt-4 pb-4">
            <div className="col-start-2 bg-blue-700 opacity-65 text-white p-4 rounded-lg flex flex-col lg:flex-row gap-2 ">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-lg leading-relaxed text-center line-clamp-2 hover:line-clamp-none">
                        Chúng tôi sẽ giúp việc tra cứu các văn bản quy phạm pháp
                        luật ở Việt Nam trở nên dễ dàng hơn.
                    </h1>
                </div>

                <div className="relative justify-items-end">
                    <div className="absolute right-0">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                            alt="Vietnam Flag"
                            width={48} // Adjusted for w-16 equivalent
                            height={48} // Adjusted for h-12 equivalent
                        />
                    </div>
                    <div className="justify-self-end">
                        <Image
                            src={map}
                            alt="Map of Vietnam"
                            width={256} // Adjusted for w-40 equivalent
                            height={284} // Proportional height
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Greeting;
