const item = {
  id: null,
  name: 'Test Item'
};

var items = [];
var itemsIndices = [];

for (let i = 0; i < 5; i++) {
  const newItem = { ...item };
    newItem.id = i + 1;
    newItem.name = `Test Item ${i + 1}`;
    items.push(newItem);
}

displayArrays();

removeItemById(3);

items.forEach(item => {
    items.findIndex(it => it === item);
})

function displayArrays() {
    console.log('Items:', items);
    var itemsIndices = items.map(item => item.id);
    console.log('Item Indices:', itemsIndices);
}



function removeItemById(id) {
    items = items.filter (item => item.id !== id);
    displayArrays();
    items.forEach ((item,index) => {
        item.id = index + 1;
    });
    displayArrays();
}