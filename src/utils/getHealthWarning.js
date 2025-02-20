// utils/api.js
import axios from 'axios';

const getHealthWarningData = async (gender, region, ageGroup, year, month, pm25) => {
  try {
    const response = await axios.get('http://localhost:5000/api/healthWarning', {
      params: {
        gender,
        region,
        age_group: ageGroup,
        year,
        month,
        pm25,
      },
    });
    return response.data;  // 반환된 데이터를 그대로 반환
  } catch (error) {
    console.error('Error fetching health warning data:', error);
    throw error;  // 에러를 호출한 곳에 전달
  }
};

export { getHealthWarningData };
