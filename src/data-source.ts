import { DataSource } from "typeorm";
import { Quote } from "./quote/entities/quote.entity";
import { User } from "./user/entities/user.entity";

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // ✅ required for Neon
  synchronize: false, // use migrations in prod
  logging: true,
  entities: [Quote, User],
  migrations: ["dist/migrations/*.js"], // ✅ note: built files, not src
});
