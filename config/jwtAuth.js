const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).send("Not Authozied  theres is no token");
    }
    try {
        const verify = jwt.verify(token, process.env.JWTSECRET);
        if (!verify) {
            return res.status(400).send("invalid token");
        } else {
            req.id = verify.id;
            next()
        }
    } catch (err) {
        res.status(404).json({ status: "error" });
    }
}