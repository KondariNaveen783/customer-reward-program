import { calculateRewardPoints } from '../src/utils/utils.js';

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

 
  test("Purchase of $200 gives 250 points", () => {
    expect(calculateRewardPoints(200)).toBe(250);
  });

  test("Purchase of $50 gives 0 points", () => {
    expect(calculateRewardPoints(50)).toBe(0);
  });

  test("Fractional amount $150.75 should calculate correctly", () => {
    expect(calculateRewardPoints(150.75)).toBe(151);
  });

  test("Fractional amount $49.99 should calculate correctly", () => {
    expect(calculateRewardPoints(49.99)).toBe(0);
  });
});
