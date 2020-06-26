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
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    resetBtn = document.getElementById('cancel');



let appData = {
    sortExpenses: [],
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    doDisabledTextField: function() {

        resetBtn.style.display = 'block';

        start.style.display = 'none';

        let fieldForDisabled = document.querySelectorAll('input[type=text]');

        fieldForDisabled.forEach(function(item) {
            item.setAttribute('disabled', '');
        });
    },
    start: function() {
        
        this.budget = salaryAmount.value;
        
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        
        this.getBudget();
        
        this.showResult();

        this.doDisabledTextField();
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(': ');
        incomePeriodValue.value = this.calcSavedMoney();
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        periodSelect.value =  this.getIncomePeriodValue();
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        document.querySelector('.expenses').insertBefore(cloneExpensesItem, expensesPlus);

        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getPeriodAmount: function() {
        periodAmount.textContent = periodSelect.value;
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            } 
        });
    },   
    addIncomeBlock: function() {
        let cloneIncomeBlock = incomeItems[0].cloneNode(true);
        document.querySelector('.income').insertBefore(cloneIncomeBlock, incomePlus);

        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getIncomePeriodValue: function() {
        return periodSelect.value * this.budgetMonth;
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getBudget: function () {
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);

    },
    getTargetMonth: function () {
        return (targetAmount.value / this.budgetMonth);
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (appData.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (appData.budgetDay > 0) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так!');
        }
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
                appData.moneyDeposit = prompt('Какая сумма депозита?', 10000);
            } while ((isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null) && (typeof appData.percentDeposit !== 'string' || appData.percentDeposit === '' || appData.percentDeposit === null));
        }
    },
    calcSavedMoney: function() {
        return this.budgetMonth * periodSelect.value;
    },
    getSortExpenses: function() {
        appData.addExpenses.forEach(function(item, index, arr) {
            appData.sortExpenses[index] = arr[index][0].toUpperCase() + item.slice(1);
        });
        
    },
    checkSalaryAmount: function() {
        start.setAttribute('disabled', '');
        if (salaryAmount.value !== '') {
            start.removeAttribute('disabled');
        }
    },
    reset: function() {

        resetBtn.style.display = 'none';
        start.style.display = 'block';

        let container = document.querySelector('.data');
        let resetField = container.querySelectorAll('input[type=text]');

        let resetText = document.querySelectorAll('input[type=text]');
        
        resetText.forEach(function(item) {

            item.value = '';

        });
        
        resetField.forEach(function(item) {
            
            item.removeAttribute('disabled');
            
        });
        
        
        let incomeItems2 = document.querySelectorAll('.income-items');
        let expensesItems2 = document.querySelectorAll('.expenses-items');
        
        let cloneIncomeBlock = incomeItems2[0].cloneNode(true);
        let cloneExpensesBlock = expensesItems2[0].cloneNode(true);
                
        incomeItems.forEach(function(item) {
            item.remove();
        });

        expensesItems.forEach(function(item) {
            item.remove();
        });


        incomePlus.style.display = 'block';
        expensesPlus.style.display = 'block';

        document.querySelector('.expenses').insertBefore(cloneExpensesBlock, expensesPlus);
        document.querySelector('.income').insertBefore(cloneIncomeBlock, incomePlus);

        start.setAttribute('disabled', '');
    }
};

resetBtn.addEventListener('click', appData.reset);

start.setAttribute('disabled', '');

start.addEventListener('click', appData.start.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', appData.getPeriodAmount);

salaryAmount.addEventListener('input', appData.checkSalaryAmount);





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