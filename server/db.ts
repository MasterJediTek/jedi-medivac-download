import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertMarketplaceEntitlement, InsertUser, marketplaceEntitlements, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod", "stripeCustomerId"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0];
}

export async function getEntitlementsForUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(marketplaceEntitlements).where(eq(marketplaceEntitlements.userId, userId));
}

export async function hasEntitlement(userId: number, sku: string) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select({ id: marketplaceEntitlements.id }).from(marketplaceEntitlements).where(and(eq(marketplaceEntitlements.userId, userId), eq(marketplaceEntitlements.sku, sku))).limit(1);
  return result.length > 0;
}

export async function saveEntitlement(entitlement: InsertMarketplaceEntitlement) {
  const db = await getDb();
  if (!db) return;
  await db.insert(marketplaceEntitlements).values(entitlement).onDuplicateKeyUpdate({ set: { stripePaymentIntentId: entitlement.stripePaymentIntentId ?? null } });
}
