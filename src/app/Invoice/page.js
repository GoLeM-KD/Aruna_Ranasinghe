/*##################################################################################################################################################
####################################################################################################################################################
################################################################    KAVIJA DULMITH    ##############################################################
################################################################       24/08/2025     ##############################################################
####################################################################################################################################################
####################################################################################################################################################*/

'use client'
import React, { useState, useEffect } from 'react';
import LogOut from '../../compontents/logout'

export default function Page() {
    const [items, setItems] = useState([]);
    const [customers, fetchCustomers] = useState([]);
    const [searchItemName, setSearchName] = useState("");
    const [searchItemCode, setSearchCode] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedList, setSelectedList] = useState([]); // The List which w
    const [selectedItem, setSelectedItem] = useState(null); // I have to use this state because we have to use this variable addToSelectedList() function too
    
    // have to set laoder for customers in further lets see its a must or not LoL...
    useEffect(() => {
        const fetchData = async () => {
        // STARTING POINT OF FETCHING CUSTOMERS
        const resCustomer = await fetch("/api/customer");
        const cusData = await resCustomer.json();
        fetchCustomers(Array.isArray(cusData) ? cusData : []);
        // END POINT OF FETCHING CUSTOMERS
        
        // Heres a little validation that checking user has entered something in search by code or name fileds or not
        if (!searchItemName && !searchItemCode) {
            setItems([]);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
            `/api/invoice?searchItemName=${encodeURIComponent(searchItemName)}&searchItemCode=${encodeURIComponent(searchItemCode)}`
            );
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching items:", err);
            setItems([]);
        }
        setLoading(false);
        };

        const delayDebounce = setTimeout(fetchData, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchItemName, searchItemCode]);

    // This handels the drop down Dynamically
    const handleSelect = (sysID) => {
        const found = items.find((i) => i.SysID === sysID); // HEres catching the what we were searching for this is like SELECT query with WHERE condition
        if (!found) return;
        setSelectedItem(found); // passing the data that we got in first line of this function into our selectedItem useState
        setSearchName(found.ItemName); // Passing the Item Name that selected item which we select to the field
        setSearchCode(found.SysID); // Passing the Item Code that selected item which we select to the field
    };

    function addToSelectedList(e) {
        e.preventDefault();
        if (!selectedItem) {
        alert("Please select the item properly before adding"); // have to make this alert box stylish in future
        return;
        }

        setSelectedList((prev) => [
        ...prev,
        {
            code: selectedItem.SysID,
            name: selectedItem.ItemName,
            quantity: Number(quantity),
        },
        ]);

        // Resetting input fields
        setSearchCode("");
        setSearchName("");
        setQuantity(1);
        setItems([]);
        setSelectedItem(null);
    }

    // This function handle the place invoice
    async function handlePlaceInvoice(e) {
        e.preventDefault();

        const form = e.target.closest("form");
        const formData = new FormData(form);

        // Attach selectedList to request
        /*
            HAHAHAHA this is my first time that passing an array into a POST request by using mssql library
            and this is my explination after learning this 

            "const form = e.target.closest("form");" this part catch the nearest form,
            mean  while "const formData = new FormData(form);" this part get the all data in that form and 
            "formData.append("items", JSON.stringify(selectedList));" part make an input field with name="items" and passing that selectedList array 
            as a JSON (String format) in route.js belongs to this page catch that data of input field with name "items" and now we can use these selectedList array
            in POST request
        */
        formData.append("items", JSON.stringify(selectedList));

        try {
        const res = await fetch("/api/invoice", {
            method: "POST",
            body: formData,
        });

        const result = await res.json();
        if (res.ok) {
            alert("Invoice placed successfully!");
            console.log("Response:", result);
        } else {
            alert("Failed: " + result.error);
        }
        } catch (err) {
        console.error(err);
        alert("Unexpected error placing invoice");
        }
    }
/*###########################################################################################################################################################
####################################################    RENDERING PART START HERE    ########################################################################
#############################################################################################################################################################
*/
    return (
        <form>
            <LogOut/>
            <div className="mt-[10px] mb-[10px] flex flex-row justify-between items-center">
                <input
                type="text"
                id="invNO"
                name="invNumber"
                placeholder="Invoice Number *"
                required
                className="w-[300px] h-[50px] border-black border-1"
                />

                <select
                required
                className="w-[300px] h-[50px] border-black border-1"
                name="cusCode"
                >
                {loading ? (
                    <option value="" disabled>LOADING CUSTOMERS...</option>
                ) : (
                    customers.map((customer) => (
                    <option value={customer.CusCode} key={customer.CusCode}>
                        {customer.CusName}
                    </option>
                    ))
                )}
                </select>
            </div>

            <input
                type="text"
                placeholder="Item Code"
                value={searchItemCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-[300px] h-[50px] border-black border-1 mr-[5px]"
            />

            <input
                type="text"
                placeholder="Item Name"
                value={searchItemName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-[300px] h-[50px] border-black border-1 mr-[5px]"
            />

            <input
                type="number"
                id="qtty"
                placeholder="Quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-[300px] h-[50px] border-black border-1 mr-[5px]"
            />

            {items.length > 0 && (
                <select
                onChange={(e) => handleSelect(e.target.value)}
                defaultValue=""
                className="w-[600px] h-[50px] border-black border-1"
                id="itemSelection"
                >
                <option value="" disabled>
                    {loading ? "Loading..." : "Select Item"}
                </option>
                {items.map((item) => (
                    <option key={item.SysID} value={item.SysID}>
                    {item.SysID} - {item.ItemName} - {item.GoodQty}
                    </option>
                ))}
                </select>
            )}

            {selectedList.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                <h3>Selected Items:</h3>
                <ul>
                    {selectedList.map((it, idx) => (
                    <li key={idx}>
                        {it.code} - {it.name} - {it.quantity}
                    </li>
                    ))}
                </ul>
                </div>
            )}

            <button
                onClick={addToSelectedList}
                type="button"
                className="w-[200px] h-[50px] bg-[#2563eb] text-white rounded-[15px] flex justify-center items-center hover:bg-[#1e40af] active:bg-[#1e3a8a] cursor-pointer"
            >
                Add to List
            </button>

            <button
                type="submit"
                onClick={handlePlaceInvoice}
                className="w-[200px] h-[50px] bg-[#2563eb] text-white rounded-[15px] flex justify-center items-center hover:bg-[#1e40af] active:bg-[#1e3a8a] mt-[10px] cursor-pointer"
            >
                Place the Invoice
            </button>

            <h1 className='w-full flex justify-center items-center font-bold text-[50px]'>TO BE CONTINUE..........</h1>
        </form>
    );
}
