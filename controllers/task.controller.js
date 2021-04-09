const db = require("../models");
const task_model = db.tasks_module.task_list;
const sub_task_detail = db.tasks_module.sub_task_detail;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
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
exports.findAll = (req, res) => {
    var condition = { isActive: 1 };

    task_model
        .findAll({
            where: condition,
            include: {
                model: sub_task_detail,
                as: "subTaskDetails",
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

exports.createSubTask = (req, res) => {
    if (!req.body.taskTitle || !req.body.taskIsCompleted || !req.body.taskId) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    const subTaskDetails = {
        taskTitle: req.body.taskTitle,
        taskIsCompleted: req.body.taskIsCompleted,
        taskId: req.body.taskId,
    };

    sub_task_detail
        .create(subTaskDetails)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Task.",
            });
        });
};

exports.findAllSubTask = (req, res) => {
    var condition = { isActive: 1 };

    sub_task_detail
        .findAll({ where: condition })
        .then((data) => {
            res.send({ data });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tasks.",
            });
        });
};
