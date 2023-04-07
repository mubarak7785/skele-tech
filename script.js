
const todoList = document.getElementById("todo-list");
const newTodoInput = document.getElementById("new-todo");
const addTodoButton = document.getElementById("add-todo");


const savedTodos = JSON.parse(localStorage.getItem("Skele-To Do")) || [];

savedTodos.forEach(todo => {
  const newTodo = createTodoElement(todo);
  todoList.appendChild(newTodo);
});


addTodoButton.addEventListener("click", function(event) {
  event.preventDefault();
  addTodo();
});
newTodoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTodo();
  }
});


function createTodoElement(todo) {

  const newTodo = document.createElement("div");
  newTodo.classList.add("todo");
  const x = document.createElement("div");
  x.innerHTML = '<input type="checkbox" class="checkbox">' + todo.text;
  newTodo.appendChild(x);

  newTodo.addEventListener("click", function() {
    newTodo.classList.toggle("completed");

   
    todo.completed = newTodo.classList.contains("completed");
    localStorage.setItem("Skele-To Do", JSON.stringify(savedTodos));
  });


  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("del")
  deleteButton.addEventListener("click", function() {
    todoList.removeChild(newTodo);
    savedTodos.splice(savedTodos.indexOf(todo), 1);
    localStorage.setItem("Skele-To Do", JSON.stringify(savedTodos));
  });
  newTodo.appendChild(deleteButton);

  if (todo.completed) {
    newTodo.classList.add("completed");
  }

  return newTodo;
}

function addTodo() {
  
  const todo = {
    text: newTodoInput.value,
    completed: false
  };


  const newTodo = createTodoElement(todo);
  todoList.appendChild(newTodo);
  savedTodos.push(todo);
  localStorage.setItem("Skele-To Do", JSON.stringify(savedTodos));
  newTodoInput.value = "";
}
