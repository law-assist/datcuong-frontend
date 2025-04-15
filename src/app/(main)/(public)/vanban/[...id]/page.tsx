"use client";

import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { CustomPageProps as PageProps } from "src/interfaces";
import ContentPage from "./components/ContentPage";
import DiagramPage from "./components/DiagramPage";
import DownloadPage from "./components/DownloadPage";

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

    // Define the tabs as an array of objects
    const tabs = [
        {
            label: <span>Nội dung</span>,
            key: "1",
            children: <ContentPage params={params} />,
        },
        {
            label: <span>Lược đồ</span>,
            key: "2",
            children: (
                <div className="p-2 md:p-4">
                    <DiagramPage params={params} />
                </div>
            ),
        },
        {
            label: <span>Tải văn bản</span>,
            key: "3",
            children: (
                <div className="p-2 md:p-4">
                    <DownloadPage params={params} />
                </div>
            ),
        },
        {
            label: <span>Văn bản liên quan</span>,
            key: "4",
            children: (
                <div className="p-2 md:p-4">
                    <p className="text-gray-700">Content for Tab 3</p>
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
