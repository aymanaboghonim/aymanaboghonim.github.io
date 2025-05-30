---
layout: page
permalink: /blog/
title: blog
description: AI/ML insights, career development, and practical tech solutions
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3  # The number of links after the current page
---

<div class="post">

  {% assign blog_name_size = site.blog_name | size %}
  {% assign blog_description_size = site.blog_description | size %}

  {% if blog_name_size > 0 or blog_description_size > 0 %}
  <div class="header-bar">
    <h1>{{ site.blog_name }}</h1>
    <h2>{{ site.blog_description }}</h2>
  </div>
  {% endif %}

  {% if site.display_tags or site.display_categories %}
  <div class="tag-category-list">
    <ul class="p-0 m-0">
      {% for tag in site.tags %}
      <li>
        <a href="{{ tag[1].first.url | relative_url }}#{{ tag[0] | slugify }}"
          class="post-tag">{{ tag[0] }}</a>
      </li>
      {% endfor %}
    </ul>
  </div>
  {% endif %}

  <ul class="post-list">
    {% if page.pagination.enabled %}
      {% assign postlist = paginator.posts %}
    {% else %}
      {% assign postlist = site.posts %}
    {% endif %}
    {% for post in postlist %}
      <li>
        {% if post.thumbnail %}
        <div class="row">
          <div class="col-sm-9">
        {% endif %}
        <h3>
          <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <p class="post-meta">
          {{ post.date | date: '%B %d, %Y' }}
          {% if post.external_source %}
          <a href="{{ post.external_source }}" target="_blank">[external post]</a>
          {% endif %}
        </p>
        <p class="post-description">
          {% if post.description %}
            {{ post.description }}
          {% else %}
            {{ post.excerpt | strip_html }}
          {% endif %}
        </p>
        {% if post.thumbnail %}
          </div>
          <div class="col-sm-3">
            <img class="card-img" src="{{post.thumbnail | relative_url}}" style="object-fit: cover; height: 90%" alt="image">
          </div>
        </div>
        {% endif %}
      </li>
    {% endfor %}
  </ul>

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}

</div>
