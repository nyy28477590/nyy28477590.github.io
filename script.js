// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 12px 28px rgba(15, 23, 42, 0.12)';
        navbar.style.borderBottomColor = 'rgba(148, 163, 184, 0.35)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottomColor = 'rgba(148, 163, 184, 0.2)';
    }
});

// Blog posts data - you can add your blog posts here
const blogPosts = [
    // Example structure - uncomment and fill in when you have blog posts
    // {
    //     title: "Building Scalable Distributed Systems",
    //     date: "2024-01-15",
    //     excerpt: "Learn how to design and implement distributed systems that scale...",
    //     url: "https://yourblog.com/post1"
    // }
];

// Render blog posts
function renderBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');

    if (blogPosts.length === 0) {
        return; // Keep placeholder
    }

    blogContainer.innerHTML = '';

    blogPosts.forEach(post => {
        const blogCard = document.createElement('a');
        blogCard.href = post.url;
        blogCard.target = '_blank';
        blogCard.className = 'blog-card';

        blogCard.innerHTML = `
            <div class="blog-card-content">
                <h3>${post.title}</h3>
                <div class="blog-date">${new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</div>
                <p class="blog-excerpt">${post.excerpt}</p>
            </div>
        `;

        blogContainer.appendChild(blogCard);
    });
}

// Highlight current section in nav
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 110;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').replace('#', '');
        if (targetId === currentSection) {
            link.style.color = '#0f172a';
            link.style.backgroundColor = '#dbeafe';
        } else {
            link.style.color = '';
            link.style.backgroundColor = '';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();

    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    highlightCurrentSection();
});

window.addEventListener('scroll', highlightCurrentSection);

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
