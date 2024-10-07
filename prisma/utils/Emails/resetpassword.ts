// here we will create a reuseable function to handle sending email
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { create } from "express-handlebars";

export const ResetPasswordEmail = (
  name: string,
  link: string,
  email: string
) => {
  console.log("entered");
  console.log(email);
  // create a transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "austinedavid96@gmail.com",
      pass: process.env.Gmailpassword,
    },
  });
  // create express-handlebars instance
  const hbsEngine = create({
    extname: ".hbs", // Set the file extension for your templates
    defaultLayout: false, // You can specify a layout if needed
  });
  // handlebars option
  const handlebarOptions = {
    viewEngine: hbsEngine, // Pass the express-handlebars instance here
    viewPath: "views", // Path to your email templates
    extName: ".hbs", // Optional, to specify the file extension
  };
  //   lets use our handlebars as the rendering templates
  transporter.use("compile", hbs(handlebarOptions));
  //   create the neccessay email to recieve the message and also the context for our templates
  const messageObject = {
    from: "austinedavid96@gmail.com", // sender address
    to: email, // list of receivers
    subject: "SchooledAfrika Password Reset", // Subject line
    template: "resetpassword",
    context: {
      name,
      link,
    },
  };
  //   now we can send the message here
  transporter.sendMail(messageObject, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info);
  });
};
