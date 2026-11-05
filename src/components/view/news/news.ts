import './news.css';
import { NewsListItem } from '../../../types/news-api.types';

class News {
    public showLoader(): void {
        const newsContainer = document.querySelector('.news');
        if (!newsContainer) return;
        newsContainer.innerHTML = '<div class="news__spinner" role="status" aria-label="Loading news"></div>';
    }

    public draw(data: Readonly<NewsListItem>[]): void {
        const newsContainer = document.querySelector('.news');
        if (!newsContainer) return;

        if (data.length === 0) {
            newsContainer.innerHTML = '<p class="news__empty">No news found for this source.</p>';
            return;
        }

        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const photoEl = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photoEl) photoEl.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const authorEl = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (authorEl) authorEl.textContent = item.author || item.source.name;

            const dateEl = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (dateEl) dateEl.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const titleEl = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (titleEl) titleEl.textContent = item.title;

            const sourceEl = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (sourceEl) sourceEl.textContent = item.source.name;

            const contentEl = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (contentEl) contentEl.textContent = item.description;

            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
