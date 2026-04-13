import nodemailer from 'nodemailer';

// Configure transporter – uses environment variables
// Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env
const smtpPort = parseInt(process.env.SMTP_PORT || '465');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export async function sendVerificationEmail(to: string, refugeName: string, code: string) {
  const mailOptions = {
    from: `"MatchPet" <${process.env.SMTP_USER || 'noreply@matchpet.fr'}>`,
    to,
    subject: `🐾 MatchPet - Votre code de vérification`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 30px; background: #f6f7f5; border-radius: 20px;">
        <h1 style="color: #2d5a27; text-align: center; font-size: 28px; margin-bottom: 10px;">🐾 MatchPet</h1>
        <p style="color: #333; text-align: center; font-size: 16px; margin-bottom: 30px;">
          Bonjour <strong>${refugeName}</strong>,
        </p>
        <p style="color: #555; text-align: center; font-size: 15px; line-height: 1.6;">
          Voici votre code de vérification pour activer votre compte refuge sur MatchPet :
        </p>
        <div style="background: #2d5a27; color: white; text-align: center; font-size: 36px; font-weight: bold; letter-spacing: 8px; padding: 20px; border-radius: 16px; margin: 25px 0;">
          ${code}
        </div>
        <p style="color: #888; text-align: center; font-size: 13px; margin-top: 20px;">
          Ce code est valable pour une seule utilisation.<br/>
          Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
