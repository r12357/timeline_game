import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "TimeLineGame",
  description: "TIME LINE GAME",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <html lang="ja">
      <body>
        <header>
          <div className="font-bold"></div>
        </header>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
