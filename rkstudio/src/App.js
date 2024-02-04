import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/rendering/Header';
import Desc from './components/rendering/Desc';
import Price from './components/rendering/Price';
import Cta from './components/rendering/Cta';
import Footer from './components/rendering/Footer';
import Login from './components/login/Login';
import Kakao from './components/login/Kakao';
import GptMain from './components/gpt/GptMain';
import Setting from './components/gpt/Setting';
import Profile from './components/gpt/Profile';
import ToggleSwitch from './components/gpt/ToggleSwitch.jsx';
import Calender from './components/gpt/Calender.jsx';
import ProModify from './components/gpt/ProModify';
import Plan from './components/gpt/Plan';
import Singup from './components/login/Singup';
import Forgotpw from './components/login/Forgotpw';

const App = () => {
  useEffect(() => {
    const initKakao = async () => {
      const jsKey = "YOUR_KAKAO_JAVASCRIPT_APP_KEY";
      const KakaoInstance = window.Kakao;

      if (KakaoInstance && !KakaoInstance.isInitialized()) {
        await KakaoInstance.init(jsKey);
        console.log(KakaoInstance.isInitialized());
      }
    };

    initKakao();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/kakao" element={<Kakao />} />
          <Route path="/gptmain" element={<GptMain />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/toggleswitch" element={<ToggleSwitch />} />
          <Route path="/promodify" element={<ProModify />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/forgotpw" element={<Forgotpw />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const Home = () => (
  <>
    <Header />
    <Desc />
    <Price />
    <Cta />
    <Footer />
  </>
);

export default App;
