import { DataSource } from "typeorm";
import { Quote } from "./quote/entities/quote.entity";
import { User } from "./user/entities/user.entity";

export default new DataSource ({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "SmShah@12345",
    database: "quotes",
    synchronize: false,
    logging: true,
    entities: [Quote, User],
    migrations: ["src/migrations/*.ts"],
})