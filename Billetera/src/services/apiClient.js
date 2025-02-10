import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
  headers: { 'x-apikey': '64bdbb6f86d8c5e18ded91e3',
    'Content-Type': 'application/json'
   }
});

//Funcion para loguear usuario
export async function loginUser(userId) {
  try{
    const response = await apiClient.get('user', {
      params: {
        q: JSON.stringify({ userId: userId })
      }
    });
    if(response.data.length > 0){
      return response.data;
    }
    else{
      throw new Error('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error en inicio de sesión:', error);
    throw error;
  }
}
  
//Función para obtener datos de usuario
export async function getUserData(userId) {
  try{
    const response = await apiClient.get(`user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de usuario:', error);
    throw error;
  }
}

export default apiClient;