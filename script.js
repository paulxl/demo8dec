//let id;
let name;
let attitude;
let score;
let weakness;
let region;
let modeOfTravel;
const myChar = [];

document.getElementById("inputForm1").addEventListener("submit", function (e) {
  e.preventDefault();
  name = e.target.name.value;
  attitude = e.target.attitude.value;
  score = e.target.score.value;
  weakness = e.target.weakness.value;
  region = e.target.region.value;
  modeOfTravel = e.target.modeOfTravel.value;

  myChar.push(name, attitude, score, weakness, region, modeOfTravel);
  inputToBack(myChar);
  clearForm();
});
function inputToBack(myChar) {
  // call back end and insert to array
  axios.post("https://tlgtest1bypl.herokuapp.com/myChars", {
    myChar,
  });
}

document.getElementById("getChars").addEventListener("click", getChars);

function getChars() {
  axios.get("https://tlgtest1bypl.herokuapp.com/myChars").then(function (res) {
    let characters = res.data;
    console.log(results);
    // let trTemp = document.createElement('tr');
    // document.querySelector("#table1").appendChild(trTemp);

    for (let index = 0; index < characters.length; index++) {
      const {
        name,
        attitude,
        score,
        weakness,
        region,
        modeOfTravel,
      } = characters[index];
      let newP = document.createElement("p");
      newP.innerHTML = `${name} - ${attitude} - ${score} - ${weakness} - ${region} - ${modeOfTravel}`;
      document.querySelector("#container2").appendChild(newP);
    }
  });
}
function clearForm() {
  document.getElementById("name").value;
  document.getElementById("attitude").value;
  document.getElementById("score").value;
  document.getElementById("weakness").value;
  document.getElementById("region").value;
  document.getElementById("modeOfTravel").value;
}
