---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
pagination: 
  enabled: true
  per_page: 10
  collection: publications
  categories: ["journal", "conference"]
---
<div class="filter-container" style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 22px;">
  <label style="display: flex; align-items: center; gap: 5px; font-size: 22px;">
    <input type="checkbox" id="selectAll" style="width: 22px; height: 22px;"> Select All
  </label>
  <label style="display: flex; align-items: center; gap: 5px; font-size: 22px;">
    <input type="checkbox" id="journal" data-category="journal" style="width: 22px; height: 22px;"> Journals
  </label>
  <label style="display: flex; align-items: center; gap: 5px; font-size: 22px;">
    <input type="checkbox" id="conference" data-category="conference" style="width: 22px; height: 22px;"> Conferences
  </label>
</div>

<div class="calendar-filter-container">
  <!-- Dropdown to choose filter type -->
  <label for="filter-type">Filter By:</label>
  <select id="filter-type">
    <option value="monthOnly">Month Only</option>
    <option value="monthYear">Month + Year</option>
  </select>

  <!-- Month-Only Filter -->
  <div id="month-only-container" style="display: flex; gap: 8px; align-items: center;">
    <label for="filter-month-only">Month:</label>
    <select id="filter-month-only">
      <option value="">Select Month</option>
      <option value="01">January</option>
      <option value="02">February</option>
      <option value="03">March</option>
      <option value="04">April</option>
      <option value="05">May</option>
      <option value="06">June</option>
      <option value="07">July</option>
      <option value="08">August</option>
      <option value="09">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
    <button id="applyMonthOnlyFilter">Apply</button>
  </div>

<!-- Month + Year Filter -->
<div id="month-year-container" style="display: none; gap: 8px; align-items: center; max-width: 360px; flex-wrap: wrap;">
  <label for="filter-month-year">Month + Year:</label>
  <input type="month" id="filter-month-year">
  <button id="applyMonthYearFilter">Apply</button>
</div>

</div>



{% capture publications_content %}
{% include all_publications.md %}
{% endcapture %}

{{ publications_content | markdownify }}

<!-- 📄 PAGINATION -->
<div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 25px;">
  <button id="prevPage" style="padding: 6px 12px; font-size: 14px;">Previous</button>
  <span id="page-info" style="font-size: 16px; font-weight: bold;">Loading...</span>
  <button id="nextPage" style="padding: 6px 12px; font-size: 14px;">Next</button>
</div>




