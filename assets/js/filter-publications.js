document.addEventListener("DOMContentLoaded", function () {
    const journalFilter = document.getElementById("journalFilter");
    const conferenceFilter = document.getElementById("conferenceFilter");
    const selectAll = document.getElementById("selectAll");
    const publications = Array.from(document.querySelectorAll(".publication"));

    const itemsPerPage = 10;  // Adjusted to match Jekyll pagination settings
    let currentPage = 1;
    let filteredPublications = [...publications];

    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
        document.getElementById("page-info").textContent = `Page ${currentPage} of ${totalPages || 1}`;

        document.getElementById("prevPage").disabled = (currentPage === 1);
        document.getElementById("nextPage").disabled = (currentPage >= totalPages || totalPages === 0);
    }

    function showPage(page) {
        currentPage = page;
        publications.forEach(pub => pub.classList.add("hidden"));

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        
        filteredPublications.slice(startIdx, endIdx).forEach(pub => {
            pub.classList.remove("hidden", "fade-out");
            pub.classList.add("fade-in");
        });

        updatePaginationControls();
    }

    function filterPublications() {
        const hasJournal = journalFilter.checked;
        const hasConference = conferenceFilter.checked;

        filteredPublications = publications.filter(pub => {
            const category = pub.getAttribute("data-category");
            return (!hasJournal && !hasConference) || (hasJournal && category === "journal") || (hasConference && category === "conference");
        });

        currentPage = 1;  // Reset to first page after filtering
        showPage(currentPage);

        // Update Select All checkbox state
        selectAll.checked = hasJournal && hasConference;
    }

    // Event Listeners for Pagination
    document.getElementById("prevPage").addEventListener("click", function () {
        if (currentPage > 1) showPage(currentPage - 1);
    });

    document.getElementById("nextPage").addEventListener("click", function () {
        const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
        if (currentPage < totalPages) showPage(currentPage + 1);
    });

    // Event Listeners for Filtering
    selectAll.addEventListener("change", function () {
        journalFilter.checked = this.checked;
        conferenceFilter.checked = this.checked;
        filterPublications();
    });

    journalFilter.addEventListener("change", filterPublications);
    conferenceFilter.addEventListener("change", filterPublications);

    // Show first page on load
    filterPublications();
});
