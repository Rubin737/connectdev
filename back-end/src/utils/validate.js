import validator from 'validator'
export const validateSignUp = (req)=>{
    const {fullName,email,password,bio} = req
    
    if(!fullName || fullName.length>=20){
        throw new Error('Name is not valid')
    }
    if(!validator.isEmail(email)){
        throw new Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Paword is weak')
    }
}