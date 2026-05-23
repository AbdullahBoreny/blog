import { config } from "dotenv"
config({ path: ".env.local" })
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"

async function setPassword(userName: string, password: string) {
  const { db } = await import("./db")
  const { users } = await import("./db/schema")
  const hash = await bcrypt.hash(password, 10)
  await db
    .update(users)
    .set({ passwordHash: hash })
    .where(eq(users.userName, userName))
  console.log(`Password set for user: ${userName}`)
}

const userName = process.argv[2]
const password = process.argv[3]

if (!userName || !password) {
  console.log("Usage: npx tsx set-password.ts <userName> <password>")
  process.exit(1)
}

setPassword(userName, password).then(() => process.exit(0))