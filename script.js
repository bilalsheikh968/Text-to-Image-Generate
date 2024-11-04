const key = "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";
const inputText = document.getElementById("input");
const image = document.getElementById("image");
const GenBtn = document.getElementById("btn");
const svg = document.getElementById("svg");
const load = document.getElementById("loading");
const ResetBtn = document.getElementById("reset");
const downloadBtn = document.getElementById("download");

async function query() {
    load.style.display = "block";
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image", {
            headers: { Authorization: `Bearer ${key}` },
            method: "POST",
            body: JSON.stringify({ "inputs": inputText.value }),
        });
        const result = await response.blob();
        image.style.display = "block";
        load.style.display = "none";
        return result;
    } catch (error) {
        alert("Error fetching the image.");
        load.style.display = "none";
    }
}

function generate() {
    query().then((response) => {
        const objectUrl = URL.createObjectURL(response);
        image.src = objectUrl;
        downloadBtn.addEventListener("click", () => {
            download(objectUrl);
        });
    });
}

GenBtn.addEventListener("click", () => {
    svg.style.display = "none";
    generate();
});

inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        svg.style.display = "none";
        generate();
    }
});

ResetBtn.addEventListener("click", () => {
    inputText.value = "";
    window.location.reload();
});

function download(objectUrl) {
    fetch(objectUrl)
        .then(res => res.blob())
        .then(file => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = new Date().getTime();
            a.click();
        })
        .catch(() => alert("Failed to download"));
}
