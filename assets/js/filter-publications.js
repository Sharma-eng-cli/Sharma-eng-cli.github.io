document.addEventListener("DOMContentLoaded", function () {
    const journalFilter = document.getElementById("journalFilter");
    const conferenceFilter = document.getElementById("conferenceFilter");
    const selectAll = document.getElementById("selectAll");
    const publications = Array.from(document.querySelectorAll(".publication"));

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
        }

        if (prevBtn) prevBtn.disabled = (currentPage === 1 || totalPages === 0);
        if (nextBtn) nextBtn.disabled = (currentPage >= totalPages || totalPages === 0);
    }

    function showPage(page) {
        currentPage = page;
        publications.forEach(pub => pub.style.display = "none");

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;

        if (filteredPublications.length === 0) {
            pageInfo.textContent = "No publications found.";
            updatePaginationControls();
            return;
        }

        filteredPublications.slice(startIdx, endIdx).forEach(pub => pub.style.display = "block");

        updatePaginationControls();
    }

    function filterPublications() {
        if (!journalFilter || !conferenceFilter || !selectAll) return;

        const showJournals = journalFilter.checked;
        const showConferences = conferenceFilter.checked;

        filteredPublications = publications.filter(pub => {
            const category = pub.getAttribute("data-category");

            const isJournal = category.includes("journal") || category.includes("manuscript");
            const isConference = category.includes("conference");

            return (showJournals && isJournal) || (showConferences && isConference);
        });

        // If nothing is selected, show all publications
        if (!showJournals && !showConferences) {
            filteredPublications = [...publications];
        }

        // Update "Select All" checkbox dynamically
        selectAll.checked = showJournals && showConferences;

        // Reset to first page after filtering
        currentPage = 1;
        showPage(currentPage);
    }

    // Event Listeners
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
            journalFilter.checked = this.checked;
            conferenceFilter.checked = this.checked;
            filterPublications();
        });
    }

    if (journalFilter) journalFilter.addEventListener("change", filterPublications);
    if (conferenceFilter) conferenceFilter.addEventListener("change", filterPublications);

    // Apply filter and pagination on load
    filterPublications();
});
