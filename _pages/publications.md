---
layout: default
title: "Publications"
permalink: /publications/
author_profile: true
pagination: 
  enabled: true
  per_page: 10
  collection: publications
  categories: ["manuscripts", "conferences"]
---
<div class="filter-container">
    <input type="checkbox" id="selectAll"> <label for="selectAll">Select All</label>
    <input type="checkbox" id="journalFilter"> <label for="journalFilter">Journals</label>
    <input type="checkbox" id="conferenceFilter"> <label for="conferenceFilter">Conferences</label>
</div>
<div class="sidebar">
  {% include author-profile.html %}
</div>

{% include all_publications.md %}