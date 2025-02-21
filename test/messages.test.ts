import { generateMotivationalmessage } from "../src/services/onboarding/messages";

const STEP = { completed: true, id: "1", label: "Step 1" };

const RESULT_MESSAGE = {
  progress: 25,
  message: "Making progress—don't get too comfortable yet!",
};

describe("generateMotivationalmessage", () => {
  it("should return the correct message for valid progress", () => {
    const message = generateMotivationalmessage([STEP]);

    expect(message).toEqual(RESULT_MESSAGE);
  });

  it("should throw an error for invalid progress", () => {
    expect(() =>
      generateMotivationalmessage(
        Array(10)
          .fill(null)
          .map(() => STEP)
      )
    ).toThrow("Invalid progress, expected positive number between 0 and 100");
  });
});
