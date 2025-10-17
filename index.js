const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const sender = require("resend").Resend;
dotenv.config({ debug: true });
const port = process.env.PORT ?? 5000;
const user = process.env.USER;
const pass = process.env.PASS;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/api/contact", (req, res) => {
  const { firstname, lastname, email, number, message, subjectselect } =
    req.body;
  console.log("Received Data", {
    firstname,
    lastname,
    email,
    number,
    message,
    subjectselect,
  });

  async function main() {
    //   const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //      host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    //     auth: {
    //       user: user,
    //       pass: pass,
    //     },
    //   });
    //   const info = await transporter.sendMail({
    //     from: "Backend <nnejirichard992@gmail.com>",
    //     to: "nnejirichard@yahoo.com",
    //     subject: "Contact Form Details",
    //     html: `<p>Name: ${firstname} ${lastname}</p>
    //     <p>Email: ${email}</p>
    //     <p>Phone: ${number}</p>
    //     <p>Area of Interest: ${subjectselect}</p>
    //     <p>Message: ${message}</p>
    //     `,
    //   });
    const resend = new sender("resend key");

    let res = await resend.emails.send({
      from: "Backend <onboarding@resend.dev>",
      to: "nnejirichard@yahoo.com",
      subject: "Contact Form Details",
      html: `<div>
        <p>Name: ${firstname} ${lastname}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${number}</p>
        <p>Area of Interest: ${subjectselect}</p>
        <p>Message: ${message}</p>     
  </div>`,
    });
    console.log("Message sent", res);
  }

  main()
    .then(() => res.status(200).send("message sent"))
    .catch((error) => console.log(error));
});

app.listen(port, () => console.log(`App is listening on port: ${port}`));
