"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { useUser } from "@/context/UserContext"; // 👈 On importe le contexte

export default function PushNotification() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user } = useUser(); // 👈 On récupère l'utilisateur actuel

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  };

  const subscribeToPush = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      alert("Ton navigateur ne supporte pas les notifications Web.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Tu dois autoriser les notifications dans les réglages.");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
        ),
      });

      // 💡 NOUVEAU : On envoie l'abonnement ET le nom de l'utilisateur
      await fetch("/api/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: subscription,
          userName: user?.name || "Orateur" // Envoie "Camille" par exemple
        }),
      });

      setIsSubscribed(true);
      alert("Notifications activées ! 🔔");
    } catch (error) {
      console.error("Erreur d'abonnement", error);
    }
  };

  return (
    <button
      onClick={subscribeToPush}
      disabled={isSubscribed}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-soleil font-bold transition-all ${
        isSubscribed ? "bg-emerald-500/10 text-emerald-500" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md"
      }`}
    >
      <Bell className="w-5 h-5" />
      {isSubscribed ? "Notifications Activées" : "Activer les notifications"}
    </button>
  );
}