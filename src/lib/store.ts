import "server-only";
import { promises as fs } from "fs";
import path from "path";
import os from "os";
import type { FeatureKey } from "@/config/features";
import type { PotluckSignup } from "@/lib/types";
import { seedPotluckSignups } from "@/data/potluck";

/**
 * A deliberately tiny JSON-file persistence layer.
 *
 * It exists so the site is *actually functional* (potluck sign-ups persist,
 * the potluck feature can be toggled at runtime) without requiring a database
 * to be provisioned for local development.
 *
 * Swapping this for Supabase/Postgres later means re-implementing these few
 * async functions — the rest of the app only ever calls them, never touches
 * the file directly.
 *
 * NOTE: On serverless platforms (e.g. Vercel) the filesystem is ephemeral, so
 * writes will not persist across deploys or instances. For production, replace
 * this module with a real database. See README → "Data & persistence".
 */

type StoreShape = {
  featureOverrides: Partial<Record<FeatureKey, boolean>>;
  potluckSignups: PotluckSignup[];
};

const DATA_DIR =
  process.env.DATA_DIR ??
  (process.env.VERCEL ? path.join(os.tmpdir(), "alphasig-data") : path.join(process.cwd(), ".data"));
const STORE_PATH = path.join(DATA_DIR, "store.json");

function defaultStore(): StoreShape {
  return {
    featureOverrides: {},
    // Seed with sample sign-ups so the potluck page looks complete in dev.
    potluckSignups: [...seedPotluckSignups],
  };
}

async function readStore(): Promise<StoreShape> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<StoreShape>;
    return {
      featureOverrides: parsed.featureOverrides ?? {},
      potluckSignups: parsed.potluckSignups ?? [],
    };
  } catch {
    // File missing/corrupt → materialize defaults on first write.
    const initial = defaultStore();
    await writeStore(initial).catch(() => {
      /* best-effort seeding; ignore write failures on read-only FS */
    });
    return initial;
  }
}

async function writeStore(data: StoreShape): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
}

/* ------------------------------- Features -------------------------------- */

export async function getFeatureOverrides(): Promise<Partial<Record<FeatureKey, boolean>>> {
  const store = await readStore();
  return store.featureOverrides;
}

export async function setFeatureOverride(key: FeatureKey, value: boolean): Promise<void> {
  const store = await readStore();
  store.featureOverrides = { ...store.featureOverrides, [key]: value };
  await writeStore(store);
}

/* ------------------------------- Potluck --------------------------------- */

export async function getPotluckSignups(): Promise<PotluckSignup[]> {
  const store = await readStore();
  return [...store.potluckSignups].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
}

export async function addPotluckSignup(signup: PotluckSignup): Promise<void> {
  const store = await readStore();
  store.potluckSignups.push(signup);
  await writeStore(store);
}

export async function deletePotluckSignup(id: string): Promise<void> {
  const store = await readStore();
  store.potluckSignups = store.potluckSignups.filter((s) => s.id !== id);
  await writeStore(store);
}
