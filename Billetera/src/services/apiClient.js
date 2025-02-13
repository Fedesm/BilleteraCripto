import axios from 'axios';
import { useAttrs } from 'vue';

const apiClient = axios.create({
  baseURL: 'https://laboratorio-afe2.restdb.io/rest/',
  headers: { 'x-apikey': '650b53356888544ec60c00bf',
    'Content-Type': 'application/json'
   }
});

//Funcion para loguear usuario
export async function loginUser(userId) {
  try{
      //Guardar el usuario en el local storage
      localStorage.setItem('userId', userId);
        return { userId: userId };

    // const response = await apiClient.get('user', {
    //   params: {
    //     q: JSON.stringify({ userId: userId })
    //   }
    // });
    // if(response.data.length > 0){
    //   return response.data;
    // }
    // else{
    //   throw new Error('Usuario no encontrado');
    // }
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