import { Router } from "express";
import {
  createContent,
  deleteContent,
  getAdminContent,
  getAdminContentById,
  updateContent,
} from "../controllers/contentController";
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

router.get("/content", getAdminContent);
router.post("/content", createContent);
router.get("/content/:id", getAdminContentById);
router.patch("/content/:id", updateContent);
router.delete("/content/:id", deleteContent);

export default router;
