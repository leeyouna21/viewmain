import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';

import { formatDateTime } from '../../utils/formatDateTime';
import { numberFormatter } from '../../utils/numberFormatter';

const GptMain = () => {
  const navigate = useNavigate();
  const [isScListVisible, setScListVisible] = useState(true);
  const [activeIcon, setActiveIcon] = useState(null);
  const [isRightPanelVisible, setRightPanelVisible] = useState(false);
  const [proInnerVisible, setProInnerVisible] = useState(false);
  const [calInnerVisible, setCalInnerVisible] = useState(false);
  const [todoInnerVisible, setTodoInnerVisible] = useState(false);
  const [isToStarFull, setToStarFull] = useState(false);
  const [chatroomList, setChatroomList] = useState([]);
  const [formInput, setFormInput] = useState(''); // 새로운 상태 추가
  const [userTextList, setUserTextList] = useState([]); // 사용자 텍스트 기록을 저장할 배열 추가
  // const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  // const [conversationId, setConversationId] = useState('');
  const [userText, setUserText] = useState('');
  const [aiText, setAiText] = useState('');
  const [isClicked, setIsClicked] = useState(false); // 클릭 여부 상태
  const [toHisBackground, setToHisBackground] = useState(false); // to_his 배경 상태
  const [toHisBackgroundText, setToHisBackgroundText] = useState(false); // to_his 텍스트 색깔 상태
  const [showIcon, setShowIcon] = useState(false); // to_his 아이콘 표시 여부 상태
  const [showConfirmation, setShowConfirmation] = useState(false); // to_his 삭제 확인 창 표시 여부 상태
  const [yeHisBackground, setYeHisBackground] = useState(false); // ye_his 배경 상태
  const [yeHisBackgroundText, setYeHisBackgroundText] = useState(false); // ye_his 텍스트 색깔 상태
  const [showYeHisIcon, setShowYeHisIcon] = useState(false); // ye_his 아이콘 표시 여부 상태
  const [showYeHisConfirmation, setShowYeHisConfirmation] = useState(false); // ye_his 삭제 확인 창 표시 여부 상태
  const [toWrapStates, setToWrapStates] = useState({}); //to_wrap 
  const selectList = ["Google"];
  const [Selected, setSelected] = useState("");   // 해시태그 기능을 위한 state 및 함수 추가
  const [inputValue, setInputValue] = useState('');  // 입력된 해시태그 값
  const [tagList, setTagList] = useState([]);  // 입력된 해시태그 목록
  const [tasks, setTasks] = useState([]); //캘린더 스케줄리스트 세부사항 api 불러오기  
  const [events, setEvents] = useState([]); //구글 캘린더 가져오기
  const location = useLocation();
  const userId = location.state?.userId || ''; 
  const [storageData, setStorageData] = useState([]);

  const [pwValid, setPwValid] = useState(false);

  // 오른쪽 사이드바
  const [proEmail, setProEmail] = useState(''); //오른쪽 패널 이메일 가져오기
  const [proPassword, setProPassword] = useState(''); //오른쪽 패널 이메일 가져오기

  // 스케쥴리스트 상태
  const [scheduleList, setScheduleList] = useState([])
  

  //📍 토큰을 가져오는 부분
  // 로컬 스토리지에서 토큰을 가져오는 함수
  const getToken = () => {
    const token = sessionStorage.getItem('token');
    console.log(token)
    return token;
  };

  // 저장공간 api
  useEffect(() => {
    const getStorageData = async () => {
      const url = "https://papi.rkteam.kr/api/v1/check/drive";
      const token = getToken();
      const data = {
        "token": token
      };

      try {
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        setStorageData(response.data);

        console.log("Size:", response.data.size);
      } catch (error) {
        console.error('Error fetching storage data:', error);
      }
    };
    getStorageData();
  }, []);

  // 지피티
  const createNewChat = async () => {
    try {
      // 채팅 생성
      const createChatResponse = await axios.post("https://papi.rkteam.kr/api/v1/chat/create", {
        token: token,
        title: "새로운 채팅방",
        files: ["user/4eb7e040-6b59-49d3-9b23-68c71d31dcf7/upload/dummy.md",
          "user/4eb7e040-6b59-49d3-9b23-68c71d31dcf7/email/dummy.md"]
      });
  
      const createChatResult = createChatResponse.data;
      console.log("New Chat Created:", createChatResult);
  
  
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  // 오른쪽 패널에서 로그인
  const handleCompleteClick = async () => {
    try {
      // 로컬 스토리지에서 토큰 가져오기
      const token = getToken();

      const url = "https://papi.rkteam.kr/api/v1/email/download";
      const response = await axios.post(url, {
        token,
        host: "imap.gmail.com",
        port: 993,
        id: proEmail,
        password: proPassword,
        use_ssl: true,
      });
      
      console.log("응답 데이터는~!!",response.data);
    
      alert("이메일이 다운로드 되었습니다.")
      getCalender();
      getScheduleList();
      // 파일 업로드 후 처리 로직 추가
      

    } catch (error) {
      console.error("Error:", error);
      // 오류 처리 로직 추가
    }
  };

  const handleEmailChange = (event) => {
    setProEmail(event.target.value);
  };

  // handlePasswordChange 함수에서는 setRightPassword를 사용합니다.
  const handlePasswordChange = (event) => {
    setProPassword(event.target.value);
  };


  // ⚙️get/task API⚙️
  const getScheduleList = async() => {
    try {
      const token = getToken();
      const response = await axios.post(
        "https://papi.rkteam.kr/api/v1/get/task",
        {
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
  
      console.log(response.data.tasks);
      setScheduleList(response.data.tasks)
  
    } catch (error) {
      console.error("Error:", error);
      // 오류 처리 로직 추가
    }
  }

  // ⚙️ 캘린더 API⚙️
  const getCalender = async() => {
    try {
      const token = getToken();
      const response = await axios.post(
        "https://papi.rkteam.kr/api/v1/cal/google/login",
        {
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
  
      console.log(response.data);
  
    } catch (error) {
      console.error("Error:", error);
      // 오류 처리 로직 추가
    }
  }

  // 잠시 주석처리할게용 에러가 나서 
  // // AI 응답 표시 지피티 기능에서 사용자가 질문을 하면 여기서 답변을 보내줘야함
  const displayAiResponse = async () => {
    // 토큰을 로컬 스토리지에서 가져옴
    const token = getToken(); 
    console.log("토큰:", token); // 토큰값을 콘솔에 출력

    // AI 응답을 받아오기
    // const aiResponse = await fetchAiResponse("임의의 메시지", token); // token 전달

    // 받아온 AI 응답 표시
    return (
      <div className="ai">
        {/* <div className="ai_text">{aiResponse}</div> */}
      </div>
    );
  };

  //AI 응답 표시 끝

  //--------------------------------
  // 사용자가 입력한 텍스트를 formInput 상태 변수에 설정하는 함수
  const handleInputText = (e) => {
    setFormInput(e.target.value);
  };
  //끝

  // 사용자가 버튼을 클릭했을 때 호출되는 함수
  const handleButtonClick = (e) => {
    e.preventDefault();
    setUserTextList((prevList) => [...prevList, formInput]); // 이전 텍스트에 현재 텍스트를 추가
    setFormInput('');
  };
  //끝
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleButtonClick(e);
    }
  };
  //끝

  // 창 열었다가 접기 기능
  const handleFoldClick = () => {
    setScListVisible((prevVisible) => !prevVisible);
  };
  //끝

 // 오른쪽패널 로그인 부분 메일 셀렉
 const handleSelect = (e) => {
  setSelected(e.target.value);
};
const [myLists, setMyLists] = useState([
  { inputValue: "", tagList: [], isToStarFull: false },
]);

  const handleInputChange = (index, e) => {
    const { value } = e.target;
    const updatedLists = [...myLists];
    updatedLists[index].inputValue = value;
    setMyLists(updatedLists);
  };
  
  const handleToStarClick = (index) => {
    const updatedLists = [...myLists];
    updatedLists[index].isToStarFull = !updatedLists[index].isToStarFull;
    setMyLists(updatedLists);
  };
  
  const handleAddList = () => {
    setMyLists([...myLists, { inputValue: '', tagList: [], isToStarFull: false }]);
  };
  //끝

  // to_wrap 요소 추가 함수
  const addNewToWrap = () => {
    const newToWrapKey = `to_wrap_${Object.keys(toWrapStates).length + 1}`;
    setToWrapStates(prevStates => ({
      ...prevStates,
      [newToWrapKey]: {
        toHisBackground: false,
        toHisBackgroundText: false,
        showIcon: false,
        showConfirmation: false,
      }
    }));
  };
  //끝

  

  // to_his 컴포넌트와 관련된 함수들
  const handleToHisClick = () => {
    setToHisBackground(!toHisBackground);
    setShowIcon(!showIcon);
  };

  const handleToTextClick = () => {
    setToHisBackgroundText(!toHisBackgroundText);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    setShowIcon(false);
    const toHisElement = document.querySelector('.to_his');
    if (toHisElement) {
      toHisElement.remove();
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setShowIcon(false);
  };
  //끝

  // ye_his 컴포넌트와 관련된 함수들
  const handleYeHisClick = () => {
    setYeHisBackground(!yeHisBackground);
    setShowYeHisIcon(!showYeHisIcon);
  };

  const handleYeHisTextClick = () => {
    setYeHisBackgroundText(!yeHisBackgroundText);
  };

  const handleYeHisDeleteClick = () => {
    setShowYeHisConfirmation(true);
  };

  const handleYeHisConfirmDelete = () => {
    setShowYeHisConfirmation(false);
    setShowYeHisIcon(false);
    const yeHisElement = document.querySelector('.ye_his');
    if (yeHisElement) {
      yeHisElement.remove();
    }
  };

  const handleYeHisCancelDelete = () => {
    setShowYeHisConfirmation(false);
    setShowYeHisIcon(false);
  };
  //끝

  // //해시태그 입력 처리
  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  // 엔터 키 또는 스페이스바 입력 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.keyCode === 32) {
      addTag(inputValue);
      setInputValue('');
    }
  };
  //끝

  // 태그 추가 함수
  const addTag = (value) => {
    // 태그 중복 검사
    if (!tagList.includes(value)) {
      setTagList([...tagList, value]);
    } else {
      alert('태그값이 중복됩니다.');
    }
  };
  //끝
  
  //해시태그기능
  // const handleTagChange = (index, tagIndex, action) => {
  //   const updatedLists = [...myLists];
  //   const { tagList } = updatedLists[index];
  //   if (action === 'add') {
  //     updatedLists[index].tagList = [...tagList, tagIndex];
  //   } else if (action === 'remove') {
  //     updatedLists[index].tagList = tagList.filter((_, i) => i !== tagIndex);
  //   }
  //   setMyLists(updatedLists);
  // };

  // 오른쪽 패널 보이기 , 안 보이기 구현 함수
  const removeTag = (index) => {
    const updatedTags = [...tagList];
    updatedTags.splice(index, 1);
    setTagList(updatedTags);
  };
  const handleShowProInner = () => {
    setProInnerVisible(true);
  };
  const handleHideProInner = () => {
    setProInnerVisible(false);
  };
  const handleShowCalInner = () => {
    setCalInnerVisible(true);
  };
  const handleHideCalInner = () => {
    setCalInnerVisible(false);
  };  
  const handleShowTodoInner = () => {
    setTodoInnerVisible(true);
  };
  const handleHideTodoInner = () => {
    setTodoInnerVisible(false);
  };
  //끝

  //왼쪽 패널 email
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);

    // 이메일 유효성
    const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  // 비밀번호 유효성
  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  // 왼쪽 패널이 숨겨져 있을 때
  const handleLeftPanelClose = () => {
  const leftElement = document.querySelector('.gpt_wrap .gpt_left');
  const centerElement = document.querySelector('.gpt_wrap .gpt_center');
  const containerElement = document.querySelector('.gpt_wrap .left_container');

  // 왼쪽 패널이 숨겨져 있을 때
  if (leftElement.style.width === '0px' || leftElement.style.width === '0%') {
    // 왼쪽 패널 보이게 설정
    leftElement.style.width = '200px';
    centerElement.style.width = 'calc(100% - 200px)';
    containerElement.style.display = 'block';
  } else {
    // 왼쪽 패널 숨기게 설정
    leftElement.style.width = '0';
    centerElement.style.width = '100%';
    containerElement.style.display = 'none';
  }
};
//끝

useEffect(() => {
  // 컴포넌트가 마운트되었을 때 오른쪽 패널을 열어줌
  const rightElement = document.querySelector('.gpt_wrap .gpt_right');
  const centerElement = document.querySelector('.gpt_wrap .gpt_center');
  const rightContElement = document.querySelector('.gpt_wrap .right_container');

  rightElement.style.width = '300px';
  centerElement.style.width = 'calc(100% - 300px)';
  rightContElement.style.display = 'block';
  setRightPanelVisible(true);
}, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

useEffect(() => {
  // 컴포넌트가 마운트되었을 때 초기화면 설정
  const rightElement = document.querySelector('.gpt_wrap .gpt_right');
  const centerElement = document.querySelector('.gpt_wrap .gpt_center');
  const rightContElement = document.querySelector('.gpt_wrap .right_container');

  rightElement.style.width = '0';
  centerElement.style.width = '100%';
  rightContElement.style.display = 'none';
  setRightPanelVisible(false);
}, []);

  // 오른쪽 패널을 닫을 때 호출되는 함수
  const handleRightPanelClose = () => {
  const rightElement = document.querySelector('.gpt_wrap .gpt_right');
  const centerElement = document.querySelector('.gpt_wrap .gpt_center');
  const rightContElement = document.querySelector('.gpt_wrap .right_container');

  rightElement.style.width = '0';
  centerElement.style.width = '100%';
  rightContElement.style.display = 'none';
  setRightPanelVisible(false);
};  
  const handleOpenButtonClick = () => {
  const rightElement = document.querySelector('.gpt_wrap .gpt_right');
  const centerElement = document.querySelector('.gpt_wrap .gpt_center');
  const rightContElement = document.querySelector('.gpt_wrap .right_container');

  // 패널이 열려있으면 open 아이콘을 숨김
  if (isRightPanelVisible) {
    rightElement.style.width = '0px'; // px 단위를 함께 지정
    centerElement.style.width = '100%';
    rightContElement.style.display = 'none';
    setRightPanelVisible(false);
  } else {
    // 패널이 닫혀있으면 패널을 열어줌
    rightElement.style.width = '300px';
    centerElement.style.width = 'calc(100% - 300px)';
    rightContElement.style.display = 'block';
    setRightPanelVisible(true);
  }
};

  //오른쪽 사이드바 아이콘 클릭시 색상 변경 (프로필 아이콘)
  const [right_pro, setRightProIcon] = useState(false);
  const handleRightProIcon = () => {
    setRightProIcon(!right_pro);
  };

  //오른쪽 사이드바 아이콘 클릭시 색상 변경 (캘린더 아이콘)
  const [right_cal, setRightCalIcon] = useState(false);
  const handleRightCalIcon = () => {
    
    setRightCalIcon(!right_cal);
  };
  //오른쪽 사이드바 아이콘 클릭시 색상 변경 (투두 아이콘)
  const [right_todo, setRightTodoIcon] = useState(false);
  const handleRightTodoIcon = () => {
    setRightTodoIcon(!right_todo);
  };

  const handleIconClick = (iconName) => {
    if (activeIcon === iconName) {
      // 이미 클릭한 아이콘을 다시 클릭한 경우
      setActiveIcon(null); // 아이콘 상태 초기화
    } else {
      setActiveIcon(iconName); // 새로운 아이콘 클릭
    }
  };


  //오른쪽 패널 클릭시 발생하는 이벤트들 끝 🎲


    //파일드롭 
    const [isActive, setActive] = useState(false);
    const [uploadedInfo, setUploadedInfo] = useState(null);

    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);
    const handleDragOver = (event) => {
      event.preventDefault();
    };
    const FileInfo = ({ uploadedInfo }) => (
      <ul className="preview_info">
        {Object.entries(uploadedInfo).map(([key, value]) => (
          <li key={key}>
            <span className="info_key">{key}</span>
            <span className="info_value">{value}</span>
          </li>
        ))}
      </ul>
    );
    const setFileInfo = (file) => {
      const { name, size: byteSize, type } = file;
      const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
      setUploadedInfo({ name, size, type }); // name, size, type 정보를 uploadedInfo에 저장
    };
    
    const handleDrop = (event) => {
      event.preventDefault();
      setActive(false);

      const file = event.dataTransfer.files[0];
      setFileInfo(file);
    };

    const handleUpload = ({ target }) => {
      const file = target.files[0];
      setFileInfo(file);
    }
    //파일드롭 끝

    // 투두리스트 체크박스 누르면 밑으로 내려가는 부분
    const handleCheckboxChange = (index, e) => {
  const isChecked = e.target.checked;
  const checkedElement = e.target.closest('.my_list');

  // 중복 호출 방지
  if (checkedElement.classList.contains('moving')) {
    return;
  }

  if (isChecked) {
    // 체크된 경우
    // .com_inner에 추가합니다.
    const comInnerElement = document.querySelector('.com_inner');
    if (comInnerElement) {
      comInnerElement.appendChild(checkedElement);
      checkedElement.classList.add('moving');
    }
  } else {
    // 체크 해제된 경우
    // .com_inner에서 제거하고 .my_listwrap에 추가합니다.
    const comInnerElement = document.querySelector('.com_inner');
    if (comInnerElement) {
      comInnerElement.removeChild(checkedElement);
      const myListsWrapElement = document.querySelector('.my_listwrap');
      if (!myListsWrapElement.contains(checkedElement)) {
        myListsWrapElement.prepend(checkedElement);
      }
    }
    checkedElement.classList.remove('moving');
  }
};
    // 투두리스트 체크박스 누르면 밑으로 내려가는 부분 끝


  
  return (
    <div className="gpt_wrap">
      <div className="gpt_left" >
        <div className="left_container">
          <div className="left_top">
            <div className="inner_logo">POD Project</div>
            <div className="inner_ref" onClick={createNewChat}></div>
          </div>
          <div className="left_history">
            <div className="left_today">
              <h4>Today</h4>
              <div className="to_wrap">
                <div className={`to_his ${toHisBackground ? 'change_background' : ''}`} onClick={handleToHisClick}>
                  <div className={`tohis_text ${toHisBackgroundText ? 'change_text' : ''}`}>New Chat</div>
                  <div className="todis_dele" style={{ display: showIcon ? 'block' : 'none' }} onClick={handleDeleteClick}></div>
                </div>
                {showConfirmation && (
                  <div className="confirmation-dialog">
                    <div className="confirmation-message">질문을 삭제하시겠습니까?</div>
                    <div className="confirmation-buttons">
                      <button className='Cancle' onClick={handleCancelDelete}>Cancle</button>
                      <button className='Delete' onClick={handleConfirmDelete}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
              {/* 채팅방 목록 불러오기 api위치  
              {Array.isArray(chatroomList) && chatroomList.map((chatroom) => (
                <div key={chatroom.id} className="to_his">
                  <div className="tohis_text">{chatroom.name}dfdf</div>
                  <div className="todis_dele"></div>
                </div>
              ))} */}
            </div>
            <div className="left_yester">
              <h4>Yesterday</h4>
              <div className="ye_wrap">
                <div className={`ye_his ${yeHisBackground ? 'change_background' : ''}`} onClick={handleYeHisClick}>
                  <div className={`yehis_text ${yeHisBackgroundText ? 'change_text' : ''}`}>New Chat</div>
                  <div className="yehis_dele" style={{ display: showYeHisIcon ? 'block' : 'none' }} onClick={handleYeHisDeleteClick}></div>
                </div>
                {showYeHisConfirmation && (
                  <div className="confirmation-dialog">
                    <div className="confirmation-message">질문을 삭제하시겠습니까?</div>
                    <div className="confirmation-buttons">
                      <button className='Cancle' onClick={handleYeHisCancelDelete}>Cancle</button>
                      <button className='Delete' onClick={handleYeHisConfirmDelete}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="filedrop">
            <label
              className={`preview${isActive ? ' active' : ''}`}
              onDragEnter={handleDragStart}
              onDragOver={handleDragOver}
              onDragLeave={handleDragEnd}
              onDrop={handleDrop}
            >
              <input type="file" className="file" onChange={handleUpload} />
              {uploadedInfo && <FileInfo uploadedInfo={uploadedInfo} />}
              {!uploadedInfo && (
                <>
                  <p className="preview_msg">File Drop</p>
                  <p className="preview_desc"></p>
                </>
              )}
            </label>
          </div>
          {/* storage 연동 부분 시작 */}
          <div className="storage">
            <div className="sto_text">
              <h4>Storage</h4>
              <div className="MB">
                <div className="meMB">{numberFormatter(storageData.size)}MB</div>
                <div className="maxMB">/ MB</div>
              </div>
            </div>
            <div className="sto_bar">
              <div className="my_bar"></div>
            </div>
          </div>
          {/* storage 연동 부분 끝 */}
          <div className="profile">
            <div className="pro_icon"></div>
            <h4>{userId}</h4>
          </div>
          <div className="left_set">
            <div className="language">
              <div className="lan_icon"></div>
              <h4>language</h4>
            </div>
            <div className="setting">
              <div className="set_icon"></div>
              <h4>setting</h4>
            </div>
            <div className="theme">
              <div className="the_icon"></div>
              <h4>theme</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="close_left" onClick={handleLeftPanelClose} >
        <div className="clo_inn"></div>
        <div className="open_inn"></div>

      </div>
      <div className="gpt_center">
      <div className="chat_display_container">
        {userTextList.map((text, index) => (
          <div key={index} className="user">
            <div className="user_text">{text}</div>
          </div>
        ))}
      </div>
        <div className="chat_write">
          <div className="chat_write_container">
            <form action="/submit" method="post">
              <textarea
                id="userQuestion"
                name="userQuestion"
                value={formInput}
                onChange={handleInputText}
                onKeyPress={handleEnterKey}
                placeholder="Ask anything..."
                maxLength="1000"
                rows="5"
              ></textarea>
            </form>
            <button className="sendmsg" onClick={handleButtonClick}></button>
          </div>
        </div>
      </div>
      <div className="open" style={{ display: isRightPanelVisible ? 'none' : 'flex' }} onClick={handleOpenButtonClick}>
        <div className="open_icon"></div>
      </div>
      <div className="gpt_right" style={{ display: isRightPanelVisible ? 'block' : 'none' }}>        
        <div className="right_container">
          <div className="iconarea">
            <div onClick={() => handleIconClick("pro")}>
              {activeIcon === "pro" ? (
                <div className="change_proIcon" />
              ) : (
                <div className="right_pro" 
                  onClick={() => {
                  handleShowProInner();
                  handleHideCalInner();
                  handleHideTodoInner();
                }} />
              )}
            </div>
            <div onClick={() => handleIconClick("cal")}>
              {activeIcon === "cal" ? (
                <div className="change_calIcon" />
              ) : (
                <div className="right_cal"
                  onClick={() => {
                  handleShowCalInner();
                  handleHideProInner();
                  handleHideTodoInner();
                }}/>
              )}
            </div>
            <div onClick={() => handleIconClick("todo")}>
              {activeIcon === "todo" ? (
                <div className="change_todoIcon" />
              ) : (
                <div className="right_todo" 
                  onClick={() => {
                  handleShowTodoInner();
                  handleHideCalInner();
                  handleHideProInner();
                }} />
              )}
            </div>
            <div className="delete_icon" onClick={handleRightPanelClose}></div>
          </div>
          <div className="pro_inner" style={{ display: proInnerVisible ? 'block' : 'none' }}>            
            <h4>Sync</h4>
            <div className="procom_wrap">
              {/* <h2>{prouserID}님의 이메일을 연동하였습니다.</h2> */}
            </div>
            <div className="pro_inner_Email">
              <form>
                <input
                  className="pro_inner_Emailinput"
                  placeholder="E-mail"
                  value={proEmail}
                  onChange={handleEmailChange}
                  type="text"
                  autoComplete="new-password"
                />
              </form>
            </div>
            <div className="errorMessageWrap_gpt">
              {!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요.</div>}
            </div>
            <div className="pro_inner_PW">
              <form>
                <input
                  className="pro_inner_PWinput"
                  value={proPassword}
                  onChange={handlePasswordChange}
                  placeholder="PW"
                  type="text"
                />
              </form>
            </div>
            <div className="pro_inner_conn">
            <select onChange={handleSelect} value={Selected}>
              <option value="" disabled defaultValue>이메일을 선택해주세요.</option>
              {selectList.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
              </select>
            </div>
            <button className="pro_complete"  onClick={handleCompleteClick}>Complete</button>
          </div>

          <div className="cal_inner" style={{ display: calInnerVisible ? 'block' : 'none' }}>
            <div className="cal_header">
              <h4>Calender</h4>
            </div>

            {/* 캘린더 api위치 */}
            <div className="calendar"></div>
            {/* 캘린데 api위치 끝 */}

            {/* 스케줄 함수를 받아와서 뿌려주어야 하는 위치 시작 */}

            <div className="sc_wrap">
              <div className="sclist_header">
                <h4>Schedule list</h4>
                <div className="com_fold" onClick={handleFoldClick}></div>
              </div>
              {/* 캘린더 스케줄리스트 세부사항 api 받아오는 코드 시작 */}
              {/* <div className="sc_list">
                  <div className="sclist_left">
                    <div className="sc_date">
                      <div className="start">
                        <div className="start_icon"></div>
                        <div className="startdate">2024.04.14</div>
                      </div>
                      <div className="end">
                        <div className="end_icon"></div>
                        <div className="enddate">2024.09.17</div>
                      </div>
                    </div>
                    <div className="sc_meet">
                      <div className="location_icon"></div>
                      <div className="sc_location">In Seoul</div>
                    </div>

                    <div className="sc_content">Hello, My name is lee</div>
                    <div className="sc_from">
                      <h6>yuna</h6>
                    </div>
                  </div>

                <div className="sclist_right">
                  <div className="icon"> 
                      <div
                        className={isToStarFull ? "to_starfull" : "to_star"}
                        onClick={handleToStarClick}
                      />
                      <div className="to_modify"></div>
                      <div className="to_delete"></div>
                  </div>
                </div>
              </div> */}

              {/* 캘린더 스케줄 리스트 map */}
              {scheduleList.map((schedule, index) => (
                <div key={index} className="sc_list">
                  <div className="sclist_left">
                    <div className="sc_date">
                      <div className="start">
                        <div className="start_icon"></div>
                        <div className="startdate">{formatDateTime(schedule.start.dateTime)}</div>
                      </div>
                      <div className="end">
                        <div className="end_icon"></div>
                        <div className="enddate">{formatDateTime(schedule.end.dateTime)}</div>
                      </div>
                    </div>
                    <div className="sc_meet">
                      <div className="location_icon"></div>
                      <div className="sc_location">{schedule.start.timeZone}</div>
                    </div>
                    <div className="sc_content">{schedule.summary}</div>
                    <div className="sc_from">
                      <h6>{schedule.subject}</h6>
                    </div>
                  </div>
                  <div className="sclist_right">
                    <div className="icon">
                      {/* 추가적인 기능들을 여기에 구현 */}
                      {/* 예: 좋아요 버튼, 수정 버튼, 삭제 버튼 */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="todo_inner" style={{ display: todoInnerVisible ? 'block' : 'none' }}>
            <div className="todo_header">
              <h4>To do list</h4>
              <div className="fold"></div>
            </div>
            <div className="list">
              <div className="add_list" onClick={handleAddList}>
                <div className="add_logo"></div>
                <h6>Add New Task</h6>
              </div>

            {/* 투두 함수를 받아와서 뿌려주어야 하는 위치 시작 */}
              <div className="my_listwrap">
              {myLists.map((list, index) => (
                <div className="my_list" key={index}>
                  <div className="check_wrap">
                    <input
                      type="checkbox"
                      id={`check_btn_${index}`}
                      onChange={(e) => handleCheckboxChange(index, e)}
                    />
                    <label htmlFor={`check_btn_${index}`}></label>
                  </div>
                  <div className="text">
                    <div className="text_in">
                      <div className="todo_datewrap">
                        <div className="todo_date">
                          <div className="tododate_icon"></div>
                          <div className="date_text">2024.02.29</div>
                        </div>
                        <div className="todo_time">
                          <div className="todotime_icon"></div>
                          <div className="time_text">20:08</div>
                        </div>
                      </div>

                      {/* 투두 함수를 받아와서 뿌려주어야 하는 위치 끝 */}

                      {/* <div className="hash">
                        <input
                          id={`tag_${index}`}
                          type="text"
                          value={list.inputValue}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder="해시태그를 입력하세요."
                        />
                        <ul id={`tag-list_${index}`}>
                          {list.tagList.map((tag, tagIndex) => (
                            <li key={tagIndex} className="tag-item">
                              {tag}
                              <span
                                className="del-btn"
                                onClick={() => handleTagChange(index, tagIndex, 'remove')}
                              >
                                x
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div> */}
                      <h6>Check your mail</h6>
                    </div>
                    <div className="icon">
                    <div
                        className={list.isToStarFull ? "to_starfull" : "to_star"}
                        onClick={() => handleToStarClick(index)}
                      />  
                      <div className="to_modify"></div>
                      <div className="to_delete"></div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
            <div className="complete">
              <div className="com_header">
                <h4>complete</h4>
                <div className="com_count"></div>
                <div className="com_fold"></div>
              </div>
              <div className="com_inner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GptMain;


