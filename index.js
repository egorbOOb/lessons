'use strict';

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthVAlue = document.getElementsByClassName('accumulated_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select');


let appData = {
    sortExpenses: [],
    budget: 0,
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
    start: function() {
        if(salaryAmount === '') {
            alert('Ошибка, поле "месячный доход" должно быть заполнено!')
        };

        appData.budget = salaryAmount.value;

        appData.getExpenses();

        // appData.asking();
        // appData.getExpensesMonth();
        // appData.getBudget();

    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            console.log(item);
        })
    },
    asking: function () {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            let cashIncome;
            do {
            itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            cashIncome = +prompt('Сколько в месяц вы зарабатываете на этом?', 10000);
        } while ((isNaN(cashIncome) || cashIncome === '' || cashIncome === null) && (typeof itemIncome !== 'string' || itemIncome === '' || itemIncome === null))

        appData.income[itemIncome] = cashIncome;
    };

        let addExpenses = prompt('Перечислите возможные расходы через запятую?');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {

            let itemExpenses;
            do {
                itemExpenses = prompt('Введите обязательную статью расходов?', 'Садик государственный');
            } while (typeof itemExpenses !== 'string' || itemExpenses === '');
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
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
                appData.moneyDeposit = prompt('Какая сумма депозита?', 10000);
            } while ((isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null) && (typeof appData.percentDeposit !== 'string' || appData.percentDeposit === '' || appData.percentDeposit === null));
        };
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    },
    getSortExpenses: function() {
        appData.addExpenses.forEach(function(item, index, arr) {
            appData.sortExpenses[index] = arr[index][0].toUpperCase() + item.slice(1);
        })
        
    },
};

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);




// if (appData.getTargetMonth() > 0) {
//     console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
// } else {
//     console.log('Цель не будет достигнута');
// };



// for (let key in appData) {
//     console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
// };

// appData.getSortExpenses()

// console.log('Возможные расходы: ' + appData.sortExpenses.join(', '));