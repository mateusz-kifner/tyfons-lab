import Link from "next/link";

import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import { lucia, validateRequest } from "@tyfons-lab/auth";
import { type ActionResult, Form } from "../_form";
import { db } from "@tyfons-lab/db";
import { schema } from "@tyfons-lab/db";

export default async function Page() {
	const { user } = await validateRequest();
	if (user) {
		return redirect("/");
	}
	return (
		<>
			<h1>Create an account</h1>
			<Form action={signup}>
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<button type="submit">Continue</button>
			</Form>
			<Link href="/login">Sign in</Link>
		</>
	);
}

async function signup(_: any, formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Invalid password"
		};
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);

	try {
		console.log("try")
        const a = await db.insert(schema.users).values({
            id:userId,
            username,
            password:hashedPassword
        }).returning()

		console.log(a)

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	} catch (e) {
        console.log(e)
		// if (e instanceof  && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
		// 	return {
		// 		error: "Username already used"
		// 	};
		// }
		return {
			error: "An unknown error occurred"
		};
	}
	return redirect("/");
}
