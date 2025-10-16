import { relations } from "drizzle-orm/relations";
import { apps, appUsers, messages, appDeployments } from "./schema";

export const appUsersRelations = relations(appUsers, ({one}) => ({
	app: one(apps, {
		fields: [appUsers.appId],
		references: [apps.id]
	}),
}));

export const appsRelations = relations(apps, ({many}) => ({
	appUsers: many(appUsers),
	messages: many(messages),
	appDeployments: many(appDeployments),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	app: one(apps, {
		fields: [messages.appId],
		references: [apps.id]
	}),
}));

export const appDeploymentsRelations = relations(appDeployments, ({one}) => ({
	app: one(apps, {
		fields: [appDeployments.appId],
		references: [apps.id]
	}),
}));