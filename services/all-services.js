const db = require("./database");
const helper = require("../helper");
const config = require("../config");

async function getAllTaskList(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`SELECT * FROM task_list`, [offset, config.listPerPage]);
    const data = helper.emptyOrRows(rows);
    const totalPageCount = { page };

    return {
        data,
        totalPageCount,
    };
}

module.exports = {
    getAllTaskList,
};
