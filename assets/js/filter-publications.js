// === JS: filter-publications.js ===
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".filter-container input[type='checkbox']");
    const selectAll = document.getElementById("selectAll");
    const publications = Array.from(document.querySelectorAll("#journal-publications .publication, #conference-publications .publication"));
  
    const filterTypeSelect = document.getElementById("filter-type");
    const monthOnlyContainer = document.getElementById("month-only-container");
    const monthYearContainer = document.getElementById("month-year-container");
    const yearOnlyContainer = document.getElementById("year-only-container");
  
    const filterMonthOnlyInput = document.getElementById("filter-month-only");
    const applyMonthOnlyFilterBtn = document.getElementById("applyMonthOnlyFilter");
  
    const filterMonthYearInput = document.getElementById("filter-month-year");
    const applyMonthYearFilterBtn = document.getElementById("applyMonthYearFilter");
  
    const filterYearOnlyInput = document.getElementById("filter-year-only");
    const applyYearOnlyFilterBtn = document.getElementById("applyYearOnlyFilter");
  
    const filterMonthInput = document.getElementById("filter-month");
    const applyMonthBtn = document.getElementById("applyMonthFilter");
  
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("page-info");
  
    const itemsPerPage = 10;
    let currentPage = 1;
    let filteredPublications = [...publications];
  
    // Populate Year dropdown
    const years = [...new Set(publications.map(pub => {
      const dateElem = pub.querySelector(".pub-date");
      if (!dateElem) return null;
      const pubDate = new Date(dateElem.textContent.trim());
      return pubDate.getFullYear().toString();
    }))].filter(Boolean).sort((a, b) => b - a);
  
    years.forEach(year => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      filterYearOnlyInput.appendChild(option);
    });
  
    if (filterTypeSelect) {
      filterTypeSelect.addEventListener("change", () => {
        const selected = filterTypeSelect.value;
        monthOnlyContainer.style.display = selected === "monthOnly" ? "flex" : "none";
        monthYearContainer.style.display = selected === "monthYear" ? "flex" : "none";
        yearOnlyContainer.style.display = selected === "yearOnly" ? "flex" : "none";
  
        filterMonthOnlyInput.value = "";
        filterMonthYearInput.value = "";
        filterYearOnlyInput.value = "";
      });
    }
  
    function updatePaginationControls() {
      const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
      pageInfo.textContent = totalPages === 0 ? "No publications found." : `Page ${currentPage} of ${totalPages}`;
      prevBtn.disabled = currentPage === 1 || totalPages === 0;
      nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
    }
  
    function showPage(page) {
      currentPage = page;
      publications.forEach(pub => pub.style.display = "none");
      const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
      if (currentPage > totalPages && totalPages > 0) currentPage = 1;
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      filteredPublications.slice(startIdx, endIdx).forEach(pub => pub.style.display = "block");
      updatePaginationControls();
    }
  
    function filterPublications() {
      const selectedCategories = Array.from(checkboxes)
        .filter(cb => cb.checked && cb.id !== "selectAll")
        .map(cb => cb.getAttribute("data-category"));
  
      filteredPublications = publications.filter(pub => {
        const pubCategories = pub.getAttribute("data-category").split(" ");
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => pubCategories.includes(cat));
        return matchesCategory;
      });
  
      const selectedMonthOnly = filterMonthOnlyInput.value;
      if (selectedMonthOnly) {
        const selectedMonthNum = selectedMonthOnly.split("-")[1];
        filteredPublications = filteredPublications.filter(pub => {
          const pubDateElem = pub.querySelector(".pub-date");
          const pubDate = new Date(pubDateElem.textContent.trim());
          return (pubDate.getMonth() + 1).toString().padStart(2, "0") === selectedMonthNum;
        });
      }
  
      const selectedMonthYear = filterMonthYearInput.value;
      if (selectedMonthYear) {
        const [year, month] = selectedMonthYear.split("-");
        filteredPublications = filteredPublications.filter(pub => {
          const pubDateElem = pub.querySelector(".pub-date");
          const pubDate = new Date(pubDateElem.textContent.trim());
          return pubDate.getFullYear().toString() === year && (pubDate.getMonth() + 1).toString().padStart(2, "0") === month;
        });
      }
  
      const selectedYearOnly = filterYearOnlyInput.value;
      if (selectedYearOnly) {
        filteredPublications = filteredPublications.filter(pub => {
          const pubDateElem = pub.querySelector(".pub-date");
          const pubDate = new Date(pubDateElem.textContent.trim());
          return pubDate.getFullYear().toString() === selectedYearOnly;
        });
      }
  
      const allChecked = checkboxes.length - 1 === selectedCategories.length;
      selectAll.checked = allChecked;
  
      currentPage = 1;
      showPage(currentPage);
    }
  
    function disableOtherFilter(selectedFilter) {
      filterMonthOnlyInput.disabled = selectedFilter !== "monthOnly";
      applyMonthOnlyFilterBtn.disabled = selectedFilter !== "monthOnly";
  
      filterMonthYearInput.disabled = selectedFilter !== "monthYear";
      applyMonthYearFilterBtn.disabled = selectedFilter !== "monthYear";
  
      filterYearOnlyInput.disabled = selectedFilter !== "yearOnly";
      applyYearOnlyFilterBtn.disabled = selectedFilter !== "yearOnly";
    }
  
    if (applyMonthOnlyFilterBtn) {
      applyMonthOnlyFilterBtn.addEventListener("click", function () {
        disableOtherFilter("monthOnly");
        filterPublications();
      });
    }
  
    if (applyMonthYearFilterBtn) {
      applyMonthYearFilterBtn.addEventListener("click", function () {
        disableOtherFilter("monthYear");
        filterPublications();
      });
    }
  
    if (applyYearOnlyFilterBtn) {
      applyYearOnlyFilterBtn.addEventListener("click", function () {
        disableOtherFilter("yearOnly");
        filterPublications();
      });
    }
  
    if (applyMonthBtn) {
      applyMonthBtn.addEventListener("click", filterPublications);
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
  
    filterPublications();
  });
  