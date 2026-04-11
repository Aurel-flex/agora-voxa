// worker/index.js
self.addEventListener("push", function (event) {
  const data = event.data ? event.data.json() : {};

  event.waitUntil(
    self.registration.showNotification(data.title || "Nouvelle notification", {
      body: data.message || "Tu as un nouveau message sur Agora-Voxa !",
      icon: "/icon-192x192.png", // Ta panthère noire !
      badge: "/icon-192x192.png",
      vibrate: [200, 100, 200], // Fait vibrer le téléphone
    })
  );
});

// Écoute quand l'utilisateur clique sur la notification
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/dashboard") // Redirige vers le dashboard
  );
});