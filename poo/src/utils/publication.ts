import PublicationTitle from "./publication-title";
import PublicationDescription from "./publication-description";
import PublicationAutor from "./publication-autor";

export default class Publication {
    public title: string;
    public description: string;
    public autor: string;

    constructor(title: string, description: string, autor: string) {
        const titleValidator = new PublicationTitle(title);
        titleValidator.validate();

        const descriptionValidator = new PublicationDescription(description);
        descriptionValidator.validate();

        const autorValidator = new PublicationAutor(autor);
        autorValidator.validate();

        this.title = title;
        this.description = description;
        this.autor = autor;
    }
}
