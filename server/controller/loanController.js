import { con } from "../config/db.js";
import { banks } from "../models/bank.model.js";
import { loanDetails } from "../models/userLoan.model.js";

export const processor = async (req, res) => {
  try {
    let choice = req.body.choice;
    let userId = req.params.id;
    let duration = req.body.duration;
    con.sync().then(async () => {
      let selectedBank = await banks.findOne({
        where: {
          bankName: choice,
        },
      });
      //   console.log(selectedBank.bankName);
      if (selectedBank) {
        // let p = selectedBank.loanAmount;
        // let r = selectedBank.interestRate / 100 / 12;
        // let n = duration * 12;
        con.sync().then(async () => {
          await loanDetails
            .create({
              user_id: userId,
              bankName: selectedBank.bankName,
              interestRate: selectedBank.interestRate,
              sanctionAmount: selectedBank.loanAmount,
              disburseAmount: 0,
              remainingAmount: selectedBank.loanAmount,
              // emi: (p * r * ((1 + r) ^ n)) / ((1 + r) ^ (n - 1)),
              duration: duration,
            })
            .then((result) => {
              res.status(201).json({ result, status: "loan Sanctioned" });
            })
            .catch((error) => {
              res.status(400).json(error);
            });
        });
      } else {
        res.status(401).json({ Warning: "Enter Correct Bank Details" });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
