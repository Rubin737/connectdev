import validator from "validator";
export const onboardValidation = (onboard) => {
  const { fullName, location, nativeLanguage, learningLanguage, bio } =
    onboard.body;

    const bioWordLimit = 50;
    const bioWordCount = bio?.trim().split(/\s+/).length;
  

  const error = {};

  if (!fullName || fullName.length > 20 || !validator.isAlpha(fullName, "en-US", { ignore: " " })) {
        error.fullName = "Name must contain only letters"    
  }
  if(!bio || bioWordCount > bioWordLimit ){
    error.bio = "Bio should be less than 50 words"
  }
  if(!location || !validator.isAlpha(location,"en-US", { ignore: " " }) ){
    error.location = "Location looks not valid"
  }
  if((!nativeLanguage || !learningLanguage) || nativeLanguage === learningLanguage){
    error.language = `Native & learning languages can't be same`
  }

  if(Object.keys(error).length > 0){
    const err = new Error("Validation Failed");
    err.valErrors = error;
    throw err
  }


};
