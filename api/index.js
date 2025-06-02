import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nestedRouter from "./src/routers/nested.js";
import mealsRouter from "./src/routers/meals.js";
import reservationsRouter from "./src/routers/reservations.js";
import reviewsRouter from "./src/routers/review.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.use("/meals", mealsRouter);
apiRouter.use("/reservations", reservationsRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
	console.log(`API listening on port ${process.env.PORT}`);
});
