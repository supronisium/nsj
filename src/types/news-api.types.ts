export enum NewsApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum ApiStatus {
    Ok = 'ok',
    Error = 'error',
}

export type SourceCategory = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: SourceCategory;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface BaseApiResponse {
    status: ApiStatus;
    code?: string;
    message?: string;
}

export interface SourcesResponse extends BaseApiResponse {
    sources: Source[];
}

export interface EverythingResponse extends BaseApiResponse {
    totalResults: number;
    articles: Article[];
}

export type SourceListItem = Pick<Source, 'id' | 'name'>;

export type NewsListItem = Pick<
    Article,
    'source' | 'author' | 'urlToImage' | 'publishedAt' | 'title' | 'description' | 'url'
>;
