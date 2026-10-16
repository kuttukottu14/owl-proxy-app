herelet isConnected = false;

function toggleConnection() {
    const statusText = document.getElementById("status");
    const btn = document.getElementById("connectBtn");

    if (!isConnected) {
        statusText.innerText = "Connected (Secure)";
        statusText.className = "connected";
        btn.innerText = "Disconnect";
        btn.style.backgroundColor = "#f44336";
        isConnected = true;
    } else {
        statusText.innerText = "Disconnected";
        statusText.className = "disconnected";
        btn.innerText = "Connect";
        btn.style.backgroundColor = "#ff9800";
        isConnected = false;
    }
}
