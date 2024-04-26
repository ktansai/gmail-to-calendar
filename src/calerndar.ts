/**
 * Google Calendar に新しいイベントを追加します。
 * 
 * @param {string} title イベントのタイトル
 * @param {Date} startTime イベントの開始日時
 * @param {Date} endTime イベントの終了日時
 * @param {string} location イベントの場所（オプション）
 * @param {string} description イベントの詳細（オプション）
 * @returns {string} 作成されたイベントのID
 */
function addEventToCalendar(title: string, startTime: Date, endTime: Date, location?: string, description?: string): string {
  const calendar: GoogleAppsScript.Calendar.Calendar = CalendarApp.getDefaultCalendar();
  const eventOptions: any = {
    location: location,
    description: description
  };
  const event: GoogleAppsScript.Calendar.CalendarEvent = calendar.createEvent(title, startTime, endTime, eventOptions);
  
  Logger.log('Event ID: ' + event.getId());
  return event.getId();
}

function calendarAddTest(){
  const title = '映画:トイ・ストーリー';
  const startDate = new Date('2024-03-31T10:30:00');
  const endDate = new Date('2024-03-31T11:30:00');
  const location = 'TOHOシネマズ六本木ヒルズ';
  
  addEventToCalendar(title, startDate, endDate, location);
}