const db = require("../models");
const task_model = db.tasks_module.task;
const task_items_model = db.tasks_module.task_items;
const task_details_model = db.tasks_module.task_details;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.createTask = (req, res) => {
    if (!req.body.taskDate || !req.body.isActive) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a Task
    const task = {
        taskDate: req.body.taskDate,
        isActive: req.body.isActive,
    };

    // Save Task in the database
    task_model
        .create(task)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Task.",
            });
        });
};

// Retrieve all Task from the database.
exports.findAllTask = (req, res) => {
    var condition = { isActive: 1 };

    task_model
        .findAll({
            where: condition,
            include: {
                model: task_items_model,
                as: "task_items",
                required: true,
            },
        })
        .then((data) => {
            res.send({ data });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tasks.",
            });
        });
};

// task_item
exports.createTaskItem = (req, res) => {
    if (!req.body.taskTitle || !req.body.taskIsCompleted || !req.body.taskId) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    const task_item = {
        taskTitle: req.body.taskTitle,
        taskIsCompleted: req.body.taskIsCompleted,
        isActive: req.body.isActive,
        taskId: req.body.taskId,
    };

    task_items_model
        .create(task_item)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Task Item.",
            });
        });
};

exports.findAllTaskItems = (req, res) => {
    var condition = { isActive: 1 };

    task_items_model
        .findAll({ where: condition })
        .then((data) => {
            res.send({ data });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving task items.",
            });
        });
};

exports.createTaskDetailItem = (req, res) => {
    if (!req.body.taskDate || !req.body.taskTitle) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    const all_task_item = {
        taskDate: req.body.taskDate,
        taskTitle: req.body.taskTitle,
        taskIsCompleted: req.body.taskIsCompleted,
        isActive: req.body.isActive,
    };

    task_details_model
        .create(all_task_item)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Task Item.",
            });
        });
};

exports.findAllTaskDetails = (req, res) => {
    var condition = { isActive: 1 };

    task_details_model
        .findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "id", "taskTitle", "taskIsCompleted", "isActive"],
                include: [
                    [
                        db.sequelize.literal(`(SELECT JSON_ARRAYAGG(JSON_OBJECT(
                            'taskId', details.id,
                            'taskDate', details.taskDate,
                            'taskTitle', details.taskTitle,
                            'taskIsCompleted', details.taskIsCompleted,
                            'isActive', details.isActive))
                        FROM task_details details
                        WHERE details.taskDate = task_details.taskDate)`),
                        "taskDetails",
                    ],
                ],
            },
            where: condition,
            group: "taskDate",
        })
        .then((data) => {
            res.send({ data });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving task items.",
            });
        });
};
