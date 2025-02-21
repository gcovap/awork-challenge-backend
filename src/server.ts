import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import onboardingRouter from "./services/onboarding";
import { requestLogger } from "./middleware/requestLogger";
import dotenv from "dotenv"
import { errorLogger } from "./middleware/errorLogger";
dotenv.config()

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',')
const PORT = process.env.PORT || '3000';
const HOST = process.env.HOST ||'0.0.0.0';

const app = express();

app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);
app.options("*", cors());

app.use(requestLogger);
app.use("/onboarding", onboardingRouter);

app.use("/", (_req: express.Request, res: express.Response) => res.send('OK'));
app.use(errorLogger);

app.listen(parseInt(PORT), HOST, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
