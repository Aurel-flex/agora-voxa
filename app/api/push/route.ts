import { NextResponse } from "next/server";
import webpush from "web-push";

// Fonction utilitaire pour créer un délai
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: Request) {
  try {
    webpush.setVapidDetails(
      "mailto:ton-email@agora-voxa.com", 
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
      process.env.VAPID_PRIVATE_KEY as string
    );

    const { subscription, userName } = await req.json();

    const payload = JSON.stringify({
      title: "Athéna 🦉",
      message: `Coucou ${userName} ! Prêt(e) à chauffer ta voix ? Rejoins le Studio pour un exercice d'articulation express de 2 minutes ! 🎙️`,
    });

    // Pause de 3 secondes pour laisser le temps de verrouiller l'écran
    await delay(3000);

    await webpush.sendNotification(subscription, payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur Web Push:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}