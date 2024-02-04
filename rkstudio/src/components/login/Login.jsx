import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 라이브러리 추가

const Login = () => {
  const [userId, setUserId] = useState('');
  const [userIdValid, setUserIdValid] = useState(false);
  const [pw, setPw] = useState('');
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    // 로그인 성공 후 작업 수행
    // console.log("토큰은!!!", token)
  };
  
  const handleUserId = (e) => {
    setUserId(e.target.value);
    setUserIdValid(e.target.value.length > 0);
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPwValid(regex.test(e.target.value));
  };

  // const loginUser = async () => {
  //   try {
  //     const data = {
  //       id: userId,
  //       pw: pw,
  //     };

  //     const response = await axios.post('https://papi.rkteam.kr/api/certi/login', data); // axios로 POST 요청

  //     if (response.status === 200) {
  //       const { token, id } = response.data;

  //       localStorage.setItem('token', token);
  //       localStorage.setItem('userId', id);

  //       handleLoginSuccess(token);

  //       navigate('/GptMain', { state: { userId: id } });
  //     } else {
  //       alert('로그인에 실패했습니다. 다시 시도해주세요.');
  //     }
  //   } catch (error) {
  //     console.error('API 호출 중 오류 발생:', error);
  //   }
  // };

  const loginUser = async(event) => {
    event.preventDefault()
    try {
      let data = {
        id: userId,
        pw: pw,
      };

      axios
      .post('https://papi.rkteam.kr/api/certi/login', data)
      .then((response) => {
        const token = response.data.token;
        const id = response.data.id;

        if (response.status === 200) {
          // 토큰을 세션 스토리지에 저장
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userId", id);

          // 토큰을 설정하여 헤더에 추가
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          navigate('/GptMain', { state: { userId: id } });
        } else {
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
          }
        })
      
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
     }
  }

  useEffect(() => {
    setNotAllow(!(userIdValid && pwValid));
  }, [userIdValid, pwValid]);

  const onClickSignupButton = () => {
    navigate('/signup');
  };

  const onClickForgotpw = () => {
    navigate('/Forgotpw');
  };

  const onClickKakaoLoginButton = () => {
    navigate('/kakao');
  };

  const onClickRendingButton = () => {
    navigate('/Header');
  };

  return (
    <div className="page">
      <div className="login_header">
        <div className="inner_logo" onClick={onClickRendingButton}>POD Project</div>
        <div className="Inrending">
          <div className="About">About Us</div>
          <div className="Unlimited">Unlimited for all</div>
          <div className="Here">Here we are</div>
          <div className="FAQ">FAQ</div>
        </div>
      </div>
      <div className="container">
        <h2>로그인</h2>
        <div className="contentWrap">
          <div className="inputTitle">아이디</div>
          <div className="inputWrap">
            <input
              className="input"
              placeholder="아이디를 입력해주세요."
              value={userId}
              onChange={handleUserId}
              type="text"
            />
          </div>
          <div className="errorMessageWrap">
            {!userIdValid && userId.length > 0 && <div>올바른 아이디를 입력해주세요.</div>}
          </div>
          <div style={{ marginTop: '26px' }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              className="input"
              value={pw}
              placeholder="비밀번호를 입력해주세요."
              onChange={handlePassword}
              type="password"
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>}
          </div>
          <div className="how_wrap">
            <div className="passMaintain">
              <div className="log_chekwrap">
                <input type="checkbox" id="loginState" />
                <label htmlFor="loginState">로그인 상태 유지</label>
              </div>
            </div>
            <div onClick={onClickForgotpw} className="forgotPassword">비밀번호 찾기</div>        
          </div>
        </div>
          <div className="button_wrap">
            <div>
              <button onClick={loginUser} disabled={notAllow} className="bottomButton">
                로그인
              </button>
            </div>
            <div className='sing_wrap'>
              <div className="sing_text">계정이 없다면?</div>
              <button onClick={onClickSignupButton} className="bottomButton1">
                회원가입
              </button>
            </div>
            <div className="or">
              <h6>OR</h6>
            </div>
            <div>
              <button onClick={onClickKakaoLoginButton} className="bottomButton2">
              카카오 로그인
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Login;
