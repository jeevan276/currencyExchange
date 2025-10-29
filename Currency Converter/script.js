const from = document.getElementById("from-currency");
const to = document.getElementById("to-currency");
const amount = document.getElementById("convert-amount");
const convertBtn = document.getElementById("c-btn");
const APIkey = "1271e0918b8632f0b71e6631";


// const APIurl = `https://v6.exchangerate-api.com/v6/${APIkey}/pair/USD/NPR`;

function currencyConvert() {
  const fromCurrency = from.value;
  const toCurrency = to.value;
  const amountValue = parseFloat(amount.value);

  if (isNaN(amountValue) || amountValue <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
const APIurl = `https://v6.exchangerate-api.com/v6/${APIkey}/pair/${from.value}/${to.value}`;

  fetch(APIurl)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error("Error", Response.status);
      }
      return Response.json();
    })

    .then((data) =>{
      if(!data.conversion_rate){
        alert('Conversion rate not available!');
        return;
      }
    }
      displayCurrency(data, amountValue, fromCurrency, toCurrency)
    )
    .catch((error) => {
      console.log(error.message);
    });
}


const fromAmount = document.getElementById("from-amount");
const toAmount = document.getElementById("to-amount");

function displayCurrency(data, amountValue, fromCurrency, toCurrency) {
  let convertAmt = (amountValue * data.conversion_rate).toFixed(2);
  console.log(convertAmt);
  fromAmount.innerText = `${amountValue} ${from.value} =`;
  toAmount.innerText = `${convertAmt} ${to.value}`;
}

convertBtn.addEventListener("click", currencyConvert);
