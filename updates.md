---
layout: default
title: Updates
permalink: /updates/
---

<h1>All Updates</h1>
<ul>
  {% assign all_updates = site.updates | sort: "date" | reverse %}
  {% for update in all_updates %}
    <li>
      <span>{{ update.date | date: "%b %d, %Y" }}</span> –
      <a href="{{ update.url }}">{{ update.title }}</a>
    </li>
  {% endfor %}
</ul>
