import Sequelize from "sequelize";

export const con = new Sequelize("project_db", "root", "Ak@260602", {
  host: "localhost",
  dialect: "mysql",
});

con
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((error) => {
    console.error("Connection failed!!!", error);
  });
