export default {
    PORT: Number(process.env.PORT) || 8080,
    APP_NAME: process.env.APP_NAME || "todo-2",
    NODE_ENV: process.env.NODE_ENV,
    SECRET: process.env.SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
