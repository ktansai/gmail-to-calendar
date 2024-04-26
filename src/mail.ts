function getRecentEmails(count: number): GoogleAppsScript.Gmail.GmailMessage[] {
  let emails: GoogleAppsScript.Gmail.GmailMessage[] = [];
  let threads = GmailApp.getInboxThreads(0, count);  // 最初のcountスレッドを取得

  threads.forEach(thread => {
    let messages = thread.getMessages();
    emails.push(messages[messages.length - 1]); // 各スレッドの最新のメッセージを追加
  });

  return emails;
}