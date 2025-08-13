import { LANGUAGE_TO_FLAG } from "src/constants/constants";

export const getFlag = (language)=>{
 const lowerCase = language.toLowerCase();
 const country = LANGUAGE_TO_FLAG[lowerCase];
 const url = `https://flagcdn.com/24x18/${country}.png`
 return url || "https://flagcdn.com/24x18/us.png";
}