document.addEventListener("DOMContentLoaded", function () {
    const selectAll = document.getElementById("selectAll");
    const journalFilter = document.getElementById("journalFilter");
    const conferenceFilter = document.getElementById("conferenceFilter");
    const publications = document.querySelectorAll(".publication");
    const categoryTitles = document.querySelectorAll(".category-title");

    function filterPublications() {
        const showJournals = journalFilter.checked;
        const showConferences = conferenceFilter.checked;

        publications.forEach(pub => {
            const category = pub.getAttribute("data-category");
            if ((category === "journal" && showJournals) || (category === "conference" && showConferences)) {
                pub.style.display = "block";
            } else {
                pub.style.display = "none";
            }
        });

        // Hide category titles if all their publications are hidden
        categoryTitles.forEach(title => {
            const category = title.getAttribute("data-category");
            const hasVisiblePublications = [...publications].some(
                pub => pub.getAttribute("data-category") === category && pub.style.display === "block"
            );

            if (hasVisiblePublications) {
                title.style.display = "block";
                title.nextElementSibling.style.display = "block"; // Keep the <hr />
            } else {
                title.style.display = "none";
                title.nextElementSibling.style.display = "none"; // Hide the <hr />
            }
        });
    }

    // Event listeners for checkboxes
    selectAll.addEventListener("change", function () {
        const checked = selectAll.checked;
        journalFilter.checked = checked;
        conferenceFilter.checked = checked;
        filterPublications();
    });

    journalFilter.addEventListener("change", function () {
        filterPublications();
        selectAll.checked = journalFilter.checked && conferenceFilter.checked;
    });

    conferenceFilter.addEventListener("change", function () {
        filterPublications();
        selectAll.checked = journalFilter.checked && conferenceFilter.checked;
    });

    // Initial filtering on page load
    filterPublications();
});
