import prisma from "prisma";

export default async function Service() {
	let health;
	try {
		health = await prisma.health.findMany();
	} catch (err) {
		console.log(err);
	}

	if (!health) return <div>Database connection: false</div>;

	return <div>Database connection: {health[0].status.toString()}</div>;
}
