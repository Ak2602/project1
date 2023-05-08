import { con } from "../config/db.js";
import { users } from "../modals/user.modal.js";
import { loanDetails } from "../modals/userLoan.modal.js";

export const auth = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    con.sync().then(async () => {
      let user = await users.findOne({
        where: {
          email: email,
          password: password,
        },
      });
      if (user) {
        var registerUser = Number(true);
        con.sync().then(async () => {
          let overallCount = await loanDetails.findOne({
            where: {
              user_id: user.id,
            },
          });
          if (overallCount) {
            let amountDisbursed = overallCount.disbursedAmount;
            let status = overallCount.status;
            if (status == "OPEN") {
              var countOpen_loan = Number(true);
              var countClosed_loan = Number(false);
            } else {
              countOpen_loan = Number(false);
              countClosed_loan = Number(false);
            }
            if (status == "closed") {
              countClosed_loan = Number(true);
            }
            if (amountDisbursed != 0) {
              var countLoan_processing = Number(true);
            } else {
              countLoan_processing = Number(false);
            }
            if (overallCount) {
              var countBank_selection = Number(true);
            } else {
              countBank_selection = Number(false);
            }
            res.status(200).json({
              "User Generation": registerUser,
              "Bank Selection": countBank_selection,
              "Loan Processing": countLoan_processing,
              "Open Loan": countOpen_loan,
              "Closed Loan": countClosed_loan,
            });
          } else {
            res.status(200).json({
              "User Generation": registerUser,
              "Bank Selection": Number(false),
              "Loan Processing": Number(false),
              "Open Loan": Number(false),
              "Closed Loan": Number(false),
            });
          }
        });
      } else {
        (err) => {
          res.status(401).json({ err, err: "Invalid Credentials!!!" });
        };
      }
    });
  } catch (err) {
    response.status(500).json(err);
  }
};

export const register = async (req, res) => {
  try {
    let fname = req.body.firstName;
    let lname = req.body.lastName;
    let contact = req.body.contact;
    let email = req.body.email;
    let password = req.body.password;
    con.sync().then(async () => {
      await users
        .create({
          firstName: fname,
          lastName: lname,
          contact: contact,
          email: email,
          password: password,
        })
        .then((msg) => {
          res
            .status(201)
            .json({ msg, status: "user registered successfully!" });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    });
  } catch {
    response.status(500).json(err);
  }
};
