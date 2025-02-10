import { defineStore } from 'pinia';

export const useUserStore = defineStore ('user', {
    //Estado inicial
    state: () => ({
        userId: null,
        userData: null  //Estado para almacenar Id del usuario
        }),

    //Acciones para modificar el estado
    actions: {
        //Metodo para establecer el ID del usuario
        setUserId(userId) {
            this.userId = userId;
            localStorage.setItem('userId', userId);  //Para guardar el usuario de forma local
        },
    
        //Metodo para limpiar el ID del usuario (logout)
        clearUserId() {
            this.userId = null;
            localStorage.removeItem('userId'); //Lo elimina de local
        }
    },

    //Getter para obtener informacion
    getters: {
        //Verificar si hay un usuario logueado
        isLoggedIn: (state) => state.userId !== null
    }
});