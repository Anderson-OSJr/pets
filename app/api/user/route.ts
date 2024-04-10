import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

//Get all Users
export async function GET(req: NextRequest) {
    try {
        const users = await prisma.user.findMany();
        return Response.json({ message: "Todos", users});
    } catch (err) {
        return NextResponse.json({
            message: "Error",
            err,
        });
    }
}

//Create a new User
export async function POST(req: NextRequest) {
    const { name, email, image } = await req.json();
        
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                image,
            },            
        });
        return Response.json({message: "Criado", user})
    } catch (err) {
        return NextResponse.json({
            message: "Error",
            err,
        });
    }
}

//Delete a User by Id
export async function DELETE(req:NextRequest) {
    const { id } = await req.json();
    try {
        const user = await prisma.user.delete({
            where: {
                id : id,
            }
        });
        return Response.json({message: "Deletado", user});
    } catch (err) {
        return NextResponse.json({
            message: "Error",
            err,
        });
    }
}

//Edit a User by Id
export async function PUT(req:NextRequest) {
    const { id, name, email, image } = await req.json();
    try {
        const user = await prisma.user.update({
            where: {
                id
            },
            data : {
                name,
                email,
                image,
            },
        });
        return Response.json({message: "Editado", user});
    } catch (err) {
        return NextResponse.json({
            message: "Error",
            err,
        });
    }
}