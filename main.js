const form = document.getElementById("form");
const drk = document.getElementById("drk");
const result = document.getElementById("result");
const inf1 = document.getElementById("inf1");
function getData(e) {
  e.preventDefault();
  const value = document.getElementById("search").value;

  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + value)
    .then((resp) => resp.json())
    .then((resp) => {
      const result = document.getElementById("result");
      result.innerHTML = "";
      
      console.log(resp);
      if (!resp.drinks)
        return (result.innerHTML = `<div class="alert alert-danger">Pagal įvestą užklausą nepavyko rasti jokių rezultatų.</div>`);

      let html = `<div class="row"id="drk">`;
      //console.log(resp.drinks);
      resp.drinks.map((data) => {
        html += `<div class="col-4">
                        <a href="#" onclick="getDrink(event, ${data.idDrink})">
                            <img src="${data.strDrinkThumb}" alt="${data.strDrink}" />
                            <h3>${data.strDrink}</h3>
                        </a>
                    </div>`;
      });

      html += `</div>`;

      result.innerHTML = html;
      document.getElementById("luck").style.display = "block";
      document.getElementById("abc").style.display = "block";
      form.style.display = "block";
    });
}

function getDrink(e, id) {
  e.preventDefault();

  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)
    .then((resp) => resp.json())
    .then((resp) => {
      const result = document.getElementById("result");
      const data = resp.drinks[0];
      let ingredients = "";
      

      for (let i = 1; i <= 15; i++) {
        if (data["strIngredient" + i])
          ingredients += `<li>${data["strIngredient" + i]} ${
            data["strMeasure" + i] ? data["strMeasure" + i] : ""
          }</li>`;
      }

      
      

      result.innerHTML = `
            <div class="row">
                <div class="col-6">
                    <img src="${data.strDrinkThumb}" alt="${data.strDrink}" />  
                </div>
                <div class="col-6">
                    <h2>${data.strDrink}</h2>
                    <ul>
                        <a href="#"onclick="alcList(event,'${data.strAlcoholic}')">
                          <li>${data.strAlcoholic}</li>
                        </a>
                        <a href="#"onclick="categoryList(event,'${data.strCategory}')">
                          <li>${data.strCategory}</li>
                        </a>
                        <a href=""onclick="glassList(event,'${data.strGlass}')">
                          <li>${data.strGlass}</li>
                        </a>
                    </ul>
                    <p>${data.strInstructions}</p>
                    <h4>Ingridientai</h4>
                    <ul>
                    <a href=""onclick="ingList(event,'${ingredients}')"><li>${ingredients}</li>
                     </a>
                    </ul>
                    <a href="#" onclick="getData(event)">Atgal į sąrašą</a>
                </div>
            </div>
        `;
        drk.innerHTML = "";
      document.getElementById("abc").style.display = "none";
      document.getElementById("luck").style.display = "none";
      form.style.display = "none";
    });
}
function randomList() {
  //q.preventDefault();
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      bc.innerHTML = "";
      const list = document.getElementById("list");
      const info = resp.drinks[0];
      let ingredients = "";
      for (let i = 1; i <= 15; i++) {
        if (info["strIngredient" + i])
          ingredients += `<li>${info["strIngredient" + i]} ${
            info["strMeasure" + i] ? info["strMeasure" + i] : ""
          }</li>`;
      }

      list.innerHTML = `
<div class="row">
    <div class="col-6">
        <img src="${info.strDrinkThumb}" alt="${info.strDrink}" />  
    </div>
    <div class="col-6">
        <h2>${info.strDrink}</h2>
        <ul>
            <li>${info.strAlcoholic}</li>
            <li>${info.strCategory}</li>
            <li>${info.strGlass}</li>
        </ul>
        <p>${info.strInstructions}</p>
        <h4>Ingridientai</h4>
        <ul>
            ${ingredients}
        </ul>
        <a href="file:///c%3A/Users/Home/Desktop/coctails2/index.html">Atgal į sąrašą</a>
    </div>
</div>
`;
      document.getElementById("abc").style.display = "none";
     
      form.style.display = "none";
      document.getElementById("drk").style.display = "none";
    });
}

function glassList(e, glass) {
  e.preventDefault();
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=` + glass)
    .then((resp) => resp.json())
    .then((resp) => {
      result.innerHTML ='';
      let html = `
                      <div class="row">`;

      resp.drinks.map((data) => {
        html += `<div class="col-4">
        <img src="${data.strDrinkThumb}" onclick="getDrink(event, '${data.idDrink}')" alt="${data.strDrink}" />
               <h3>${data.strDrink}</h3>
                      </div>`;
      });
      html += `</div>`;
      document.getElementById("inf1").innerHTML = html;
    });
}
function ingList(e, ing) {
  e.preventDefault();
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=` + ing)
    .then((resp) => resp.json())
    .then((resp) => {
      result.innerHTML ='';
      let html = `
                      <div class="row">`;

      resp.drinks.map((data) => {
        html += `<div class="col-4">
     <img src="${data.strDrinkThumb}" onclick="getDrink(event, '${data.idDrink}')" alt="${data.strDrink}" />
                    <h3>${data.strDrink}</h3>
                      </div>`;
      });
      html += `</div>`;
      document.getElementById("inf1").innerHTML = html;
    });
}
function alcList(e, alk) {
  e.preventDefault();
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + alk)
    .then((resp) => resp.json())
    .then((resp) => {
      result.innerHTML ='';
      let html = `
                      <div class="row">`;

      resp.drinks.map((data) => {
        html += `<div class="col-4">
        <img src="${data.strDrinkThumb}" onclick="getDrink(event, '${data.idDrink}')" alt="${data.strDrink}" />
                          <h3>${data.strDrink}</h3>
                      </div>`;
      });
      html += `</div>`;
      document.getElementById("inf1").innerHTML = html;
    });
}
function categoryList(e, cat) {
  e.preventDefault();
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + cat)
    .then((resp) => resp.json())
    .then((resp) => {
      result.innerHTML ='';
      let html = `
                      <div class="row">`;

      resp.drinks.map((data) => {
        html += `<div class="col-4">
        <img src="${data.strDrinkThumb}"  onclick="getDrink(event, '${data.idDrink}')" alt="${data.strDrink}" />
                     <h3>${data.strDrink}</h3>
                      </div>`;
      });
      html += `</div>`;
      document.getElementById("inf1").innerHTML = html;
    });
}

const bc = document.querySelector(".inf");

function letterSearch(letter) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + letter)
    .then((resp) => resp.json())
    .then((data) => {
      const dArray = data.drinks;
      console.log(data);
      bc.innerHTML = ""; // Clear previous content
      drk.innerHTML = "";
      inf1.innerHTML = "";
       result.innerHTML = "";
      dArray.forEach((value) => {
        const fotoEl = document.createElement("div");
        fotoEl.classList.add("foto");
        fotoEl.innerHTML = `<a href="#" onclick="getDrink(event, ${value.idDrink})"><img src="${value.strDrinkThumb}" alt="">
          <h3>${value.strDrink}</h3></a>`;
        bc.appendChild(fotoEl);
        
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const letterArray = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const ltr = document.querySelector("#abc");

  letterArray.forEach((letter) => {
    const letterLink = document.createElement("a");
    letterLink.textContent = letter.toUpperCase() + " * ";
    letterLink.href = "#";
    letterLink.addEventListener("click", () => {
      letterSearch(letter);
    });
    ltr.appendChild(letterLink);
  });
});
