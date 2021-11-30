const Auth = () => {
  const buttonAuth = document.querySelector(".button-auth");
  const modalAuth = document.querySelector(".modal-auth");
  const buttonOut = document.querySelector(".button-out");
  const userName = document.querySelector(".user-name");
  const closeAuth = document.querySelector(".close-auth");
  const logInForm = document.getElementById("logInForm");
  const inputLogin = document.getElementById("login");
  const inputPassword = document.getElementById("password");
  const buttonCart = document.querySelector(".button-cart");

  const login = (user) => {
    if (user.login.length === 0 || !user.login.trim()) {
      alert("Укажите логин для входа");
      return;
    }
    if (user.password.length === 0 || !user.password.trim()) {
      alert("Вы не ввели пароль");
      return;
    }
    buttonAuth.style.display = "none";
    buttonOut.style.display = "flex";
    userName.style.display = "flex";
    buttonCart.style.display = "flex";

    userName.textContent = user.login.trim();
    modalAuth.style.display = "none";
  };

  const logout = () => {
    buttonAuth.style.display = "flex";
    buttonOut.style.display = "none";
    userName.style.display = "none";
    userName.textContent = "";
    buttonCart.style.display = "none";

    localStorage.removeItem("user");
  };

  buttonAuth.addEventListener("click", () => {
    modalAuth.style.display = "flex";
  });

  buttonOut.addEventListener("click", () => {
    logout();
  });

  closeAuth.addEventListener("click", () => {
    modalAuth.style.display = "none";
  });

  logInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = {
      login: inputLogin.value,
      password: inputPassword.value,
    };
    localStorage.setItem("user", JSON.stringify(user));
    login(user);
  });

  if (localStorage.getItem("user")) {
    login(JSON.parse(localStorage.getItem("user")));
  }
  //function syMeow() {
  //  console.log("Meom");
  //}
  //const sayMeow = function () {
  //  console.log("Meow");
  //};
  //const sayMeow = () => {
  //  console.log("Meow");
  //};
};
Auth();
