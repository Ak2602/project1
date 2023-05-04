import { banks } from "../modals/bank.modal.js";
import { con } from "../config/db.js";

export const selection = async (req, res) => {
  try {
    let type = req.body.employment;
    let salary = req.body.salary;
    con.sync().then(() => {
      banks
        .update(
          {
            loanAmount: salary * 15,
          },
          {
            where: {
              employment: type,
            },
          }
        )
        .then(async () => {
          con.sync().then(async () => {
            let bank = await banks.findAll({
              attributes: ["bankName", "interestRate", "loanAmount"],
              where: {
                updatedAt: Date(),
              },
            });
            if (bank) {
              res.status(200).json(bank);
            }
          });
        })
        .catch((error) => {
          res.status(404).json(error);
        });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
