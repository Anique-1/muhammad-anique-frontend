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

    // Email to owner
    const mailToOwner = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Portfolio Contact Form: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    // Email to sender (confirmation)
    const mailToSender = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your message was received!",
      text: `Hi ${name},\n\nThank you for reaching out! Your message was received and I will get back to you soon.\n\nYour message:\n${message}\n\nBest regards,\nMuhammad Anique`,
    };

    // Run email sending in the background
    (async () => {
      try {
        await transporter.sendMail(mailToOwner);
        await transporter.sendMail(mailToSender);
      } catch (err) {
        // Optionally log error
        console.error("Error sending emails:", err);
      }
    })();

    // Respond immediately so frontend can show "message sent"
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
