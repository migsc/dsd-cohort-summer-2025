import prisma from "prisma";

export default async function Service() {
  let count;
  try {
    count = await prisma.user.count();
  } catch (err) {
    console.log(err);
  }

  if (typeof count !== "number") return <div>Database connection: false</div>;

  return <div>Database connection: true</div>;
}
