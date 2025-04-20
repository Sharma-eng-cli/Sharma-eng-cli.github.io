---
layout: default
title: "People"
permalink: /people/
---

{% capture people_content %}
  {% include people.html %}
{% endcapture %}

{{ people_content | markdownify }}
