// 서버 측 코드 (Express 앱 내)
const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const app = express();

app.use(bodyParser.json());

// Google Calendar API 관련 설정
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const calendar = google.calendar('v3');

// Google Calendar API를 호출하는 엔드포인트
app.post('/api/v1/cal/google/get_event', async (req, res) => {
  try {
    // 클라이언트에서 넘어온 데이터
    const { credentials } = req.body;
    
    // Google Calendar API에 접근하기 위한 credentials 설정
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(credentials.token);

    // Google Calendar API 호출
    const now = new Date().toISOString();
    const events = await calendar.events.list({
      auth: oAuth2Client,
      calendarId: 'primary',
      timeMin: now,
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    // 응답 데이터 예시
    const responseData = {
      success: true,
      message: 'Google Calendar 이벤트 가져오기 성공',
      events: events.data.items,
    };

    res.json(responseData);
  } catch (error) {
    console.error('Google Calendar API 호출 중 오류 발생:', error);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

// 서버 시작
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 포트에서 실행 중입니다.`);
});
