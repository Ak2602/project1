import { con } from "../config/db.js";
import { users } from "../models/user.model.js";
import { loanDetails } from "../models/userLoan.model.js";

export const auth = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    con.sync().then(async () => {
      let user = await users.findOne({
        where: {
          email: email,
        },
      });
      // console.log(user);
      if (user.email == email && user.password == password) {
        res.status(200).json({ status: "User Log in Success" });
      } else {
        res.status(401).json({ warning: "Invalid Credentials!!!" });
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
