export const fetchTodoData = async () => {
    const response = await fetch('/api/v1/get/task', {
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // 토큰이 필요한 경우 추가
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await response.json();
    return data;
  };
  