module.exports = {
    HOST: "localhost",
    USER: "localuser",
    PASSWORD: "123456",
    DB: "TodoTask",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
