export default class PublicationAutor {
    constructor(private autor: string | undefined) {}

    public validate() {
        if (!this.autor || this.autor.trim().length === 0) {
            throw new Error("El autor no puede estar vacío");
        }
    }
}
