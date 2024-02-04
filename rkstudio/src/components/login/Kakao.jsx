import React from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';

const KakaoLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (result) => {
    // 로그인 성공 시 처리
    // console.log('Login Success:', result);
    // 여기에서 추가적인 처리를 수행하거나, 상태를 업데이트할 수 있습니다.

    // GPTMain.jsx로 네비게이션
    navigate('/GPTMain');
  };

  const onFailure = (error) => {
    console.log('Login Failure:', error);
    // 로그인 실패 시 처리
    onLoginFailure(error);
  };

  return (
    <KakaoLogin
      token={`${"94541e6cb27514b7584ec8176679a4a3"}`} // 카카오 앱의 JavaScript 키
      onSuccess={handleLoginSuccess}
      onFail={onFailure}
      onLogout={() => console.log('Logout')}
      style={{
        width: '200px',
        height: '40px',
        lineHeight: '40px',
        backgroundColor: '#FEE500',
        color: '#000000',
        fontSize: '14px',
        borderRadius: '5px',
        textAlign: 'center',
      }}
    >
    </KakaoLogin>
  );
};

export default KakaoLoginButton;