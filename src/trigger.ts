function createTrigger() {
  // 既存のトリガーを確認し、同じ関数に対する既存のトリガーがあれば削除する
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() === 'main') {
      ScriptApp.deleteTrigger(trigger);
    }
  }

  // 新しいトリガーを作成し、10分ごとに 'main' 関数を実行するよう設定する
  ScriptApp.newTrigger('main')
    .timeBased()
    .everyMinutes(10)
    .create();
}