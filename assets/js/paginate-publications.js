document.addEventListener("DOMContentLoaded", function () {
  const publicationsContainer = document.getElementById("publications");
  if (!publicationsContainer) return; // Exit if the container is missing

  const allPublications = Array.from(publicationsContainer.querySelectorAll(".publication"));
  const itemsPerPage = 10; // Set items per page
  let currentPage = 1;
  let filteredPublications = [...allPublications]; // Store filtered publications

  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");
  const pageInfo = document.getElementById("page-info");

  if (!prevPage || !nextPage || !pageInfo) return; // Stop execution if pagination controls are missing

  function updatePaginationControls() {
      const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
      
      if (filteredPublications.length === 0) {
          pageInfo.textContent = "No publications available.";
          prevPage.style.display = "none";
          nextPage.style.display = "none";
      } else {
          pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
          prevPage.style.display = "inline-block";
          nextPage.style.display = "inline-block";

          prevPage.disabled = (currentPage === 1);
          nextPage.disabled = (currentPage >= totalPages || totalPages === 0);
      }
  }

  function showPage(page) {
      const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);

      if (filteredPublications.length === 0) {
          allPublications.forEach(pub => pub.style.display = "none");
          updatePaginationControls();
          return;
      }

      currentPage = Math.max(1, Math.min(page, totalPages));

      allPublications.forEach(pub => pub.style.display = "none");
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      filteredPublications.slice(start, end).forEach(pub => pub.style.display = "block");

      updatePaginationControls();
  }

  prevPage.addEventListener("click", function () {
      if (currentPage > 1) {
          showPage(currentPage - 1);
      }
  });

  nextPage.addEventListener("click", function () {
      const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
      if (currentPage < totalPages) {
          showPage(currentPage + 1);
      }
  });

  // Show the first page on load
  showPage(currentPage);
});
