import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

interface Post {
  title: string;
  description: string;
  autor: string;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    validateTitle(data.title);
    validateDescription(data.description);
    validateAutor(data.autor);

    const newPost = await insertPost(data.title, data.description, data.autor);

    return NextResponse.json({
      message: "Post creado con éxito",
      data: newPost,
    });

  } catch (error: any) {
    if (error.message.includes("no puede estar")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Error al crear el post", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

function validateTitle(title: string | undefined) {
  if (!title || title.trim().length === 0) {
    throw new Error("El título no puede estar vacío");
  }
}

function validateDescription(description: string | undefined) {
  if (!description || description.trim().length === 0) {
    throw new Error("La descripción no puede estar vacía");
  }
}

function validateAutor(autor: string | undefined) {
  if (!autor || autor.trim().length === 0) {
    throw new Error("El autor no puede estar vacío");
  }
}

async function insertPost(title: string, description: string, autor: string): Promise<Post> {
  const connectionString = "postgresql://postgres.mstsxyeekgoyzfrlqbic:Fercho:3@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
  const sql = postgres(connectionString, { ssl: "require" });

  const result = await sql<Post[]>`
    INSERT INTO "Post" (title, description, autor)
    VALUES (${title}, ${description}, ${autor})
    RETURNING *;
  `;

  return result[0];
}
