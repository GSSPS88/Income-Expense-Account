const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = [];

function init() {
    list.innerHTML = '';
    transactions.forEach(addDataToList);
    calculateMoney()
}
// ປະຫວັດທູລະກຳ
function addDataToList(transactions) {
    const symbol = transactions.amount < 0 ?"-":"+";
    const status = transactions.amount < 0 ?'minus':'plus';
    const item = document.createElement("li");
    result = formatNumber(Math.abs(transactions.amount));
    item.classList.add(status);
    item.innerHTML = `${transactions.text}<span>${symbol}${result}</span><button class="delete-btn" onclick= "removeData(${transactions.id})"><i class="bi bi-x"></i></button>`;
    list.appendChild(item);
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function autoID() {
    return Math.floor(Math.random()*1000000);
}

// ຍອດເງິນເຫຼືອ
function calculateMoney () {
    const amounts = transactions.map(transactions=>transactions.amount);
    // balance
    const total = amounts.reduce((result,item)=>(result+=item),0).toFixed(2);
    // income
    const income = amounts.filter(item=>item>0).reduce((result, item)=>(result+=item),0).toFixed(2);
    // expense
    const expense = (amounts.filter(item=>item<0).reduce((result, item)=>(result+=item),0)*-1).toFixed(2);

    console.log(formatNumber);
    
    balance.innerHTML = `₭` + formatNumber(total);
    money_plus.innerHTML= `₭`+ formatNumber(income);
    money_minus.innerHTML= `₭`+ formatNumber(expense);
}

// delete history
function removeData(id) {
    transactions=transactions.filter(transactions=>transactions.id !==id);
    // 1,2,3 => id = 1
    init();
}

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ");
    }else{
        const data = {
            id: autoID(),
            text:text.value,
            amount:+amount.value
        }
        console.log(data)

        transactions.push(data);
        addDataToList(data);
        calculateMoney();
        text.value = '';
        amount.value = ''
    }
}
form.addEventListener('submit', addTransaction);
init();