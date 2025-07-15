import "dotenv/config";
import path from "node:path";

export default {
  earlyAccess: true,
  schema: path.join("prisma", "schema"),
};
