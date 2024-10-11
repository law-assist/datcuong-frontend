"use client";
import Cookies from "js-cookie";

export const removeTokens = () => {
    Cookies.remove("refresh_token");
    Cookies.remove("access_token");
};
