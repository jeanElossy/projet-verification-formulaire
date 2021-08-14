
const inputs = document.querySelectorAll("input[type='text'], input[type='password']");
const form = document.querySelector("form");
const eyeTop = document.getElementById("eye__top");
const eyeSlashTop= document.getElementById("eye__slach__top");
const eyeBottom = document.getElementById("eye__bottom");
const eyeSlashBottom= document.getElementById("eye__slash__bottom");

const labelPseudo = document.getElementById("pseudo");
const labelEmail = document.getElementById("email");
const labelPassword = document.getElementById("password");
const labelConfirm = document.getElementById("confirm");

//creer des variables de stockage dans la base de donnée mais dans notre cas je vais stocker les données dans la console.
let pseudo, email, password, confirmPass;
// faire evoluer la bar de progression il faut d'abord la pointer
const progressBar = document.getElementById("progress__bar");


// verification de champs de formulaire
const errorDisplay = (tag, message, valid) => {
  // selection du container et span en fonction du tag passer en parametre
  const container = document.querySelector("." + tag + "__container");
  const span = document.querySelector("." + tag + "__container > span");
  //verification de la valeur passer dans l'input et les message d'error a afficher
  if(!valid){
    container.classList.add("error"); 
    span.textContent = message;
  }else{
    container.classList.remove("error");
    span.textContent = message;
  }
};

// verification du champs pseudo
const pseudoChecker = (value) => {
  if(value.length > 0 && (value.length < 3 || value.length > 20)){
    errorDisplay(
      "pseudo", 
      "Doit faire entre 3 et 20 caractères"
      );
    // valeur a stocker = null si jamais on est dans cette condition
    pseudo = null;
  }else if(!value.match(/^[a-zA-Z0-9_.-]*$/)){
    errorDisplay(
      "pseudo",
      "Contenir de caractères spéciaux"
    );
    // valeur a stocker = null si jamais on est dans cette condition
    pseudo = null;
  }else{
    errorDisplay(
      "pseudo", 
      "Pseudo validé", 
      true
    );
    //stockage de donnée apres validation des données
    pseudo = value;
  }
  if((value === "")){
    errorDisplay(
      "pseudo",
      ""
    );
  }
};

// verification du champs email
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay(
      "email",
      "Le mail n'est pas validé"
    );
    email = null;
  }else{
    errorDisplay(
      "email",
      "mail validé",
      true
    );
    email = value;
  }
  if((value === "")){
    errorDisplay(
      "email",
      ""
    );
  }
  email = null;
};

// verification du champs password
const passwordChecker = (value) => {
  progressBar.classList = "";

  //regex de verification de mot de passe contenant 1Maj, 8   caracteres, 1 caract special, 1 chiffre
  if(!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\w]){1,})(?!.*\s).{8,}$/)){
    errorDisplay(
      "password",
      "Contenir 1Maj, 8 caracteres, 1 caractère special, 1 chiffre"
    );
    progressBar.classList.add("progressRed");
    password = null;
  }else if(value.length < 12){
    progressBar.classList.add("progressBlue");
    errorDisplay(
      "password",
      "Mot de passe bon !",
      true
    );
    password = value;
  }else{
    progressBar.classList.add("progressGreen");
    errorDisplay(
      "password",
      "Mot de passe excellent",
      true
    );
    password = value;
  }
  if(confirmPass){
    confirmChecker(confirmPass);
  }
  // faire disparaitre la bar de progression quand le contenu du champs password est vide
  if((value === "")){
    progressBar.classList = "";
    errorDisplay(
      "password",
      ""
    );
  }
};

// verification du champs confirmPass
const confirmChecker = (value) => {
  if (value !== password) {
    errorDisplay(
      "confirm",
      "Les mots de passe ne sont pas identiquent"
    );
    confirmPass = false;
  }else{
    errorDisplay(
      "confirm",
      "Mot de passe identiquent",
      true
    );
    confirmPass = true;
  }
  if((value === "")){
    errorDisplay(
      "confirm",
      " "
    );
  }
};

// executer cet even sur chaque input en fonction de l'input qui sera utilisé
inputs.forEach((input) => input.addEventListener("input", (e) => {
  switch(e.target.id){
    case "pseudo":
      pseudoChecker(e.target.value); 
      break;
    case "email":
      emailChecker(e.target.value);
      break;
    case "password":
      passwordChecker(e.target.value);
      break;
    case "confirm":
      confirmChecker(e.target.value);
      break;
    default:
      null;
      break;
  }
}));

// envoie du formulaire 
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if(pseudo && email && password && confirmPass){
    // on regroupe tous dans un objet
    const data = {
      pseudo: pseudo,
      email: email, 
      password: password,
      confirmPass: confirmPass
    };
    // afficher les données dans la console
    console.log(data); 
    // vider tous les champs apres validation du formulaire
    inputs.forEach((input) => input.value = "");
    // faire disparaitre la bar de progression
    progressBar.classList = "";

    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validé !"); 
  }else{
    alert("Veuillez remplir correctement tous les champs !");
  }
});

window.onload = () => {
  eyeTop.addEventListener("click", () => {
    // changement des icons du haut
    eyeTop.style.display = "none";
    eyeTop.nextElementSibling.style.display = "initial";
    eyeTop.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.type= "text";
  });
  eyeSlashTop.addEventListener("click", (e) => {
    eyeSlashTop.style.display = "none";
    eyeSlashTop.previousElementSibling.style.display = "initial";
    eyeSlashTop.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.type = "password";
  }); 
  // changement des icons du bas
  eyeBottom.addEventListener("click", () => {
    eyeBottom.style.display = "none";
    eyeBottom.nextElementSibling.style.display = "initial";
    eyeBottom.parentElement.previousElementSibling.type= "text";
  });
  eyeSlashBottom.addEventListener("click", (e) => {
    eyeSlashBottom.style.display = "none";
    eyeSlashBottom.previousElementSibling.style.display = "initial";
    eyeSlashBottom.parentElement.previousElementSibling.type = "password";
  }); 

  labelPseudo.addEventListener("click", () => {
    labelPseudo.previousElementSibling.classList.add("pseudo");
  });
  labelEmail.addEventListener("click", () => {
    labelEmail.previousElementSibling.classList.add("pseudo");
  });
  labelPassword.addEventListener("click", () => {
    labelPassword.previousElementSibling.classList.add("pseudo");
  });
  labelConfirm.addEventListener("click", () => {
    labelConfirm.previousElementSibling.classList.add("pseudo");
  });
};

