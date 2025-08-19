import { NextRequest, NextResponse } from "next/server";
import Publication from "@/utils/publication";
import Register from "@/utils/register";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const publication = new Publication(data.title, data.description, data.autor);

        const register = new Register();
        await register.Base(publication);

        return NextResponse.json({
            message: "Post creado correctamente"
        });

    } catch (error: any) {
        if (error.message.includes("no puede estar")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        console.error("Error al crear el post", error);
        return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
    }
}
