import globalErrorHandler from "../Middlewares/global-error-middleware";
import auth from "../Middlewares/auth";

import app from "./app";

import userRoutes from "../Routes/user-routes";
import todoRoutes from "../Routes/todo-routes";

const apiVersion = "/api/v1";

app.use(`${apiVersion}/user`, userRoutes);
app.use(`${apiVersion}/todo`, auth, todoRoutes);

app.use("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        message: "not found",
    });
});

app.use(globalErrorHandler);
