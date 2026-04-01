"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentController_1 = require("../controllers/contentController");
const adminAuth_1 = require("../middleware/adminAuth");
const router = (0, express_1.Router)();
router.post("/login", (req, res) => {
    const username = String(req.body?.username || "");
    const password = String(req.body?.password || "");
    if (!(0, adminAuth_1.validateAdminCredentials)(username, password)) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    res.json({
        token: (0, adminAuth_1.issueAdminToken)(),
        username: process.env.ADMIN_USERNAME || "admin",
    });
});
router.use(adminAuth_1.requireAdminAuth);
router.get("/content", contentController_1.getAdminContent);
router.post("/content", contentController_1.createContent);
router.get("/content/:id", contentController_1.getAdminContentById);
router.patch("/content/:id", contentController_1.updateContent);
router.delete("/content/:id", contentController_1.deleteContent);
exports.default = router;
