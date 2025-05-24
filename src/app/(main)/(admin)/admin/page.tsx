"use client";

import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import UserManagement from "./components/UserManagement";
import RequestManagement from "./components/RequestManagement";
import LawManagement from "./components/LawManagement";

type TabPosition = "left" | "right" | "top" | "bottom";

export default function Page() {
    const [tabPosition, setTabPosition] = useState<TabPosition>("left");

    useEffect(() => {
        const updateTabPosition = () => {
            setTabPosition(window.innerWidth < 768 ? "top" : "left");
        };

        // Run on initial render
        updateTabPosition();

        // Add event listener on resize
        window.addEventListener("resize", updateTabPosition);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener("resize", updateTabPosition);
    }, []);

    // Define the tabs as an array of objects
    const tabs = [
        {
            label: <span>Quản lý tài khoản</span>,
            key: "1",
            children: <UserManagement />,
        },
                {
            label: <span>Quản lý văn bản</span>,
            key: "2",
            children: (
                <div className="p-2 md:p-4">
                    <LawManagement/>
                </div>
            ),
        },
        {
            label: <span>Quản lý yêu cầu</span>,
            key: "3",
            children: (
                <div className="p-2 md:p-4">
                    <RequestManagement/>
                </div>
            ),
        },

    ];

    return (
        <div className="p-2 md:p-4 bg-gray-100 w-full mt-2 rounded-lg">
            <Tabs
                tabPosition={tabPosition}
                defaultActiveKey="1"
                className="bg-white shadow-md rounded-lg"
                tabBarStyle={{
                    color: "blue",
                }}
                renderTabBar={(props, DefaultTabBar) => (
                    <DefaultTabBar
                        {...props}
                        className="!text-primary px-2 md:px-4 pt-2"
                    />
                )}
                items={tabs} // Pass the tabs array as the `items` prop
            />
        </div>
    );
}




// "use client";

// import React, { useEffect, useState } from "react";
// import { Tabs } from "antd";
// import TabPane from "antd/es/tabs/TabPane";
// import UserManagement from "./components/UserManagement";
// import LawManagement from "./components/LawManagement";
// import RequestManagement from "./components/RequestManagement";

// type TabPosition = "left" | "right" | "top" | "bottom";

// export default function Page() {
//     const [tabPosition, setTabPosition] = useState<TabPosition>("left");

//     useEffect(() => {
//         const updateTabPosition = () => {
//             setTabPosition(window.innerWidth < 768 ? "top" : "left");
//         };

//         // Run on initial render
//         updateTabPosition();

//         // Add event listener on resize
//         window.addEventListener("resize", updateTabPosition);

//         // Clean up the event listener on component unmount
//         return () => window.removeEventListener("resize", updateTabPosition);
//     }, []);
//     return (
//         <div className="p-4 bg-gray-100">
//             <Tabs
//                 tabPosition={tabPosition}
//                 defaultActiveKey="1"
//                 className="bg-white shadow-md rounded-lg"
//                 tabBarGutter={20} // Add space between tabs
//                 tabBarStyle={{
//                     color: "blue",
//                 }}
//                 renderTabBar={(props, DefaultTabBar) => (
//                     <DefaultTabBar {...props} className="!text-blue-500" />
//                 )}
//             >
//                 <TabPane tab={<span>UserManagement</span>} key="1">
//                     <UserManagement />
//                 </TabPane>

//                 <TabPane tab={<span>LawManagement</span>} key="2">
//                     <LawManagement />
//                 </TabPane>

//                 <TabPane tab={<span>RequestManagement</span>} key="3">
//                     <RequestManagement />
//                 </TabPane>
//             </Tabs>
//         </div>
//     );
// }

