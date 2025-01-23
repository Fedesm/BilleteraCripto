import axios from 'axios';

const cryptoApi = axios.create({
  baseURL: 'https://criptoya.com/'
});

export default cryptoApi;