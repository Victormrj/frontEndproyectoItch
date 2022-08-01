import { useDispatch, useSelector } from "react-redux"

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();

    

    return {
        //Propiedades
        errorMessage,
        status,
        user,


        //Metodos
    }

}