export const capitalizeString = (str)=>{
    if(!str) return null
    return str.charAt(0).toUpperCase() + str.slice(1)
}