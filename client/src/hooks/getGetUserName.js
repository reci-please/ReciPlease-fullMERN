export const useGetUserName = () => {
    return window.localStorage.getItem("username");
}