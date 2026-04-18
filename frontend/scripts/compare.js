async function comparePDFs() {
    const f1 = document.getElementById("file1").files[0];
    const f2 = document.getElementById("file2").files[0];

    if (!f1 || !f2) {
        alert("Select two PDF files!");
        return;
    }

    const btn = document.querySelector(".btn");
    btn.innerText = "Analyzing... (This takes 10-20 seconds)";
    btn.disabled = true;

    const formData = new FormData();
    formData.append("file1", f1);
    formData.append("file2", f2);

    try {
        const res = await fetch(BASE_URL + "/compare", {
            method: "POST",
            headers: { 
                "Authorization": "Bearer " + getToken() 
            },
            body: formData
        });

        const data = await res.json();

        if (res.ok && data.historyId) {
            window.location.href = "result.html?id=" + data.historyId;
        } else {
            alert("Error: " + (data.msg || "Server failed to return an ID"));
            btn.innerText = "Start Comparison";
            btn.disabled = false;
        }
    } catch (err) {
        alert("Connection failed. Is the server running at " + BASE_URL + "?");
        btn.innerText = "Start Comparison";
        btn.disabled = false;
    }
}