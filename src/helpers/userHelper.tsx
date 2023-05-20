export function logoutUser() : void {
    sessionStorage.removeItem("token");
}
