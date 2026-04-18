async function showHistory() {
    try {
        const res = await fetch(BASE_URL + "/history", {
            headers: { "Authorization": "Bearer " + getToken() }
        });
        const data = await res.json();
        const list = document.getElementById("history-list");
        if (!list) return;

        list.innerHTML = "";
        data.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <b>${item.file1Name} vs ${item.file2Name}</b><br>
                <small>${new Date(item.createdAt).toLocaleDateString()}</small>
            `;
            li.onclick = function() {
                window.location.href = "result.html?id=" + item._id;
            };
            list.appendChild(li);
        });
    } catch (err) {
        console.log("History error");
    }
}

showHistory();