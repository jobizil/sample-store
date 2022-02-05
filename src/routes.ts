import { createUserSchema } from "./schema/user.schema";
import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import {
	createUserSessionHandler,
	deleteSessionHandler,
	getUserSessionsHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import {
	createProductHandler,
	updateProductHandler,
	getProductHandler,
	deleteProductHandler,
} from "./controller/product.controller";

import {
	getProductSchema,
	updateProductSchema,
	createProductSchema,
	deleteProductSchema,
} from "./schema/product.schema";

export default function (app: Express) {
	app.get("/health-check", (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	app.post("/api/users", validate(createUserSchema), createUserHandler);
	app.post("/api/session", validate(createSessionSchema), createUserSessionHandler);

	app.get("/api/session", requireUser, getUserSessionsHandler);
	app.delete("/api/session", requireUser, deleteSessionHandler);

	app.post("/api/products", [requireUser, validate(createProductSchema)], createProductHandler);
	app.put("/api/products/:productId", [requireUser, validate(updateProductSchema)], updateProductHandler);
	app.get("/api/products/:productId", validate(getProductSchema), getProductHandler);
	app.delete("/api/products/:productId", [requireUser, validate(deleteProductSchema)], deleteProductHandler);
}
