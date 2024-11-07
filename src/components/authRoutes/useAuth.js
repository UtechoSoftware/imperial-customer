import { useSelector } from "react-redux";

export const useAuth = () => {
    //getting token from local storage
    const isLogin = useSelector((state) => state.adminData.adminData.isLogin)
    //checking whether token is preset or not
    if (isLogin) {
        return false;
    } else {
        return true
    }
};