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
<div class="filter-container" style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 20px;">
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

{% capture publications_content %}
{% include all_publications.md %}
{% endcapture %}

{{ publications_content | markdownify }}




