import express from "express";
import {
  getTrendingTvshow,
  getTvshowTrailers,
  getTvshowDetails,
  getSimilarTvshow,
  getTvshowByCategory,
} from "../controllers/tvshowController.js";

const router = express.Router();

router.get("/trending", getTrendingTvshow);
router.get("/:id/trailers", getTvshowTrailers);
router.get("/:id/details", getTvshowDetails);
router.get("/:id/similar", getSimilarTvshow);
router.get("/:category", getTvshowByCategory);

export default router;
