document.addEventListener("DOMContentLoaded", function () {
    const journalFilter = document.getElementById("journalFilter");
    const conferenceFilter = document.getElementById("conferenceFilter");
    const selectAll = document.getElementById("selectAll");

    function filterPublications() {
        let hasJournal = journalFilter.checked;
        let hasConference = conferenceFilter.checked;

        // Iterate through each publication to apply the correct filtering
        document.querySelectorAll(".publication").forEach(pub => {
            const category = pub.getAttribute("data-category");
            const isJournal = category.includes("journal");
            const isConference = category.includes("conference");

            // Show all publications, but organize based on filters
            if ((hasJournal && isJournal) || (hasConference && isConference) || (hasJournal && hasConference)) {
                pub.classList.remove("hidden", "fade-out");
                pub.classList.add("fade-in");
            } else {
                // If the publication is not part of the selected filter category, it gets faded out
                pub.classList.add("fade-out");
                setTimeout(() => pub.classList.add("hidden"), 300); // Wait for fade-out animation to complete
            }
        });

        // Hide category titles if no matching publications
        document.querySelectorAll(".category-title").forEach(title => {
            const category = title.getAttribute("data-category");
            const hasVisible = [...document.querySelectorAll(`.publication[data-category='${category}']`)]
                .some(pub => !pub.classList.contains("hidden"));
            title.style.display = hasVisible ? "block" : "none";
        });

        // Ensure "Select All" checkbox reflects the state of both filters
        selectAll.checked = hasJournal && hasConference;
    }

    // Select All functionality
    selectAll.addEventListener("change", function () {
        let isChecked = this.checked;
        journalFilter.checked = isChecked;
        conferenceFilter.checked = isChecked;
        filterPublications();
    });

    // Event listeners for the individual category checkboxes
    journalFilter.addEventListener("change", filterPublications);
    conferenceFilter.addEventListener("change", filterPublications);

    // Apply the filter on page load
    filterPublications(); 
});
