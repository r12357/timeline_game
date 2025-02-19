import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Card } from "@prisma/client";

type RequestBody = {
  text: string;
  year: number;
};

export const POST = async (req: NextRequest) => {
  try {
    const requestBody: RequestBody = await req.json();

    const { text, year } = requestBody;

    const post: Card = await prisma.card.create({
      data: {
        text,
        year,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "エラーが発生しました" },
      { status: 500 }
    );
  }
};
