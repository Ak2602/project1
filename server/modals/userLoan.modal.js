import { con } from "../config/db.js";
import { DataTypes } from "sequelize";

export const loanDetails = con.define("loanDetails", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interestRate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sanctionAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  disburseAmount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  remainingAmount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  emi: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
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
