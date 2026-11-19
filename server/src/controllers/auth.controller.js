const auth = require("../services/auth.service");

async function login(req, res, next) {
    try {
        res.json(await auth.login(req.body));
    } catch (error) {
        next(error);
    }
}

async function registro(req, res, next) {
    try {
        res.status(201).json(await auth.registro(req.body));
    } catch (error) {
        next(error);
    }
}

module.exports = { login, registro };
