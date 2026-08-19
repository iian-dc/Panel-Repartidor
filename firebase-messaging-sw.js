importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBoVX8XacnE6OeguLOp_J3QKhfUrZnUB_4",
  authDomain: "kigo-xpress.firebaseapp.com",
  projectId: "kigo-xpress",
  messagingSenderId: "358613713443",
  appId: "1:358613713443:web:0b9d407dab250f13c56796"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const titulo = payload.notification?.title || '🔥 NUEVO PEDIDO KIGO!';
  const opciones = {
    body: payload.notification?.body || 'Tienes un pedido pendiente',
    icon: 'https://cdn-icons-png.flaticon.com/512/3774/3774082.png',
    vibrate: [500,100,500,100,500,100,1000,100,1000],
    tag: 'nuevo-pedido',
    renotify: true,
    requireInteraction: true
  };
  self.registration.showNotification(titulo, opciones);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
