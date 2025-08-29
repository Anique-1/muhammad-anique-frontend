import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Configure transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // e.g. "muhammadanique81@gmail.com"
        pass: process.env.GMAIL_PASS, // App password (not your Gmail password)
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Portfolio Contact Form: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
