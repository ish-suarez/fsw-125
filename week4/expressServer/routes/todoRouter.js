// ----------------------- Importing Express --------------------
const express = require('express');
// ----------------------- Setting To Do Router -----------------
const todoRouter = express.Router();
// ------------------------ Importing uuid To Set New Unique Id -
const { v4: uuidv4 } = require('uuid');
// ------------------------ Todo Endpoint -----------------------
const todos = [
    {
        name: 'Call Doctor',
        description: 'Ask About Meds',
        todoImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        todoCompleted: false,
        _id: uuidv4()
    },
    {
        name: 'Get Groceries',
        description: 'Need Eggs, Bacon, Potato, Rice, Beads',
        todoImage: 'https://images.unsplash.com/photo-1545601445-5b6f418af4bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
        todoCompleted: false,
        _id: uuidv4()
    },
    {
        name: 'Vacuum The House',
        description: 'Vacuume',
        todoImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        todoCompleted: false,
        _id: uuidv4()
    },
    {
        name: 'Do The Dishes',
        description: 'I Hate Dishes',
        todoImage: 'https://images.unsplash.com/photo-1590610994353-7b0e7546e681?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        todoCompleted: false,
        _id: uuidv4()
    }
]

todoRouter.route('/')
    // ------------------------ Post One Todo ---------------------
    .post((req, res) => {
        const newTodo = req.body;
        newTodo._id = uuidv4();
        todos.push(newTodo);
        res.send(`New To Do Added Title ${newTodo.name} To The List`);
    })
    // ----------------------- Get All Todos -----------------------
    .get((req, res) => {
        res.send(todos);
    })
    // --------------------------- Update A Todo -----------------
    todoRouter.put('/:todoId', (req, res) => {
        const todoId = req.params.todoId;
        const updateObjects = req.body;
        const todoIndex = todos.findIndex(todo => todo._id === todoId);
        const updatedTodo = Object.assign(todos[todoIndex], updateObjects);
        res.send(updatedTodo);
    })
    // -------------------------- Delete A Todo ----------------
    todoRouter.delete('/:todoId', (req, res) => {
        const todoId = req.params.todoId;
        const todoIndex = todos.findIndex(todos => todos._id === todoId);
        todos.splice(todoIndex, 1);
        res.send(`To Has Been Deleted`);
    })
    // ------------------------ Get A Single Todo -------------
    todoRouter.get('/:todoId', (req, res) => {
        const todoId = req.params.todoId;
        const requestedTodo = todos.find(todo => todo._id === todoId);
        res.send(requestedTodo);
    })
    
// ---------------------------------- Exporting Module -------------
module.exports = todoRouter;
