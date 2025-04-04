import express from "express";

import {
	addNewReservation,
	deleteReservationById,
	getReservationById,
	getReservations,
	updateReservationById,
} from "../reservationsRouters.js";

const reservationsRouter = express.Router();

reservationsRouter.get("/", getReservations);
reservationsRouter.post("/", addNewReservation);
reservationsRouter.get("/:id", getReservationById);
reservationsRouter.put("/:id", updateReservationById);
reservationsRouter.delete("/:id", deleteReservationById);

export default reservationsRouter;
