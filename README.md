## 概要
Google Apps Scriptを TypeScript で書いて、claspでデプロイする際のテンプレート

## 使用方法
### 前提条件 (PCで初回のみ実行)
- node / npm の環境構築
- clasp のインストール `npm install -g @google/clasp`
- `clasp login` で、~/.clasprc.json に認証情報を保存する

### プロジェクトの作成
- `npm install` 
- clasp のインストール `npm install -g @google/clasp`
- Google Apps Scriptのプロジェクト作成 `clasp create`

### デプロイ方法
- 手元でアップロードする際 : `clasp push`
- pushする際: mainブランチに取り込まれると、自動でデプロイされる

### デプロイ設定
- pushで自動設定する際は、`~/.clasp.json` の情報と、`clasp.json` の情報を githubに保存する
- `deploy.yml` を.github/workflows/ に配置する