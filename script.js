'use strict'
 


let income = 40000,
    addExpenses = 'Интернет, оплата фриланс площадки, обслуживание машины, подписка на софт',
    deposit = true,
    mission = 120000,
    period = 12;


let appData = {
    expenses: {},
    expensesMonth: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    getExpensesMonth: function() {
        let sum = 0; 
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        };
        console.log('sum: ' + sum);
        appData.expensesMonth = sum;
    },
    getBudget: function() {
        appData.budgetMonth = (appData.budget - appData.expensesMonth);

        appData.budgetDay = (Math.floor((appData.budgetMonth / 30)))
    },

    
    getTargetMonth: function() {
        let timeForMission = Math.ceil(mission / appData.budgetMonth);
        if (timeForMission <= 0) {
            return('Цель не будет достигнута');
        } else if (timeForMission > 0) {
            return ('Время для достижения цели: ' + (Math.ceil((mission / appData.budgetMonth)) + ' месяцев'));
        }
    },
    getStatusIncome: function() {
        let budget = appData.budgetDay;
        if (budget >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if(budget < 1200 && budget >= 600){
            return 'У вас средний уровень дохода';
        } else if(0 <= budget && budget < 600) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else if(budget <= 0) {
            return 'Что-то пошло не так';
        }
    },
    start: function() {
        do { 
            appData.budget = +prompt('Ваш месячный доход?');
        } while (!isNumber(appData.budget))
    },
    showTypeOf: function(option) {
        console.log(typeof(option));
    },
    getAddExpenses: function() {
        return (addExpenses.split(', '));
    },
    asking: function() {
        let expenses1,
            expenses2,
            amount1,
            amount2;
        do {
            expenses1 = prompt('Введите обязательную статью расходов');
            amount1 = +prompt('Во сколько это обойдётся?');
            expenses2 = prompt('Введите обязательную статью расходов');
            amount2 = +prompt('Во сколько это обойдётся?');
        } while((!isNumber(amount1) && !isNumber(amount2)));
        appData.expenses[expenses1] = amount1;
        appData.expenses[expenses2] = amount2;
    },
}

function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    };
    




appData.start(); //1 шаг  

console.log(appData.budget);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

appData.asking(); //2 шаг


appData.getExpensesMonth(); //3 шаг

console.log('appData.expensesMonth: ', appData.expensesMonth);

appData.getBudget(); //4 шаг


let showTypeOf = function(option) {
    console.log(typeof(option));
}

console.log(appData.getAddExpenses());

appData.showTypeOf(deposit);

appData.showTypeOf(appData.money);

appData.showTypeOf(appData.expenses);

console.log('Обязательные расходы за месяц: ', appData.expensesMonth);

console.log('Накопления за месяц: ' + appData.budgetMonth);

console.log(appData.getTargetMonth());

console.log(appData.getAddExpenses());

console.log(appData.getStatusIncome());

alert(appData.getStatusIncome());

console.log('Бюджет на день: ', appData.budgetDay);


let arra = [];

for (let key in appData) {
    arra.push(key); 
};

console.log('Наша программа включает в себя данные: ' + arra.join('\n'));