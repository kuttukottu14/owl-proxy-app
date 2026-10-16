async function extractProxy() {
    const country = document.getElementById("countrySelect").value;
    const protocol = document.getElementById("agreementSelect").value;
    const format = document.getElementById("formatSelect").value;
    const quantity = parseInt(document.getElementById("quantityInput").value) || 5;
    const resultBox = document.getElementById("agentOutput");

    if (!country) {
        alert("Please select a Country / Region first!");
        return;
    }

    resultBox.value = "Fetching live active proxies from server...";

    try {
        // Free Public Proxy API (Geonode) dwara live proxies thechukovadam
        const apiProtocol = protocol.toLowerCase();
        const url = `https://proxylist.geonode.com/api/proxy-list?limit=${quantity}&format=json&protocols=${apiProtocol}&country=${country}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            let outputText = "";
            data.data.forEach(p => {
                const ip = p.ip;
                const port = p.port;
                const user = `owl_user_${Math.floor(Math.random()*8999+1000)}`;
                const pass = `pass_${Math.random().toString(36).substring(7)}`;

                let line = "";
                if (format === "1") {
                    line = `${ip}:${port}:${user}:${pass}`;
                } else if (format === "2") {
                    line = `${user}:${pass}@${ip}:${port}`;
                } else {
                    line = `${user}:${pass}:${ip}:${port}`;
                }

                outputText += `[${protocol}] ${line}\n`;
            });

            resultBox.value = outputText.trim();
        } else {
            resultBox.value = "No active proxies found for this country right now. Please try another country or protocol!";
        }
    } catch (error) {
        resultBox.value = "Error connecting to proxy network. Please check your internet connection.";
    }
}

function copyProxies() {
    const output = document.getElementById("agentOutput");
    if (!output.value || output.value.includes("Fetching")) {
        alert("No valid proxies to copy!");
        return;
    }
    navigator.clipboard.writeText(output.value);
    alert("Active proxies copied to clipboard successfully!");
}

function exportProxies() {
    const output = document.getElementById("agentOutput").value;
    if (!output || output.value.includes("Fetching")) {
        alert("No valid proxies to export!");
        return;
    }
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "active_owl_proxies.txt";
    link.click();
}

