## 概要
Gmailに来た予約メールをChatGPTに解析してもらって、Googleカレンダーに自動で登録するGoogle Apps Script

<img src="https://github.com/ktansai/gmail-to-calendar/assets/6256289/09751dc2-2473-47a8-9c59-7e6de064ee0f" width="100%" />

## 仕組み
- Google Apps Scriptが定期的にメールを確認して、`GPT/willCheck`というラベルがついているメールを取得する。
  - もし、メールがあった場合、OpenAIのAPIにメールの内容(最大1000文字)を送信して、予約内容をJson形式で返してもらう。
- 処理が終わった場合は、`GPT/willCheck`のラベルを削除して、`GPT/didCheck` のラベルをつける。

## セットアップ
- node/npm/claspのセットアップ
- `clasp push` で deployする
- OpenAIのAPIキーを取得 & Google Apps Scriptの `スクリプト プロパティ` に設定
- OpenAIの`Billing`から、$10程度、APIに課金する
- createTriggerを実行して、定期実行のトリガーを設定
- Gmailのメールフィルターで、`GPT/willCheck`のラベルをつけるフィルターを作成する
  - メール送信者やタイトルでフィルターすること。

## 注意
ChatGPTのAPIにリクエストする度に、課金済みの予算が減るので、デバッグや運用時は気をつけること。

### 工夫
- 導入前はOpenAIのbillingへの課金額を小さくする。
- デバッグ時はAPIリクエストが安いモデルの`GPT-3-turbo` に変更する。
```js
const GPTModel = 'gpt-4-turbo' // ここを変更することでモデルを変更できる
```
