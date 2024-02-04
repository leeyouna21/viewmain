import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [Id, setId] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const url = "https://papi.rkteam.kr/api/certi/register";
      const data = {
        id: Id,
        pw: password,
        email: email,
        phone_number: phone,
        username: name
      };
  
      const headers = {
        'Content-Type': 'application/json',
      };
  
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      };
  
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API 호출 중 오류 발생:', errorData);
        throw new Error(`API 호출 중 오류 발생: ${response.status}`);
      }
  
      const result = await response.json();
  
      if (result.success) {
        const token = result.token;
        localStorage.setItem('token', token);
        alert('회원가입에 성공했습니다.');
        navigate('/login');
      } else {
        // 회원가입 실패 시 알림창 띄우기
        alert(`회원가입에 실패했습니다. 오류 종류: ${result.error}`);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error.message);
      // 회원가입 실패 시 알림창 띄우기
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };
  

  return (
    <div>
      <div className="join__form">
        <div className="container">
          <form action="" name="join" method="post">
            <fieldset>
              <legend className="blind">회원가입</legend>
              <div className="name__wrap">
                <div className="name">
                  <label htmlFor="youName" className="required">이름</label>
                  <input
                    type="text"
                    id="youName"
                    name="youName"
                    placeholder="이름을 입력해주세요."
                    className="inputStyle"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="you">
                <label htmlFor="youID" className="required">아이디</label>
                <input
                  type="text"
                  id="youID"
                  name="youID"
                  placeholder="아이디는 숫자와 영어만 입력이 가능합니다."
                  className="inputStyle"
                  value={Id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
                </div>
              <div>
                <label htmlFor="youPass" className="required">비밀번호</label>
                <input
                  type="password"
                  id="youPass"
                  name="youPass"
                  placeholder="비밀번호를 입력해주세요."
                  className="inputStyle"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="youPassC" className="required">비밀번호 확인</label>
                <input
                  type="password"
                  id="youPassC"
                  name="youPassC"
                  placeholder="비밀번호를 다시한번 입력해주세요."
                  className="inputStyle"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="you">
                <label htmlFor="youEmail" className="required">이메일</label>
                <input
                  type="email"
                  id="youEmail"
                  name="youEmail"
                  placeholder="이메일을 입력해주세요."
                  className="inputStyle"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <a className='duple' href="#">이메일 중복검사</a>
              </div>
              <div className="you">
                <label htmlFor="youPhone" className="required">핸드폰 번호</label>
                <input
                  type="text"
                  id="youPhone"
                  name="youPhone"
                  placeholder="핸드폰 번호를 입력해주세요."
                  className="inputStyle"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <label className="checkagree">
                <input type="checkbox" name="" value="0" required />
                <span className="checkagree__span"> 개인정보 제공동의 (필수)</span>
              </label>
              <button type="button" onClick={registerUser} className="btnStyle1">
                회원가입 완료
              </button>
            </fieldset>
            <div className="modal"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;