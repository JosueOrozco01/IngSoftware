import postgres from "postgres";
import Publication from "./publication";
import IPublicationRepository from "./publication-repository-interface";

export default class PostgresPublicationRepository implements IPublicationRepository {
    private readonly sql: ReturnType<typeof postgres>;

    constructor() {
        const connectionString = "postgresql://postgres.mstsxyeekgoyzfrlqbic:Fercho:3@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
        this.sql = postgres(connectionString, { ssl: "require" });
    }

    public async save(publication: Publication): Promise<void> {
        try {
            await this.sql`
                INSERT INTO "Post" (title, description, autor)
                VALUES (${publication.title}, ${publication.description}, ${publication.autor});
            `;
        } catch (error: any) {
            console.error("Error real de la BD:", error);
            throw new Error("Error al guardar en la BD");
        }
    }

    public async getAll(): Promise<Publication[]> {
        try {
            const rows = await this.sql`SELECT title, description, autor FROM "Post"`;
            return rows.map((row: any) => new Publication(row.title, row.description, row.autor));
        } catch (error: any) {
            console.error("Error al obtener publicaciones de la BD:", error);
            throw new Error("Error al obtener publicaciones de la BD");
        }
    }
}
