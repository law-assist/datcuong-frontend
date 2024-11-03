"use client";

import { PageProps } from "src/interfaces";

import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import ContentPage from "./components/ContentPage";
import TabPane from "antd/es/tabs/TabPane";

type TabPosition = "left" | "right" | "top" | "bottom";

export default function Page({ params }: PageProps) {
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
                <TabPane tab={<span>Nội dung văn bản</span>} key="1">
                    <ContentPage params={params} />
                </TabPane>
                <TabPane tab={<span>Lược đồ</span>} key="2">
                    <div className="p-4">
                        <p className="text-gray-700">Lược đồ</p>
                    </div>
                </TabPane>
                <TabPane tab={<span>Văn bản liên quan</span>} key="3">
                    <div className="p-4">
                        <p className="text-gray-700">Content for Tab 3</p>
                    </div>
                </TabPane>

                <TabPane tab={<span>Xem nội dung gốc</span>} key="4">
                    <div className="p-4">
                        <p className="text-gray-700">Xem nội dung gốc</p>
                    </div>
                </TabPane>

                <TabPane tab={<span>Tải văn bản</span>} key="5">
                    <div className="p-4">
                        <p className="text-gray-700">Tải văn bản</p>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
}
