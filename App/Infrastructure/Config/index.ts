import * as dotenv from "dotenv";
dotenv.config();

import server from "./server";
import googleOauth from "./google-oauth";

export default {
    server,
    googleOauth
};
