async function comparePDFs() {
    const file1 = document.getElementById("file1").files[0];
    const file2 = document.getElementById("file2").files[0];

    if (!file1 || !file2) {
        alert("Select two PDF files.");
        return;
    }

    const compareBtn = document.querySelector(".btn");
    const originalText = compareBtn.innerText;
    
    compareBtn.innerText = "Analyzing... Please wait";
    compareBtn.disabled = true;

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
        const response = await fetch(`${BASE_URL}/compare`, {
            method: "POST",
            headers: { 
                "Authorization": "Bearer " + getToken()
            },
            body: formData
        });

        const result = await response.json();

        if (response.ok && result.historyId) {
            window.location.href = `result.html?id=${result.historyId}`;
        } else {
            alert(result.msg || "Analysis failed.");
            compareBtn.innerText = originalText;
            compareBtn.disabled = false;
        }
    } catch (error) {
        compareBtn.innerText = originalText;
        compareBtn.disabled = false;
    }
}