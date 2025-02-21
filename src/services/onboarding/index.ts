import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";
import { generateMotivationalmessage, steps } from "./messages";
import { logger } from "../../utils/logger";

export type Steps = {
  id: string;
  label: string;
  completed: boolean;
};
interface OnboardingRequest extends Request {
  body: {
    steps: Steps[];
  };
}
const onboardingRouter = Router();

const userStore: Record<string, { steps: Steps[] }> = {};

onboardingRouter.get("/init", (req: OnboardingRequest, res: Response) => {
  let userId = req.cookies.userId;
  if (!userId) {
    userId = randomUUID();

    res.cookie("userId", userId, {
      httpOnly: true,
      secure: true, 
      sameSite: "none",
      path: "/",
    });
    logger.info("New user created:", userId);
  }
  if (!userStore[userId]) {
    userStore[userId] = { steps };
  }

  const motivationMessage = generateMotivationalmessage(
    userStore[userId].steps
  );

  res.json({ userId, motivationMessage, steps: userStore[userId].steps });
});

onboardingRouter.post("/progress", (req: OnboardingRequest, res: Response) => {
  const userId = req.cookies.userId;

  if (!userId || !userStore[userId]) {
    return res.status(401).json({ error: "User not identified" });
  }
  const { steps } = req.body;

  userStore[userId].steps = steps;

  const motivationMessage = generateMotivationalmessage(
    steps.filter((item) => item.completed)
  );
  
  logger.debug(`User ${userId} progress updated`);
  res.json({ userId, steps, motivationMessage });
});

export default onboardingRouter;
