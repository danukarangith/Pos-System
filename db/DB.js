var customersDB = [
    {id:"C00-001",name:"Yuraj Malinda",address:"Galle",salary:10000},
    {id:"C00-002",name:"Imesh Gimantha",address:"Matara",salary:25000},
    {id:"C00-003",name:"Amal Perera",address:"Panadura",salary:30000}
];
var itemsDB = [
    {code:"I00-001",name:"Lux",price: 145.00,quantity: 100},
    {code:"I00-002",name:"Sunlight",price: 345.00,quantity: 150},
    {code:"I00-003",name:"Light Boy",price: 245.00,quantity: 400}
];
var ordersDB = [
    {oid:"OID-001", date:"2023/10/06", customerID:"C00-001",
        orderDetails:[
            {oid:"OID-001", code:"I00-001", qty:10, payment:145.00},
            {oid:"OID-001", code:"I00-002", qty:2, payment:345.00}
        ]
    }
];
var cartDetails=[];