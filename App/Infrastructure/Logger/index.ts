import bunyan from "bunyan";
import config from "@infrastructure/Config";

const log = bunyan.createLogger({
    name: config.server.APP_NAME,
    streams: [
        {
            level: "info",
            stream: process.stdout,
        },
        {
            level: "debug",
            stream: process.stdout,
        },
        {
            level: "error",
            stream: process.stdout,
        },
    ],
});

export default log;
