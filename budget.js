class UI{
    constructor() {
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemID = 0;
      }
submitBudgetform(){
    const value=this.budgetInput.value;
    if(value===''|| value<0){
        this.budgetFeedback.classList.add('showitem');
        this.budgetFeedback.innerHTML=`<p>value cannot be empty or negative</p>`;
        setTimeout(()=>{
            this.budgetFeedback.classList.remove('showitem');
        },4000);
    }
    else{
        this.budgetAmount.textContent=value;
        this.budgetInput.value="";
        this.showbalance();
    }
}
submitExpenseform(){
    const expensevalue=this.expenseInput.value;
    const amountvalue=this.amountInput.value;
    if(expensevalue===''||amountvalue===''||amountvalue<0){
        this.expenseFeedback.classList.add('showitem');
        this.expenseFeedback.innerHTML=`<p>value cannot be empty or negative</p>`;
        setTimeout(()=>{
            this.expenseFeedback.classList.remove('showitem');
        },4000);
        
    }
    else{
        let amount=parseInt(amountvalue);
        this.expenseInput.value="";
        this.amountInput.value="";
        let expense={
            id:this.itemID,
            title:expensevalue,
            amount:amount,
        }
        this.itemID++;
        this.itemList.push(expense);
        this.addExpense(expense);
        this.showbalance();
    }

}
addExpense(expense){
    const div=document.createElement('div');
    div.classList.add("expense");
    div.innerHTML=`<div class="expense-item d-flex justify-content-between align-items-baseline">
    <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
    <div class="expense-icons list-item">
     <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
     </a>
     <a href="#" class="delete-icon" data-id="${expense.id}">
     <i class="fa fa-trash" aria-hidden="true"></i>
     </a>
    </div>
   </div>`
   this.expenseList.appendChild(div);
}
showbalance(){
    const expense=this.totalexpense();
    const total=parseInt(this.budgetAmount.textContent)-expense;
    this.balanceAmount.textContent=total;
    if(total<0){
        this.balance.classList.add('showred');
    }
}
totalexpense(){
    let total=0;
    if(this.itemList.length>0){
        total=this.itemList.reduce(function(acc,curr){
        acc+=curr.amount;
        return acc;
    },0);
     }
        this.expenseAmount.textContent=total;
    return total;
}
deleteExpense(element){
let id=parseInt(element.dataset.id);
let parent=element.parentElement.parentElement.parentElement;
this.expenseList.removeChild(parent);
let templist=this.itemList.filter(function(item){
    return item.id!==id;
});
this.itemList=templist;
this.showbalance();
}
}
function eventEventListener(){
    const budgetForm=document.getElementById('budget-form');
    const expenseForm=document.getElementById('expense-form');
    const expenseList=document.getElementById('expense-list');
    const ui=new UI();
    budgetForm.addEventListener('submit',function(event){
event.preventDefault();
ui.submitBudgetform();
    })
    expenseForm.addEventListener('submit',function(event){
        event.preventDefault();
        ui.submitExpenseform();
    })
    expenseList.addEventListener('click',function(event){
        if(event.target.parentElement.classList.contains('delete-icon')){
ui.deleteExpense(event.target.parentElement);
        }
    })
}
document.addEventListener('DOMContentLoaded',function(){
    eventEventListener();
});
