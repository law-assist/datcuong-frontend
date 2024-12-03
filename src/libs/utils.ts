import { VALID_ROLES } from "src/constants/constant";
import { ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import axiosInstance from "./axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function formatDateToTime(dateTime: Date) {
    return dateTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
}

export function getValidRole(role: string = "user") {
    return VALID_ROLES.includes(role) ? role : "user";
}

export function getValidFilterType(tabs: any[], type: string) {
    return tabs.find((tab) => tab.value === type) ? type : "all";
}

export function formatCurrency(value: number = 0) {
    return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code",
    });
}

export function parseDateFromString(dateStr: string) {
    if (!dateStr) {
        return new Date();
    }
    // Split the input string into components
    const parts = dateStr.split(" - "); // E.g., ['T2', '30/6']
    if (parts.length !== 2) {
        throw new Error("Invalid date format");
    }

    // Extract the day and month
    const [day, month, year] = parts[1].split("/").map(Number); // Convert day and month to numbers

    // Create a new Date object in UTC
    const date = new Date(Date.UTC(year, month - 1, day));

    // Ensure the created date matches the input day and month (handles edge cases around month changes)
    if (date.getUTCDate() !== day || date.getUTCMonth() + 1 !== month) {
        throw new Error("Invalid day or month in date string");
    }

    return date;
}

export const getTime = (date: string | null, startTime: string) => {
    if (!date) {
        return new Date();
    }

    const [day, month, year] = date.split("/").map(Number);
    const currentDate = new Date(`${year}-${month}-${day}`);
    const [hour, minute] = startTime.split(":").map(Number);
    currentDate.setHours(hour, minute);

    return currentDate;
};

export const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data.data);

export const groupNotificationsByDay = (notifications: NotificationType[]) => {
    if (notifications?.length === 0 || !notifications) {
        return {};
    }

    return notifications.reduce((groupedNotifications, notification) => {
        const date = dayjs(notification.createdAt).format("DD/MM/YYYY");
        if (!groupedNotifications[date]) {
            groupedNotifications[date] = [];
        }
        groupedNotifications[date].push(notification);
        return groupedNotifications;
    }, {} as any);
};

export function timeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (isNaN(diffInSeconds) || diffInSeconds < 0) {
        return "Vừa mới đây";
    }

    if (diffInSeconds < 60) {
        return `${diffInSeconds} giây trước`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} giờ trước`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
}

export function addTimezone(date: Date) {
    const timezoneMilliseconds = 7 * 60 * 60 * 1000;
    return new Date(date.getTime() + timezoneMilliseconds);
}

export function formatDateToString(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours >= 12 ? "CH" : "SA";

    const formattedHours = (hours % 12 === 0 ? 12 : hours % 12)
        .toString()
        .padStart(2, "0");

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${formattedHours}:${formattedMinutes}${period} ${day}/${month}/${year}`;
}

export function stringToDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN");
}

export const isUpperCase = (value: string) => value === value.toUpperCase();

export function toSentenceCase(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}


