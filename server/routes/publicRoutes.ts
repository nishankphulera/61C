import { Router } from "express";
import { getPublicContent } from "../controllers/contentController";

const router = Router();

router.get("/content", getPublicContent);

export default router;
