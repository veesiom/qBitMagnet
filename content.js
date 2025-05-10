document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href^="magnet:"]');
    if (link) {
        e.preventDefault();
        const magnetUrl = link.href;
        console.log("Magnet link captured:", magnetUrl);
        chrome.runtime.sendMessage({ type: "magnet", url: magnetUrl });
    }
});