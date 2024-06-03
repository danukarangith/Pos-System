getAllCustomer();

// --------------Save btn event---------------------------
$("#btnSaveCustomer").click(function (){
    if (checkAllCustomer()){
        saveCustomer();
    }else {
        alert("Something went wrong!");
    }
});

// --------------Get all btn event---------------------------
$("#getAll").click(function (){
    getAllCustomer();
})

// --------------Search customer function---------------------------
function searchCustomer(customerId) {
    return customersDB.find(function (customer){
        return customer.id == customerId;
    });
}

// --------------Save Customer function---------------------------
function saveCustomer() {
    let customerId = $("#txtCusId").val();
    // check customer if exists or not
    if(searchCustomer(customerId.trim()) == undefined){
        let customerName = $("#txtCusName").val();
        let customerAddress = $("#txtCusAddress").val();
        let customerSalary = $("#txtCusSalary").val();

        let newCustomer = Object.assign({}, CustomerModel);

        newCustomer.id = customerId;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.salary = customerSalary;

        customersDB.push(newCustomer);
        clearCustomerInputFields();
        getAllCustomer();
        alert("Customer added!");
        loadCustomerIds();
    }else{
        alert("Customer exists!")
        clearCustomerInputFields();
    }
}

// --------------Get all customer function---------------------------
function getAllCustomer(){
    $("#tblCustomer").empty();
    $("#modalTable").empty();

    for (let i=0; i<customersDB.length; i++){
        let id = customersDB[i].id;
        let name = customersDB[i].name;
        let address = customersDB[i].address;
        let salary = customersDB[i].salary;

        let row =  `<tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${address}</td>
                        <td>${salary}</td>
                    </tr>`;

        $("#tblCustomer").append(row);
        $("#modalTable").append(row);

        bindTableRowEventsCustomer();
    }
}

// --------------Bind row to fields function---------------------------
function bindTableRowEventsCustomer() {
    $("#tblCustomer>tr").click(function (){
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        $("#txtCusId").val(id);
        $("#txtCusName").val(name);
        $("#txtCusAddress").val(address);
        $("#txtCusSalary").val(salary);

        $("#btnDeleteCustomer").prop("disabled", false);
    });
}

// --------------Delete btn event---------------------------
$("#btnDeleteCustomer").click(function (){
    let id = $("#txtCusId").val();

    let confirmation = confirm("Are you want to delete "+id+" ?");
    if (confirmation){
        let response = deleteCustomer(id);
        if (response){
            clearCustomerInputFields();
            getAllCustomer();
            alert("Customer deleted!.");
        }else {
            alert("Customer not deleted!.")
        }
    }
});

// --------------Delete customer function---------------------------
function deleteCustomer(id) {
    for (let i = 0; i < customersDB.length; i++){
        if (customersDB[i].id == id){
            customersDB.splice(i,1);
            return true;
        }
    }
    return false;
}

// --------------Update btn event---------------------------
$("#btnUpdateCustomer").click(function (){
   let id = $("#txtCusId").val();
   updateCustomer(id);
   clearCustomerInputFields();
});

// --------------Update Customer function---------------------------
function updateCustomer(id) {
    if(searchCustomer(id) == undefined){
        alert("No such customer. Please check the ID!");
    }else{
        let confirmation = confirm("Do you really want to update this customer.?");
        if (confirmation){
            let customer = searchCustomer(id);

            let name = $("#txtCusName").val();
            let address = $("#txtCusAddress").val();
            let salary = $("#txtCusSalary").val();

            customer.name = name;
            customer.address = address;
            customer.salary = salary;

            getAllCustomer();
            alert("Customer updated!");
        }
    }
}

// --------------Clear btn event---------------------------
$("#btnClearCustomer").click(function (){
    clearCustomerInputFields();
});