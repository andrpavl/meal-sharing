import express from "express";

import {
	addNewReservation,
	deleteReservation,
	getReservationById,
	getReservations,
	updateReservationById,
} from "../reservationsRouters.js";

const reservationsRouter = express.Router();

reservationsRouter.get("/", getReservations);
reservationsRouter.post("/", addNewReservation);
reservationsRouter.get("/:id", getReservationById);
reservationsRouter.put("/:id", updateReservationById);
reservationsRouter.delete("/:id", deleteReservation);

export default reservationsRouter;
