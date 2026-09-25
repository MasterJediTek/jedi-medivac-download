import { afterEach, describe, expect, it } from "vitest";
import { createPremiumCheckout, PREMIUM_PRICE_ID, PREMIUM_UPGRADE_SKU } from "./stripe";

const originalSecret = process.env.STRIPE_SECRET_KEY;

afterEach(() => {
  if (originalSecret === undefined) delete process.env.STRIPE_SECRET_KEY;
  else process.env.STRIPE_SECRET_KEY = originalSecret;
});

describe("Stripe optional upgrade", () => {
  it("uses the published test-mode premium price and SKU", () => {
    expect(PREMIUM_UPGRADE_SKU).toBe("jedi-hub-premium-upgrade");
    expect(PREMIUM_PRICE_ID).toMatch(/^price_/);
  });

  it("fails closed when the server secret is unavailable", async () => {
    delete process.env.STRIPE_SECRET_KEY;
    await expect(createPremiumCheckout({
      userId: 1,
      email: "member@example.com",
      name: "Member",
      origin: "https://example.com",
    })).rejects.toThrow("Stripe is not configured");
  });
});
