export default class Publication {
    public title: string;
    public description: string;
    public autor: string;

    constructor(title: string, description: string, autor: string) {
        this.title = title;
        this.description = description;
        this.autor = autor;

        this.validateTitle(title);
        this.validateDescription(description);
        this.validateAutor(autor);
    }

    private validateTitle(title: string | undefined) {
        if (!title || title.trim().length === 0) {
            throw new Error("El título no puede estar vacío");
        }
    }

    private validateDescription(description: string | undefined) {
        if (!description || description.trim().length === 0) {
            throw new Error("La descripción no puede estar vacía");
        }
    }

    private validateAutor(autor: string | undefined) {
        if (!autor || autor.trim().length === 0) {
            throw new Error("El autor no puede estar vacío");
        }
    }
}
