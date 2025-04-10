document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".filter-container input[type='checkbox']");
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
        let selectedCategories = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.id !== "selectAll") {
                selectedCategories.push(checkbox.getAttribute("data-category"));
            }
        });

        filteredPublications = publications.filter(pub => {
            const pubCategories = pub.getAttribute("data-category").split(" ");
            return selectedCategories.length === 0 || selectedCategories.some(cat => pubCategories.includes(cat));
        });

        // If no specific filters are selected, reset to show all
        if (selectedCategories.length === 0) {
            filteredPublications = [...publications];
        }

        // Update "Select All" checkbox dynamically
        selectAll.checked = selectedCategories.length === checkboxes.length - 1;

        // Reset to first page after filtering
        currentPage = 1;
        showPage(currentPage);
    }

    // Pagination Controls
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

    // Select All Logic
    if (selectAll) {
        selectAll.addEventListener("change", function () {
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAll.checked;
            });
            filterPublications();
        });
    }

    // Attach event listeners to all checkboxes dynamically
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", filterPublications);
    });

    // Apply filter and pagination on load
    filterPublications();
});
