'use strict';

const start = document.getElementById('start');

const btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1];

let additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
    resetBtn = document.getElementById('cancel'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');



class AppData {
    constructor() {
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
    }

    checkSalaryAmount() {
        start.setAttribute('disabled', '');
        if (salaryAmount.value !== '') {
            start.removeAttribute('disabled');
        }
    }

    doDisabledTextField() {

        resetBtn.style.display = 'block';
    
        start.style.display = 'none';
    
        let fieldForDisabled = document.querySelectorAll('input[type=text]');
    
        fieldForDisabled.forEach(function(item) {
            item.setAttribute('disabled', '');
        });
    }

    start() {
        this.budget = salaryAmount.value;
        
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        
        this.getBudget();
        
        this.showResult();

        this.doDisabledTextField();
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(': ');
        incomePeriodValue.value = this.calcSavedMoney();
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        periodSelect.value =  this.getIncomePeriodValue();
    }

    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        document.querySelector('.expenses').insertBefore(cloneExpensesItem, expensesPlus);
    
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }

    getExpenses() {
        const _this = this;
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getPeriodAmount() {
        periodAmount.textContent = periodSelect.value;
    }

    getIncome() {
        const _this = this;
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            } 
        });
    }

    addIncomeBlock() {
        let cloneIncomeBlock = incomeItems[0].cloneNode(true);
        document.querySelector('.income').insertBefore(cloneIncomeBlock, incomePlus);
    
        incomeItems = document.querySelectorAll('.income-items');
    
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }

    getAddExpenses() {
    const _this = this;

        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }

    getIncomePeriodValue() {
        return periodSelect.value * this.budgetMonth;
    }

    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = monthDeposit + +this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return (targetAmount.value / this.budgetMonth);
    }

    getStatusIncome() {
        if (this.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (this.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (this.budgetDay > 0) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так!');
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    getInfoDeposit() {
        if(this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    getSortExpenses() {
        const _this = this;
        this.addExpenses.forEach(function(item, index, arr) {
            _this.sortExpenses[index] = arr[index][0].toUpperCase() + item.slice(1);
        });
        
    }

    reset() {

        depositBank.value = '';
        depositAmount.style.display = 'none';
        depositBank.style.display = 'none';
        depositCheck.value = '';
        this.deposit = false;
        depositCheck.checked = '';
        depositPercent.style.display = 'none';
        depositPercent.value = '';

        const incomeItems = document.querySelectorAll('.income-items');
        const expensesItems = document.querySelectorAll('.expenses-items');
    
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
        
        
        const incomeItems2 = document.querySelectorAll('.income-items');
        const expensesItems2 = document.querySelectorAll('.expenses-items');
        
        const cloneIncomeBlock = incomeItems2[0].cloneNode(true);
        const cloneExpensesBlock = expensesItems2[0].cloneNode(true);
        
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

    }

    changePercent() {
        const valueSelect = this.value;
        depositPercent.value = '';
        console.log(valueSelect);
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block'; 
        } else if (salaryAmount.value !== '') {
            start.removeAttribute('disabled');
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }
    
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
            depositBank.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListeners() {
        depositPercent.addEventListener('blur', function() {
            if (depositPercent.value !== '' && !(+depositPercent.value <= 100 && +depositPercent.value > 0) && !isNaN(+depositPercent.value)) {
                    alert('Введите корректное значение процента по депозиту!');
                    depositPercent.value = '';
                    start.setAttribute('disabled', '');
            } else if (salaryAmount.value !== '') {
                start.removeAttribute('disabled');
            }});
        
        depositCheck.addEventListener('change', this.depositHandler.bind(this));

        resetBtn.addEventListener('click', this.reset.bind(this));
    
        start.setAttribute('disabled', '');
    
        start.addEventListener('click', this.start.bind(this));
    
        expensesPlus.addEventListener('click', this.addExpensesBlock);
    
        incomePlus.addEventListener('click', this.addIncomeBlock);
    
        periodSelect.addEventListener('change', this.getPeriodAmount);
    
        salaryAmount.addEventListener('input', this.checkSalaryAmount);
    
    }
}

const appData = new AppData();

appData.eventListeners();