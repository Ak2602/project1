import { con } from "../config/db.js";
import { DataTypes } from "sequelize";

export const banks = con.define("banks", {
  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interestRate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loanAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  employment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

con
  .sync()
  .then(() => {
    console.log("Table created successfully...");
  })
  .catch((error) => {
    console.log("Creation Failed", error);
  });
