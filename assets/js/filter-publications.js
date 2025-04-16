document.addEventListener("DOMContentLoaded", function () {
    const filterTypeSelect = document.getElementById("filter-type");
    const monthOnlyContainer = document.getElementById("month-only-container");
    const monthYearContainer = document.getElementById("month-year-container");
  
    const filterMonthOnlyInput = document.getElementById("filter-month-only");
    const applyMonthOnlyFilterBtn = document.getElementById("applyMonthOnlyFilter");
  
    const filterMonthYearInput = document.getElementById("filter-month-year");
    const applyMonthYearFilterBtn = document.getElementById("applyMonthYearFilter");
  
    const checkboxes = document.querySelectorAll(".filter-container input[type='checkbox']");
    const selectAll = document.getElementById("selectAll");
    const publications = Array.from(document.querySelectorAll("#journal-publications .publication, #conference-publications .publication"));
  
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("page-info");
  
    const itemsPerPage = 10;
    let currentPage = 1;
    let filteredPublications = [...publications];
  
    // Toggle between filter types
    filterTypeSelect.addEventListener("change", () => {
      const selected = filterTypeSelect.value;
      if (selected === "monthOnly") {
        monthOnlyContainer.style.display = "flex";
        monthYearContainer.style.display = "none";
        filterMonthYearInput.value = "";
      } else if (selected === "monthYear") {
        monthOnlyContainer.style.display = "none";
        monthYearContainer.style.display = "flex";
        filterMonthOnlyInput.value = "";
      }
    });
  
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
      return new Date(dateElement.textContent.trim());
    }
  
    function filterPublications() {
      const selectedCategories = Array.from(checkboxes)
        .filter(cb => cb.checked && cb.id !== "selectAll")
        .map(cb => cb.getAttribute("data-category"));
  
      const monthOnlyVal = filterMonthOnlyInput.value;
      const monthYearVal = filterMonthYearInput.value;
  
      filteredPublications = publications.filter(pub => {
        const pubCategories = pub.getAttribute("data-category").split(" ");
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => pubCategories.includes(cat));
  
        const pubDate = parsePubDate(pub);
        if (!pubDate) return false;
  
        const pubMonth = (pubDate.getMonth() + 1).toString().padStart(2, '0');
        const pubYear = pubDate.getFullYear().toString();
  
        // Apply Month-Only filtering
        if (monthOnlyVal) {
          return pubMonth === monthOnlyVal;
        }
  
        // Apply Month + Year filtering
        if (monthYearVal) {
          const [selectedYear, selectedMonth] = monthYearVal.split("-");
          return pubMonth === selectedMonth && pubYear === selectedYear;
        }
  
        return matchesCategory;
      });
  
      const allChecked = checkboxes.length - 1 === selectedCategories.length;
      if (selectAll) selectAll.checked = allChecked;
  
      currentPage = 1;
      showPage(currentPage);
    }
  
    function disableOtherFilter(selectedFilter) {
      if (selectedFilter === "monthOnly") {
        filterMonthYearInput.disabled = true;
        applyMonthYearFilterBtn.disabled = true;
        filterMonthOnlyInput.disabled = false;
        applyMonthOnlyFilterBtn.disabled = false;
      } else if (selectedFilter === "monthYear") {
        filterMonthOnlyInput.disabled = true;
        applyMonthOnlyFilterBtn.disabled = true;
        filterMonthYearInput.disabled = false;
        applyMonthYearFilterBtn.disabled = false;
      }
    }
  
    // Filter button handlers
    if (applyMonthOnlyFilterBtn) {
      applyMonthOnlyFilterBtn.addEventListener("click", () => {
        disableOtherFilter("monthOnly");
        filterPublications();
      });
    }
  
    if (applyMonthYearFilterBtn) {
      applyMonthYearFilterBtn.addEventListener("click", () => {
        disableOtherFilter("monthYear");
        filterPublications();
      });
    }
  
    // Pagination controls
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentPage > 1) showPage(currentPage - 1);
      });
    }
  
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
        if (currentPage < totalPages) showPage(currentPage + 1);
      });
    }
  
    // Category checkbox filtering
    if (selectAll) {
      selectAll.addEventListener("change", function () {
        checkboxes.forEach(cb => (cb.checked = selectAll.checked));
        filterPublications();
      });
    }
  
    checkboxes.forEach(cb => {
      cb.addEventListener("change", filterPublications);
    });
  
    // Initial filter
    filterPublications();
  });
  