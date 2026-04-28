# Favorite Sake Collection — NFT Viewer

ウォレットアドレスを入力するだけで保有NFTを一覧表示するビューアーです。
APIキーはサーバー側（Vercel）で管理するため、閲覧者には見えません。

---

## Vercel へのデプロイ手順

### 事前準備

1. **GitHub アカウント**（なければ作成）
2. **Vercel アカウント**（[vercel.com](https://vercel.com/) — GitHub連携で無料登録）
3. **Alchemy APIキー**（[alchemy.com](https://www.alchemy.com/) — 無料）

---

### Step 1 — GitHubリポジトリを作る

`projects/SAKEX/NFK/` フォルダを **新しいGitHubリポジトリ** として公開します。

```bash
# NFK フォルダで実行
git init
git add .
git commit -m "Initial commit"
```

GitHub で新規リポジトリ作成 → プッシュ

---

### Step 2 — Vercel にインポートする

1. [vercel.com/new](https://vercel.com/new) を開く
2. 「Import Git Repository」でStep1のリポジトリを選択
3. Framework Preset: **Other**
4. Root Directory: **（そのまま）**
5. 「Deploy」はまだ押さない → 環境変数を先に設定

---

### Step 3 — 環境変数を設定する（重要）

Vercel の設定画面で「Environment Variables」を開き、以下を追加：

| Key | Value |
|-----|-------|
| `ALCHEMY_API_KEY` | Alchemyで取得したAPIキー |
| `CHAIN` | `eth-mainnet` |

→ 「Deploy」をクリック

---

### Step 4 — 完了

デプロイが完了すると `https://xxxx.vercel.app` のようなURLが発行されます。
そのURLを共有するだけで、誰でもウォレットアドレスを入力してNFTを閲覧できます。

---

## セキュリティの仕組み

```
閲覧者のブラウザ
    ↓  ウォレットアドレスだけ送る
Vercel サーバー（/api/nfts）
    ↓  APIキー（隠れている）を使ってAlchemyに問い合わせ
Alchemy API
    ↓  NFTデータを返す
閲覧者のブラウザ
    ↓  画像を表示
```

APIキーはVercelのサーバー内にのみ存在し、ブラウザのソースには一切出てきません。

---

## コントラクト情報

- **コレクション**: Favorite Sake Collection
- **Contract**: `0xb0748c9372b12a89b36d58effba4f388ab4beb2c`
- **Chain**: Ethereum Mainnet

担当エージェント: @.agent/rules/blockchain-master.md
