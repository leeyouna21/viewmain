// 날짜 formatter🌟


export function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Seoul' };
    const formattedDateTime = new Date(dateTimeString).toLocaleString('ko-KR', options).replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, '$3-$1-$2, $4:$5:$6');
    return formattedDateTime;
}