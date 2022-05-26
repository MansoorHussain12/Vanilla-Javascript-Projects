const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showTensBtn = document.getElementById("show-tens");
const sortBtn = document.getElementById("sort");
const calculateTotalBtn = document.getElementById("calculate-total");

let data = [];

// Fetch random user and add money

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10),
  };

  addData(newUser);
}

// Add new obj to data arr

function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Double the Money

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort by least money
function sortbyPoorest() {
  data.sort((a, b) => a.money - b.money);

  updateDOM();
}

//Filter only less than 100
function showTens() {
  data = data.filter((item) => item.money < 100);

  updateDOM();
}

// Calculate Total Wealth

function calculateTotal() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.classList.add("total");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong>`;
  main.appendChild(wealthEl);
}

// Update DOM

function updateDOM(providedData = data) {
  // Clearn main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event listeners

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortbyPoorest);
showTensBtn.addEventListener("click", showTens);
calculateTotalBtn.addEventListener("click", calculateTotal);
