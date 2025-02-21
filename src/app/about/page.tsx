"use client";

import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      {/* タイトル */}
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        タイムラインゲーム
      </h1>

      {/* ゲームの説明 */}
      <div className="mb-6 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-3 text-2xl font-semibold">ゲームの説明</h2>
        <p className="text-gray-700">
          このゲームは，出来事が書かれたカードが最初に配られ，それを時系列に並べるゲームです．(右が未来，左が過去)
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
