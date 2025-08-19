import Publication from "./publication";
import IPublicationRepository from "./publication-repository-interface";

export default class InMemoryPublicationRepository implements IPublicationRepository {
    private publications: Publication[] = [];

    constructor() {
        this.publications = [];
    }

    public async save(publication: Publication): Promise<void> {
        this.publications.push(publication);
    }

    public async getAll(): Promise<Publication[]> {
        return this.publications;
    }
}
