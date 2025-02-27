self.addEventListener("push", function (event) {
    const options = {
        body: "You have a new notification!",
        icon: "icon.png", // Update with your icon path
        badge: "badge.png", // Update with your badge path
    };

    event.waitUntil(
        self.registration.showNotification("New Alert!", options)
    );
});
