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

<ul id="publications-list">
  {% for pub in site.publications %}
    {% assign categories = pub.categories | join: ' ' %}
    {% if categories contains "manuscripts" or categories contains "conferences" %}
      <li class="publication" data-category="{{ categories }}">
        <strong><a href="{{ pub.url }}">{{ pub.title }}</a></strong><br>
        <em>{{ pub.author }}</em><br>
        📅 <strong>Date:</strong> {{ pub.date | date: "%B %d, %Y" }}<br>
        🏛 <strong>Venue:</strong> {{ pub.venue }}<br>
      </li>
    {% endif %}
  {% endfor %}
</ul>

{% capture publications_content %}
{% include all_publications.md %}
{% endcapture %}

{{ publications_content | markdownify }}




