import { defineStore } from 'pinia';

export const useUserStore = defineStore ('user', {
    //Estado inicial
    state: () => ({
        userId: null
    }),

    //Acciones para modificar el estado
    actions: {
        //Metodo para establecer el ID del usuario
        setUserId(userId) {
            this.userId = userId;
        },
    
        //Metodo para limpiar el ID del usuario (logout)
        clearUserId() {
            this.userId = null;
        }
    },

    //Getter para obtener informacion
    getters: {
        //Verificar si hay un usuario logueado
        isLoggedIn: (state) => state.userId !== null
    }
});