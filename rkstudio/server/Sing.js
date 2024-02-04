const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [];

app.post('/api/register', async (req, res) => {
  try {
    const { id, pw, email, phone_number, username } = req.body;

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(pw, 10);

    // 사용자 정보 저장 (해싱된 비밀번호 저장)
    users.push({
      id,
      pw: hashedPassword,
      email,
      phone_number,
      username,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    res.status(500).json({ success: false, error: '내부 서버 오류' });
  }
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
