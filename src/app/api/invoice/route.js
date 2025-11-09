/*###################################################################################################################################################
#####################################################################################################################################################
################################################################     KAVIJA DULMITH    ##############################################################
################################################################       23/08/2025      ##############################################################
#####################################################################################################################################################
####################################################################################################################################################*/

import { queryDatabase } from '../../db';

/*
  This is the GET request handler for the Invoice API endpoint
  This the place where items fetch items and item codes with the quantity from the database
  when the user search for an item by it's name or the code to bill it in the invoice page
*/
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url); // Like in the items API Im using search paramaters to filter the results from the dataset
    const searchItemName = searchParams.get("searchItemName") || "";
    const searchItemCode = searchParams.get("searchItemCode") || "";

    // Common SQL query to fetch items from the database
    let Query = `
      SELECT I.[SysID], I.[ItemName], Q.[GoodQty]
      FROM [cspMaster].[dbo].[ITEM_MST] AS I
      INNER JOIN [cspMaster].[dbo].[INVENTORY_TRN] AS Q 
      ON I.[SysID] = Q.[ItemCode]
    `;
    /*
      Here I have added the filtering part to filter the results based on the search paramters
      if its empty it will fetch all the results
      if not it will filter the results based on the search paramters
    */
    if (searchItemName !== "") {
      Query += ` WHERE I.[ItemName] LIKE '%${searchItemName}%'`;
    } else if (searchItemCode !== "") {
      Query += ` WHERE I.[ItemCode] LIKE '%${searchItemCode}%'`;
    } else if (searchItemName !== "" && searchItemCode !== "") {
      Query += ` WHERE I.[ItemName] LIKE '%${searchItemName}%' AND I.[ItemCode] LIKE '%${searchItemCode}%'`;
    }

    const ItemReuslt = await queryDatabase(Query);

    return new Response(JSON.stringify(ItemReuslt|| []), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify([]), { status: 500 });
  }
}

/*
  THis is the function which handels the Invoice data inserting
  this function insert the data to MOBILE_INVOICE_HDR and MOBILE_INVOICE_DTL tables
  for each columns
*/

// 0,1,2,3 -  0=Mix payment without credit, 1=Direct Credit, 2=Direct Cash, 3=Mix payment with credit account (TO APPLY WHEN IMPLEMENT)

/* 
  TODO : have to finish this function properly tomorrow 
  I have to write the query to insert these data into 
  ** MOBILE_INVOICE_HDR
  ** MOBILE_INVOICE_DTL
  
  and have to subtract the qunatity of the item in invoice from the
  INVENTORY_TRN 

  as I remember thats all we have to do for now lets see... GOOD LUCK :)
*/ 
export async function POST(req) {
  try {
      const formData = await req.formData();
      // First we need to get data to insert MOBILE_INVOICE_HDR lets get them
      const invoiceNumber = formData.get("invNumber");
      const customerID = formData.get("cusCode");

      // items array comes as JSON string
      const items = JSON.parse(formData.get("items") || "[]");
      let itemCodes = [];
      let itemQuantities = [];
      const amountOfItems = items.length;

      // Here we assigning the code and the quantity with variables to manage these
     for (let i = 0; i< amountOfItems; i++) {
      itemCodes = [...itemCodes,items[i].code];
      itemQuantities = [...itemQuantities, items[i].quantity]  
      
     };

      // To check those variables 
      console.log("Invoice No:", invoiceNumber);
      console.log("Customer:", customerID);
      console.log("Items:", items);
      console.log("item CODE:", itemCodes);
      console.log("QTY:", itemQuantities);
    
    

      // TODO: Save into DB (invoice_hdr + invoice_dtl)

      return new Response(JSON.stringify({ success: true, invoiceNumber, customerID, items }), { status: 200 });
  } catch (err) {
      console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
