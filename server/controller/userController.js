import { con } from "../config/db.js";
import { users } from "../modals/user.modal.js";

export const auth = async (req, res, next) => {
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
        con.sync().then(async () => {
          await users
            .findAll()
            .then((results) => {
              res
                .status(200)
                .json({ msg: "Login Success", records: results.length });
            })
            .catch((error) => {
              res.status(404).json(error);
            });
        });
      } else {
        (err) => {
          res.status(401).json({ err: "Invalid Credentials!!!" });
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
