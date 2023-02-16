const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");
const pupsUrl = "http://localhost:3000/pups";

fetch(pupsUrl)
  .then((resp) => resp.json())
  .then((pupData) => pupData.forEach(renderPups));

renderPups = (pups) => {
  const pupNameList = document.createElement("span");
  pupNameList.textContent = pups.name;
  dogBar.append(pupNameList);

  pupNameList.addEventListener("click", () => {
    fetch(`http://localhost:3000/pups/${pups.id}`)
      .then((response) => response.json())
      .then((pupData) => pupsDisplay(pupData));
  });
};

pupsDisplay = (pups) => {
  dogInfo.innerHTML = "";

  const pupImg = document.createElement("img");
  pupImg.src = pups.image;
  const pupName = document.createElement("h2");
  pupName.textContent = pups.name;
  const pupBtn = document.createElement("button");
  isGoodDog = () => {
    if (pups.isGoodDog === true) {
      return (pupBtn.textContent = "Is good dog!");
    } else {
      return (pupBtn.textContent = "Is bad dog");
    }
  };
  isGoodDog();

  pupBtn.addEventListener("click", (e) => {
    fetch(`http://localhost:3000/pups/${pups.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isGoodDog: !pups.isGoodDog,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((pupData) => pupsDisplay(pupData));
  });

  dogInfo.append(pupImg, pupName, pupBtn);
};
