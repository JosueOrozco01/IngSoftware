import { NextRequest, NextResponse } from "next/server";

interface Post {
  id: number;
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

    if (data.id === undefined) {
      return NextResponse.json({ error: "Falta el campo 'id'" }, { status: 400 });
    }
    if (typeof data.id !== "number") {
      return NextResponse.json({ error: "'id' debe ser un número" }, { status: 400 });
    }
    if (data.id <= 0) {
      return NextResponse.json({ error: "'id' debe ser mayor a 0" }, { status: 400 });
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

    return NextResponse.json({
      message: "Post creado con éxito",
      data
    });

  } catch (error) {
    console.error("Error al crear el post", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
