pragma solidity ^0.4.17;

contract BillManagement
{
    Customer[] public customers;
    Bill[] public bills;
    address manager;
    uint billCount = 0;
    uint customerCount = 0; 
    
    function BillManagement() public 
    {
        manager = msg.sender;
    }

    struct Bill
    {
        uint id;
        address customer;
        uint16 amount;
        bool isPaid;
    }

    struct Customer 
    {
        address id;
        string fullName;
    }
    
    function createBill(uint16 amount, address customer) doesCustomerExistsInArray(customer) restrictedToManager public 
    {
        billCount++;
        bills.push(Bill(billCount,customer,amount, false));
    }
    
    function customerSubscribe(string fullName) public 
    {
        customerCount++;
        customers.push(Customer(msg.sender, fullName));
    }
    
    function findBillWithId(uint billId) private view returns (Bill)
    {
        uint index = 0;
        for(uint i = 0; i < bills.length; i++)
        {
            if(bills[i].id == billId)
            {
                index = i;
                break;
            }
        }
        return bills[index];
    }
    
    
    function findCustomerByAddress(address customerAddress) private view returns (Customer)
    {
        uint index = 0;
        for(uint i = 0; i < customers.length; i++)
        {
            if(customers[i].id == customerAddress)
            {
                index = i;
                break;
            }
        }
        return customers[index];
    }
    
    // tranfer the value msg to the manager;
    function payBill(uint billId) public payable
    {
        Bill memory billToPay = findBillWithId(billId);
        Customer memory correspondingCustomer = findCustomerByAddress(msg.sender);
        
        require(correspondingCustomer.id == msg.sender);
        require(billToPay.customer == msg.sender);
        require(msg.value >= billToPay.amount);

        bills[billToPay.id - 1].isPaid = true;
        manager.transfer(msg.value);
    }
    
    
    modifier doesCustomerExistsInArray(address customer)
    {
        int256 index = -1;
        for(uint i = 0; i < customers.length; i++)
        {
            if(customers[i].id == customer)
            {
                index = int256(i);
                break;
            }
        }
        require(index >= 0);
        _;
    }
    
    modifier restrictedToManager()
    {
        require(msg.sender == manager);
        _;
    }
}