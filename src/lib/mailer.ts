import { Resend } from 'resend';

// Initialiser Resend avec votre clé API (Idéalement via variable d'environnement sur Railway)
const resend = new Resend(process.env.RESEND_API_KEY || 're_MJgSgRXn_ASQNfFzqZPRs8983UoZWjFFd');

export async function sendVerificationEmail(to: string, refugeName: string, code: string) {
  console.log(`📧 Tentative d'envoi d'email à ${to} via Resend...`);

  try {
    const { data, error } = await resend.emails.send({
      from: 'MatchPet <onboarding@resend.dev>', // Par défaut, utilisez cet expéditeur de test
      to: [to],
      subject: '🐾 MatchPet - Votre code de vérification',
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
    });

    if (error) {
      console.error('❌ Erreur Resend:', error);
      throw error;
    }

    console.log('✅ Email envoyé avec succès via Resend:', data?.id);
  } catch (err) {
    console.error('❌ Échec critique lors de l\'envoi via Resend:', err);
    throw err;
  }
}