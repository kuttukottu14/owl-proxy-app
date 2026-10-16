const regionData = {
    US: { states: ["California", "New York", "Texas"], cities: ["Los Angeles", "New York City", "Houston"] },
    CN: { states: ["Beijing", "Shanghai"], cities: ["Beijing City", "Shanghai City"] },
    GB: { states: ["England", "Scotland"], cities: ["London", "Manchester"] },
    DE: { states: ["Bavaria", "Berlin"], cities: ["Munich", "Berlin"] },
    IN: { states: ["Maharashtra", "Karnataka", "Delhi"], cities: ["Mumbai", "Bengaluru", "New Delhi"] },
    SG: { states: ["Central Singapore"], cities: ["Singapore"] },
    LY: { states: ["Al Jufrah", "Darnah", "Surt"], cities: ["Hun", "Derna", "Sirte"] }
};

function updateStates() {
    const country = document.getElementById("countrySelect").value;
    const stateSelect = document.getElementById("stateSelect");
    const citySelect = document.getElementById("citySelect");

    stateSelect.innerHTML = '<option value="">Select state...</option>';
    citySelect.innerHTML = '<option value="">Select City</option>';

    if (country && regionData[country]) {
        regionData[country].states.forEach(state => {
            stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
        });
    }
}

function updateCities() {
    const country = document.getElementById("countrySelect").value;
    const citySelect = document.getElementById("citySelect");

    citySelect.innerHTML = '<option value="">Select City</option>';

    if (country && regionData[country]) {
        regionData[country].cities.forEach(city => {
            citySelect.innerHTML += `<option value="${city}">${city}</option>`;
        });
    }
}

function extractProxy() {
    const country = document.getElementById("countrySelect").value;
    const state = document.getElementById("stateSelect").value;
    const city = document.getElementById("citySelect").value;
    const protocol = document.getElementById("agreementSelect").value;
    const format = document.getElementById("formatSelect").value;
    const quantity = parseInt(document.getElementById("quantityInput").value) || 1;

    if (!country) {
        alert("Please select a Country / Region first!");
        return;
    }

    let outputText = "";

    for (let i = 0; i < quantity; i++) {
        const ip = `${Math.floor(Math.random()*150)+50}.${Math.floor(Math.random()*200)}.${Math.floor(Math.random()*200)}.${Math.floor(Math.random()*200)}`;
        const port = Math.floor(Math.random() * 8000) + 2000;
        const user = `owl_${country.toLowerCase()}_${Math.floor(Math.random()*8999+1000)}`;
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
    }

    document.getElementById("agentOutput").value = outputText.trim();
}

function copyProxies() {
    const output = document.getElementById("agentOutput");
    if (!output.value) {
        alert("No proxies to copy!");
        return;
    }
    navigator.clipboard.writeText(output.value);
    alert("Proxies copied to clipboard successfully!");
}

function exportProxies() {
    const output = document.getElementById("agentOutput").value;
    if (!output) {
        alert("No proxies to export!");
        return;
    }
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "owl_proxies.txt";
    link.click();
}
