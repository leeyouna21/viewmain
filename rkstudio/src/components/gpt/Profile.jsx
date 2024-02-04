import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


const Profile = () => {
  const navigate  = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://your-backend-api/user');
        const { name, email, phone, password } = response.data;
        setUserData({ name, email, phone, password });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleCompleteButtonClick = () => {
    navigate('/ProModify');
  };

  const handleCancelClick = () => {
    navigate('/GPTMain');
  };

    const handleGeneralClick = () => {
    navigate('/Setting'); // 클릭 시 Setting.jsx로 이동
  };

  const handlePlanClick = () => {
    navigate('/Plan'); // 클릭 시 Setting.jsx로 이동
  };

  const handleProModifyClick = () => {
    navigate('/ProModify'); // 클릭 시 Setting.jsx로 이동
  };

  return (
    <div className='proModify_main'>
      <div className="pro_left">
          {/* <div className="logo_wrap">
            <div className="logo_text"></div>
            <div className="ham">
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div> */}
        <div className="left_inner">
          <h3>PERSONAL</h3>
          <div className="option_1">
            <div className="proModify_wrap">
              <div className="proModify_text">Profile</div>
            </div>
            <div className="general_wrap" onClick={handleGeneralClick}>
              <div className="general_text">General</div>
            </div>
            <div className="plan_wrap" onClick={handlePlanClick}>
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
                <input
                  type="text"
                  placeholder="이유나"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </label>
            </p>
            <p className="pro_mail">
              <p className='text'>E-mail</p>
              <label htmlFor="user_mail">
                <input
                  type="email"
                  placeholder="abcd@gmail.com"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </label>
            </p>
          </div>
          <div className="edit_wrap2">
              <p className="pro_pw">
                <p className='text'>Password</p>
                <label htmlFor="user_pw">
                  <input
                    type="password"
                    placeholder="********"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  />
                </label>
              </p>
              <p className="pro_phone">
                <p className='text'>Phone</p>
                <label htmlFor="user_phone">
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  />
                </label>
              </p>
            </div>
        </div>
        <div className="proModify_btn">
          <button className="cancle" onClick={handleCancelClick}>취소</button>
          <button className="complete" onClick={handleCompleteButtonClick}>변경</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
