let items = [];

function addItem() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const item = document.getElementById('item').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const code = document.getElementById("invoice-body").innerHTML = ((Math.random() * 100000) + 1);
    const hsnCode = Math.round(code);


    const buyerName = document.getElementById('buyerName');
    const buyerAddress = document.getElementById('buyerAddress');

    buyerName.textContent = name;
    buyerAddress.textContent = address;


    if (!item || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
        alert('Please enter valid item, price, and quantity.');
        return;
    }

    const total = price * quantity;
    items.push({ item, price, quantity, total, hsnCode });
    updateInvoice();
    document.getElementById('invoice-form').reset();
}


function updateInvoice() {

    const invoiceBody = document.getElementById('invoice-body');
    invoiceBody.innerHTML = '';

    const igst = document.getElementById("gstPercent").value;
    const taxed = document.getElementById("taxed");

    document.getElementById("gstscore").innerText= igst;


    serialnumber = 1
    let grandTotal = 0;

    items.forEach((item) => {

        grandTotal += item.total;
        const row = document.createElement('tr');
        row.innerHTML = `

            <td>${serialnumber}</td>
            <td>${item.item}</td>
            <td>${item.hsnCode}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${item.total.toFixed(2)}</td>
        `;
        invoiceBody.appendChild(row);
        serialnumber++
    });

    const grandTotalWords = document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
   const Price= parseFloat(grandTotalWords);

    const igstvalue = document.getElementById("gstvalue").innerText = Number((grandTotalWords * igst) / 100).toFixed(2);
    // const gstNum= igstvalue.toFixed(2);
   const gstRate = parseFloat(igstvalue);

    document.getElementById("grand-totals").innerText = grandTotalWords;
    const taxeded = Price + gstRate;
    console.log("taxedAmount"+taxeded.toFixed(2));

    const fixedTax = document.getElementById("taxed").innerText =taxeded;

    const amountInWords = numberToWords(grandTotalWords);
    const taxedAmount = numberToWords(fixedTax);
    document.getElementById('amount-in-words').innerHTML = amountInWords;
    document.getElementById('taxAmountWords').innerHTML = taxedAmount;



}


// for number to words

function numberToWords(num) {
    const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
        "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const toWords = (n) => {
        if (n < 20) return belowTwenty[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + belowTwenty[n % 10] : "");
        if (n < 1000) return belowTwenty[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + toWords(n % 100) : "");
        return "";
    };

    if (num === 0) return "Zero";
    if (num < 1000) return toWords(num);

    const thousandPart = Math.floor(num / 1000);
    const remainder = num % 1000;

    return toWords(thousandPart) + " Thousand" + (remainder !== 0 ? " " + toWords(remainder) : "");
}

