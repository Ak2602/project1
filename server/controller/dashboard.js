import { con } from "../config/db.js";
import { users } from "../models/user.model.js";
import { loanDetails } from "../models/userLoan.model.js";

export const dashboard = async (req, res) => {
  try {
    let userID = req.params.id;

    con.sync().then(async () => {
      let user = await users.findOne({
        where: {
          id: userID,
        },
      });
      if (user) {
        con.sync().then(async () => {
          await users.findAll().then((results) => {
            var user_record = results.length;
            // console.log(user_record);

            var registerUser = Number(true);
            con.sync().then(async () => {
              let userCount = await loanDetails.findOne({
                where: {
                  user_id: user.id,
                },
              });
              if (userCount) {
                if (userCount && userCount.remainingAmount == 0) {
                  var countBank_selection = Number(false);
                } else {
                  countBank_selection = Number(true);
                }

                if (
                  userCount.disburseAmount != 0 &&
                  userCount.remainingAmount != 0
                ) {
                  var countLoan_processing = Number(true);
                } else {
                  countLoan_processing = Number(false);
                }

                if (
                  userCount.disburseAmount == 0 ||
                  userCount.disburseAmount == userCount.sanctionAmount
                ) {
                  var countOpen_loan = Number(false);
                } else {
                  countOpen_loan = Number(true);
                }

                if (userCount.remainingAmount == 0) {
                  var countClosed_loan = Number(true);
                } else {
                  countClosed_loan = Number(false);
                }

                res.status(200).json({
                  "User Records": user_record,
                  "User Generation": registerUser,
                  "Bank Selection": countBank_selection,
                  "Loan Processing": countLoan_processing,
                  "Open Loan": countOpen_loan,
                  "Closed Loan": countClosed_loan,
                });
              } else {
                res.status(200).json({
                  "User Records": user_record,
                  "User Generation": registerUser,
                  "Bank Selection": Number(false),
                  "Loan Processing": Number(false),
                  "Open Loan": Number(false),
                  "Closed Loan": Number(false),
                });
              }
            });
          });
        });
      } else {
        (err) => {
          res.status(404).json({ Warning: err });
        };
      }
    });
  } catch (err) {
    response.status(500).json(err);
  }
};
