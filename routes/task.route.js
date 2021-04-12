module.exports = (app) => {
    const tasksController = require("../controllers/task.controller.js");

    var router = require("express").Router();

    // Create a new Task
    router.post("/", tasksController.createTask);

    // Retrieve all Tasks
    router.get("/", tasksController.findAllTask);

    router.get("/sub-task", tasksController.findAllTaskItems);
    router.post("/sub-task", tasksController.createTaskItem);

    router.get("/task-detail", tasksController.findAllTaskDetails);
    router.post("/task-detail", tasksController.createTaskDetailItem);

    app.use("/api/tasks", router);
};
