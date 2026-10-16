let isConnected = false;
let speedInterval;

const servers = {
    us: "167.99.12.89 (USA)",
    sg: "128.199.200.15 (Singapore)",
    uk: "178.62.201.45 (UK)",
    jp: "139.59.220.11 (Japan)",
    de: "159.65.120.33 (Germany)"
};

function toggleVPN() {
    const ring = document.getElementById("statusRing");
    const statusText = document.getElementById("statusText");
    const ipText = document.getElementById("ipText");
    const encryptStatus = document.getElementById("encryptStatus");
    const selectedServer = document.getElementById("serverSelect").value;

    if (!isConnected) {
        // Connecting Logic
        statusText.innerText = "CONNECTING...";
        statusText.style.color = "#f59e0b";

        setTimeout(() => {
            isConnected = true;
            ring.className = "circle connected";
            statusText.innerText = "CONNECTED";
            statusText.style.color = "#10b981";
            ipText.innerText = `Protected IP: ${servers[selectedServer]}`;
            encryptStatus.innerText = "AES-256 (ON)";
            encryptStatus.className = "secure-on";
            startSpeedMeter();
        }, 1500);

    } else {
        // Disconnecting Logic
        isConnected = false;
        ring.className = "circle disconnected";
        statusText.innerText = "DISCONNECTED";
        statusText.style.color = "#ef4444";
        ipText.innerText = "Your IP: 182.72.10.45 (Exposed)";
        encryptStatus.innerText = "AES-256 (OFF)";
        encryptStatus.className = "secure-off";
        stopSpeedMeter();
    }
}

function startSpeedMeter() {
    speedInterval = setInterval(() => {
        if (isConnected) {
            document.getElementById("downSpeed").innerText = (Math.random() * (45.5 - 12.1) + 12.1).toFixed(1) + " MB/s";
            document.getElementById("upSpeed").innerText = (Math.random() * (15.2 - 4.1) + 4.1).toFixed(1) + " MB/s";
        }
    }, 1000);
}

function stopSpeedMeter() {
    clearInterval(speedInterval);
    document.getElementById("downSpeed").innerText = "0.0 MB/s";
    document.getElementById("upSpeed").innerText = "0.0 MB/s";
}

function changeServer() {
    if (isConnected) {
        toggleVPN(); // Disconnect on server change
        setTimeout(toggleVPN, 500); // Reconnect to new server
    }
}
￼Enter
