import "./server/loadEnvironments.js";
import createDebug from "debug";
import chalk from "chalk";
import connectToDatabase from "./connectToDatabase.js";
import app from "./server/index.js";

const debug = createDebug("user-pirates-api:root");

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGO_DB_CONNECTION;

if (!mongoDbConnection) {
  debug(chalk.red("Missing the environment variables!"));
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.green(`Listening on http://localhost:${port}`));
});

try {
  await connectToDatabase(mongoDbConnection);
  debug(chalk.green("Connection to the database succesful"));
} catch {
  debug(chalk.red("Error while connecting to the database"));
}
