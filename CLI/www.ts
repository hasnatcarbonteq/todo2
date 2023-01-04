import "reflect-metadata";
import app from "@http/Bootstrap";
import logger from "@infrastructure/Logger";
import { Command } from "commander";
import config from "@infrastructure/Config";

const { server } = config;

const program = new Command();

program.command("start").action(() => {
    try {
        app.listen(server.PORT, "0.0.0.0", () =>
            logger.info(
                `[HTTP]: ${server.APP_NAME} listening on port ${server.PORT} `
            )
        );
    } catch (e) {
        process.exit(1);
    }
});

program.parse(process.argv);
