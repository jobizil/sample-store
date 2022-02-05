import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// Create a TD Definition/ Interface

export interface UserInput {
	email: string;
	name: string;
	password: string;
}
export interface UserDocument extends UserInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

UserSchema.pre("save", async function (next) {
	let user = this as UserDocument;
	if (!user.isModified) return next();

	const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
	return next();
});

//Compare password against user's password
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
	const user = this as UserDocument;
	return bcrypt.compare(candidatePassword, user.password).catch((error) => false);
};
// export default mongoose.model<UserDocument>("User", UserSchema);
export default mongoose.model("User", UserSchema);
