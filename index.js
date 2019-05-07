web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var account;
var accountAlice;
var accountBob;
web3.eth.getAccounts().then((f) => {
 accountAlice = f[1];
 accountBob = f[2];
 account = accountAlice;
})

//Abi contract after deploying solidity contract
abi = JSON.parse('[{"constant":false,"inputs":[],"name":"emptyShoppingList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"shoppingListItem","type":"bytes32"}],"name":"addElementToShoppingList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalElementsShoppingList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"shoppingList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"returnElementsShoppingList","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"shoppingListNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

contract = new web3.eth.Contract(abi);
contract.options.address = "0x9Dfb46Fe1ecb1D1185B504e952d96e003C25e37C";
// update this contract address with your contract address

$("#selectUser").change(function(){
	if($(this).children("option:selected").val() == "accountBob"){
		account = accountBob;
	} else {
		account = accountAlice;
	}
	if($("#shoppingListTable").children().length != 0){
 		$("#shoppingListTable").empty();
 		//Delete all elements of the list when reload
 		contract.methods.emptyShoppingList().send({from: account}).then((f) => console.log(f))
 	} 
});

//Method for adding elements to the table and executing them in the blockchain
function addElementToShoppingListJs(){
	var item = $("#item").val();
	//Add element to the HTML list
	$("#shoppingListTable").append("<tr>"+
     "<td>" + item + "</td>"+
    "</tr>");

    var itemHierarchyzed;

    //Adding the hierarchy
    switch (item){
    	case "Banana":
    	case "Apple":
    	case "Mango":
    		itemHierarchyzed = "Fruit";
    		break;
    	case "Sausage":
    	case "Chicken":
    	case "Hamburger":
    	case "Bacon":
    		itemHierarchyzed = "Meat";
    		break;
    	case "Salmon":
    	case "Shrimp":
    	case "Crab":
    		itemHierarchyzed = "Fish";
    		break;
    	case "Coke":
    	case "Beer":
    	case "Water":
    		itemHierarchyzed = "Drink";
    		break;
    	default:
    		itemHierarchyzed = "Other";
    }
	 

    //Add element to the blockchain
    contract.methods.addElementToShoppingList(web3.utils.asciiToHex(itemHierarchyzed)).send({from: account}).then((f) => console.log(f))
    $("#item").val('');
}

$(document).ready(function() {
	//Delete all elements of the list when reload
	contract.methods.emptyShoppingList().send({from: account}).then((f) => console.log(f))
 	if($("#shoppingListTable").children().length != 0){
 		$("#shoppingListTable").empty();
 	}  
 	$("#selectUser").empty();
 	$("#selectUser").append('<option value="accountAlice" selected="selected">Alice</option><option value="accountBob">Bob</option>');
 	$('#selectUser option[value="accountAlice"]').attr("selected",true);
 	$('#item').val("");
 
});
