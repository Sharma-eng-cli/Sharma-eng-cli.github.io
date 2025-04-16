document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".filter-container input[type='checkbox']");
    const selectAll = document.getElementById("selectAll");
    const publications = Array.from(document.querySelectorAll("#publications-list .publication"));

    const startInput = document.getElementById("start-month");
    const endInput = document.getElementById("end-month");
    const applyDateBtn = document.getElementById("applyDateFilter");

    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("page-info");

    const itemsPerPage = 10;
    let currentPage = 1;
    let filteredPublications = [...publications];

    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);

        if (pageInfo) {
            pageInfo.textContent = totalPages === 0 ? "No publications found." : `Page ${currentPage} of ${totalPages}`;
            pageInfo.style.display = totalPages === 0 ? "block" : "block";
        }

        if (prevBtn) prevBtn.disabled = (currentPage === 1 || totalPages === 0);
        if (nextBtn) nextBtn.disabled = (currentPage >= totalPages || totalPages === 0);
    }

    function showPage(page) {
        currentPage = page;
        publications.forEach(pub => pub.style.display = "none");

        const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = 1;
        }

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;

        filteredPublications.slice(startIdx, endIdx).forEach(pub => pub.style.display = "block");

        updatePaginationControls();
    }

    function parsePubDate(pubElement) {
        const dateElement = pubElement.querySelector(".pub-date");
        if (!dateElement) return null;
        const match = dateElement.textContent.match(/Date:\s*([A-Za-z]+ \d{1,2}, \d{4})/);
        if (match) return new Date(match[1]);
        return null;
    }

    function filterPublications() {
        let selectedCategories = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked && checkbox.id !== "selectAll")
            .map(checkbox => checkbox.getAttribute("data-category"));

        const start = startInput && startInput.value ? new Date(startInput.value + "-01") : null;
        const end = endInput && endInput.value ? new Date(endInput.value + "-01") : null;

        filteredPublications = publications.filter(pub => {
            const pubCategories = pub.getAttribute("data-category").split(" ");
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => pubCategories.includes(cat));

            const pubDate = parsePubDate(pub);
            const matchesDate = (!start || (pubDate && pubDate >= start)) && (!end || (pubDate && pubDate <= end));

            return matchesCategory && matchesDate;
        });

        const allChecked = checkboxes.length - 1 === selectedCategories.length;
        selectAll.checked = allChecked;

        currentPage = 1;
        showPage(currentPage);
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            if (currentPage > 1) showPage(currentPage - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
            if (currentPage < totalPages) showPage(currentPage + 1);
        });
    }

    if (selectAll) {
        selectAll.addEventListener("change", function () {
            checkboxes.forEach(checkbox => (checkbox.checked = selectAll.checked));
            filterPublications();
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterPublications);
    });

    if (applyDateBtn) {
        applyDateBtn.addEventListener("click", filterPublications);
    }

    filterPublications();
});
