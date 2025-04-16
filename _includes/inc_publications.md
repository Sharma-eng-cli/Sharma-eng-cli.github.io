
<h2>Journal Papers</h2>
<ul id="journal-publications">
  {% for pub in site.publications %}
    {% assign categories = pub.categories | join: ' ' %}
    {% if categories contains "journal" %}
      <li class="publication" data-category="journal">
        <strong><a href="{{ pub.pdf }}">{{ pub.title }}</a></strong><br>
        <em>{{ pub.author }}</em><br>
        📅 📅 <strong>Date:</strong> <span class="pub-date">{{ pub.date | date: "%B %d, %Y" }}</span><br>
        🏛 <strong>Venue:</strong> {{ pub.venue }}<br>
        {% if pub.slides %}
          📄 <a href="{{ pub.slides }}">Slides</a> |
        {% endif %}
        📖 Citation: <em>{{ pub.citation }}</em><br>
        {% if pub.excerpt %}
          📝 <em>Excerpt:</em> {{ pub.excerpt }}<!--more--> 
        {% endif %}
      </li>
    {% endif %}
  {% endfor %}
</ul>

<h2>Conference Papers</h2>
<ul id="conference-publications">
  {% for pub in site.publications %}
    {% assign categories = pub.categories | join: ' ' %}
    {% if categories contains "conference" %}
      <li class="publication" data-category="conference">
        <strong><a href="{{ pub.pdf }}">{{ pub.title }}</a></strong><br>
        <em>{{ pub.author }}</em><br>
        📅 <strong>Date:</strong> <span class="pub-date">{{ pub.date | date: "%B %d, %Y" }}</span><br>
        🏛 <strong>Venue:</strong> {{ pub.venue }}<br>
        {% if pub.slides %}
          📄 <a href="{{ pub.slides }}">Slides</a> |
        {% endif %}
        📖 Citation: <em>{{ pub.citation }}</em><br>
        {% if pub.excerpt %}
          📝 <em>Excerpt:</em> {{ pub.excerpt }}<!--more--> 
        {% endif %}
      </li>
    {% endif %}
  {% endfor %}
</ul>

{% include all_publications.md %}

