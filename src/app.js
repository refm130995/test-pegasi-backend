import express, {
    json,
    urlencoded
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./config/routes";

// Middlewares
const app = express();
app.use(json());
app.use(
    urlencoded({
        extended: false
    })
);
app.use(helmet());
app.use(morgan("dev"));

// CORS
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization,X-API-KEY,Origin,X-Rquested-Widht,Content-Type,Accept,Acces-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
// Routes
app.use("/", routes);

export default app;