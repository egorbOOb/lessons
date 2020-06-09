let money = 150000;
let income = 40000;
let addExpenses = 'Интернет, оплата фриланс площадки, обслуживание машины, подписка на софт';
let deposit = true;
let mission = 12000000;
let period = 12;

console.log(typeof(money));

console.log(typeof(income));

console.log(typeof(deposit));

console.log(addExpenses.length);

console.log('Период равен:', period, 'месяцев');

console.log('Цель заработать:', mission, 'рублей');

addExpenses.toLowerCase();

console.log(addExpenses.split(', '));

let budgetDay = 150000 + 40000 / 30;

console.log(budgetDay);


// Урок №3

money = +prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов');

let expenses2 = prompt('Введите обязательную статью расходов');

let amount1 = prompt('Во сколько это обойдётся?');

let amount2 = prompt('Во сколько это обойдётся?');

let budGetMonth = money - Number(amount1) - Number(amount2); 

let timeForMission = money / budGetMonth;

console.log(Math.ceil(timeForMission));
