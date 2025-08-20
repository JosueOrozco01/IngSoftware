import { NextRequest, NextResponse } from "next/server";
import Publication from "@/utils/publication";
import PostgresPublicationRepository from "@/utils/postgres-publication-repository";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		if (isNaN(id)) {
			return NextResponse.json({ error: "ID inválido" }, { status: 400 });
		}
		const data = await request.json();
		const publication = new Publication(data.title, data.description, data.autor);
		const repository = new PostgresPublicationRepository();
		await repository.update(id, publication);
		return NextResponse.json({ message: "Post actualizado correctamente" });
	} catch (error: any) {
		if (error.message.includes("no puede estar")) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		console.error("Error al actualizar el post", error);
		return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
		if (isNaN(id)) {
			return NextResponse.json({ error: "ID inválido" }, { status: 400 });
		}
		const repository = new PostgresPublicationRepository();
		await repository.delete(id);
		return NextResponse.json({ message: "Post eliminado correctamente" });
	} catch (error: any) {
		console.error("Error al eliminar el post", error);
		return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
	}
}