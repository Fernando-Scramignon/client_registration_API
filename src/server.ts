import "dotenv/config"

import { app } from "./app";
import { appDataSource } from "./data-source";

async function startServer() {
    await appDataSource.initialize()
        .then(() => console.log("Data source has been initialized"))
        .catch(() => console.error("Error during Data Source initialization"))

    const port = process.env.API_PORT;
    app.listen(port, () => console.log(`The server is running on port ${port}`));
};

startServer();
