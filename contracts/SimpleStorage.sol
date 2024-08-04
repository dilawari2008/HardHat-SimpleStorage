// SPDX-License-Identifier: MIT
pragma solidity 0.8.7; //pragma solidity >=^0.8.7 <0.9.0 OR pragma solidity ^0.8.7 -> only changes minor version

// EVM -> Ethereum Virtual Machine
// code when compiled compiles down to EVM standards
// Avalanche, Fantom, Polygon - EVM compatible blockchain -> solidity smart contracts can be deployed here

contract SimpleStorage {
    // primitive -> bool uint int address bytes; uint = uint8 to uint256, default uint256; bytes -> max bytes32
    // arrays structs mapping, string is array
    // nned to mention data location as memory, calldata or storage for the non-primitive types
    // address myAddress = 0xe365287D43CF284b3E051975934F7e7176873EB5;

    // variable declaration -> type visibility variableName

    struct People {
        uint favNum;
        string name;
    }

    People[] public people;

    mapping(string => uint) public nameToFavNumMap;

    // memory, calldata or storage
    // memory, calldata - temp vars, only for func execution
    // if not mentioned by default storage, e.g. favNum outside is storage
    function addPeople(string memory _name, uint256 _favNum) public {
        // People memory newPerson = People({favNum: _favNum, name: _name});
        People memory newPerson = People(_favNum, _name);
        people.push(newPerson);
        nameToFavNumMap[_name] = _favNum;
    }

    People public person = People({favNum: 0, name: "yes"});

    uint256 public favNum; // defaults to 0

    function store(uint256 _favNum) public virtual {
        favNum = _favNum;
        // view function retrieve called here like retrieve() will cost gas
        // retrieve();
    }

    // view and pure do not consume gas - do not modify state
    function retrieve() public view returns (uint256) {
        return favNum;
    }

    // pure cannot use state vars
    function add() public pure returns (uint256) {
        return 1 + 1;
    }
}

// 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8