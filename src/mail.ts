function getRecentEmails(count: number): GoogleAppsScript.Gmail.GmailThread[] {
  let threads = GmailApp.getInboxThreads(0, count);  // 最初のcountスレッドを取得

  return threads;
}

function getLabeledEmailThreads(labelName: string, count: number): GoogleAppsScript.Gmail.GmailThread[] {
  let label = GmailApp.getUserLabelByName(labelName);
  let threads = label.getThreads(0, count);
  
  return threads;
}

/**
 * Gmailのメッセージに対するリンクを生成する関数。
 * 
 * @param {GoogleAppsScript.Gmail.GmailMessage} message Gmailのメッセージオブジェクト
 * @returns {string} Gmailメッセージへの直接リンク
 */
function getMailPermalink(message: GoogleAppsScript.Gmail.GmailMessage): string {
  // GmailのベースURL
  const gmailBaseUrl: string = "https://mail.google.com/mail/u/0/#inbox";

  // GmailのメッセージIDを取得
  const messageId: string = message.getId();

  // Gmailリンクを生成
  const gmailLink: string = `${gmailBaseUrl}/${messageId}`;
  
  return gmailLink;
}

/**
 * Gmailのメッセージから日付を取得し、指定された形式でフォーマットする関数。
 * @param {GoogleAppsScript.Gmail.GmailMessage} message Gmailのメッセージオブジェクト
 * @param {string} format フォーマットしたい日付の形式（例: "YYYY/MM/DD"）
 * @returns {string} フォーマットされた日付文字列
 */
function formatGmailDate(message: GoogleAppsScript.Gmail.GmailMessage, format: string): string {
  // Gmailのメッセージから日付を取得
  const date: Date = message.getDate();
  
  // 年、月、日を取得
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1; // 月は0から始まるため+1する
  const day: number = date.getDate();
  
  // フォーマットに応じて日付を文字列に変換
  const formattedDate: string = format
    .replace("YYYY", year.toString().padStart(4, "0"))
    .replace("MM", month.toString().padStart(2, "0"))
    .replace("DD", day.toString().padStart(2, "0"));
  
  return formattedDate;
}