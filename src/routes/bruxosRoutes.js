import express from "express";
import { getAllBruxos, getBruxosById, createBruxo, deleteBruxo, updateBruxo } from "../controllers/bruxosControllers.js";

const router = express.Router();
router.get("/", getAllBruxos);
router.get("/:id", getBruxosById);
router.post("/", createBruxo);
router.delete("/:id", deleteBruxo);
router.put("/:id", updateBruxo);

export default router;