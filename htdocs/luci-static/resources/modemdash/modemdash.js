let labels = [];
let rsrpData = [];
let rsrqData = [];
let sinrData = [];

function qualityColorRSRP(v) {
    v = parseInt(v);
    if (isNaN(v)) return "gray";
    if (v >= -90) return "lime";
    if (v >= -100) return "yellow";
    if (v >= -110) return "orange";
    return "red";
}

function qualityColorSINR(v) {
    v = parseFloat(v);
    if (isNaN(v)) return "gray";
    if (v >= 20) return "lime";
    if (v >= 13) return "yellow";
    if (v >= 0) return "orange";
    return "red";
}

const rsrpChart = new Chart(document.getElementById("chart_rsrp"), {
    type: 'line',
    data: { labels: labels, datasets: [{ label: "RSRP (dBm)", data: rsrpData, borderColor: "red", tension: 0.2 }] },
    options: { animation: false, scales: { y: { reverse: true } } }
});

const rsrqChart = new Chart(document.getElementById("chart_rsrq"), {
    type: 'line',
    data: { labels: labels, datasets: [{ label: "RSRQ (dB)", data: rsrqData, borderColor: "orange", tension: 0.2 }] },
    options: { animation: false }
});

const sinrChart = new Chart(document.getElementById("chart_sinr"), {
    type: 'line',
    data: { labels: labels, datasets: [{ label: "SINR (dB)", data: sinrData, borderColor: "green", tension: 0.2 }] },
    options: { animation: false }
});

async function update() {
    try {
        const r = await fetch('/cgi-bin/luci/admin/network/modemdash/data');
        const j = await r.json();

        document.getElementById("tech").innerText = j.tech;
        document.getElementById("rsrp").innerText = j.rsrp + " dBm";
        document.getElementById("rsrq").innerText = j.rsrq + " dB";
        document.getElementById("sinr").innerText = j.sinr + " dB";
        document.getElementById("pci").innerText  = j.pci;
        document.getElementById("band").innerText = j.band;
        document.getElementById("earfcn").innerText = j.earfcn;
        document.getElementById("cellid").innerText = j.cellid;
        document.getElementById("tac").innerText = j.tac;
        document.getElementById("ca_count").innerText = j.ca_count;

        document.getElementById("rsrp").style.color = qualityColorRSRP(j.rsrp);
        document.getElementById("sinr").style.color = qualityColorSINR(j.sinr);

        const t = new Date().toLocaleTimeString();
        labels.push(t);
        rsrpData.push(j.rsrp);
        rsrqData.push(j.rsrq);
        sinrData.push(j.sinr);

        if (labels.length > 60) {
            labels.shift();
            rsrpData.shift();
            rsrqData.shift();
            sinrData.shift();
        }

        rsrpChart.update();
        rsrqChart.update();
        sinrChart.update();
    } catch (e) {
        console.log("update error", e);
    }
}

setInterval(update, 1500);
update();
