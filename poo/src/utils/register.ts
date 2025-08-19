import postgres from "postgres";
import Publication from "./publication";

export default class Register {
    constructor() {}

    public async Base(publication: Publication): Promise<void> {
        try {
            const connectionString = "postgresql://postgres.mstsxyeekgoyzfrlqbic:Fercho:3@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
            const sql = postgres(connectionString, { ssl: "require" });

            await sql`
                INSERT INTO "Post" (title, description, autor)
                VALUES (${publication.title}, ${publication.description}, ${publication.autor});
            `;

        } catch (error: any) {
            console.error("Error real de la BD:", error);
            throw new Error("Error al guardar en la BD");
        }
    }
}
