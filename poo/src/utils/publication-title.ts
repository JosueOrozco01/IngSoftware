export default class PublicationTitle {
    constructor(private title: string | undefined) {}

    public validate() {
        if (!this.title || this.title.trim().length === 0) {
            throw new Error("El título no puede estar vacío");
        }
    }
}
