//Create an array
var todos = [];
//Get ul (list)
var list = document.getElementById('list');
//Get submit button and add event
var button = document.getElementById('submitButton');
button.addEventListener('click', addItem);

//Add todos to array
function addTodo() {
    const input = document.querySelector('#addText').value;
    if (input.trim().length !== 0) {
        todos.push(input);
    }
}

//Print items to the screen, store items
function addItem() {
    addTodo();
    storeItems();
    //Create delete button
    var delButton = document.createElement('button');
    delButton.className = 'delete-button';
    delButton.appendChild(document.createTextNode('X'));
    delButton.addEventListener('click', removeItem)
    //Create list item (li)
    var li = document.createElement('li');
    li.className = ('list-item');
    //Create checkbox
    var checkbox = document.createElement('input');
    checkbox.type = ('checkbox');
    //Add items to the list
    for (var i = todos.length - 1; i < todos.length; i++) {
        if (todos[i].trim().length == 0) {
            alert("NOTHING TO DO!");
        }
        else {
            list.appendChild(li);
            li.append(checkbox, todos[i], delButton);
            document.getElementById("addText").value = "";
        }
    }
}

//Add items to the localStorage as an array
function storeItems() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Reloads stored items
function loadItems() {
    //Get stored items as an array
    let itemsArray = JSON.parse(localStorage.getItem('todos'));
    itemsArray.forEach((element) => {
        //Create delete button
        var delButton = document.createElement('button');
        delButton.className = 'delete-button';
        delButton.appendChild(document.createTextNode('X'));
        delButton.addEventListener('click', removeItem);
        //Create list item (li)
        var li = document.createElement('li');
        li.className = ('list-item');
        //Create checkbox
        var checkbox = document.createElement('input');
        checkbox.type = ('checkbox');
        //Add list items to the list
        list.append(li);
        li.append(checkbox, element, delButton);
    });
    todos = itemsArray;
}

//Remove items from the list and localStorage
function removeItem(e) {
    if (e.target.classList.contains('delete-button')) {
        if (confirm('Are you sure?')) {
            var li = e.target.parentElement;
            list.removeChild(li);
            const removeIndex = todos.indexOf(e.target.parentElement.innerText.replace('X', ''));
            todos.splice(removeIndex, 1);
            localStorage.setItem('todos', JSON.stringify(todos))
        }
    }
}

//Bring data to the screen when page loads
window.onload(loadItems());
