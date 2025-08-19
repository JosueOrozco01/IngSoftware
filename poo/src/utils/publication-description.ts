export default class PublicationDescription {
    constructor(private description: string | undefined) {}

    public validate() {
        if (!this.description || this.description.trim().length === 0) {
            throw new Error("La descripción no puede estar vacía");
        }
    }
}
