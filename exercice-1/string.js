function UcFirst(a){return (a+'').charAt(0).toUpperCase()+a.substr(1);}

console.log(UcFirst('test'));

function capitalize(a) {
  if (typeof a !== "string" || a === "") return "";

  return a.split(" ").map((word) => UcFirst(word.toLowerCase())).join(" ");
}

console.log(capitalize('test test'));

function camelCase(a) {
  return capitalize(a).replace(/\W/g, "");
}

console.log(camelCase("test test test"));

function snake_case(a) {
  return (a).replace(/\W/g, "-");
}

console.log(snake_case('test test test'));

function leet(a) {
  return a.replace(/[AEIOUY]/gi, function (e) {
    switch (e.toLowerCase()) {
      case "a":
        return 4;
      case "e":
        return 3;
      case "i":
        return 1;
      case "o":
        return 0;
      case "u":
        return "(_)";
      case "y":
        return 7;
    }
  });
}

console.log(leet("anaconda"));




function verlan(a) {
  return a.split(" ").map((word) => { return word.split("").reverse().join("");}).join(" ");
}

console.log(verlan("cours a l'esgi"));

function yoda(a) {
  return a.split(" ").reverse().join(" ");
}

console.log(yoda("cours a l'esgi"));

function vig(string, code) {
  if (typeof string !== "string") return "";
  if (string.length === 0) return string;

  while (code.length < string.length) {
    code += code;
  }
  code = code.substr(0, string.length);
  let codeIndex = 0;

  return string.split("").map((letter, index) => {
      letter = letter.toLowerCase();
      const aCode = "a".charCodeAt(0);
      const letterNumber = letter.charCodeAt(0) - aCode;

      if (letterNumber < 0 || letterNumber > 25) return letter;

      const codeNumber = code.charCodeAt(codeIndex) - aCode;
      codeIndex++;

      return String.fromCharCode(((letterNumber + codeNumber) % 26) + aCode);
    }).join("");
}


function prop_access(objet, chaine) {
    if (typeof chaine != "string"){
        return objet;
    }
    if(typeof objet != 'object' || objet == null) {
        console.log(chaine + ' not exist');
        return;
    }
    if (chaine === '') {
        return objet;
    }
    const props = chaine.split('.');
    let propriete = objet;
    props.forEach(function (prop) {
        if(!propriete.hasOwnProperty(prop)) {
            console.log(chaine + ' not exist');
            return;
        }
        propriete = propriete[prop];
    });
    return propriete;
}
