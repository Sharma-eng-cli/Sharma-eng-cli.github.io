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

{% include all-publications.md %}

{% include all_publications.md %}