"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authUserId = exports.authToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var authToken = function (req, res, next) {
    try {
        var authHead = req.headers.authorization;
        var token = authHead.split(" ")[1];
        var decoded = jsonwebtoken_1["default"].verify(token, "" + process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json("Not authorized: " + err);
        return;
    }
};
exports.authToken = authToken;
var authUserId = function (req, res, next) {
    try {
        var authHead = req.headers.authorization;
        var token = authHead.split(" ")[1];
        var decoded = jsonwebtoken_1["default"].verify(token, "" + process.env.TOKEN_SECRET);
        var id = decoded.user.id;
        if (id !== parseInt(req.params.id)) {
            throw new Error("ID is invalid");
        }
        next();
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
};
exports.authUserId = authUserId;
