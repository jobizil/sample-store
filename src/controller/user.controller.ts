import { omit } from "lodash";
import { CreateUserInput } from "./../schema/user.schema";
import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import { log } from "../utils/logger";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
	try {
		const user = await createUser(req.body); //Calls create user service
		return res.status(201).send(user);
	} catch (error: any) {
		log.error(error);
		return res.status(409).send(error.message);
	}
}
