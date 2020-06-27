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



const AppData = function() {
    this.sortExpenses = [];
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};



AppData.prototype.checkSalaryAmount = function() {
    start.setAttribute('disabled', '');
    if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
    }
};

AppData.prototype.doDisabledTextField = function() {

    resetBtn.style.display = 'block';

    start.style.display = 'none';

    let fieldForDisabled = document.querySelectorAll('input[type=text]');

    fieldForDisabled.forEach(function(item) {
        item.setAttribute('disabled', '');
    });
};

AppData.prototype.start = function() {
    this.budget = salaryAmount.value;
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpenses();
    this.getAddIncome();
    
    this.getBudget();
    
    this.showResult();

    this.doDisabledTextField();
};


AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(': ');
    incomePeriodValue.value = this.calcSavedMoney();
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    periodSelect.value =  this.getIncomePeriodValue();
};
AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    document.querySelector('.expenses').insertBefore(cloneExpensesItem, expensesPlus);

    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getPeriodAmount = function() {
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = +item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        } 
    });
};   
AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeBlock = incomeItems[0].cloneNode(true);
    document.querySelector('.income').insertBefore(cloneIncomeBlock, incomePlus);

    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if(item !== '') {
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getIncomePeriodValue = function() {
    return periodSelect.value * this.budgetMonth;
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if(itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getIncomeMonth = function() {
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);

};
AppData.prototype.getTargetMonth = function () {
    return (targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay > 800) {
        return ('Высокий уровень дохода');
    } else if (this.budgetDay > 300) {
        return ('Средний уровень дохода');
    } else if (this.budgetDay > 0) {
        return ('Низкий уровень дохода');
    } else {
        return ('Что-то пошло не так!');
    }
};
AppData.prototype.getInfoDeposit = function() {
    if(this.deposit) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
            this.moneyDeposit = prompt('Какая сумма депозита?', 10000);
        } while ((isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null) && (typeof this.percentDeposit !== 'string' || this.percentDeposit === '' || this.percentDeposit === null));
    }
};
AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.getSortExpenses = function() {
    const _this = this;
    this.addExpenses.forEach(function(item, index, arr) {
        _this.sortExpenses[index] = arr[index][0].toUpperCase() + item.slice(1);
    });
    
};
AppData.prototype.checkSalaryAmount = function() {
    start.setAttribute('disabled', '');
    if (salaryAmount.value !== '') {
        start.removeAttribute('disabled');
    }
};
AppData.prototype.reset = function() {

    let incomeItems = document.querySelectorAll('.income-items');
    let expensesItems = document.querySelectorAll('.expenses-items');

    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.income = {};
    this.expenses = {};
    
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
    
    if (incomeItems !== 1) {
        document.querySelector('.expenses').insertBefore(cloneExpensesBlock, expensesPlus);
        document.querySelector('.income').insertBefore(cloneIncomeBlock, incomePlus);
    }
    
    start.setAttribute('disabled', '');
};


AppData.prototype.eventListeners = function() {

    const _this = this;

    resetBtn.addEventListener('click', _this.reset.bind(_this));

    start.setAttribute('disabled', '');

    start.addEventListener('click', _this.start.bind(_this));

    expensesPlus.addEventListener('click', _this.addExpensesBlock);

    incomePlus.addEventListener('click', _this.addIncomeBlock);

    periodSelect.addEventListener('change', _this.getPeriodAmount);

    salaryAmount.addEventListener('input', _this.checkSalaryAmount);

};

const appData = new AppData();

appData.eventListeners();


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

// let slice = Function.prototype.call.bind(Array.prototype.slice);
// console.log(slice([0, 1, 2, 3, 4, 5], 1, 4));

