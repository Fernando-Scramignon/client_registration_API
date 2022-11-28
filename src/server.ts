import "dotenv/config"
import { app } from "./app";

function startServer() {
    const port = process.env.PORT;
    app.listen(port, () => console.log(`The server is running on port ${port}`));
};

startServer();
