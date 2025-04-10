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