async function searchItem() {
    const item = document.getElementById("itemInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!item) {
        resultDiv.innerHTML = "<p>Please enter an item name.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/proxy?query=${encodeURIComponent(item)}`);

        if (!response.ok) {
            resultDiv.innerHTML = "<p>Item not found or there was an error.</p>";
        } else {
            const data = await response.json();

            resultDiv.innerHTML = `
                <h3>Item: ${data.title}</h3>
                <div class="item-container">
                    <iframe src="${data.pageUrl}" frameborder="0" width="100%" height="400px"></iframe>
                </div>
                <p class="full-page-link">Click the link to view the full page: <a href="${data.pageUrl}" target="_blank">View on Terraria Wiki</a></p>
            `;
        }
    } catch (error) {
        console.error('Error fetching item:', error);
        resultDiv.innerHTML = "<p>An error occurred while fetching data.</p>";
    }
}
