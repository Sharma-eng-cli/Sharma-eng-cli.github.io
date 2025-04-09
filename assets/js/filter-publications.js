document.addEventListener("DOMContentLoaded", function () {
    const journalFilter = document.getElementById("journalFilter");
    const conferenceFilter = document.getElementById("conferenceFilter");
    const selectAll = document.getElementById("selectAll");
    const publications = Array.from(document.querySelectorAll(".publication"));

    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("page-info");

    const itemsPerPage = 10;  // Show 10 publications per page
    let currentPage = 1;
    let filteredPublications = [...publications];

    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
        if (pageInfo) {
            pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
        }

        if (prevBtn) prevBtn.disabled = (currentPage === 1);
        if (nextBtn) nextBtn.disabled = (currentPage >= totalPages || totalPages === 0);
    }

    function showPage(page) {
        currentPage = page;
        publications.forEach(pub => pub.style.display = "none");

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;

        filteredPublications.slice(startIdx, endIdx).forEach(pub => {
            pub.style.display = "block";
        });

        updatePaginationControls();
    }

    function filterPublications() {
        if (!journalFilter || !conferenceFilter || !selectAll) return;

        const showJournals = journalFilter.checked;
        const showConferences = conferenceFilter.checked;

        filteredPublications = publications.filter(pub => {
            const category = pub.getAttribute("data-category");
            return (
                (!showJournals && !showConferences) ||  // If nothing is checked, show all
                (showJournals && category.includes("journal")) ||
                (showConferences && category.includes("conference"))
            );
        });

        // Reset to first page after filtering
        currentPage = 1;
        showPage(currentPage);

        // Update "Select All" checkbox
        selectAll.checked = showJournals && showConferences;
    }

    // Initialize event listeners only if the elements exist
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
            if (journalFilter) journalFilter.checked = this.checked;
            if (conferenceFilter) conferenceFilter.checked = this.checked;
            filterPublications();
        });
    }

    if (journalFilter) journalFilter.addEventListener("change", filterPublications);
    if (conferenceFilter) conferenceFilter.addEventListener("change", filterPublications);

    // Show first page when the page loads
    filterPublications();
});
