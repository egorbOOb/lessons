/*'use strict'
 


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
*/
'use strict'
let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 50000);
        } while (isNaN(money) || money === '' || money === null)

};

start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function () {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            let cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?', 10000);
            appData.income[itemIncome] = cashIncome;
        };

        let addExpenses = prompt('Перечислите возможные расходы через запятую?');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {

            let itemExpenses = prompt('Введите обязательную статью расходов?', 'Садик государственный');
            let cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойётся?', 2500);
            } while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null);

            appData.expenses[itemExpenses] = cashExpenses;
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return appData.mission / appData.budgetMonth;
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (appData.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (appData.budgetDay > 0) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так!')
        }
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            appData.moneyDeposit = prompt('Какая сумма депозита?', 10000);
        };
    },
    calcSavedMoney: function()
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
    console.log('Цель не будет достигнута');
};

console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
};