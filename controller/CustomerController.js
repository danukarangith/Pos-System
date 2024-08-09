let tableBody = $("#body");

// save the customer information
$('#save-customer').click(function () {
    let id = $("#customer-gmail").val();

    isIdExists(id, function (exists) {
        if (exists) {
            clearCustomerInputFields();
            alert("ID already exists. Please choose a different ID.");
        } else {
            // Continue with your existing code for saving the customer
            let name = $("#customer-name").val();
            let address = $("#customer-address").val();
            let salary = $("#customer-tp").val();

            const customerObj = {
                id: id,
                name: name,
                address: address,
                salary: salary
            };

            const jsonObj = JSON.stringify(customerObj);

            $.ajax({
                url: "http://localhost:8080/app/customers",
                method: "POST",
                data: jsonObj,
                contentType: "application/json",
                success: function (resp, textStatus, jqxhr) {
                    console.log("success: ", resp);
                    console.log("success: ", textStatus);
                    console.log("success: ", jqxhr);

                    getAll();
                },
                error: function (jqxhr, textStatus, error) {
                    console.log("error: ", jqxhr);
                    console.log("error: ", textStatus);
                    console.log("error: ", error);
                }
            });

           
            clearCustomerInputFields();
        }
    });
});

// check if customer exists
function isIdExists(id, callback) {
    $.ajax({
        url: "http://localhost:8080/app/customers",
        method: "GET",
        success: function (resp) {
            // ID exists
                for (const customer of resp) {
                    if(customer.id == id) {
                        callback(true);
                        return;
                    }
                }
                callback(false);
        },
        error: function (jqxhr, textStatus, error) {
            // ID does not exist
                callback(false);
                console.log("Error checking ID existence: ", jqxhr, textStatus, error);
        }
    });
}

//update the customer information
$('#updateCustomer').on('click', function () {
    
    let idval = $(`#upCID`).val();
    isIdExists(idval, function (exists) {
        if (exists) {
           // Continue with your existing code for updating the customer
           updateCustomer();
        } else {
            clearCustomerInputFields();
            alert("ID doesnot exists. Please choose a existing ID.");
        }
    });
});

function updateCustomer() {
    let id = $(`#upCID`).val();
    let name = $(`#upCName`).val();
    let address = $(`#upCAddress`).val();
    let salary = $(`#upCTp`).val();

    const customerupdateObj = {
                id:id,
                name:name,
                address:address,
                salary:salary
    };
        
    const jsonObjupdate = JSON.stringify(customerupdateObj);
        
            $.ajax({
                url: "http://localhost:8080/app/customers",
                method: "PUT",
                data: jsonObjupdate,
                contentType: "application/json",
                success: function (resp, textStatus, jqxhr) {
                    console.log("success: ", resp);
                    console.log("success: ", textStatus);
                    console.log("success: ", jqxhr);
                    getAll();
                },
                error: function (jqxhr, textStatus, error) {
                    console.log("error: ", jqxhr);
                    console.log("error: ", textStatus);
                    console.log("error: ", error);
                }
            })
            clearUpdateFiald();
}

//get all customers
$(`#getAllCustomer`).click(function () {
    getAll();
});

function getAll() {

    $(`#body`).empty();

    $.ajax({
        url : "http://localhost:8080/app/customers",
        method : "GET",
        success : function (resp) {
            console.log("Success: ", resp);
            for (const customer of resp) {
                console.log(customer.id);
                console.log(customer.name);
                console.log(customer.address);
                console.log(customer.salary);

                $(`#body`).append(`<tr>
                                <td>${customer.id}</td>
                                <td>${customer.name}</td>
                                <td>${customer.address}</td>
                                <td>${customer.salary}</td>
                                <td><button type="button" class="btn btn-primary btn-sm me-2" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal2">
                                    Edit
                                </button>
                                <button class="btn btn-danger me-3 btn-sm delete">Delete</button></td>
                   
                             </tr>`);
                setEvent();
            }

        },
        error : function (error) {
            console.log("error: ", error);
        }
    })

    
}

let eventsBound = false;

//Bind EDIT And Delete events
function setEvent() {
    if (!eventsBound) {
        $('#tblCustomer').on('click', 'tr', function () {
            var $row = $(this).closest("tr"),
                $tds = $row.find("td:nth-child(1)"),
                $ts = $row.find("td:nth-child(2)"),
                $tt = $row.find("td:nth-child(3)"),
                $tf = $row.find("td:nth-child(4)");

            $(`#upCID`).val($tds.text());
            $(`#upCName`).val($ts.text());
            $(`#upCAddress`).val($tt.text());
            $(`#upCTp`).val($tf.text());
        });

        $('#tblCustomer').on('click', '.delete', function (event) {
            event.stopPropagation(); // Prevent click event from reaching tr elements

            var $row = $(this).closest("tr"),
                $tds = $row.find("td:nth-child(1)");

            isIdExists($tds.text(), function (exists) {
                if (exists) {
                    deleteFunc($tds.text());
                } else {
                    alert("No such Customer..please check the ID");
                }
            });
        });

        eventsBound = true;
    }
}

setEvent();

//Delete Customer
function deleteFunc(id){
    $.ajax({
        url: "http://localhost:8080/app/customers?id=" + id,
        method: "DELETE",
        success: function (resp, textStatus, jqxhr) {
            console.log("success: ", resp);
            console.log("success: ", textStatus);
            console.log("success: ", jqxhr);
            getAll();
        },
        error: function (jqxhr, textStatus, error) {
            console.log("error: ", jqxhr);
            console.log("error: ", textStatus);
            console.log("error: ", error);
        }
    })
}       

//search for customers
$('#txtSearch').on('keyup',function (){

    let txtVal = $('#txtSearch').val();

    if (txtVal === '') {
        getAll();
        return;
    }

    $(`#body`).empty();
    const searchType = $("#cusSearch").val();

    $.ajax({
        url: "http://localhost:8080/app/customers",
        method: "GET",
        success: function (resp) {
            console.log("Success: ", resp);

            for (const customer of resp) {
                const searchText = (searchType === "Customer Id") ? customer.id : customer.name;

                if (searchText.includes($("#txtSearch").val())) {
                    const customerRow = `<tr>
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>${customer.salary}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-sm me-2" data-bs-toggle="modal"
                                data-bs-target="#exampleModal2">Edit
                            </button>
                            <button class="btn btn-danger me-3 btn-sm delete">Delete</button>
                        </td>
                    </tr>`;

                    $("#tblCustomer > tbody").append($(`#body`).append(customerRow));
                    setEvent();
                }
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    });
});

getAll();