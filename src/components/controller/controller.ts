import AppLoader from './appLoader';
import { ResponseCallback } from '../../types/http.types';
import { EverythingResponse, NewsApiEndpoint, SourcesResponse } from '../../types/news-api.types';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: NewsApiEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: ResponseCallback<EverythingResponse>, onStart?: () => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    onStart?.();
                    super.getResp<EverythingResponse>(
                        {
                            endpoint: NewsApiEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
