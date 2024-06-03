//Tüm Elementleri Seçmek

const form = document.querySelector("#todoAddForm"); // buton formun içinde . butona basıldığında form sabmit olacaktır.
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded",pageLoaded)
    secondCardBody.addEventListener("click",removeTodoToUI)
    clearButton.addEventListener("click",allTodosEverywhere)
    filterInput.addEventListener("keyup",filter);
}


function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                //
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important");
            }
        });

    }else{
        showAlert("warning","Filtreleme yapmak için en az bir todo olmalıdır!");
    }

}

function allTodosEverywhere(){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
     //Ekrandan Silme
     todoListesi.forEach(function(todo){
         todo.remove();
     });
 
     //Storage'dan Silme
     todos=[];
     localStorage.setItem("todos",JSON.stringify(todos));
     showAlert("success","Başarılı bir şekilde silindi");
    }else{
     showAlert("warning","Silmek için en az bir todo olmalıdır");
    }
 }

function removeTodoToUI(e){
  if (e.target.className== "fa fa-remove") {  // çarpıya bastığında (diğer türlü secondCardBody içindeki bir yere basınca da çalışır.)
    // ekrandan silme
    const todo = e.target.parentElement.parentElement;// fa fa-remove üstünden li yi yakaladım.
    todo.remove();
    // stroge den silme
    romeveTodoStroge(todo.textContent)
    showAlert("succes","Todo Başarıyla Silindi")
  }
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);// bir tane değer sil
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function pageLoaded(){ // stroge deki değerleri ekrana yazdırır.
    checkTodosFromStroge();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const İnputText= addInput.value.trim();
if (İnputText== null || İnputText== " ") {
    showAlert("warning", "Lütfen boş bırakmayınız!");
} 
else {
    // Arayüze ekleme
    addTodoToUI(İnputText)
    // stroga ekleme
    addTodoToStroge(İnputText)
    showAlert("success", "Todo Eklendi.");
}

     e.preventDefault();
}

function addTodoToUI(newTodo){
  
 const li = document.createElement("li");
 li.className="list-group-item d-flex justify-content-between";
 li.textContent=newTodo;
 li.style.marginTop= "10px"

 const a=document.createElement("a");
 a.href="#";
 a.className="delete-item"

 const i=document.createElement("i");
 i.className="fa fa-remove"

 a.appendChild(i);
 li.appendChild(a);
 todoList.appendChild(li);

 addInput.value=" "
}

function addTodoToStroge(newTodo){
   checkTodosFromStroge();

   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos))
}

function checkTodosFromStroge(){
      if (localStorage.getItem("todos")==null) {
        todos= []
      } else {
        todos= JSON.parse(localStorage.getItem("todos"))
      }
}

function showAlert(type, message) {

    const div = document.createElement("div");
    div.className = `alert alert-${type}`; 
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
        div.remove();
    },2500);
}