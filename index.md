---
layout: home
title: "Ayman Aboghonim's Blog"
description: "AI Engineer sharing insights on Machine Learning, Computer Vision, DevOps, and Career Development"
---

# Welcome to My Blog 👋

**AI Engineer | AWS ML Specialist | DevOps Community Leader**

Hi! I'm Ayman Aboghonim, an AI Engineer with 11+ years of experience spanning healthcare technology, analytical sciences, and engineering. I specialize in **Deep Learning**, **Computer Vision**, and **Geospatial Analytics**.

## 🎯 What You'll Find Here

- **🤖 AI & Machine Learning** - Practical insights, tutorials, and project breakdowns
- **👨‍💻 Developer Tools** - Useful resources, prompts, and productivity tips  
- **🚀 Career Development** - Transition stories, learning paths, and professional growth
- **🌍 DevOps & Community** - Leadership insights and community building experiences
- **📊 Project Showcases** - Deep dives into real-world AI implementations

## ✨ Latest Posts

{% for post in site.posts limit:5 %}
- **[{{ post.title }}]({{ post.url }})** - {{ post.date | date: "%B %d, %Y" }}
  <br>{{ post.description | truncate: 120 }}
{% endfor %}

## 🚀 Featured Resources

### 🤖 [LLM Prompts Library](https://github.com/aymanaboghonim/llm-prompts)
**Professional prompt engineering made simple.** Battle-tested, production-ready prompts for developers and AI practitioners. Transform your AI workflows with consistent, high-quality results.

### 🌐 [El Mentor Landing Page](https://aymanaboghonim.github.io/elmentor-landing-page)
Modern landing page for DevOps Vision's private mentorship community. Built with React 19.1.0 and Vite 6.3.5.

## 🎯 About My Journey

Successfully transitioned from **geological sciences** to **AI engineering**, bringing unique analytical perspective to AI development. Currently contributing to DevOps Vision's global community as an Advisory Group member and building practical AI solutions for real estate and geospatial applications.

## 📫 Let's Connect

- 💼 **LinkedIn**: [ayman-aboghonim](https://linkedin.com/in/ayman-aboghonim)
- 🐙 **GitHub**: [aymanaboghonim](https://github.com/aymanaboghonim)
- 📘 **Facebook**: [Technical content](https://www.facebook.com/ayman.m.aboghonim)
- 💬 **DevOps Community**: [DevOps Visions](https://github.com/DevOpsVisions)

---

*"The journey from geology to AI taught me that curiosity and analytical thinking are the true foundations of any successful career transition."*
