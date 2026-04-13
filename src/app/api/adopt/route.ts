export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, password, animalName, animalId, animalImage } = data;

    // Hash du mot de passe uniquement pour les nouveaux utilisateurs
    const hashedPassword = password && password !== "existing_user_hidden_password" 
      ? await bcrypt.hash(password, 12) 
      : undefined;

    // Sauvegarder l'utilisateur en base de donnÃ©es
    const user = await prisma.userProfile.upsert({
      where: { email },
      update: {
        name: `${firstName} ${lastName}`,
        phone,
        // Ne pas Ã©craser le mot de passe existant
      },
      create: {
        email,
        name: `${firstName} ${lastName}`,
        phone,
        password: hashedPassword || null,
      }
    });

    // Enregistrer le dossier d'adoption en DB
    if (animalId) {
      // RÃ©cupÃ©rer le refugeId de l'animal
      // On cherche par externalId OU par id (car le front envoie parfois l'un ou l'autre)
      const animal = await prisma.animal.findFirst({
        where: {
          OR: [
            { externalId: String(animalId) },
            { id: !isNaN(Number(animalId)) ? Number(animalId) : -1 }
          ]
        },
        select: { id: true, externalId: true, refugeId: true, name: true, photos: true},
      });

      await prisma.adoption.create({
        data: {
          userId: user.id,
          // On stocke le vrai externalId si on l'a trouvÃ©
          animalExternalId: animal?.externalId || String(animalId),
          animalName: animal?.name || animalName,
          animalImage: (animal?.photos as any)?.[0] || animalImage || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500',
          refugeId: animal?.refugeId || null,
          status: "pending"
        }
      });
    }

    // Pour activer rÃ©ellement l'envoi, l'utilisateur devra configurer :
    // SMTP_HOST="smtp.gmail.com"
    // SMTP_PORT=465
    // SMTP_USER="mon-email@gmail.com"
    // SMTP_PASS="mon-app-password"
    
    // Si la configuration SMTP n'est pas encore disponible dans .env :
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("âš ï¸ Identifiants SMTP manquants dans .env ! Simulation de l'envoi du mail.");
      console.log(`[EMAIL SIMULÃ‰] -> Ã€: steefkagi@gmail.com | Sujet: Nouvelle demande d'adoption pour ${animalName}`);
      console.log(`DonnÃ©es : ${firstName} ${lastName}, ${email}, ${phone}`);
      
      // On retourne un statut de succÃ¨s quand mÃªme pour que l'interface continue normalement
      return NextResponse.json({ message: "Mock email sent successfully.", success: true });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MatchPet" <${process.env.SMTP_USER}>`,
      to: 'steefkagi@gmail.com',
      subject: `ðŸ¾ Nouvelle demande d'adoption pour ${animalName}`,
      html: `
        <h2>Nouvelle demande d'adoption : ${animalName}</h2>
        <p>Un utilisateur vient de soumettre un dossier d'adoption via l'application MatchPet.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 10px; margin-top: 20px;">
          <h3 style="margin-top: 0; color: #333;">DÃ©tails du demandeur :</h3>
          <ul style="line-height: 1.6;">
            <li><strong>PrÃ©nom et Nom :</strong> ${firstName} ${lastName}</li>
            <li><strong>Email de contact :</strong> ${email}</li>
            <li><strong>TÃ©lÃ©phone :</strong> ${phone}</li>
          </ul>
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #888;">Ceci est un message automatique envoyÃ© par MatchPet.</p>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully', success: true });

  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
