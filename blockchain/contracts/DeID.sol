//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract DeID{

    address public owner;
 
    constructor(){
        owner = msg.sender;
    }

    struct Documents{
        string Hash;
        uint TimeAdded;
    }
    
    struct User{
        string DOB;
        uint64 _foldCount;
        uint64 Phone;
        address Address;
        string Name;
        string Image;
        string[] Folders;
    }

    struct Employee{
        string Name;
        string Designation;
        string Image;
        string Id;
    }

    struct Company{
        uint64 Phone;
        string RegistrationId;
        string Name;
        string Image;
        string[] Employee;
    }

    struct Request{
        address Address;
        bool DOB;
        bool Phone;
        bool Name;
        bool Image;
        bool[] Folders;
    }

    // -- User --

    // mapping( address => address[]) private Nominee;
    //add nomminees

    mapping( bytes32 => User) private userList;
    mapping( bytes32 => mapping( uint => Documents[])) private userDocs;
    mapping( address => bool) private userRegistered;


    mapping( bytes32 => Company) private companyList;
    mapping( bytes32 => mapping( address => Documents[])) private companyDocs;
    mapping( address => bool) private companyRegistered;

    // -- Company --

    mapping( address => Request[]) private userRequests;

    mapping( bytes32 => User[]) private companyData;

    mapping( address => Request[]) private activeCompanies;

    mapping( address => mapping(address => bool)) private companyAccess;
    mapping( address => Request[]) private PreviousCompanies;
    //add documents for company also!

    function createUser(string calldata DOB,uint64 Phone,string calldata Name,string calldata Image) public{
        require(userRegistered[msg.sender] == false,"User Already Registered");
        require(companyRegistered[msg.sender] == false,"Registered as company");
        bytes32 _val = keccak256(abi.encodePacked(msg.sender));
        userList[_val].DOB = DOB;
        userList[_val]._foldCount = 3; 
        userList[_val].Folders.push("Medical");
        userList[_val].Folders.push("Academics");
        userList[_val].Folders.push("Bank");
        userList[_val].Phone = Phone;
        userList[_val].Name = Name;
        userList[_val].Address= msg.sender;
        userList[_val].Image = Image;
        userRegistered[msg.sender] = true;
    }

    function userDetails() public view returns(User memory){
        require(userRegistered[msg.sender],"Not Registered");
        return userList[keccak256(abi.encodePacked(msg.sender))];
    }

    function addDocs(uint _id ,string calldata _hash) public{
        //check folder length
        require(userRegistered[msg.sender] || companyRegistered[msg.sender],"Not Registered");
        Documents memory document = Documents(_hash,block.timestamp);
        userDocs[keccak256(abi.encodePacked(msg.sender))][_id].push(document);
    }

    function returnDocs(uint _id)public view returns(Documents[] memory){
        return userDocs[keccak256(abi.encodePacked(msg.sender))][_id];
    }

    function createCompany(uint64 Phone,string calldata RegistrationId,string calldata Name,string calldata Image) public{
        require(userRegistered[msg.sender] == false,"Company Already Registered");
        require(companyRegistered[msg.sender] == false,"Registered as User");
        bytes32 _val = keccak256(abi.encodePacked(msg.sender));
        companyList[_val].Phone = Phone;
        companyList[_val].RegistrationId = RegistrationId;
        companyList[_val].Name = Name;
        companyList[_val].Image = Image; 
        companyRegistered[msg.sender] = true;
    }

    function companyDetails(address _address) public view returns(Company memory){
        return companyList[keccak256(abi.encodePacked(_address))];
    }

    function requestDetails(address _address,bool DOB,bool Phone,bool Name,bool Image,bool[] calldata _Folders) public {
        require(companyRegistered[msg.sender] ,"Only Companies Can Request");
        require(userRegistered[_address] ,"User Not registered");
        require(companyAccess[msg.sender][_address] == false,"Cant");
        Request memory request;
        request.Address = msg.sender;
        request.DOB = DOB;
        request.Phone = Phone;
        request.Name = Name;
        request.Image = Image;
        request.Folders = _Folders;
        // Request(msg.sender,DOB,Phone,Name,Name,_Folders);
        userRequests[_address].push(request);
    }

    function acceptDetails( uint _id) public{
        Request memory request = userRequests[msg.sender][_id];
        User memory _user = userList[ keccak256(abi.encodePacked(msg.sender))];
        User memory newUser;
        newUser._foldCount =_user._foldCount;
        newUser.Address =_user.Address;
        newUser.Folders = _user.Folders;
        if(request.DOB ){
            newUser.DOB =_user.DOB;
        } 
        if(request.Phone){
            newUser.Phone = _user.Phone;
        }
        if(request.Name){
            newUser.Name = _user.Name;
        }
        if(request.Image){
            newUser.Image = _user.Image;
        }
        for(uint i =0 ; i< _user._foldCount-1 ; i++){
            if(request.Folders[i]){
                companyDocs[keccak256(abi.encodePacked(request.Address))][msg.sender] = userDocs[keccak256(abi.encodePacked(msg.sender))][i];
                break;
            }
        }
        companyData[keccak256(abi.encodePacked(request.Address))].push(newUser); 
        activeCompanies[msg.sender].push(request);
        companyAccess[request.Address][msg.sender] = true;
        userRequests[msg.sender][_id] = userRequests[msg.sender][userRequests[msg.sender].length-1];
        userRequests[msg.sender].pop();
    }

    function rejectDetails( uint _id) public{
        userRequests[msg.sender][_id] = userRequests[msg.sender][userRequests[msg.sender].length-1];
        userRequests[msg.sender].pop(); 
    }

    function returnUsersData() public view returns(User[] memory){
        require(companyRegistered[msg.sender],"Not a Registered Company");
        return companyData[keccak256(abi.encodePacked(msg.sender))];
    }

    function returnUserRequests() public view returns(Request[] memory){
        require(userRegistered[msg.sender],"Register as User");
        return userRequests[msg.sender];
    }

    function returnUserDocs(address Address) public view returns(Documents[] memory){
        require(companyRegistered[msg.sender],"Not a Registered Company");
        require(companyAccess[msg.sender][Address],"You Don't Have Access to User");
        return companyDocs[keccak256(abi.encodePacked(msg.sender))][Address];
    }

    function ifRegistered() public view returns(uint) {
        if(userRegistered[msg.sender]){
            return 0;
        }else if(companyRegistered[msg.sender]){
            return 1;
        } else{
            return 2;
        }
    }

    function revokeAccess(address Address) public {
        require(companyAccess[Address][msg.sender],"Access Already Revoked");
        companyAccess[Address][msg.sender] = false;
        for(uint i =0; i< activeCompanies[msg.sender].length -1 ;i++){
            if(activeCompanies[msg.sender][i].Address == Address){
                PreviousCompanies[msg.sender].push(activeCompanies[msg.sender][i]);
                activeCompanies[msg.sender][i] = activeCompanies[msg.sender][activeCompanies[msg.sender].length -1];
                activeCompanies[msg.sender].pop();
            }
        }
        for( uint i =0; i< companyData[keccak256(abi.encodePacked(Address))].length ;i++){
            if(companyData[keccak256(abi.encodePacked(Address))][i].Address == msg.sender){
                companyData[keccak256(abi.encodePacked(Address))][i] = companyData[keccak256(abi.encodePacked(Address))][companyData[keccak256(abi.encodePacked(Address))].length - 1];
                companyData[keccak256(abi.encodePacked(Address))].pop();
            }
        }
    }

    function accessedCompanies()public view returns(Request[] memory){
        return activeCompanies[msg.sender];
    }

    //add compnay requets
    // function folderAccess(address _user,address _company) public view returns(bool[] memory folds){
    //     for( uint i =0 ;i< activeCompanies[_user].length;i++){
    //         if(activeCompanies[_user][i].Address == _company){
    //             folds =  activeCompanies[_user][i].Folders;
    //         }
    //     }
    // }
    //return active companies
    //add events

    //add employees
}