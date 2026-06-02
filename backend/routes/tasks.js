const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// get all tasks for the logged in user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting tasks" });
  }
});

// add a new task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      title: title,
      description: description,
      userId: req.userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding task" });
  }
});

// update a task (mark complete / not complete)
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = req.body.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating task" });
  }
});

// delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;
