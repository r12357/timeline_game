import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const revalidata = 0;

export const GET = async (req: NextRequest) => {
  try {
    const cards = await prisma.$queryRaw<
      {
        id: string;
        text: string;
        year: number;
      }[]
    >`SELECT * FROM "Card" ORDER BY RANDOM() LIMIT 5;`;

    return NextResponse.json(cards);
  } catch (error) {
    return NextResponse.json(
      { error: "エラーが発生しました" },
      { status: 500 }
    );
  }
};
