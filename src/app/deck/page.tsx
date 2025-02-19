"use client";

import { useState } from "react";

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
    <div className="flex h-screen items-center justify-center">
      <div className="relative flex w-96 flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
        <textarea
          className="h-32 w-full border p-2"
          placeholder="カードの内容を入力"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          className="w-full border p-2"
          placeholder="年号"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button
          className="absolute bottom-4 right-4 rounded bg-blue-500 p-2 text-white disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "追加中..." : "決定"}
        </button>
      </div>
    </div>
  );
}
