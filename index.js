const todoListUL = document.querySelector('#todo-list')
const form = document.querySelector('form')
const formInput = document.querySelector('input')

const state = {
    todoList: []
}

const fetchDataAndRender = () => {
    fetch('http://localhost:3000/todos')
    .then(function (response) {
        return response.json()
    })
    .then(function (todoList) {
        state.todoList = todoList
        render()
    })
}

const render = () => {
    const todoList = state.todoList
    todoListUL.innerHTML = ""
    todoList.forEach(item => {
        const li = document.createElement('li');
        li.classList = 'todo-item'
        li.textContent = item.title
        li.style.marginBottom = '16px'
        if (item.completed) {
            li.style.color = 'grey'
            li.style.textDecoration = 'line-through'
        }
        todoListUL.append(li)
    });
}

const create = (input) => {
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: input,
            completed: false
        })
    })
    .then (function () {
        fetchDataAndRender()
    })
}

const addListener = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        create(formInput.value)
        console.log('new todo item added', state.todoList)
    })
}

fetchDataAndRender()
addListener()