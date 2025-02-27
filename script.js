// Check if service workers and notifications are supported
if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.register("service-worker.js")
        .then(function (registration) {
            console.log("Service Worker registered:", registration);
        })
        .catch(function (error) {
            console.error("Service Worker registration failed:", error);
        });

    document.getElementById("subscribe").addEventListener("click", function () {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                console.log("Notification permission granted.");
                subscribeToPushNotifications();
            } else {
                console.log("Notification permission denied.");
            }
        });
    });

    function subscribeToPushNotifications() {
        navigator.serviceWorker.ready
            .then(function (registration) {
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: "YOUR_PUBLIC_VAPID_KEY"
                });
            })
            .then(function (subscription) {
                console.log("Push Subscription:", JSON.stringify(subscription));
                // Send this subscription object to your server
            })
            .catch(function (error) {
                console.error("Failed to subscribe to push notifications:", error);
            });
    }
} else {
    console.warn("Push messaging is not supported in this browser.");
}
