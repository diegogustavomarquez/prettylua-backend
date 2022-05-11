import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';

const emailRoutes = Router();
var nodemailer = require('nodemailer');

emailRoutes.post('/send', ( req: any, res: Response ) => {
const transporter = nodemailer.createTransport({
port: 465,               // true for 465, false for other ports
host: "smtp.gmail.com",
   auth: {
        user: 'pretty.lua.dev@gmail.com',
        pass: 'ClaseRuiz2022',
     },
secure: true,
});
    const {to,subject,text} = req.body;
    const mailData = {
    from: 'pretty.lua.dev@gmail.com',
    to: to,
    subject: subject,
    text: text,
    html:'<b>Hey There! estamos mas cerca de recibirnos jaja</b>'//,
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
    transporter.sendMail(mailData, function (error:any, info:any) {
       if(error) {
        return console.log(error);
       }
         res.status(200).send({message:"mail send", message_id: info.messageId})
    });

});



export default emailRoutes;