import express, { type Express, type Request, type Response } from "express";
import Stripe from "stripe";
import { saveEntitlement } from "./db";

export const PREMIUM_UPGRADE_SKU = "jedi-hub-premium-upgrade";
export const PREMIUM_PRICE_ID = "price_1UIEVZElLN3sNAz7Hrhgeoja";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured. Add the Stripe connector in Settings → Payment.");
  return new Stripe(key);
}

export async function createPremiumCheckout(input: {
  userId: number;
  email: string;
  name?: string | null;
  origin: string;
}) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: PREMIUM_PRICE_ID, quantity: 1 }],
    customer_email: input.email,
    client_reference_id: String(input.userId),
    allow_promotion_codes: true,
    success_url: `${input.origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.origin}/?checkout=cancelled`,
    metadata: {
      user_id: String(input.userId),
      customer_email: input.email,
      customer_name: input.name ?? "",
      sku: PREMIUM_UPGRADE_SKU,
      track: "optional-paid",
    },
  });

  if (!session.url) throw new Error("Stripe did not return a Checkout URL");
  return { id: session.id, url: session.url };
}

export function registerStripeRoutes(app: Express) {
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret || typeof signature !== "string") {
      return res.status(400).json({ error: "Stripe webhook is not configured" });
    }

    let event: Stripe.Event;
    try {
      event = getStripe().webhooks.constructEvent(req.body, signature, secret);
    } catch (error) {
      console.error("[Stripe webhook] Signature verification failed", error);
      return res.status(400).json({ error: "Invalid Stripe signature" });
    }

    if (event.id.startsWith("evt_test_")) {
      console.log("[Stripe webhook] Test event detected, returning verification response");
      return res.json({ verified: true });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = Number(session.metadata?.user_id ?? session.client_reference_id);
      const sku = session.metadata?.sku ?? PREMIUM_UPGRADE_SKU;
      const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : null;
      if (Number.isInteger(userId) && userId > 0 && session.id) {
        await saveEntitlement({
          userId,
          sku,
          stripeCheckoutSessionId: session.id,
          stripePaymentIntentId: paymentIntentId,
        });
        console.log(`[Stripe webhook] Fulfilled ${sku} for user ${userId}`);
      }
    }

    console.log(`[Stripe webhook] Processed ${event.type} ${event.id}`);
    return res.json({ received: true });
  });
}
