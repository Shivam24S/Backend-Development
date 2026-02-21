import express from "express";

import studentController from "../controller/studentController.js";

const router = express.Router();

router.post("/", studentController.add);

router.get("/allList", studentController.allStudent);

router.get("/:id", studentController.studentById);

router.delete("/:id", studentController.deleteStudent);

// router.patch("/:id", studentController.updateStudent);

router.patch("/:id",studentController.updateStudentData)

export default router;
