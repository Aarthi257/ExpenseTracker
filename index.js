const express = require('express')
const mongoose=require('mongoose')
const app=express()

const Expense=require('./expense')
app.use(express.json());
mongoose.connect('mongodb+srv://aarthib21aid:k8dPwmvrdwuwtGA3@cluster0.vslmy63.mongodb.net/Expense_Tracker?retryWrites=true&w=majority',{
    useUnifiedTopology: true
   

});


app.get('/expense',async(req,res)=>{
    const expenses=await Expense.find();
    res.send(expenses);
})


app.get('/expense/:id',async(req,res)=>{
    try
    {
    const id=req.params.id;
    const result=await Expense.findById(id);
    if(result)
        res.send(result);
    else
        res.send("No Expense")
    }catch(err)
    {

    }
})

app.delete('/expense/:id',async(req,res)=>{
    try
    {
    const id=req.params.id;
    const result=await Expense.findByIdAndDelete(id);
    if(result)
        res.send(result);
    else
        res.send("No Expense with requested ID")
    }catch(err)
    {
        res.send(err);
    }
})

app.post('/expense',async(req,res)=>{
    console.log(req.body);
    const newExpense=req.body;
    await Expense.create(newExpense);
    res.send(`created`)
})

app.put('/expense/:id',async(req,res)=>{
    const id=req.params.id;
    const updateObject =req.body;
    const updatedObject=await Expense.findByIdAndUpdate(id,{$set:updateObject},{
        new:true
    })
    res.send(updatedObject);
})
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`App listening on ${port}`)
})