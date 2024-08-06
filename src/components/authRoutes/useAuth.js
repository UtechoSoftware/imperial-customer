export const useAuth = () => {
    //getting token from local storage
    const isLogin = window.localStorage.getItem("isLogin_imperial")
    //checking whether token is preset or not
    if (isLogin) {
        return true;
    } else {
        return false
    }
};