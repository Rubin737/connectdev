import validator from "validator";
export const validateSignUp = (req) => {
  const { fullName, email, password } = req;
  const errors = {};

  if (
    !fullName ||
    fullName.length >= 20 ||
    !validator.isAlpha(fullName, "en-US", { ignore: " " })
  ) {
    errors.fullName = "Name must contain only letters";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Email is not valid";
  }
  if (!validator.isStrongPassword(password)) {
    errors.password = "password is weak";
  }

  if (Object.keys(errors).length > 0) {
    const err = new Error("validation failed");
    err.valErrors = errors;
    throw err;
  }
};
