import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#07357A",
                    100: "#F6FCF1", // not used
                    200: "#EBF8E0 ", // not used
                    300: "#DAEBCC", // not used
                    400: "#C4DCB1", // not used
                    500: "#A2C287", // not used
                    600: "#7FA65F", // not used
                },
                neutral: {
                    DEFAULT: "#FFFFFF",
                    100: "#F1F3F6", // not used
                    200: "#C8CED9", // not used
                    300: "#8292AA", // not used
                    400: "#384252", // not used
                    500: "#242B35", // not used
                    600: "#40423F ", // not used
                    main: "#22313F", // not used
                },
                natural: {
                    100: "#F8F7F5", // not used
                    200: "#E1E1E1", // not used
                    300: "#C7C7C7", // not used
                    400: "#939393", // not used
                    500: "#8C8C8B", // not used
                    600: "#5D5E5B", // not used
                    700: "#40423F", // not used
                },
                accent: {
                    100: "#FBF9FE", // not used
                    200: "#F5F2FD", // not used
                    300: "#E3DBF9", // not used
                    400: "#D1C2F9", // not used
                    500: "#B7A3F0", // not used
                    600: "#967DDD", // not used
                },
                alerts: {
                    green: {
                        light: "#EDF6EB",
                        DEFAULT: "#6AB557",
                    },
                    red: {
                        light: "#FDEBE7",
                        DEFAULT: "#EB5339",
                    },
                    yellow: {
                        light: "#FFF8E9",
                        DEFAULT: "#FAB424",
                    },
                    blue: {
                        light: "#E7F5FF",
                        DEFAULT: "#0C99FF",
                    },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            padding: {
                "30": "7.5rem",
            },
            borderRadius: {
                large: "40px",
                "large-md": "30px",
                "large-sm": "20px",
                form: "20px",
            },
            spacing: {
                card: "360px",
                "card-md": "280px",
            },
        },
    },
    plugins: [],
};
export default config;
