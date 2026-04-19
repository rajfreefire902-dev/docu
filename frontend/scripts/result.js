let currentHistoryId = null;

async function loadResults() {
    const params = new URLSearchParams(window.location.search);
    currentHistoryId = params.get("id");

    if (!currentHistoryId) {
        window.location.href = "dashboard.html";
        return;
    }

    try {
        const res = await fetch(BASE_URL + "/history", {
            headers: { "Authorization": "Bearer " + getToken() }
        });
        const data = await res.json();

        const item = data.find(h => h._id === currentHistoryId);

        if (item) {
            document.getElementById("summary").innerText = item.comparisonResult.summary;
            document.getElementById("similarities").innerText = item.comparisonResult.similarities;
            document.getElementById("differences").innerText = item.comparisonResult.differences;
            document.getElementById("missing").innerText = item.comparisonResult.missingTopics;

            const box = document.getElementById("chat-box");
            box.innerHTML = "";
            if (item.chat) {
                item.chat.forEach(m => {
                    box.innerHTML += `<p><b>You:</b> ${m.question}</p>`;
                    box.innerHTML += `<p><b>AI:</b> ${m.answer}</p>`;
                });
                box.scrollTop = box.scrollHeight;
            }
        }
    } catch (e) {
        console.log("Load failed");
    }
}

loadResults();