const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const placeholder = `<li style="font-size:18px; font-weight:bold">Loading Tapas...</li>`;
const checker = document.getElementById('checkall');
const unchecker = document.getElementById('uncheckall');
const del = document.getElementById('del');

function addItem(e) {
    e.preventDefault();
    const el = e.target;
    const text = el.querySelector('[name="item"]').value;
    const item = {
        text,
        done: false
    }
    items.push(item);
    console.log(items);
    saveAndRender();
    this.reset();
}

function render(plates, platesItem) {
    if (!plates.length) {
        platesItem.innerHTML = placeholder;
    } 
    else {
        platesItem.innerHTML = plates.map((plate, index) => {
            return `
            <li>
                <input type="checkbox" data-index="${index}" id="item${index}" ${plate.done ? "checked" : ""} onchange="toggleCheck(${index})"/>
                <label for="item${index}">${plate.text}</label>
            </li>
            `
        }).join('');
    }
}

function toggleCheck(index) {
    items[index].checked = !items[index].checked;
    items[index].done = !items[index].done;
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('items', JSON.stringify(items));
    render(items, itemsList);
}

function checkAll() {
    items.forEach(item => {
        item.checked = true;
        item.done = true;
    });
    saveAndRender();
}

function uncheckAll() {
    items.forEach(item => {
        item.checked = false;
        item.done = false;
    });
    saveAndRender();
}

function delAll() {
    if (confirm('Are you sure you want to delete all the items?')) {
        localStorage.removeItem('items');
        items.splice(0, items.length);
    }
    render(items, itemsList);
}

addItems.addEventListener('submit', addItem);
checker.addEventListener('click', checkAll);
unchecker.addEventListener('click', uncheckAll);
del.addEventListener('click', delAll);

render(items, itemsList);