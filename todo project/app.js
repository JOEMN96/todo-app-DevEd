// content selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todolist = document.querySelector(".todo-list");
const filteroptions = document.querySelector(".filter-todo");
const name = document.querySelector(".nameHere");

// Event Listners

todoButton.addEventListener("click", addToDo);

todolist.addEventListener("click", deleteCheck); // delete & complete button function

filteroptions.addEventListener("click", filtering);

document.addEventListener("DOMContentLoaded", solvingRefreshPrblm);
// Functions

// userInputName = prompt("Your Name"); // adding user Name to the site
// name.innerText = `${userInputName}'s `;

function addToDo(e) {
  // Prevent default browser behaviour
  e.preventDefault();

  // Creating div
  const todoDiv = document.createElement("div"); // intha div dha vera ella elements kum container ah work aguthu
  todoDiv.classList.add("todo"); // adding classList to creted div for future styling

  // creating indiviuual li

  const newTodo = document.createElement("li");
  // newTodo.innerText = todoInput.value;  --> this is ld code doesnt prevent from creating empty todo
  // Preventing from creating empty list
  if (todoInput.value == "") {
    alert("Enter the Todo !");
    return;
  } else {
    newTodo.innerText = todoInput.value;
  }
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  saveLocalStorage(todoInput.value); // storing t local storage

  // creating indiviuual completed btn

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // creating indiviuual completed delete

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton); // ellathayum yan todoDiv ku append panrom na ==> todoDiv dha container

  todolist.appendChild(todoDiv); // appending created div to the html ul

  todoInput.value = ""; // clearing input value after appending
}

function deleteCheck(e) {
  let item = e.target; // checking for clicked element
  let parentDiv = item.parentElement;

  if (item.classList[0] === "trash-btn") {
    parentDiv.classList.add("fall"); // adding falling animation
    deletingTodoFromLocalStorage(parentDiv); // deleting todo from local storage
    parentDiv.addEventListener("transitionend", function () {
      parentDiv.remove(); // deleting todoo after the anim is done
    });
  }

  if (item.classList[0] === "complete-btn") {
    parentDiv.classList.toggle("completed"); // adding completed effects to todo (line through and half opacity)
  }
}

function filtering(e) {
  // filtering function
  const todos = todolist.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

function saveLocalStorage(todo) {
  let todos;
  // checking oruvela already storage la iruka nu pakronm
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  // localStorage.clear();
}

function solvingRefreshPrblm() {
  let todos;
  // checking oruvela already storage la iruka nu pakronm
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    // Creating div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // creating indiviuual li

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // creating indiviuual  completed

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // creating indiviuual  delete btn

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton); // ellathayum yan todoDiv ku append panrom na ==> todoDiv dha container

    todolist.appendChild(todoDiv); // appending created div to the html ul

    todoInput.value = ""; // clearing input value after appending
  });
}

function check() {
  //  ippo dha intha epd pannanum nu figure out pannyan
  // checking oruvela already storage la iruka nu pakronm
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function deletingTodoFromLocalStorage(todo) {
  let todos = check();

  const index = todo.children[0].innerText;

  todos.splice(todos.indexOf(index), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
