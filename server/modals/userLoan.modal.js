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
  loanAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  emi: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
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
