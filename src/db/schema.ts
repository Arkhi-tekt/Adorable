import {
  pgTable,
  text,
  timestamp,
  uuid,
  json,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { InferSelectModel, relations, sql } from "drizzle-orm";

import type { UIMessage } from "ai";

export const db = drizzle(process.env.DATABASE_URL!);


export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  // other user fields can be added here
});

export const appsTable = pgTable("apps", {
  id: uuid("id").primaryKey().defaultRandom(), // Changed from serial to match relations
  name: text("name").notNull().unique().default("Unnamed App"),
  description: text("description"),
  gitRepo: text("git_repo").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  baseId: text("base_id").notNull().default("nextjs-dkjfgdf"),
  previewDomain: text("preview_domain").unique(),
  isActive: boolean("is_active").default(true),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const appPermissions = pgEnum("app_user_permission", [
  "read",
  "write",
  "admin",
]);

export const appUsers = pgTable("app_users", {
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }), // This is referenced in appsTable
  appId: uuid("app_id")
    .notNull()
    .references(() => appsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  permissions: appPermissions("permissions"),
  freestyleIdentity: text("freestyle_identity").notNull(),
  freestyleAccessToken: text("freestyle_access_token").notNull(),
  freestyleAccessTokenId: text("freestyle_access_token_id").notNull(),
});

export const messagesTable = pgTable("messages", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  appId: uuid("app_id")
    .notNull()
    .references(() => appsTable.id),
  message: json("message").notNull().$type<UIMessage>(),
});

export const appDeployments = pgTable("app_deployments", {
  appId: uuid("app_id")
    .notNull()
    .references(() => appsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  deploymentId: text("deployment_id").notNull(),
  commit: text("commit").notNull(), // sha of the commit
});

// Export the types that app-header.tsx needs
export type App = InferSelectModel<typeof appsTable>;
export type NewApp = InferSelectModel<typeof appsTable, "insert">;

// Optional: Add relations if other tables reference app
export const appRelations = relations(appsTable, ({ many }) => ({
  // Example: linking to appUsers
  users: many(appUsers),
}));
