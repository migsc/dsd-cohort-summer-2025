import prisma from "prisma";

export default async function Service() {
	let health;
	try {
		health = await prisma.user.count();
	} catch (err) {
		console.log(err);
	}

	console.log(health);

	if (typeof health !== "number") return <div>Database connection: false</div>;

	return <div>Database connection: true</div>;
}
