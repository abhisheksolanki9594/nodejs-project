module.exports = (sequelize, Sequelize) => {
    const task_list = sequelize.define("task_lists", {
        taskId: {
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

    const sub_task_detail = sequelize.define("sub_task_details", {
        subTaskId: {
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
        // taskId: {
        //     type: Sequelize.INTEGER,
        //     references: {
        //         model: task_list,
        //         key: "taskId",
        //         deferrable: Sequelize.INITIALLY_IMMEDIATE,
        //     },
        // },
    });

    // task_list.hasMany(sub_task_detail);
    sub_task_detail.belongsTo(task_list, { targetKey: "taskId", foreignKey: "taskId" });

    return { task_list, sub_task_detail };
};
