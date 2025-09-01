import "dotenv/config";
import { DataSource } from "typeorm";
import { Quote } from "./quote/entities/quote.entity";
import { User } from "./user/entities/user.entity";



export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // always enable for Neon
  synchronize: false,
  logging: true,
  entities: [Quote, User],
  migrations: ["src/migrations/*.ts"],
});


