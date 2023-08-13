import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://shopinglist-66ef8-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const List = ref(database, "list");
let inputEl = document.getElementById("input-val");
let addbtnEl = document.getElementById("add-btn");
const shoping_list = document.getElementById("shoping-list");

addbtnEl.addEventListener("click", () => {
  let input = inputEl.value;
  if (input != "") {
    push(List, input);

    console.log(input + " is added");
  } else {
    alert("No Items Entered");
  }

  clearInput();
});

onValue(List, (snapshot) => {
  if (snapshot.exists()) {
    //Object.values gives values of object in
    // array. oposite to this Object.keys give Keys

    let list = Object.entries(snapshot.val()); //Object.entries will give both[{key:value},{}]
    clear();

    for (let i = 0; i < list.length; i++) {
      let addtocart = list[i];

      display(addtocart);
    }
  } else {
    shoping_list.innerHTML = "No items Here ... Yet";
  }
});

const clearInput = () => {
  inputEl.value = "";
};
const clear = () => {
  shoping_list.innerHTML = "";
};
const display = (item) => {
  let id = item[0];
  let value = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = value;

  let removeButton = document.createElement("span");
  removeButton.textContent = " x";
  removeButton.className = "remove-btn";
  newEl.appendChild(removeButton);
  shoping_list.append(newEl);

  newEl.addEventListener("click", () => {
    let removeitem = ref(database, `list/${id}`);
    remove(removeitem);
  });
  // shoping_list.innerHTML += `<li>${item}</li>`;
};
