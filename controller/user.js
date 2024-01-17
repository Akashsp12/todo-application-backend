const user = require('../Schema/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postuser = async (req, res) => {
    const { email, password, provider } = req.body

    user.findOne({ email })
        .then(async (checkUserInDb) => {
            if (checkUserInDb) {
                res.send({ status: "user already present" });
            } else {
                const hash = bcrypt.hashSync(password, 10);
                const newUser = new user({
                    email,
                    password: hash,
                    provider
                })
                const addNewuser = await newUser.save()
                if (addNewuser) {
                    res.send({ status: "Account Created", redirect: "/sign-in" });
                } else {
                    res.send({ status: "404", result: "something error" })
                }

            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });

}

exports.login = (req, res) => {
    const { email, password } = req.body
    user.findOne({ email })
        .then(async (user) => {
            if (user) {
                const checkPassword = bcrypt.compareSync(password, user.password);
                if (checkPassword) {
                    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET)

                    res.send({ jwttoken: token, redirect: "/home" })
                } else {
                    res.send({ status: "incorrect Password" })
                }
            } else {
                res.send({ status: "signup to Create Account" })
            }

        })
        .catch((error) => {
            console.error("Error:", error);
        });

}