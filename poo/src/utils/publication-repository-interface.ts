import Publication from "./publication";

export default interface IPublicationRepository {
    save(publication: Publication): Promise<void>;
    getAll(): Promise<Publication[]>;
}
