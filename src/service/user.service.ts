import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument, UserInput } from "../models/user.model";
import { omit } from "lodash";
import { query } from "express";

export async function createUser(input: UserInput) {
	try {
		const user = await User.create(input);
		return omit(user.toJSON(), "password");
	} catch (error: any) {
		throw new Error(error);
	}
}

export async function validatePassword({ email, password }: { email: string; password: string }) {
	const user = await User.findOne({ email });
	if (!user) return false;

	const isValid = await user.comparePassword(password);
	if (!isValid) return false;
	return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
	return User.findOne(query).lean();
}
