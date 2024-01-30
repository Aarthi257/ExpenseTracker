const mongoose=require('mongoose');
const ExpenseSchema = new mongoose.Schema({
    id: Number,
    amount: Number,
    text: String,
});

const Expense=mongoose.model('Expense',ExpenseSchema);
module.exports=Expense;