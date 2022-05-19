"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailRoutes = (0, express_1.Router)();
var nodemailer = require('nodemailer');
emailRoutes.post('/send', (req, res) => {
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'pretty.lua.dev@gmail.com',
            pass: 'ClaseRuiz2022',
        },
        secure: true,
    });
    const { to, subject, text } = req.body;
    const mailData = {
        from: 'pretty.lua.dev@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: '<b>Hey There! estamos mas cerca de recibirnos jaja</b>' //,
        //     attachments:[
        //         {
        //             filename:'nodemailer.png',
        //             path:'nodemailer.png'
        //         },
        //          {
        //             filename:'nodemailer.png',
        //             path:'nodemailer.png'
        //         }
        //        ]
    };
    transporter.sendMail(mailData, function (error, info) {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "mail send", message_id: info.messageId });
    });
});
exports.default = emailRoutes;
