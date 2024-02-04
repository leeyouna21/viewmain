import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProModify = () => {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate('/Profile');
  };

  const handleCompleteClick = () => {
    navigate('/Profile');
  };

  return (
    <div className='proModify_main'>
      <div className="pro_left">
        <div className="left_inner">
          <h3>PERSONAL</h3>
          <div className="option_1">
            <div className="proModify_wrap">
              <div className="proModify_text">ProModify</div>
            </div>
            <div className="general_wrap">
              <div className="general_text">General</div>
            </div>
            <div className="plan_wrap">
              <div className="plan_text">Plan</div>
            </div>
          </div>
        </div>
      </div>
      <div className="pro_right">
        <div className="pro_container">
          <h4>ProModify settings</h4>
          <div className="edit_wrap">
            <p className="pro_name">
              <p className='text'>Name</p>
              <label htmlFor="user_name">
                <input type="text" placeholder="이름을 입력하세요." name="pro_name" id="pro_name" required />
              </label>
            </p>
            <p className="pro_mail">
              <p className='text'>E-mail</p>
              <label htmlFor="user_mail">
                <input type="email" placeholder="이메일을 입력하세요." name="pro_mail" id="pro_mail" required />
              </label>
            </p>    
          </div>
          <div className="edit_wrap2">
            <p className="pro_pw">
              <p className='text'>Password</p>
              <label htmlFor="user_pw">
                <input type="password" placeholder="비밀번호를 입력하세요." name="user_pw" id="user_pw" required />
              </label>
            </p>
            <p className="pro_phone">
              <p className='text'>Phone</p>
              <label htmlFor="user_phone">
                <input type="tel" placeholder="전화번호를 입력하세요." name="user_phone" id="user_phone" required />
              </label>
            </p>
          </div>
        </div>
        <div className="proModify_btn">
          <button className="cancle" onClick={handleCancelClick}>취소</button>
          <button className="complete" onClick={handleCompleteClick}>완료</button>
        </div>
      </div>
    </div>
  );
};

export default ProModify;
