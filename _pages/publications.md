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

<!-- 📌 Filter Type Toggle Dropdown -->
<div class="calendar-filter-container">
  <form id="calendarFilterForm">
    <label for="filter-type">Select Filter Type:</label>
    <select id="filter-type" name="filter-type">
      <option value="monthOnly">Month Only</option>
      <option value="monthYear">Month + Year</option>
    </select>

    <!-- 📅 Month Only Filter -->
  <div id="month-only-container" class="filter-group">
      <label for="filter-month-only">Select Month:</label>
      <input type="month" id="filter-month-only" name="filter-month-only" />
      <button type="button" id="applyMonthOnlyFilter">Apply Filter</button>
    </div>

    <!-- 📅 Month + Year Filter -->
  <div id="month-year-container" class="filter-group" style="display: none;">
      <label for="filter-month-year">Select Month and Year:</label>
      <input type="month" id="filter-month-year" name="filter-month-year" />
      <button type="button" id="applyMonthYearFilter">Apply Filter</button>
    </div>
  </form>
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




