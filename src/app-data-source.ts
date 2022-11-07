import { DataSource } from "typeorm"

const myDataSource = new DataSource({
    type: "oracle",
    host: "181.224.160.30",
    port: 3306,
    username: "reporteador",
    password: "reporteador",
    database: "UNIPA1N",
    logging: true,
    synchronize: true,
})

export default myDataSource;