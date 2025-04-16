document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".filter-container input[type='checkbox']");
    const selectAll = document.getElementById("selectAll");
    const publications = Array.from(document.querySelectorAll("#journal-publications .publication, #conference-publications .publication"));
  
    // Filter containers and inputs
    const filterTypeSelect = document.getElementById("filter-type");
    const monthOnlyContainer = document.getElementById("month-only-container");
    const monthYearContainer = document.getElementById("month-year-container");
  
    const filterMonthOnlyInput = document.getElementById("filter-month-only");
    const applyMonthOnlyFilterBtn = document.getElementById("applyMonthOnlyFilter");
  
    const filterMonthYearInput = document.getElementById("filter-month-year");
    const applyMonthYearFilterBtn = document.getElementById("applyMonthYearFilter");
  
    const filterMonthInput = document.getElementById("filter-month");
    const applyMonthBtn = document.getElementById("applyMonthFilter");
  
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("page-info");
  
    const itemsPerPage = 10;
    let currentPage = 1;
    let filteredPublications = [...publications];
  
    // Handle toggling between filter types (dropdown)
    if (filterTypeSelect) {
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
    }
  
    // Update pagination controls
    function updatePaginationControls() {
      const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
      if (pageInfo) {
        pageInfo.textContent = totalPages === 0 ? "No publications found." : `Page ${currentPage} of ${totalPages}`;
      }
      if (prevBtn) prevBtn.disabled = (currentPage === 1 || totalPages === 0);
      if (nextBtn) nextBtn.disabled = (currentPage >= totalPages || totalPages === 0);
    }
  
    // Show publications for the current page
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
  
    // Parse publication date
    function parsePubDate(pubElement) {
      const dateElement = pubElement.querySelector(".pub-date");
      if (!dateElement) return null;
      const text = dateElement.textContent.trim();
      return new Date(text);
    }
  
    // Main filtering logic
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
  
      // Filter for Month-Only
      const selectedMonthOnly = filterMonthOnlyInput.value;
      if (selectedMonthOnly) {
        const selectedMonthNum = selectedMonthOnly.split("-")[1]; // Get month
        filteredPublications = filteredPublications.filter(pub => {
          const pubDateElem = pub.querySelector(".pub-date");
          const pubDate = new Date(pubDateElem.textContent.trim());
          const pubMonth = (pubDate.getMonth() + 1).toString().padStart(2, "0");
          return pubMonth === selectedMonthNum;
        });
      }
  
      // Filter for Month + Year
      const selectedMonthYear = filterMonthYearInput.value;
      if (selectedMonthYear) {
        const selectedMonthNum = selectedMonthYear.split("-")[1];
        const selectedYear = selectedMonthYear.split("-")[0];
        filteredPublications = filteredPublications.filter(pub => {
          const pubDateElem = pub.querySelector(".pub-date");
          const pubDate = new Date(pubDateElem.textContent.trim());
          const pubMonth = (pubDate.getMonth() + 1).toString().padStart(2, "0");
          const pubYear = pubDate.getFullYear().toString();
          return pubMonth === selectedMonthNum && pubYear === selectedYear;
        });
      }
  
      const allChecked = checkboxes.length - 1 === selectedCategories.length;
      selectAll.checked = allChecked;
  
      currentPage = 1;
      showPage(currentPage);
    }
  
    // Disable the other filter when one is used
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
  
    // Event listeners for Month-Only
    if (applyMonthOnlyFilterBtn) {
      applyMonthOnlyFilterBtn.addEventListener("click", function () {
        disableOtherFilter("monthOnly");
        filterPublications();
      });
    }
  
    // Event listeners for Month+Year
    if (applyMonthYearFilterBtn) {
      applyMonthYearFilterBtn.addEventListener("click", function () {
        disableOtherFilter("monthYear");
        filterPublications();
      });
    }
  
    // Category + general month input
    if (applyMonthBtn) {
      applyMonthBtn.addEventListener("click", filterPublications);
    }
  
    // Pagination buttons
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
  
    // Select All checkbox logic
    if (selectAll) {
      selectAll.addEventListener("change", function () {
        checkboxes.forEach(cb => (cb.checked = selectAll.checked));
        filterPublications();
      });
    }
  
    // Individual checkbox listeners
    checkboxes.forEach(cb => {
      cb.addEventListener("change", filterPublications);
    });
  
    // Initial filter
    filterPublications();
  });
  