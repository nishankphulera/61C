import { Router } from "express";
import {
  createContent,
  deleteContent,
  getAdminContent,
  getAdminContentById,
  updateContent,
} from "../controllers/contentController";
import { getAdminContactSubmissions } from "../controllers/contactController";
import { catchAsync } from "../lib/catchAsync";
import { issueAdminToken, requireAdminAuth, validateAdminCredentials } from "../middleware/adminAuth";

const router = Router();

router.post("/login", (req, res) => {
  const username = String(req.body?.username || "");
  const password = String(req.body?.password || "");

  if (!validateAdminCredentials(username, password)) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  res.json({
    token: issueAdminToken(),
    username: process.env.ADMIN_USERNAME || "admin",
  });
});

router.use(requireAdminAuth);

router.get("/contact-submissions", catchAsync(getAdminContactSubmissions));
router.get("/content", catchAsync(getAdminContent));
router.post("/content", catchAsync(createContent));
router.get("/content/:id", catchAsync(getAdminContentById));
router.patch("/content/:id", catchAsync(updateContent));
router.delete("/content/:id", catchAsync(deleteContent));

export default router;
