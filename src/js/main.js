const $containerNumbers = document.getElementById("container-numbers");
const $searchInput = document.getElementById("search-input");
const $numberSelected = document.getElementById("numberSelected");
const $formContact = document.getElementById("form-contact");


const arrayNumbers = Array()
const arrayNumbersSelected = Array()
const arrayNumbersSold = []


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
      arrayNumbers.splice(arrayNumbersSold[i], 1);
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


  window.open(`https://wa.me/584126834701?text=*Nombre:* ${data.name}%0a*Teléfono:* ${data.numero}%0a*Dirección:* ${data.direction}%0a*Números Seleccionados:* ${arrayNumbersSelected.join(', ')}`, "_blank");
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
    e.target.classList.toggle("bg-primary-200");
    verifyNumberSelected(button);
  }

});

$formContact.addEventListener("submit", (e) => {
  e.preventDefault();
  sendFormData(e.target)
});

verifyNumberSold();