async function searchStore() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert("검색어를 입력하세요!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();

        console.log("✅ [서버 응답]:", data);

        const results = document.getElementById('results');
        results.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
            results.innerHTML = "<li>검색 결과가 없습니다.</li>";
            return;
        }

        data.forEach(store => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${store.title.replace(/<[^>]+>/g, '')}</strong><br>
                주소: ${store.roadAddress || "정보 없음"}<br>
                <a href="${store.link}" target="_blank">자세히 보기</a>
            `;
            results.appendChild(listItem);
        });
    } catch (error) {
        console.error("❌ [오류]:", error);
        alert("검색 중 오류가 발생했습니다.");
    }
}
