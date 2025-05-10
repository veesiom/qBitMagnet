const inputUrl = document.getElementById("qbUrl");
const inputUser = document.getElementById("qbUser");
const inputPass = document.getElementById("qbPass");
const saveBtn = document.getElementById("save");
const statusText = document.getElementById("status");
const currentUrlDisplay = document.getElementById("currentUrl");
const currentUserDisplay = document.getElementById("currentUser");
const currentPassDisplay = document.getElementById("currentPass");

// Загрузка сохранённых настроек
console.log("Loading saved settings...");
chrome.storage.local.get(["qbUrl", "qbUser", "qbPass"], (result) => {
    console.log("Loaded settings:", result);
    if (result.qbUrl) {
        inputUrl.value = result.qbUrl;
        currentUrlDisplay.textContent = result.qbUrl;
    } else {
        currentUrlDisplay.textContent = "Не задан";
    }
    if (result.qbUser) {
        inputUser.value = result.qbUser;
        currentUserDisplay.textContent = result.qbUser;
    } else {
        currentUserDisplay.textContent = "Не задан";
    }
    if (result.qbPass) {
        inputPass.value = result.qbPass;
        currentPassDisplay.textContent = "******"; // Скрываем пароль
    } else {
        currentPassDisplay.textContent = "Не задан";
    }
});

// Сохранение параметров
saveBtn.addEventListener("click", () => {
    const qbUrl = inputUrl.value.trim();
    const qbUser = inputUser.value.trim();
    const qbPass = inputPass.value;

    console.log("Save button clicked, settings:", { qbUrl, qbUser, qbPass });

    if (!qbUrl) {
        console.log("Validation failed: URL is empty");
        statusText.textContent = "Ошибка: введите URL!";
        alert("Пожалуйста, введите URL!");
        return;
    }
    if (!qbUser) {
        console.log("Validation failed: Username is empty");
        statusText.textContent = "Ошибка: введите логин!";
        alert("Пожалуйста, введите логин!");
        return;
    }
    if (!qbPass) {
        console.log("Validation failed: Password is empty");
        statusText.textContent = "Ошибка: введите пароль!";
        alert("Пожалуйста, введите пароль!");
        return;
    }

    console.log("Saving settings:", { qbUrl, qbUser, qbPass });
    chrome.storage.local.set({ qbUrl, qbUser, qbPass }, () => {
        console.log("Settings saved successfully");
        statusText.textContent = "Настройки сохранены!";
        currentUrlDisplay.textContent = qbUrl;
        currentUserDisplay.textContent = qbUser;
        currentPassDisplay.textContent = "******";
        alert("Настройки сохранены!");
    });
});