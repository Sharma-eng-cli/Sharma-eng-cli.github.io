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

<!-- 📅 MONTH FILTER -->
<div class="month-filter" style="display: flex; justify-content: center; align-items: center; gap: 15px; margin-top: 20px; flex-wrap: wrap;">
  <label for="filter-month" style="font-size: 18px;">Select Month:</label>
  <input type="month" id="filter-month" style="padding: 5px; font-size: 16px;" />
  <button id="applyMonthFilter" style="padding: 5px 15px; font-size: 16px;">Apply Month Filter</button>
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




