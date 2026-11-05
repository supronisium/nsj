import News from './news/news';
import Sources from './sources/sources';
import { ApiStatus, EverythingResponse, SourcesResponse } from '../../types/news-api.types';

export class AppView {
    private readonly news: News;

    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public showNewsLoader(): void {
        this.news.showLoader();
    }

    public drawNews(data: Partial<EverythingResponse>): void {
        const values = data.status === ApiStatus.Ok && data.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Partial<SourcesResponse>): void {
        const values = data.status === ApiStatus.Ok && data.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
