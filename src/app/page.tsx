"use client";

import Link from "next/link";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      {/* タイトル */}
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        タイムラインゲーム
      </h1>

      {/* 告知ゾーン */}
      <div className="mb-6 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-3 text-2xl font-semibold">更新履歴</h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-700">
          <li>2025/02/19 アプリの誕生</li>
          <li>2025/02/21 基本的なことは実装</li>
        </ul>
      </div>

      {/* ゲームページへのボタン */}
      <Link href="/game">
        <button className="mb-4 w-64 rounded-lg bg-red-500 px-6 py-3 text-white shadow-md transition hover:bg-red-600">
          ゲームをはじめる
        </button>
      </Link>

      {/* カード追加ページへのボタン */}
      <Link href="/deck">
        <button className="mb-4 w-64 rounded-lg bg-green-500 px-6 py-3 text-white shadow-md transition hover:bg-green-600">
          カードを追加する
        </button>
      </Link>

      {/* ゲーム説明ページへのボタン */}
      <Link href="/about">
        <button className="mb-4 w-64 rounded-lg bg-blue-500 px-6 py-3 text-white shadow-md transition hover:bg-blue-600">
          ゲームの説明を見る
        </button>
      </Link>
    </div>
  );
};

export default Page;
