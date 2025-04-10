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

<div class="filter-container">
  <label><input type="checkbox" id="selectAll"> Select All</label>
  <label><input type="checkbox" id="journal"  data-category="journal"> Journals</label>
  <label><input type="checkbox" id="conference" data-category="conference"> Conferences</label>
</div>

{% capture publications_content %}
{% include all_publications.md %}
{% endcapture %}

{{ publications_content | markdownify }}




