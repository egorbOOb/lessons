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

let amount1 = +prompt('Во сколько это обойдётся?');

let amount2 = +prompt('Во сколько это обойдётся?');

let budgetMonth = money - Number(amount1) - Number(amount2)
- Number(amount2) - Number(amount2); 

console.log('Бюджет на месяц: ', budgetMonth);

let timeForMission = money / budgetMonth;

console.log('Время для достижения цели:', Math.ceil(timeForMission), 'месяцев');

budgetDay = budgetMonth / 30;

console.log('Бюджет на день: ', Math.floor(budgetDay));



if (budgetDay >= 1200) {
    alert('У вас высокий уровень дохода');
    console.log('У вас высокий уровень дохода');
} else if(budgetDay < 1200 && budgetDay >= 600){
    alert('У вас средний уровень дохода');
    console.log('У вас средний уровень дохода');
} else if(0 <= budgetDay && budgetDay < 600) {
    alert('К сожалению у вас уровень дохода ниже среднего');
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if(budgetDay <= 0) {
    alert('Что-то пошло не так');
    console.log('Что-то пошло не так');
} else {
    console.log('Не число');
}