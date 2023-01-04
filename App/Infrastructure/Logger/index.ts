import bunyan from "bunyan";
import config from "@infrastructure/Config";

const log = bunyan.createLogger({
    name: config.server.APP_NAME,
});

export default log;
