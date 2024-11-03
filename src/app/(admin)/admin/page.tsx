"use client";

import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import UserManagement from "./components/UserManagement";
import LawManagement from "./components/LawManagement";
import RequestManagement from "./components/RequestManagement";

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
    return (
        <div className="p-4 bg-gray-100">
            <Tabs
                tabPosition={tabPosition}
                defaultActiveKey="1"
                className="bg-white shadow-md rounded-lg"
                tabBarGutter={20} // Add space between tabs
                tabBarStyle={{
                    color: "blue",
                }}
                renderTabBar={(props, DefaultTabBar) => (
                    <DefaultTabBar {...props} className="!text-blue-500" />
                )}
            >
                <TabPane tab={<span>UserManagement</span>} key="1">
                    <UserManagement />
                </TabPane>

                <TabPane tab={<span>LawManagement</span>} key="2">
                    <LawManagement />
                </TabPane>

                <TabPane tab={<span>RequestManagement</span>} key="3">
                    <RequestManagement />
                </TabPane>
            </Tabs>
        </div>
    );
}
