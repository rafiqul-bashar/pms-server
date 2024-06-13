import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: Bun.env.NODEMAILER_EMAIL,
    pass: Bun.env.NODEMAILER_PASSWORD,
  },
});
export const sendEmail = async (to: string, subject: string, text: any) => {
  const mailOptions = {
    from: "PMS SERVICE",
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
