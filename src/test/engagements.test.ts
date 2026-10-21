import { describe, expect, it } from "vitest";
import { engagements, formatPrice } from "@/components/site/data";

describe("Published engagement terms", () => {
  it.each([
    ["setup", 900, "~1 week", "$900"],
    ["readiness", 2500, "1–2 weeks", "$2,500"],
    ["evidence", 1500, "1–3 weeks", "$1,500"],
  ])("publishes the fixed price and duration for %s", (id, amount, duration, price) => {
    const engagement = engagements.find((e) => e.id === id);
    expect(engagement).toMatchObject({ amount, currency: "USD", duration, fixedScope: true, recurring: false });
    if (!engagement) throw new Error("Missing engagement");
    expect(formatPrice(engagement)).toBe(price);
  });
  it.each([["managed", 1200, "$1,200/month"], ["multi", 2200, "$2,200/month"]])("publishes the monthly price for %s", (id, amount, price) => {
    const engagement = engagements.find((e) => e.id === id);
    expect(engagement).toMatchObject({ amount, currency: "USD", recurring: true });
    if (!engagement) throw new Error("Missing engagement");
    expect(formatPrice(engagement)).toBe(price);
  });
  it.each(["managed", "multi"])("requires a three-month minimum for %s", (id) => {
    expect(engagements.find((e) => e.id === id)?.minimumMonths).toBe(3);
  });
});
