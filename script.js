'use strict'


let money,
    income = 40000,
    addExpenses = 'Интернет, оплата фриланс площадки, обслуживание машины, подписка на софт',
    deposit = true,
    mission = 1200,
    period = 12,
    amount1,
    amount2;

let budgetDay;
    
function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    };
    
let getNumberAmounts = function() {
    while (!isNumber(amount1) && !isNumber(amount2)) {
        amount1 = +prompt('Во сколько это обойдётся?');
        amount2 = +prompt('Во сколько это обойдётся?');
    }
};

let start = function() {
    do { 
        money = +prompt('Ваш месячный доход?');
    } while (!isNumber(money))
    
};

let getExpensesMonth = function() {
    return amount1 + amount2;
};

start();  


getNumberAmounts;

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов');

let expenses2 = prompt('Введите обязательную статью расходов');

amount1 = +prompt('Во сколько это обойдётся?');
amount2 = +prompt('Во сколько это обойдётся?');
//console.log('Бюджет на день: ', Math.floor(budgetDay));


function getAccumulatedMonth() {
    let allAmounts = getExpensesMonth();
    return money - allAmounts;
};

let accumulatedMonth = getAccumulatedMonth();


function getTargetMonth() {
    let timeForMission = Math.ceil(mission / accumulatedMonth);
    if (timeForMission <= 0) {
        return('Цель не будет достигнута');
    } else if (timeForMission > 0) {
        return ('Время для достижения цели: ' + Math.ceil((mission / accumulatedMonth)) + ' месяцев');
    }
};

budgetDay = function() {
    return Math.floor((accumulatedMonth / 30));
};

let showTypeOf = function(option) {
    console.log(typeof(option));
}

showTypeOf(deposit);

showTypeOf(money);

showTypeOf(expenses1);

let getAddExpenses = function() {
    return (addExpenses.split(', '));
};

let getStatusIncome = function() {
    let budget = budgetDay()
    if (budget >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if(budget < 1200 && budget >= 600){
        return 'У вас средний уровень дохода';
    } else if(0 <= budget && budget < 600) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if(budget <= 0) {
        return 'Что-то пошло не так';
    }
};


console.log('Обязательные расходы за месяц: ', getExpensesMonth());

console.log('Накопления за месяц: ', accumulatedMonth);

console.log(getTargetMonth());

console.log(getAddExpenses());

console.log(getStatusIncome());

alert(getStatusIncome());

console.log('Бюджет на день: ', budgetDay());


