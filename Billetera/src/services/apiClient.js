import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://laboratorio3-5fc7.restdb.io/rest/',
  headers: { 'x-apikey': '64bdbc3386d8c5613ded91e7',
    'Content-Type': 'application/json'
   }
});

async function register() {
  try {
    // Log de los datos que intentas enviar
    console.log("Datos de registro:", { 
      userId: userId.value, 
      password: password.value 
    });

    const newUser = { 
      userId: userId.value, 
      password: password.value 
    }

    // Añade más detalles de depuración
    try {
      const response = await registerUser(newUser);
      console.log("Respuesta completa del servidor:", response);

      isSuccess.value = true;
      message.value = 'Usuario registrado con éxito.';
    } catch (error) {
      console.error('Detalles completos del error:', error);
      
      // Información más detallada del error
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Datos del error:', error.response.data);
        console.error('Código de estado:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('Sin respuesta del servidor:', error.request);
      } else {
        // Algo sucedió al configurar la solicitud
        console.error('Error de configuración:', error.message);
      }

      isSuccess.value = false;
      message.value = 'Error al registrar usuario: ' + error.message;
    }
  } catch (generalError) {
    console.error('Error general:', generalError);
    isSuccess.value = false;
    message.value = 'Error inesperado al registrar usuario';
  }
}




//Función para registrar usuario
export function registerUser(user) {
  if (!user.userId || !user.password){
    throw new Error('El usuario y la contraseña son obligatorios');
  }

  return apiClient.post('user', user);
}

//Funcion para loguear usuario
export async function loginUser(userId, password) {
  try{
    const response = await apiClient.get('user', {
      params: {
        q: JSON.stringify({
          userId: userId,
          password: password
        })
      }
    });

    return response.data;
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