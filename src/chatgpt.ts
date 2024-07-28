const GPTModel = 'gpt-4o-mini';

function askToChatGPT(systemContent: string, userContent: string): string | null {
  // スクリプトプロパティからOpenAIのAPIキーを取得
  const apiKey: string | null = PropertiesService.getScriptProperties().getProperty("OPEN_AI_API_KEY");
  if (!apiKey) {
    console.error("API key is not set in the script properties.");
    return null;
  }

  // ChatGPT APIのエンドポイントURL
  const apiUrl: string = 'https://api.openai.com/v1/chat/completions';

  // 送信するメッセージ
  const messages: { role: string; content: string }[] = [
    { role: 'system', content: systemContent },
    { role: 'user', content: userContent }
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
      model: GPTModel,
      max_tokens: 2048,
      temperature: 0,
      messages: messages,
      response_format: {"type": "json_object"}
    })
  };

  // APIリクエストを送信し、レスポンスを受け取る
  try {
    const responseText: string = UrlFetchApp.fetch(apiUrl, options).getContentText();
    const response = JSON.parse(responseText);
    // レスポンスの内容を返す
    if(response == null){
      return null;
    }
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error during API request:", error);
    return null;
  }
}
