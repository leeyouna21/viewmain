
import React from 'react';

const Forgotpw = () => {
  const handleFindPasswordInfo = (e) => {
    e.preventDefault();
    // TODO: 등록된 회원정보로 비밀번호 찾기 로직 구현
  };

  return (
    <div className='for_page'>
        <div className="for_container">
            <h2 className='for_title'>비밀번호 찾기</h2>
            <h3 className='for_desc'>등록한 회원정보로 비밀번호를 찾을 수 있습니다.</h3>

            {/* 등록된 회원정보로 찾기 */}
            <form className='for_inner' action="#" name="find-pw-info" id="find-pw-info" method="post" onSubmit={handleFindPasswordInfo}>
                <p className='for_desc2'>회원 가입 시 등록한 정보를 정확히 입력해주세요.</p>
                <div className="for_contentWrap">
                    <div className="for_inputTitle">
                        <div className="for_inputWrap">
                            <p className='for_input'>
                                <label htmlFor="user-id">
                                    <input  type="text" placeholder="아이디" name="user-id" id="user-id" required />
                                </label>
                            </p>
                            <p className='for_input'>
                                <label htmlFor="user-name">
                                    <input type="text" placeholder="이름" name="user-name" id="user-name" required />
                                </label>
                            </p>
                            <p className='for_input'>
                                <label htmlFor="user-email">
                                    <input type="email" placeholder="이메일" name="user-email" id="user-email" required />
                                </label>
                            </p>
                        </div>
                    </div>
                </div>
                <p className='bottomButton1'>
                <button type="submit">비밀번호 찾기</button>
                </p>
            </form>
            <p className='for_info'>
                위 방법으로 비밀번호를 찾을 수 없는 경우{' '}
                <a href="/" target="_blank" rel="noreferrer">
                고객센터
                </a>
                에 문의해주세요.
            </p>
        </div>  
    </div>
  );
};

export default Forgotpw;
