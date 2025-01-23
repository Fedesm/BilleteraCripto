import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
  headers: { 'x-apikey': '650b53356888544ec60c00bf' }
});

export function registerUser(user) {
    return apiClient.post('user', user);
  }

  export async function loginUser(userId, password) {
    const response = await apiClient.get(`user?q={"userId":"${userId}","password":"${password}"}`);
    return response.data;
  }


export default apiClient;