getAllItem();

// --------------Save btn event---------------------------
$("#btnSaveItem").click(function () {
  if (checkAllItems()) {
    saveItem();
  } else {
    alert("Something went wrong!");
  }
});

// --------------Get all btn event---------------------------
$("#btnGetAllItem").click(function () {
  getAllItem();
});

// --------------Search customer function---------------------------
function searchItem(itemCode) {
  return itemsDB.find(function (item) {
    return item.code == itemCode;
  });
}

// --------------Save Customer function---------------------------
async function saveItem() {
  let itemCode = $("#txtItemCode").val();
  let itemName = $("#txtItemName").val();
  let itemPrice = $("#txtItemPrice").val();
  let itemQuantity = $("#txtItemQuantity").val();


    let itemSend = {
        code: itemCode,
        description: itemName,
        qtyOnHand: itemQuantity,
        unitPrice: itemPrice,

    }

    console.log(itemSend)


  const requestOptions = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(itemSend),
  };


   const response= await fetch("http://localhost:8080/pos_system_backend_war/items", requestOptions);
    
  // check customer if exists or not
  if (response.ok) {
    clearItemInputFields();
    getAllItem();
    alert("Item added!");
    loadItemCodes();
  } else {
    alert("Item exists!");
    clearItemInputFields();
  }
}

// --------------Get all customer function---------------------------
// function getAllItem() {
//   $("#tblItem").empty();
//   $("#modalItemTable").empty();

//   for (let i = 0; i < itemsDB.length; i++) {
//     let id = itemsDB[i].code;
//     let name = itemsDB[i].name;
//     let price = itemsDB[i].price;
//     let quantity = itemsDB[i].quantity;

//     let row = `<tr>
//                         <td>${id}</td>
//                         <td>${name}</td>
//                         <td>${price}</td>
//                         <td>${quantity}</td>
//                     </tr>`;

//     $("#tblItem").append(row);
//     $("#modalItemTable").append(row);

//     bindTableRowEventsItem();
//   }
// }
async function getAllItem() {
  $("#tblItem").empty();
  $("#modalItemTable").empty();

  const response = await fetch("http://localhost:8080/pos_system_backend_war/items");
  if (response.ok) {
    const itemsDB = await response.json();

    for (let i = 0; i < itemsDB.length; i++) {
      let id = itemsDB[i].code;
      let name = itemsDB[i].description;
      let price = itemsDB[i].unitPrice;
      let quantity = itemsDB[i].qtyOnHand;

      let row = `<tr>
                          <td>${id}</td>
                          <td>${name}</td>
                          <td>${price}</td>
                          <td>${quantity}</td>
                      </tr>`;

      $("#tblItem").append(row);
      $("#modalItemTable").append(row);

      bindTableRowEventsItem();
    }
  } else {
    alert("Failed to fetch items!");
  }
}

// --------------Bind row to fields function---------------------------
function bindTableRowEventsItem() {
  $("#tblItem>tr").click(function () {
    let code = $(this).children().eq(0).text();
    let name = $(this).children().eq(1).text();
    let price = $(this).children().eq(2).text();
    let quantity = $(this).children().eq(3).text();

    $("#txtItemCode").val(code);
    $("#txtItemName").val(name);
    $("#txtItemPrice").val(price);
    $("#txtItemQuantity").val(quantity);

    $("#btnDeleteItem").prop("disabled", false);
  });
}

// --------------Delete btn event---------------------------
// $("#btnDeleteItem").click(function () {
//   let code = $("#txtItemCode").val();

//   let confirmation = confirm("Are you want to delete " + code + " ?");
//   if (confirmation) {
//     let response = deleteItem(code);
//     if (response) {
//       clearItemInputFields();
//       getAllItem();
//       alert("Item deleted!.");
//     } else {
//       alert("Item not deleted!.");
//     }
//   }
// });

// --------------Delete customer function---------------------------


// function deleteItem(code) {
//   for (let i = 0; i < itemsDB.length; i++) {
//     if (itemsDB[i].code == code) {
//       itemsDB.splice(i, 1);
//       return true;
//     }
//   }
//   return false;
// }
async function deleteItem(code) {
  const requestOptions = {
    method: 'DELETE',
    headers: {"Content-Type": "application/json"}
  };

  const response = await fetch(`http://localhost:8080/pos_system_backend_war/items/${code}`, requestOptions);
  return response.ok;
}


// --------------Update btn event---------------------------
$("#btnUpdateItem").click(function () {
  let code = $("#txtItemCode").val();
  updateItem(code);
  clearItemInputFields();
});

// --------------Update Customer function---------------------------
// function updateItem(code) {
//   if (searchItem(code) == undefined) {
//     alert("No such item. Please check the ID!");
//   } else {
//     let confirmation = confirm("Do you really want to update " + code + ".?");
//     if (confirmation) {
//       let item = searchItem(code);

//       let name = $("#txtItemName").val();
//       let price = $("#txtItemPrice").val();
//       let quantity = $("#txtItemQuantity").val();

//       item.name = name;
//       item.price = price;
//       item.quantity = quantity;

//       getAllItem();
//       alert("Item updated!");
//     }
//   }
// }
async function updateItem(code) {
  if (searchItem(code) == undefined) {
    alert("No such item. Please check the ID!");
  } else {
    let confirmation = confirm("Do you really want to update " + code + ".?");
    if (confirmation) {
      let item = searchItem(code);

      let name = $("#txtItemName").val();
      let price = $("#txtItemPrice").val();
      let quantity = $("#txtItemQuantity").val();

      let itemUpdate = {
        code: code,
        description: name,
        qtyOnHand: quantity,
        unitPrice: price
      };

      const requestOptions = {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(itemUpdate)
      };

      const response = await fetch(`http://localhost:8080/pos_system_backend_war/items/${code}`, requestOptions);

      if (response.ok) {
        getAllItem();
        alert("Item updated!");
      } else {
        alert("Failed to update item!");
      }
    }
  }
}


// --------------Clear btn event---------------------------
$("#btnClearItem").click(function () {
  clearItemInputFields();
});
