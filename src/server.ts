import express from "express";
import cookieParser from "cookie-parser";
import onboardingRouter from "./services/onboarding";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3030",
  })
);

app.use("/onboarding", onboardingRouter);
app.use("/", (_req: express.Request, res: express.Response) => res.send('OK'));

const PORT = 3000;
const HOST = process.env.HOST ||'0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
