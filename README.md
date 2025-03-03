# TimeLine Game

TimeLine Game（タイムラインゲーム）は、歴史上の出来事が書かれたカードを時系列順に並べるゲームです。
オンラインで遊べる類似のゲームが少ないため、「ないなら作ってしまおう」という思いで開発しました。

**公開URL:** [https://timeline-game-dayo.vercel.app](https://timeline-game-dayo.vercel.app)

## 特徴

- **直感的な操作性**：ドラッグ＆ドロップでカードを配置
- **自由にカードを追加可能**：オリジナルの歴史クイズが作れる
- **シンプルなUI**：ユーザーが迷わず遊べる設計

### ゲームの流れ

1. **「ゲームをはじめる」を押す**

   - カードを時系列順に並べる
   - **正解時の動作:**
     
https://github.com/user-attachments/assets/f136e5eb-8ecd-4a46-b440-df2336a267c3

   - **不正解時の動作:**

https://github.com/user-attachments/assets/97782563-a311-4c58-b88e-09eb44b8850e


2. **「カードを追加する」を押す**
   - ユーザーが独自のカードを作成

   https://github.com/user-attachments/assets/073b360c-4b45-40aa-8338-eb4d23357819


## 技術スタック

### フロントエンド

- **言語:** TypeScript
- **フレームワーク:** React, Next.js
- **UIライブラリ:** Tailwind CSS

### バックエンド・データベース

- **認証・DB:** Supabase
- **ORM:** Prisma

### 開発ツール・デプロイ

- **IDE:** Visual Studio Code
- **デプロイ:** Vercel

## 工夫した点・課題解決

カードを自由に動かし，目標の場所にしっかりと配置すること．

## 今後の展望

- ユーザー登録・ログイン機能の追加
- ユーザーごとのデッキ管理機能
- カードデザインの強化
- **オンライン対戦機能の実装**
  - ユーザーが作成したカードの評価システム
  - 高評価カードを使用したランキング戦
- スマートフォン対応（レスポンシブデザイン）
