const $containerNumbers = document.getElementById("container-numbers");
const $searchInput = document.getElementById("search-input");
const $numberSelected = document.getElementById("numberSelected");
const $formContact = document.getElementById("form-contact");


const arrayNumbers = Array()
const arrayNumbersSelected = Array()
const arrayNumbersSold = ['0001', '0002', '0003', '0004', '0007', '0008', '0015', '0019', '0020', '0021', '0023', '0028', '0029', '0042', '0043', '0044', '0045', '0048', '0050', '0052', '0064', '0070', '0072', '0106', '0108', '0121', '0126', '0127', '0146', '0151', '0202', '0222', '0266', '0311', '0325', '0373', '0380', '0404', '0634', '0777', '0780', '1212', '1220', '1355', '1500', '1507', '1572', '1621', '1690', '1908', '1931', '1945', '1948', '1970', '1983', '1986', '1990', '2001', '2003', '2007', '2015', '2236', '2716', '2809', '5314', '0354', '0056', '0013', '0024', '0030', '1923', '1972', '2214', '0426', '5000', '0014', '3323', '1692', '0005', '0093', '0345', '3390', '0022', '0124', '5555', '2012', '3455', '3312', '9872', '9989', '1925', '0009', '0031', '0081', '7891', '0027', '2929', '1515', '0111', '0333', '5261', '1930', '1965', '1967', '0109', '0114', '0118', '0079', '0080', '0073', '0323', '0321', '0327', '0025', '0059', '0036', '0038', '0026', '0091', '0017', '1000', '1009', '1007', '0076', '0088', '0097', '0382', '0317', '0817', '2982', '2581', '6152', '0128', '9999', '0134']


for (let i = 0; i < 10000; i++) {
  arrayNumbers.push(i.toString().padStart(4, "0"));
}

function printNumbers() {
  $containerNumbers.innerHTML = ""

  arrayNumbers.map((number) => {
    const $button = document.createElement("button");
    $button.innerText = number;
    $button.id = `button-${number}`;
    $button.classList.add('buttonNumber');
    $containerNumbers.appendChild($button);
  })
}

function findNumber(value) {
  const $button = document.getElementById(`button-${value}`);

  if ($button) {
    printRangeNumbers($button);
  }
}

function printRangeNumbers(valueFiltered) {
  $containerNumbers.innerHTML = ""

  const indexStart = arrayNumbers.indexOf(valueFiltered.innerText);

  arrayNumbers.slice(indexStart, indexStart + 10).map((number) => {
    const $button = document.createElement("button");
    $button.innerText = number;
    $button.id = `button-${number}`;
    $button.classList.add('buttonNumber');
    $containerNumbers.appendChild($button);
  })
}

function verifyNumberSold() {

  for (let i = 0; i < arrayNumbersSold.length; i++) {
    if (arrayNumbers.includes(arrayNumbersSold[i])) {
      arrayNumbers.splice(arrayNumbers.indexOf(arrayNumbersSold[i]), 1);
    }
  }

  printNumbers()
}

function verifyNumberSelected(number) {
  if (arrayNumbersSelected.includes(number)) {
    arrayNumbersSelected.splice(arrayNumbersSelected.indexOf(number), 1);
    printNumbersSelected();
  } else {
    arrayNumbersSelected.push(number);
    printNumbersSelected();
  }
}

function printNumbersSelected() {
  $numberSelected.innerHTML = ""
  arrayNumbersSelected.map((number) => {
    const $button = document.createElement("button");
    $button.type = "button";
    $button.innerText = number;
    $button.classList.add('buttonNumber');
    $numberSelected.appendChild($button);
  })
}

function sendFormData(values) {
  const formData = new FormData(values);
  let data
  formData.forEach((value, key) => {
    data = { ...data, [key]: value }
  });


  window.open(`https://wa.me/584126839088?text=*Nombre:* ${data.name}%0a*Teléfono:* ${data.numero}%0a*Dirección:* ${data.direction}%0a*Números Seleccionados:* ${arrayNumbersSelected.join(', ')}`, "_blank");
}

function updateProgressBar() {
  const $progressBar = document.getElementById("progress-bar");
  const $percentageSold = document.getElementById("percentage-sold");
  const $numberSold = document.getElementById("numberSold");
  const $numberTotal = document.getElementById("numberTotal");
  $percentageSold.innerText = parseFloat((arrayNumbersSold.length / arrayNumbers.length) * 100).toFixed(2);
  $progressBar.style.width = `${Math.round((arrayNumbersSold.length / arrayNumbers.length) * 100)}%`;
  $numberSold.innerText = arrayNumbersSold.length;
  $numberTotal.innerText = arrayNumbers.length;
}

$searchInput.addEventListener("input", (e) => {
  const value = e.target.value;

  if (isFinite(value) && value.length === 4) {
    findNumber(value);
  } else if (value.length === 0) {
    printNumbers();
  }
});

$containerNumbers.addEventListener("click", (e) => {

  if (e.target.id.includes("button-")) {
    const button = e.target.innerText;
    e.target.classList.toggle("bg-primary-100/40");
    verifyNumberSelected(button);
  }

});

$formContact.addEventListener("submit", (e) => {
  e.preventDefault();
  sendFormData(e.target)
});

verifyNumberSold();
updateProgressBar()
