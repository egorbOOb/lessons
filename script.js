'use strict'


let money = 150000;
let income = 40000;
let addExpenses = 'Интернет, оплата фриланс площадки, обслуживание машины, подписка на софт';
let deposit = true;
let mission = 1200;
let period = 12;

let budgetDay;

// Урок №3

money = +prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов');

let expenses2 = prompt('Введите обязательную статью расходов');

let amount1 = +prompt('Во сколько это обойдётся?');

let amount2 = +prompt('Во сколько это обойдётся?');

//console.log('Бюджет на день: ', Math.floor(budgetDay));


//Урок №4
let getExpensesMonth = function() {
    return (amount1 + amount2);
};

function getAccumulatedMonth() {
    return money - amount1 - amount2;
};

let accumulatedMonth = getAccumulatedMonth();


function getTargetMonth() {
    return ('Время для достижения цели: ' + Math.ceil((mission / accumulatedMonth)) + ' месяцев');
};

budgetDay = function() {
    return Math.floor((accumulatedMonth / 30));
}

let showTypeOf = function(option) {
    console.log(typeof(option));
}

showTypeOf(deposit);

showTypeOf(amount1);

showTypeOf(expenses1);

let getAddExpenses = function() {
    return (addExpenses.split(', '));
};

let getStatusIncome = function() {
    if (budgetDay() >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if(budgetDay() < 1200 && budgetDay() >= 600){
        return 'У вас средний уровень дохода';
    } else if(0 <= budgetDay() && budgetDay() < 600) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if(budgetDay() <= 0) {
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