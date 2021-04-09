module.exports = (app) => {
    const tasksController = require("../controllers/task.controller.js");

    var router = require("express").Router();

    // Create a new Task
    router.post("/", tasksController.create);

    // Retrieve all Tasks
    router.get("/", tasksController.findAll);

    router.get("/sub-task", tasksController.findAllSubTask);

    router.post("/sub-task", tasksController.createSubTask);

    app.use("/api/tasks", router);
};
