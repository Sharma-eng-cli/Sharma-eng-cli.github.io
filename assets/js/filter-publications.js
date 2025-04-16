document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".filter-container input[type='checkbox']");
    const selectAll = document.getElementById("selectAll");
    const publications = Array.from(document.querySelectorAll("#journal-publications .publication, #conference-publications .publication"));
  
    const filterMonthInput = document.getElementById("filter-month");
    const applyMonthBtn = document.getElementById("applyMonthFilter");
  
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
  
      const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        currentPage = 1;
      }
  
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
  
      filteredPublications.slice(startIdx, endIdx).forEach(pub => pub.style.display = "block");
  
      updatePaginationControls();
    }
  
    function parsePubDate(pubElement) {
      const dateElement = pubElement.querySelector(".pub-date");
      if (!dateElement) return null;
      const text = dateElement.textContent.trim();
      return new Date(text);
    }
  
    function filterPublications() {
      const selectedCategories = Array.from(checkboxes)
        .filter(cb => cb.checked && cb.id !== "selectAll")
        .map(cb => cb.getAttribute("data-category"));
  
      const selectedMonthValue = filterMonthInput ? filterMonthInput.value : null;
      let selectedYear = null;
      let selectedMonth = null;
      if (selectedMonthValue) {
        [selectedYear, selectedMonth] = selectedMonthValue.split("-");
      }
  
      filteredPublications = publications.filter(pub => {
        const pubCategories = pub.getAttribute("data-category").split(" ");
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => pubCategories.includes(cat));
  
        const pubDate = parsePubDate(pub);
        const matchesMonth = selectedMonth && selectedYear
          ? pubDate && (pubDate.getFullYear().toString() === selectedYear && (pubDate.getMonth() + 1).toString().padStart(2, '0') === selectedMonth)
          : true;
  
        return matchesCategory && matchesMonth;
      });
  
      const allChecked = checkboxes.length - 1 === selectedCategories.length;
      selectAll.checked = allChecked;
  
      currentPage = 1;
      showPage(currentPage);
    }
  
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
  
    if (selectAll) {
      selectAll.addEventListener("change", function () {
        checkboxes.forEach(cb => (cb.checked = selectAll.checked));
        filterPublications();
      });
    }
  
    checkboxes.forEach(cb => {
      cb.addEventListener("change", filterPublications);
    });
  
    if (applyMonthBtn) {
      applyMonthBtn.addEventListener("click", filterPublications);
    }
  
    // Initial load
    filterPublications();
  });
  