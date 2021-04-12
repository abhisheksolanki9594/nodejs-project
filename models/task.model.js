module.exports = (sequelize, Sequelize) => {
    const task = sequelize.define("tasks", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        taskDate: {
            type: Sequelize.DATE,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
        },
    });

    const task_items = sequelize.define("task_items", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        taskTitle: {
            type: Sequelize.STRING,
        },
        taskIsCompleted: {
            type: Sequelize.BOOLEAN,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
        },
        taskId: {
            type: Sequelize.INTEGER,
            references: {
                model: task,
                key: "id",
                deferrable: Sequelize.INITIALLY_IMMEDIATE,
            },
        },
    });

    task.hasMany(task_items, { as: "task_items", foreignKey: "taskId" });
    task_items.belongsTo(task, { foreignKey: "taskId" });

    const task_details = sequelize.define("task_details", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        taskDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        taskTitle: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        taskIsCompleted: {
            type: Sequelize.BOOLEAN,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
        },
    });

    return { task, task_items, task_details };
};
