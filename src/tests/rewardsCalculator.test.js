import { calculateRewardPoints } from "../js/utils.js";

describe("Reward Points Calculation", () => {
  test("Purchase under $50 gives 0 points", () => {
    expect(calculateRewardPoints(40)).toBe(0);
  });

  test("Purchase of $75 gives 25 points", () => {
    expect(calculateRewardPoints(75)).toBe(25);
  });

  test("Purchase of $120 gives 90 points", () => {
    expect(calculateRewardPoints(120)).toBe(90);
  });

  test("Negative amount returns 0 points", () => {
    expect(calculateRewardPoints(-20)).toBe(0);
  });

  test("Fractional amount $99.5 should calculate correctly", () => {
    expect(calculateRewardPoints(99.5)).toBe(49);
  });

  test("Invalid input returns 0", () => {
    expect(calculateRewardPoints("abc")).toBe(0);
  });
});
