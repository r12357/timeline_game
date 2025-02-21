"use client";

import { useState } from "react";
import Link from "next/link";

export default function DeckPage() {
  const [text, setText] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!text || !year) return;
      setLoading(true);
      const response = await fetch("/api/addCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, year: parseInt(year) }),
      });
      if (!response.ok) {
        throw new Error("追加に失敗しました");
      }
      setText("");
      setYear("");
      alert("カードを追加しました");
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="relative flex w-full max-w-md flex-col gap-6 rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">カードを追加</h1>
        <textarea
          className="h-32 w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          placeholder="カードの内容を入力"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          placeholder="年号"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button
          className="w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "追加中..." : "決定"}
        </button>
      </div>
      <Link href="/">
        <div className="absolute left-4 top-4 rounded bg-blue-500 px-4 py-2 text-white">
          ホームに戻る
        </div>
      </Link>
    </div>
  );
}
