function chatGptSample(): void {
  // スクリプトプロパティからOpenAIのAPIキーを取得
  const apiKey: string | null = PropertiesService.getScriptProperties().getProperty("OPEN_AI_API_KEY");
  if (!apiKey) {
    console.error("API key is not set in the script properties.");
    return;
  }

  // ChatGPT APIのエンドポイントURL
  const apiUrl: string = 'https://api.openai.com/v1/chat/completions';

  // 送信するメッセージ
  const messages: { role: string; content: string }[] = [
    { role: 'system', content: '端的に答えてください。答えは単語でお願いします。' },
    { role: 'user', content: '日本で最も北に位置する都道府県は？' }
  ];

  // APIリクエスト用のヘッダー
  const headers: GoogleAppsScript.URL_Fetch.HttpHeaders = {
    'Authorization': 'Bearer ' + apiKey,
    'Content-Type': 'application/json'
  };

  // APIリクエストのオプション
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    muteHttpExceptions: true,
    method: 'post',
    headers: headers,
    payload: JSON.stringify({
      model: 'gpt-3.5-turbo',
      max_tokens: 2048,
      temperature: 0,
      messages: messages
    })
  };

  // APIリクエストを送信し、レスポンスを受け取る
  try {
    const responseText: string = UrlFetchApp.fetch(apiUrl, options).getContentText();
    const response = JSON.parse(responseText);
    // レスポンスの内容をログに出力
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error during API request:", error);
  }
}
