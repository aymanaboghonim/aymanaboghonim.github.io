---
# the default layout is 'page'
icon: fas fa-envelope
order: 5
---

<div class="contact-page">
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">📬 Let's Connect</h1>
      <p class="lead">Ready to collaborate, discuss AI projects, or just say hello? I'd love to hear from you!</p>
    </div>
  </div>

  <div class="content-section">
    <div class="contact-grid">
      <!-- Contact Form -->
      <div class="contact-form-container">
        <h2>💬 Send a Message</h2>
        <p class="form-description">Whether you have a project idea, want to collaborate, or just want to chat about AI and technology, drop me a message!</p>
        
        <form class="contact-form" action="https://formspree.io/f/xpznvbka" method="POST">
          <div class="form-group">
            <label for="name">Your Name *</label>
            <input type="text" id="name" name="name" required placeholder="John Doe">
          </div>
          
          <div class="form-group">
            <label for="email">Email Address *</label>
            <input type="email" id="email" name="email" required placeholder="john@example.com">
          </div>
          
          <div class="form-group">
            <label for="subject">Subject *</label>
            <select id="subject" name="subject" required>
              <option value="">Choose a topic...</option>
              <option value="collaboration">🤝 Collaboration Opportunity</option>
              <option value="project">🚀 Project Discussion</option>
              <option value="consulting">💼 Consulting Inquiry</option>
              <option value="feedback">💡 Feedback on Content</option>
              <option value="general">💬 General Question</option>
              <option value="other">🔄 Other</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="6" required placeholder="Tell me about your project, question, or how I can help you..."></textarea>
          </div>
          
          <div class="form-group checkbox-group">
            <input type="checkbox" id="newsletter" name="newsletter" value="yes">
            <label for="newsletter">📧 I'd like to receive updates about new posts and projects</label>
          </div>
          
          <button type="submit" class="submit-btn">
            <span>Send Message</span>
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
      
      <!-- Contact Info -->
      <div class="contact-info">
        <h2>🌐 Other Ways to Connect</h2>
        
        <div class="contact-methods">
          <a href="mailto:ayman.aboghonim@outlook.com" class="contact-method email">
            <div class="method-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="method-info">
              <strong>Email</strong>
              <span>ayman.aboghonim@outlook.com</span>
              <small>Best for detailed discussions</small>
            </div>
          </a>
          
          <a href="https://www.linkedin.com/in/ayman-aboghonim" class="contact-method linkedin" target="_blank">
            <div class="method-icon">
              <i class="fab fa-linkedin-in"></i>
            </div>
            <div class="method-info">
              <strong>LinkedIn</strong>
              <span>Professional Network</span>
              <small>Connect for professional opportunities</small>
            </div>
          </a>
          
          <a href="https://github.com/aymanaboghonim" class="contact-method github" target="_blank">
            <div class="method-icon">
              <i class="fab fa-github"></i>
            </div>
            <div class="method-info">
              <strong>GitHub</strong>
              <span>Code & Projects</span>
              <small>Collaborate on open source projects</small>
            </div>
          </a>
          
          <div class="contact-method location">
            <div class="method-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="method-info">
              <strong>Location</strong>
              <span>Oman</span>
              <small>Remote collaboration worldwide</small>
            </div>
          </div>
        </div>
        
        <div class="response-info">
          <h3>⚡ Response Time</h3>
          <div class="response-details">
            <div class="response-item">
              <span class="response-type">📧 Email</span>
              <span class="response-time">Within 24 hours</span>
            </div>
            <div class="response-item">
              <span class="response-type">💼 LinkedIn</span>
              <span class="response-time">Within 48 hours</span>
            </div>
            <div class="response-item">
              <span class="response-type">🛠️ GitHub Issues</span>
              <span class="response-time">Within 72 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="content-section">
    <h2 class="section-title">🤝 Collaboration Opportunities</h2>
    
    <div class="collaboration-grid">
      <div class="collaboration-card">
        <div class="collab-icon">🚀</div>
        <h3>AI/ML Projects</h3>
        <p>Looking to build machine learning solutions, implement computer vision systems, or develop AI applications? Let's discuss your project requirements and how I can help bring your ideas to life.</p>
        <ul class="collab-points">
          <li>Machine Learning Development</li>
          <li>Computer Vision Applications</li>
          <li>AI System Architecture</li>
          <li>MLOps Implementation</li>
        </ul>
      </div>
      
      <div class="collaboration-card">
        <div class="collab-icon">📚</div>
        <h3>Content Creation</h3>
        <p>Interested in guest posting, podcast appearances, or collaborative content creation? I love sharing knowledge and learning from other professionals in the AI and tech space.</p>
        <ul class="collab-points">
          <li>Guest Blog Posts</li>
          <li>Technical Tutorials</li>
          <li>Podcast Interviews</li>
          <li>Conference Speaking</li>
        </ul>
      </div>
      
      <div class="collaboration-card">
        <div class="collab-icon">🔬</div>
        <h3>Research & Development</h3>
        <p>Working on cutting-edge AI research or innovative applications? I'm always interested in exploring new frontiers in artificial intelligence and contributing to meaningful research initiatives.</p>
        <ul class="collab-points">
          <li>AI Research Projects</li>
          <li>Open Source Contributions</li>
          <li>Technical Consulting</li>
          <li>Innovation Partnerships</li>
        </ul>
      </div>
      
      <div class="collaboration-card">
        <div class="collab-icon">🎓</div>
        <h3>Mentoring & Education</h3>
        <p>Whether you're transitioning into AI/ML or looking to advance your skills, I'm passionate about helping others grow in their technical journey through mentoring and educational initiatives.</p>
        <ul class="collab-points">
          <li>Career Transition Guidance</li>
          <li>Technical Skill Development</li>
          <li>Project Code Reviews</li>
          <li>Learning Path Planning</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="content-section">
    <h2 class="section-title">🎯 Current Focus Areas</h2>
    
    <div class="focus-areas">
      <div class="focus-item">
        <span class="focus-icon">🤖</span>
        <div class="focus-content">
          <h3>LLM Applications</h3>
          <p>Developing practical applications and tools for Large Language Models, including prompt engineering and AI-assisted development workflows.</p>
        </div>
      </div>
      
      <div class="focus-item">
        <span class="focus-icon">☁️</span>
        <div class="focus-content">
          <h3>Cloud AI Services</h3>
          <p>Exploring AWS AI/ML services and building scalable machine learning solutions in cloud environments.</p>
        </div>
      </div>
      
      <div class="focus-item">
        <span class="focus-icon">🌍</span>
        <div class="focus-content">
          <h3>Geospatial AI</h3>
          <p>Combining my geological background with AI to create innovative solutions for spatial data analysis and environmental applications.</p>
        </div>
      </div>
      
      <div class="focus-item">
        <span class="focus-icon">🔧</span>
        <div class="focus-content">
          <h3>Developer Tools</h3>
          <p>Creating practical tools and resources that help developers work more efficiently with AI technologies and improve their workflows.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="content-section">
    <div class="contact-cta">
      <h2>Ready to Start a Conversation?</h2>
      <p>Don't hesitate to reach out! I'm always excited to discuss new ideas, share knowledge, and explore potential collaborations.</p>
      
      <div class="quick-contact-buttons">
        <a href="mailto:ayman.aboghonim@outlook.com" class="quick-contact-btn email">
          <i class="fas fa-envelope"></i>
          <span>Send Email</span>
        </a>
        <a href="https://www.linkedin.com/in/ayman-aboghonim" class="quick-contact-btn linkedin" target="_blank">
          <i class="fab fa-linkedin-in"></i>
          <span>Connect on LinkedIn</span>
        </a>
        <a href="https://github.com/aymanaboghonim" class="quick-contact-btn github" target="_blank">
          <i class="fab fa-github"></i>
          <span>View GitHub</span>
        </a>
      </div>
    </div>
  </div>
</div>
