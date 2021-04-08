const env = process.env;

const config = {
    db: {
        host: env.DB_HOST || "localhost",
        user: env.DB_USER || "localuser",
        password: env.DB_PASSWORD || "123456",
        database: env.DB_NAME || "TodoTask",
    },
    listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
