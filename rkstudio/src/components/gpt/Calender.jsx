import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [credentials, setCredentials] = useState(null);

  const getGoogleEvents = async () => {
    try {
      const response = await fetch("https://papi.rkteam.kr/api/v1/cal/google/get_event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credentials: credentials,
        }),
      });

      // OAuth 2.0 토큰이 담긴 credentials를 전달하여 Google Calendar API와 통신

      if (response.ok) {
        const responseData = await response.json();
        console.log("Google Calendar Events Response:", responseData);

        // 여기서 responseData를 사용하여 상태를 업데이트하거나 다른 작업을 수행
        const events = responseData.events;
        // 예: setStartDate(events[0].start.dateTime);
      } else {
        console.error("Failed to fetch Google Calendar Events:", response.statusText);
      }
    } catch (error) {
      console.error("Error while fetching Google Calendar Events:", error);
    }
  };

  useEffect(() => {
    // 페이지가 로드될 때 Google 캘린더 이벤트를 가져오도록 설정
    getGoogleEvents();
  }, [credentials]);

  const CustomDatePicker = () => {
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
      />
    );
  };

  return <CustomDatePicker />;
};

export default Calendar;
