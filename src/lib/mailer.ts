import nodemailer from 'nodemailer';
import dns from 'dns';
import { promisify } from 'util';

const resolve4 = promisify(dns.resolve4);

// Fonction pour obtenir l'IPv4 de l'hôte SMTP
async function getSmtpHost() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  try {
    // Si c'est déjà une IP, on la retourne
    if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(host)) return host;

    console.log(`🔍 Résolution IPv4 pour ${host}...`);
    const addresses = await resolve4(host);
    console.log(`✅ IPv4 trouvée : ${addresses[0]}`);
    return addresses[0];
  } catch (error) {
    console.error(`⚠️ Échec résolution IPv4 pour ${host}, utilisation du nom d'hôte :`, error);
    return host;
  }
}

const smtpPort = parseInt(process.env.SMTP_PORT || '465');

// On crée une fonction pour obtenir le transporteur car on a besoin d'attendre la résolution IP
async function createTransporter() {
  const hostIp = await getSmtpHost();

  return nodemailer.createTransport({
    host: hostIp,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
    tls: {
      rejectUnauthorized: false,
      servername: process.env.SMTP_HOST || 'smtp.gmail.com' // CRITIQUE : Garder le nom d'hôte pour le certificat SSL
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  } as any);
}

let transporterPromise = createTransporter();

// Vérification silencieuse au démarrage
(async () => {
  try {
    const transporter = await transporterPromise;
    await transporter.verify();
    console.log('✅ Serveur de messagerie prêt (IPv4 forcée)');
  } catch (error) {
    console.error('❌ Erreur configuration SMTP:', error);
  }
})();

export async function sendVerificationEmail(to: string, refugeName: string, code: string) {
  console.log(`📧 Tentative d'envoi d'email à ${to}...`);
  const transporter = await transporterPromise;

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