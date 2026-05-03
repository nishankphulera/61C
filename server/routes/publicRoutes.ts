import { Router } from "express";
import { getPublicContent } from "../controllers/contentController";
import { createContactSubmission } from "../controllers/contactController";
import { catchAsync } from "../lib/catchAsync";

const router = Router();

router.get("/content", catchAsync(getPublicContent));
router.post("/contact", catchAsync(createContactSubmission));

export default router;
