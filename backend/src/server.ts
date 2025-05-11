import { app } from "./app";
import "dotenv/config";

const port = process.env.PORT! || 5000;
const environment = process.env.NODE_ENV!;

app.listen(port, () => {
  console.log(
    `App is running at port ${port} in the ${environment} environment`
  );
});
