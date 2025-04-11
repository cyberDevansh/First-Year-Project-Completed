class NewsFeed {
    constructor() {
        this.newsContainer = document.getElementById('news-feed');
        this.apiKey = '371de9cf6f1545d0b2f59633e7d4aabf';
        this.currentCategory = 'all';
        this.initializeFilters();
        this.fetchNews();
    }

    initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentCategory = button.dataset.category;
                this.fetchNews();
            });
        });
    }

    async fetchNews() {
        try {
            // Focused query for cybersecurity and cybercrime
            let query = '(cybersecurity OR "cyber security" OR cybercrime OR "cyber crime" OR "data breach" OR hacking OR malware OR ransomware)';
            if (this.currentCategory !== 'all') {
                query += ` AND ${this.currentCategory}`;
            }
            
            const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&pageSize=6&apiKey=${this.apiKey}`);
            const data = await response.json();
            
            if (data.articles && data.articles.length > 0) {
                this.displayNews(data.articles);
            } else {
                this.displayFallbackNews();
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            this.displayFallbackNews();
        }
    }

    displayNews(articles) {
        this.newsContainer.innerHTML = articles.map(article => `
            <div class="news-card animate__animated animate__fadeIn">
                <h3>${article.title}</h3>
                <p>${article.description || 'No description available'}</p>
                <div class="news-meta">
                    <span class="news-source">${article.source.name}</span>
                    <span class="news-date">${new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <a href="${article.url}" target="_blank" class="read-more-btn">Read More <i class="fas fa-external-link-alt"></i></a>
            </div>
        `).join('');
    }

    displayFallbackNews() {
        this.newsContainer.innerHTML = `
            <div class="news-card animate__animated animate__fadeIn">
                <h3>Latest Cybersecurity Tips</h3>
                <ul>
                    <li><i class="fas fa-shield-alt"></i> Always use strong, unique passwords for each account</li>
                    <li><i class="fas fa-lock"></i> Enable two-factor authentication whenever possible</li>
                    <li><i class="fas fa-sync"></i> Keep your software and systems updated</li>
                    <li><i class="fas fa-exclamation-triangle"></i> Be cautious of suspicious emails and links</li>
                    <li><i class="fas fa-database"></i> Regularly backup your important data</li>
                </ul>
            </div>
        `;
    }
}

// Initialize news feed
document.addEventListener('DOMContentLoaded', () => {
    new NewsFeed();
}); 