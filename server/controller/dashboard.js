import { Op } from "sequelize";
import { con } from "../config/db.js";
import { users } from "../models/user.model.js";
import { loanDetails } from "../models/userLoan.model.js";

export const dashboard = async (req, res) => {
  try {
    con.sync().then(async () => {
      let user_record = await users.findAll({ raw: true });

      let user_register = await users.findAll({
        attributes: ["id"],
        raw: true,
      });
      //   console.log(user_register);
      let user_selected = await loanDetails.findAll({
        attributes: ["id"],
        raw: true,
      });
      //   console.log(user_selected);

      let user_generation = user_register.length - user_selected.length;

      let countBank_selection = await loanDetails.findAll({
        where: { disburseAmount: 0 },
        raw: true,
      });
      //   console.log(countBank_selection.length);

      let countLoan_processing = await loanDetails.findAll({
        where: {
          disburseAmount: { [Op.gt]: 0 },
          remainingAmount: { [Op.gt]: 0 },
        },
        raw: true,
      });
      //   console.log(countLoan_processing.length);

      let countOpen_loan = await loanDetails.findAll({
        where: { status: "OPEN" },
        raw: true,
      });
      //   console.log(countOpen_loan.length);

      let countClosed_loan = await loanDetails.findAll({
        where: { status: "closed" },
        raw: true,
      });
      //   console.log(countClosed_loan.length);

      res.status(200).json({
        "Total Users": user_record.length,
        "User Generation": user_generation,
        "Bank Selection": countBank_selection.length,
        "Loan Processing": countLoan_processing.length,
        "Open Loan": countOpen_loan.length,
        "Closed Loan": countClosed_loan.length,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
