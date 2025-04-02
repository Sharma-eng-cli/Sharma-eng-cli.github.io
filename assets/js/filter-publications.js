document.addEventListener("DOMContentLoaded", function () {
    const journalFilter = document.getElementById("journalFilter");
    const conferenceFilter = document.getElementById("conferenceFilter");
    const selectAll = document.getElementById("selectAll");

    function filterPublications() {
        const hasJournal = journalFilter.checked;
        const hasConference = conferenceFilter.checked;

        // Loop through all publications and apply filtering
        document.querySelectorAll(".publication").forEach(pub => {
            const category = pub.getAttribute("data-category").toLowerCase();
            const isJournal = category.includes("journal") || category.includes("manuscript");
            const isConference = category.includes("conference");

            if ((hasJournal && isJournal) || (hasConference && isConference)) {
                pub.classList.remove("hidden", "fade-out");
                pub.classList.add("fade-in");
            } else {
                pub.classList.add("fade-out");
                setTimeout(() => pub.classList.add("hidden"), 300); // Delay to allow fade-out animation
            }
        });

        // Hide category titles if no publications are visible
        document.querySelectorAll(".category-title").forEach(title => {
            const category = title.getAttribute("data-category").toLowerCase();
            const hasVisible = [...document.querySelectorAll(`.publication[data-category='${category}']`)]
                .some(pub => !pub.classList.contains("hidden"));

            if (hasVisible) {
                title.style.display = "block";
                if (title.nextElementSibling.tagName === "HR") {
                    title.nextElementSibling.style.display = "block"; // Keep HR if title is visible
                }
            } else {
                title.style.display = "none";
                if (title.nextElementSibling.tagName === "HR") {
                    title.nextElementSibling.style.display = "none"; // Hide HR if no publications
                }
            }
        });

        // Update "Select All" checkbox based on the individual checkboxes
        selectAll.checked = hasJournal && hasConference;
    }

    // Select All functionality
    selectAll.addEventListener("change", function () {
        const isChecked = this.checked;
        journalFilter.checked = isChecked;
        conferenceFilter.checked = isChecked;
        filterPublications();
    });

    // Individual checkbox event listeners
    journalFilter.addEventListener("change", filterPublications);
    conferenceFilter.addEventListener("change", filterPublications);

    filterPublications(); // Apply initial filtering on page load
});
