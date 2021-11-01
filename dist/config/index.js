"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.FRONTEND_URL = exports.JWT_KEY = exports.PORT = exports.DB = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
exports.DB = process.env.DB;
exports.PORT = parseInt(process.env.PORT);
exports.JWT_KEY = process.env.JWT_KEY;
exports.FRONTEND_URL = process.env.FRONTEND_URL;
var testAccount = {
    user: "mupacauxp4mgw2mi@ethereal.email",
    pass: "eQVNHXGY9NFcWYzMWB",
};
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass, // generated ethereal password
    },
});
