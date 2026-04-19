async function sendQuestion() {
    const input = document.getElementById("question");
    const text = input.value;
    if (!text) return;

    const box = document.getElementById("chat-box");
    box.innerHTML += `<p><b>You:</b> ${text}</p>`;
    input.value = "";

    try {
        const res = await fetch(BASE_URL + "/chat", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                question: text,
                historyId: currentHistoryId
            })
        });
        const data = await res.json();
        box.innerHTML += `<p><b>AI:</b> ${data.answer}</p>`;
        box.scrollTop = box.scrollHeight;
    } catch (err) {
        box.innerHTML += `<p style='color:red;'>Chat error</p>`;
    }
}