import { app } from "./app";
import { nodeEnv, port } from "./constants/env";
import { connectToDatabase } from "./config/db";

app.listen(port, async () => {
  console.log(`App is running at port ${port} in the ${nodeEnv} environment`);
  await connectToDatabase();
});
