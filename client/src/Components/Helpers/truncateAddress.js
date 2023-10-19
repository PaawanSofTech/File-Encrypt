export const truncateAddressHistory = (walletAddress) =>{
    let string = walletAddress.substring(0,4) + '...' + walletAddress.substring(38,42);
    console.log(string)
    return string;
}
export const truncateAddressNavbar = (walletAddress) =>{
    let string = walletAddress.substring(0,14) + '...';
    console.log(string)
    return string;
}