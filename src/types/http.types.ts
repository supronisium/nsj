export enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
}

export interface RequestOptions {
    [key: string]: string | number | boolean;
}

export interface RequestParams {
    endpoint: string;
    options?: RequestOptions;
}

export type ResponseCallback<T> = (data: T) => void;
