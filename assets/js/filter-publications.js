document.addEventListener("DOMContentLoaded", function () {
    const journalFilter = document.getElementById("journalFilter");
    const conferenceFilter = document.getElementById("conferenceFilter");
    const selectAll = document.getElementById("selectAll");
    const publications = document.querySelectorAll(".publication");

    function filterPublications() {
        const hasJournal = journalFilter.checked;
        const hasConference = conferenceFilter.checked;

        publications.forEach(pub => {
            const category = pub.getAttribute("data-category").toLowerCase();
            const isJournal = category.includes("journal") || category.includes("manuscript");
            const isConference = category.includes("conference");

            if ((hasJournal && isJournal) || (hasConference && isConference)) {
                pub.classList.remove("hidden", "fade-out");
                pub.classList.add("fade-in");
            } else {
                pub.classList.add("fade-out");
                setTimeout(() => pub.classList.add("hidden"), 300);
            }
        });

        // Ensure headings are always visible
        document.querySelectorAll(".category-title").forEach(title => {
            title.style.display = "block"; // Always show the headings
            if (title.nextElementSibling && title.nextElementSibling.tagName === "HR") {
                title.nextElementSibling.style.display = "block"; // Ensure HR is visible
            }
        });

        // Update Select All checkbox state
        selectAll.checked = hasJournal && hasConference;
    }

    selectAll.addEventListener("change", function () {
        const isChecked = this.checked;
        journalFilter.checked = isChecked;
        conferenceFilter.checked = isChecked;
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

    setTimeout(filterPublications, 500); // Ensure Filtering is applied after publications are loaded 
});
