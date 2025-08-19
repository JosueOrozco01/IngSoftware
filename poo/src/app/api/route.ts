import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

interface Post {
  title: string;
  description: string;
  autor: string;
}

export async function POST(request: NextRequest) {
  try {
    let data: Partial<Post>;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json({ error: "Body vacío o malformado" }, { status: 400 });
    }

    if (!data.title) {
      return NextResponse.json({ error: "Falta el campo 'title'" }, { status: 400 });
    }

    if (!data.description) {
      return NextResponse.json({ error: "Falta el campo 'description'" }, { status: 400 });
    }

    if (!data.autor) {
      return NextResponse.json({ error: "Falta el campo 'autor'" }, { status: 400 });
    }

    const connecting = "postgresql://postgres.mstsxyeekgoyzfrlqbic:Fercho:3@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
    const sql = postgres(connecting, { ssl: "require" });
    const result = await sql`INSERT INTO "Post" (title, description, autor) VALUES (${data.title}, ${data.description}, ${data.autor})RETURNING *;`;

    return NextResponse.json({
      message: "Post creado con éxito y se creo la basde de datos con exito",
      data: result[0],
    });

  } catch (error) {
    console.error("Error al crear el post", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

