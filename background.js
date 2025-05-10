chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed!");
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "magnet") {
        console.log("Magnet link received:", msg.url);

        // Получаем сохранённые параметры
        console.log("Fetching settings...");
        chrome.storage.local.get(["qbUrl"], (settings) => {
            console.log("Loaded settings:", settings);
            const { qbUrl } = settings;

            if (!qbUrl) {
                console.log("Error: qbUrl is not set");
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "Settings Error",
                    message: "Please configure qBittorrent Web UI URL in the popup."
                });
                return;
            }

            console.log("Sending magnet link to qBittorrent at:", qbUrl);
            const addUrl = `${qbUrl.endsWith('/') ? qbUrl : qbUrl + '/'}api/v2/torrents/add`;

            const formData = new FormData();
            formData.append("urls", msg.url); // Передаем как есть, как в curl

            fetch(addUrl, {
                method: "POST",
                body: formData,
                credentials: "include",
                mode: "no-cors" // Попытка обойти CORS
            })
                .then(response => {
                    console.log("qBittorrent response status:", response.status);
                    console.log("Response headers:", response.headers);
                    if (response.ok) {
                        chrome.notifications.create({
                            type: "basic",
                            iconUrl: "icon.png",
                            title: "Magnet link added",
                            message: `The magnet link was added to qBittorrent: ${msg.url}`
                        });
                    } else {
                        throw new Error(`Failed to add magnet link: ${response.statusText}`);
                    }
                })
                .catch(err => {
                    console.log("Error adding magnet link:", err);
                    chrome.notifications.create({
                        type: "basic",
                        iconUrl: "icon.png",
                        title: "Error",
                        message: `Error adding magnet link: ${err.message}`
                    });
                });
        });
    }
});