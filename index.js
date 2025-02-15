// get all form elements that we want to validate
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const postCode = document.getElementById("post-code");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", (e) => {
  //prevent default submition so we can validate
  e.preventDefault();
  //validate using our own function
  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.textContent = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.textContent = "";
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
};
const validateInputs = () => {
  //trim each input value to remove any whitespace
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const postCodeValue = postCode.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPostCode = (postCode) => {
    const re = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/;
    return re.test(String(postCode.toUpperCase()));
  };

  if (usernameValue === "") {
    setError(username, "Username is required");
  } else {
    setSuccess(username);
  }
  //todo use email.validity
  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Must be a valid email");
  } else {
    setSuccess(email);
  }
  // todo -> check minlength, and make sure passsowrd and confirm password are the same
  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (password.value.length < 8) {
    setError(password, "Password must be at least 8 characters");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "Please confirm your password");
  } else if (password2Value != passwordValue) {
    setError(password2, "Passwords must match");
  }

  if (postCodeValue === "") {
    setError(postCode, "Please add post code");
  } else if (!isValidPostCode(postCodeValue)) {
    setError(postCode, "Please provide a valid uk post code");
  } else {
    setSuccess(postCode);
  }
};
