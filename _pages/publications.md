---
layout: archive
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
  <label><input type="checkbox" id="selectAll"> Select All</label>
  <label><input type="checkbox" id="manuscript" data-category="journal"> Journals</label>
  <label><input type="checkbox" id="conference" data-category="conference"> Conferences</label>
</div>

{% capture publications_content %}
{% include pub-filter.md %}
{% endcapture %}

{{ publications_content | markdownify }}

{% capture publications_content %}
{% include all_publications.md %}
{% endcapture %}

{{ publications_content | markdownify }}




