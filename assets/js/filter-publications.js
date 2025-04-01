document.addEventListener("DOMContentLoaded", function () {
    const journalFilter = document.getElementById("journalFilter");
    const conferenceFilter = document.getElementById("conferenceFilter");
    const selectAll = document.getElementById("selectAll");

    function filterPublications() {
        let hasJournal = journalFilter.checked;
        let hasConference = conferenceFilter.checked;

        // Loop through all publications to filter based on the checked checkboxes
        document.querySelectorAll(".publication").forEach(pub => {
            const category = pub.getAttribute("data-category");
            const isJournal = category.includes("journal") || category.includes("manuscripts");
            const isConference = category.includes("conference");

            // Display publication content if its category matches the selected filters
            if ((hasJournal && isJournal) || (hasConference && isConference)) {
                pub.classList.remove("hidden", "fade-out");
                pub.classList.add("fade-in");
            } else {
                pub.classList.add("fade-out");
                setTimeout(() => pub.classList.add("hidden"), 300); // Wait for animation
            }
        });

        // Hide category titles if no matching publications are visible
        document.querySelectorAll(".category-title").forEach(title => {
            const category = title.getAttribute("data-category");
            const hasVisible = [...document.querySelectorAll(`.publication[data-category='${category}']`)]
                .some(pub => !pub.classList.contains("hidden"));
            title.style.display = hasVisible ? "block" : "none";
        });

        // Update Select All checkbox state
        selectAll.checked = hasJournal && hasConference;
    }

    // Select All functionality
    selectAll.addEventListener("change", function () {
        let isChecked = this.checked;
        journalFilter.checked = isChecked;
        conferenceFilter.checked = isChecked;
        filterPublications();
    });

    journalFilter.addEventListener("change", filterPublications);
    conferenceFilter.addEventListener("change", filterPublications);

    filterPublications(); // Apply initial filter
});
