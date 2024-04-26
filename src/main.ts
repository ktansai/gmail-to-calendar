const systemContent = 
`
メールの内容を読んで、JSON形式で回答してください。
フォーマットは下記を参考にしてください。
{
  "title": "映画:トイ・ストーリー", 
  "startDate":"2024-03-31T10:30:00",
  "endDate":"2024-03-31T11:30:00",
  "location":"TOHOシネマズ六本木ヒルズ"
}
もし、startDateが不明だったり、予定が含まれないメールの場合は、Jsonの代わりに、"null"だけを返してください
タイトルは、明確に、誰と、何をするか、などがわかるようにしてください。
locationが不明の場合は "" を設定してください。
また、startDateのみが分かる場合は、endDateは1時間後の時間を設定してください。
メール1件に対して、最大1つの予定を返してください。配列では返さないでください。
メールの送信日時をstartDateとして扱わないように気をつけてください。
`


function main(){
  const mails = getRecentEmails(10);

  mails.forEach(mail => {
    const body = mail.getPlainBody();
    console.log(mail.getSubject());
    const resultString = askToChatGPT(systemContent, body.substring(0, 1000));
    console.log(resultString);
    if(resultString === null){
      return;
    } 
    const result = JSON.parse(resultString);
    console.log(result);
  });
}