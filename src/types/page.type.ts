import { Session } from "next-auth";
import { Params } from "src/interfaces";

export type PageProps = {
    session?: Session;
    params: Params;
};
