pragma solidity >=0.4.0 <0.6.0;

contract shoppingList{
    
    //Meter los Ids de los shoppingListSelectedItems, para llamar al constructor despues de guardar la lista
    //Array for storing the elements selected from the shopping list in hexadecimal format
    bytes32[] public shoppingList;
    
    //Initialization of the constructor with empty list
    constructor(bytes32[] memory shoppingListNames) public {
        shoppingList = shoppingListNames;
  }
  
  //Function for adding elements from the Javascript
  function addElementToShoppingList(bytes32 shoppingListItem) public {
      shoppingList.push(shoppingListItem);
  }
  
  //Function for returning the number of elements stored in the list of the smart contract
  function totalElementsShoppingList() view public returns (uint256) {
    return shoppingList.length;
  }
  
  //Function for returning the elements stored in the shopping list, in hex
  function returnElementsShoppingList() view public returns (bytes32[] memory) {
      return shoppingList;
  }
  
  //Function for empty the shopping list of the smart contract
  function emptyShoppingList() public{
      delete shoppingList;
  }
  
}
