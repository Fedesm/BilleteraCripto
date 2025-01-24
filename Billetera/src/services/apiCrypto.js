import axios from 'axios';

const cryptoApi = axios.create({
  baseURL: 'https://criptoya.com/api',
});


export default cryptoApi;