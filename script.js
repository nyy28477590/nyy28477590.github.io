function getNavbarOffset() {
    const navbar = document.querySelector('.navbar');
    return navbar ? navbar.offsetHeight + 16 : 80;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - getNavbarOffset();
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
    {
        title: "Longest Common Subsequence (LCS) 演算法入門",
        date: "2020-12-06",
        excerpt: "從遞迴定義、DP 表格到回推路徑，介紹最長共同子序列的核心觀念與 Python 實作。",
        url: "blog/lcs-2020-12-06.html"
    },
    {
        title: "Heap Sort 堆積排序法",
        date: "2021-01-03",
        excerpt: "從 complete binary tree、max-heap / min-heap，到 heapify 與交換流程，介紹 Heap Sort 的 Python 實作。",
        url: "blog/heap-sort-notes.html"
    },
    {
        title: "2022 Fall 商科轉 CS 申請心得",
        date: "2022-07-29",
        excerpt: "整理從商科背景轉向 CS、申請美國學校的選校策略、SOP 與 personal statement 寫法，以及我在申請季中踩過的坑。",
        url: "blog/us-school-application-2022-fall.html"
    },
    {
        title: "2024 SDE New Grad 美國求職心得",
        date: "2024-08-31",
        excerpt: "記錄從投遞上千份履歷、準備 LeetCode 與 BQ，到最後拿到多家科技公司面試與 offer 的完整過程。",
        url: "blog/sde-new-grad-job-hunt-2024.html"
    }
];

// Render blog posts
function renderBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');

    if (!blogContainer) {
        return;
    }

    if (blogPosts.length === 0) {
        return; // Keep placeholder
    }

    blogContainer.innerHTML = '';

    blogPosts.forEach((post, index) => {
        const blogCard = document.createElement('a');
        blogCard.href = post.url;
        blogCard.className = index === 0 ? 'blog-card featured' : 'blog-card';

        if (/^https?:\/\//.test(post.url)) {
            blogCard.target = '_blank';
            blogCard.rel = 'noreferrer';
        }

        blogCard.innerHTML = `
            <div class="blog-card-content">
                <h3>${post.title}</h3>
                <div class="blog-date">${post.displayDate || new Date(post.date).toLocaleDateString('en-US', {
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
        const sectionTop = section.offsetTop - getNavbarOffset() - 16;
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
