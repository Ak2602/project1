import { con } from "../config/db.js";
import { loanDetails } from "../modals/userLoan.modal.js";

export const openLoan = async (req, res) => {
  try {
    let disburse = req.body.withdraw;
    let userId = req.params.id;
    con.sync().then(async () => {
      let user = await loanDetails.findOne({
        where: { user_id: userId },
      });
      //   console.log(user);
      if (user.sanctionAmount > disburse && user.remainingAmount > disburse) {
        con.sync().then(() => {
          loanDetails
            .update(
              {
                disburseAmount: user.disburseAmount + disburse,
                remainingAmount: user.remainingAmount - disburse,
                status: "OPEN",
              },
              {
                where: {
                  user_id: userId,
                },
              }
            )
            .then(async () => {
              con.sync().then(async () => {
                let details = await loanDetails.findAll({
                  attributes: [
                    "user_id",
                    "bankName",
                    "interestRate",
                    "sanctionAmount",
                    "disburseAmount",
                    "remainingAmount",
                    "status",
                  ],
                  where: {
                    user_id: userId,
                  },
                });
                if (details) {
                  res.status(200).json(details);
                }
              });
            })
            .catch((error) => {
              res.status(404).json(error);
            });
        });
      } else if (user.remainingAmount == disburse) {
        con.sync().then(() => {
          loanDetails
            .update(
              {
                disburseAmount: user.disburseAmount + disburse,
                remainingAmount: user.remainingAmount - disburse,
                status: "closed",
              },
              {
                where: {
                  user_id: userId,
                },
              }
            )
            .then(async () => {
              con.sync().then(async () => {
                let details = await loanDetails.findAll({
                  attributes: [
                    "user_id",
                    "bankName",
                    "interestRate",
                    "sanctionAmount",
                    "disburseAmount",
                    "remainingAmount",
                    "status",
                  ],
                  where: {
                    user_id: userId,
                  },
                });
                if (details) {
                  res.status(200).json(details);
                }
              });
            })
            .catch((error) => {
              res.status(404).json(error);
            });
        });
      } else if (user.remainingAmount < disburse) {
        res.status(422).json("Invalid Amount!");
      }
    });
  } catch {}
};
