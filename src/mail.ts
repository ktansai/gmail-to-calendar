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

function getChromePermalink(thread: GoogleAppsScript.Gmail.GmailThread): string {
  // スレッドからパーマリンクを取得
  const permalink = thread.getPermalink();
  
  // パーマリンクのURLのスキームを変更
  const replacedUrl = permalink.replace("https://", "googlechrome://");
  
  return replacedUrl;
}
