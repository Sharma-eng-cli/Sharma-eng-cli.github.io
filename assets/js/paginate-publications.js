document.addEventListener("DOMContentLoaded", function () {
    const publicationsContainer = document.getElementById("publications");
    const allPublications = Array.from(publicationsContainer.children);
    const itemsPerPage = 5; // Adjust as needed
    let currentPage = 1;
    const totalPages = Math.ceil(allPublications.length / itemsPerPage);

    document.addEventListener("DOMContentLoaded", function () {
        let prevButton = document.querySelector(".prev");
        let nextButton = document.querySelector(".next");
      
        if (prevButton) {
          prevButton.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = prevButton.href;
          });
        }
      
        if (nextButton) {
          nextButton.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = nextButton.href;
          });
        }
      });
      

    function showPage(page) {
        // Hide all publications first
        allPublications.forEach(pub => pub.style.display = "none");

        // Show only the current page's publications
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        allPublications.slice(start, end).forEach(pub => pub.style.display = "block");

        // Update pagination controls
        document.getElementById("page-info").textContent = `Page ${page} of ${totalPages}`;
        document.getElementById("prevPage").disabled = (page === 1);
        document.getElementById("nextPage").disabled = (page === totalPages);
    }

    // Pagination button events
    document.getElementById("prevPage").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById("nextPage").addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Show the first page on load
    showPage(currentPage);
});
