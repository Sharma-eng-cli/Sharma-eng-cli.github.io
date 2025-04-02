document.addEventListener("DOMContentLoaded", function () {
    const journalFilter = document.getElementById("journalFilter");
    const conferenceFilter = document.getElementById("conferenceFilter");
    const selectAll = document.getElementById("selectAll");
    const publications = document.querySelectorAll(".publication");
    const categoryTitles = document.querySelectorAll(".category-title");

    function filterPublications() {
        const hasJournal = journalFilter.checked;
        const hasConference = conferenceFilter.checked;

        let hasVisibleJournals = false;
        let hasVisibleConferences = false;

        publications.forEach(pub => {
            const category = pub.getAttribute("data-category").toLowerCase();
            const isJournal = category.includes("journal") || category.includes("manuscript");
            const isConference = category.includes("conference");

            if ((hasJournal && isJournal) || (hasConference && isConference)) {
                pub.classList.remove("hidden", "fade-out");
                pub.classList.add("fade-in");
                if (isJournal) hasVisibleJournals = true;
                if (isConference) hasVisibleConferences = true;
            } else {
                pub.classList.add("fade-out");
                setTimeout(() => pub.classList.add("hidden"), 300);
            }
        });

        categoryTitles.forEach(title => {
            const category = title.getAttribute("data-category").toLowerCase();
            const hasVisible = (category === "journal" && hasVisibleJournals) || 
                               (category === "conference" && hasVisibleConferences);

            title.style.display = hasVisible ? "block" : "none";
            if (title.nextElementSibling && title.nextElementSibling.tagName === "HR") {
                title.nextElementSibling.style.display = hasVisible ? "block" : "none";
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

    filterPublications(); // Initially filter to hide all publications
});
