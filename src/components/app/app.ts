import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { EverythingResponse, SourcesResponse } from '../../types/news-api.types';

class App {
    private readonly controller: AppController;

    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer = document.querySelector('.sources');
        if (!sourcesContainer) return;

        sourcesContainer.addEventListener('click', (e) =>
            this.controller.getNews(
                e as MouseEvent,
                (data: EverythingResponse) => this.view.drawNews(data),
                () => this.view.showNewsLoader()
            )
        );
        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
