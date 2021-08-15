const inputs = document.querySelectorAll("input[type='text'], input[type='password']");
const form = document.querySelector("form");
const progressBar = document.getElementById("progress__bar");
//creer des variables de stockage dans la base de donnée mais dans notre cas je vais stocker les données dans la console.
let pseudo, email, password, confirmPass;

window.onload = () => {
  eyeTop();
  eyeBottom();
};

document.querySelectorAll("label").forEach((label) => {
  label.addEventListener("click", topLabel);
});
function topLabel(){
  this.classList.add("pseudo");
}

inputs.forEach((input) => {
  input.addEventListener("click", inputClick);
});
function inputClick(){
  this.previousElementSibling.classList.add("pseudo");
}

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
  if(value.length > 0 && (value.length < 3 || value.length > 20))
  {
    errorDisplay(
      "pseudo", 
      "Le pseudo doit faire entre 3 et 20 caractères"
      );
    // valeur a stocker = null si jamais on est dans cette condition
    pseudo = null;
  }else if(!value.match(/^[a-zA-Z0-9_.-]*$/))
  {
    errorDisplay(
      "pseudo", 
      "Le pseudo ne doit pas contenir de caractères spéciaux"
      );
    // valeur a stocker = null si jamais on est dans cette condition
    pseudo = null;
  }else{
    errorDisplay(
      "pseudo", 
      "", 
      true
      );
    //stockage de donnée apres validation des données
    pseudo = value;
  }
  if((value === ""))
    {
    errorDisplay(
      "pseudo", 
      ""
      );
    }
};

// verification du champs email
const emailChecker = (value) => {
  if(
    !value.match(/^[a-zA-Z0-9-_.]+@[a-z]+\.[a-z]{2,3}$/i)
    ) 
  {
    errorDisplay(
      "email", 
      "Entrez un email valide"
      );
    email = null;
  }else{
    errorDisplay(
      "email", 
      "", 
      true); 
    email = value;
  }
  if((value === ""))
  {
    errorDisplay(
      "email", 
      ""
      );
  }
};

// verification du champs password
const passwordChecker = (value) => {
  progressBar.classList = "";
  //regex de verification de mot de passe contenant 1Maj, 8   caracteres, 1 caract special, 1 chiffre
  if(
    !value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\w]){1,})(?!.*\s).{8,}$/)
    )
    {
    errorDisplay(
      "password", 
      "le mot de passe doit contenir 1Maj, 8caracteres, 1caractère special, 1chiffre"
      );
    progressBar.classList.add("progressRed");
    password = null;
  }
  else if(value.length < 12)
  {
    progressBar.classList.add("progressBlue");
    errorDisplay(
      "password", 
      "", 
      true
      );
    password = value;
  }
  else{
    errorDisplay(
      "password", 
      "", 
      true);
    progressBar.classList.add("progressGreen");
    password = value;
  }
  if(confirmPass)
  {
    confirmChecker(confirmPass);
  }
  // faire disparaitre la bar de progression quand le contenu du champs password est vide
  if(
    (value === "")
    )
    {
    progressBar.classList = "";
    errorDisplay(
      "password", 
      ""
      );
  }
};

// verification du champs confirmPass
const confirmChecker = (value) => {

  if (value !== password) 
  {
    errorDisplay(
      "confirm", 
      "Les mots de passe ne correspondent pas"
      );
    confirmPass = false;
  }else{
    errorDisplay(
      "confirm", 
      "", 
      true);
    confirmPass = true;
  }
  if((value === "")){
    errorDisplay(
      "confirm", 
      ""
      );
  }
};

// executer cet even et les fonctions sur chaque input en fonction de l'input qui sera utilisé grace a leur ID
inputs.forEach((input) =>  {
  input.addEventListener("input", (e) => {
    
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
    }
  });
});

// envoie du formulaire 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(pseudo && email && password && confirmPass)
  {
    // on regroupe tous dans un objet
    const data = {
      pseudo: pseudo,
      email: email, 
      password: password,
    };
    // afficher les données dans la console
    console.log(data); 
    // vider tous les champs apres validation du formulaire
    inputs.forEach((input) => (input.value = ""));
    // faire disparaitre la bar de progression
    progressBar.classList = "";

    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validé !"); 
    document.querySelectorAll("label").forEach((label) => label.classList.remove("pseudo"));
  }
  else{
    alert(
      "Veuillez remplir correctement tous les champs !"
      );
  }
});

const eyeTop = () => {
  const eyeTop = document.getElementById("eye__top");
  const eyeSlashTop= document.getElementById("eye__slach__top");
  // changement des icons du haut
   eyeTop.addEventListener("click", () => {
    eyeTop.style.display = "none";
    eyeTop.nextElementSibling.style.display = "initial";
    eyeTop.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.type= "text";
  });
   eyeSlashTop.addEventListener("click", () => {
    eyeSlashTop.style.display = "none";
    eyeSlashTop.previousElementSibling.style.display = "initial";
    eyeSlashTop.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.type = "password";
  }); 
};

const eyeBottom = () => {
  const eyeBottom = document.getElementById("eye__bottom");
  const eyeSlashBottom= document.getElementById("eye__slash__bottom");
   // changement des icons du bas
  eyeBottom.addEventListener("click", () => {
    eyeBottom.style.display = "none";
    eyeBottom.nextElementSibling.style.display = "initial";
    eyeBottom.parentElement.previousElementSibling.type= "text";
  });
  eyeSlashBottom.addEventListener("click", () => {
    eyeSlashBottom.style.display = "none";
    eyeSlashBottom.previousElementSibling.style.display = "initial";
    eyeSlashBottom.parentElement.previousElementSibling.type = "password";
  });
};

