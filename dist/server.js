"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var legendary_books_1 = __importDefault(require("./handlers/legendary_books"));
var orders_1 = __importDefault(require("./handlers/orders"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
app.use(express_1["default"].urlencoded({ extended: false }));
app.use(express_1["default"].json());
app.get('/', function (req, res) {
    res.send("Hello World, I'm a Postgres Database of Legendary_fighting_books!");
});
(0, legendary_books_1["default"])(app);
(0, orders_1["default"])(app);
(0, products_1["default"])(app);
(0, users_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: localhost: " + address);
});
