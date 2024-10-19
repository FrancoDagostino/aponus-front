import tokenUtil from "../token.util";



export const unAuthorizedHandler = () => {
    tokenUtil.del();
    window.location.replace('/login');
}