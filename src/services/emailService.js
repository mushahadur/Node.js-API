const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    // Email transporter setup
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Verification email send for OTP
  async sendVerificationEmail(email, name, otp) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify Your Email",
      html: `<body style="margin:0;padding:0;background:#f6f8ff;font-family:Arial,Helvetica,sans-serif;">
                <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background:#f6f8ff;padding:20px 10px;">
                    <tr>
                    <td align="center">
                        <!-- Main container - max 560px is very safe -->
                        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:10px;overflow:hidden;">
                        <!-- Header -->
                        <tr>
                            <td style="background:#6366f1;padding:32px 24px;text-align:center;">
                            <h1 style="margin:0;color:white;font-size:26px;font-weight:bold;">Welcome, ${name}!</h1>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding:32px 24px;text-align:center;">
                            <h2 style="margin:0 0 20px;color:#111827;font-size:20px;">Your Verification Code</h2>
                            
                            <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.5;">
                                Use this code to verify your account<br>
                                <strong>Do not share it with anyone</strong>
                            </p>

                            <!-- OTP -->
                            <div style="margin:24px 0;padding:16px;background:#f3f4f6;border-radius:8px;border:2px dashed #6366f1;display:inline-block;">
                                <span style="color:#111827;font-size:32px;font-weight:bold;letter-spacing:10px;">${otp}</span>
                            </div>

                            <p style="margin:24px 0;color:#4b5563;font-size:15px;">
                                This code expires in <strong>5 minutes</strong>
                            </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding:24px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
                            <p style="margin:0;color:#6b7280;font-size:13px;">
                                If you didn't request this code, please ignore this email.
                            </p>
                            <p style="margin:8px 0 0;color:#9ca3af;font-size:12px;">
                                © ${new Date().getFullYear()} Your Company
                            </p>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                </table>
            </body>
        `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`📧 Password reset email sent to ${email}`);
      console.log(`🔗 Reset otp: ${otp}`);
    } catch (error) {
      console.error("Email send error:", error);
      throw new Error("Failed to send verification email");
    }
  }

  // Welcome email send
  async sendWelcomeEmail(email, name) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Welcome to Our Platform!",
      html: `
                <h1>Welcome ${name}!</h1>
                <p>Your email has been verified successfully.</p>
                <p>You can now start using our platform.</p>
            `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error("Email send error:", error);
    }
  }
}

module.exports = new EmailService();
