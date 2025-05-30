# Blog Assets

This directory contains static assets for the blog:

## Images
- `/images/` - Blog post images, covers, and graphics

## Structure
```
assets/
├── images/
│   ├── blog-covers/
│   ├── project-screenshots/
│   └── profile/
└── css/
    └── custom.css
```

## Image Guidelines
- **Format**: PNG for screenshots, JPG for photos, SVG for icons
- **Size**: Optimize for web (< 500KB per image)
- **Naming**: Use descriptive, kebab-case names
- **Alt Text**: Always include meaningful alt text in markdown

## Adding Images
```markdown
![Alt text](/assets/images/your-image.png)
```

For blog post covers, use:
```yaml
image: /assets/images/your-cover.png
```
