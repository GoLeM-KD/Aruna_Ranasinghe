/*##################################################################################################################################################
####################################################################################################################################################
################################################################    KAVIJA DULMITH    ##############################################################
################################################################       16/08/2025     ##############################################################
####################################################################################################################################################
####################################################################################################################################################*/

import { queryDatabase } from '../../db';

/* This is the main GET request handler foer fetching Items
  const { searchParams } = new URL(req.url); This part helps us to get the search parameters from the URL
  then we can use it to filter the results from the dataset
*/ 

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    let query = `
      SELECT I.[SysID], I.[ItemName], Q.[GoodQty]
      FROM [cspMaster].[dbo].[ITEM_MST] AS I
      INNER JOIN [cspMaster].[dbo].[INVENTORY_TRN] AS Q 
      ON I.[SysID] = Q.[ItemCode]
    `;

    if (search != "") {
      query += ` WHERE I.[ItemName] LIKE '%${search}%'`;
    }

    const users = await queryDatabase(query);
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

/* This is the Main Post Request in this website 
  This is the where handle adding an item to the database
  We are using formData to get the data from the form and validate those data here
  and Insert those into the database
*/

export async function POST(req) {

  try {
    const FormData = await req.formData();
    const ItemCode = FormData.get('itemCode') || 'ITM00000';
    const sinhalaName = FormData.get('sinName') || "";
    const subGrp = FormData.get('subGrp');
    const mainGrp = FormData.get('mainGrp');
    const markPrice = FormData.get('markPrice') || 0.00;
    const cashPrice = FormData.get('cashPrice') || 0.00;
    const creditPrice = FormData.get('creditPrice') || 0.00;
    const wholesalePrice = FormData.get('wholePrice') || 0.00;
    const specialPrice = FormData.get('specPrice') || 0.00;
    const purchasePrice = FormData.get('purchasePrice') || 0.00;
    const itmName = FormData.get('itmName');
    const LocID = 'POS00001'; 
    let qty = FormData.get('qty');
    // HEre we are validating the quantity to be a positive number or zero we can do it in the input field but just to be safe we are doing it here too
    if((qty !=0 && qty < 0) || qty == "" || qty == null  ) {
      qty = 0;
    }

    const qryForPriceSysID = `
            SELECT 
                RIGHT(MAX([SysId]), LEN(MAX([SysId])) - 3) AS MAX_NUMBER
            FROM [cspMaster].[dbo].[PRICE_TRN];
        `;
        const result = await queryDatabase(qryForPriceSysID);
        const PriceNumber = (result[0]?.MAX_NUMBER) 
            ? (parseInt(result[0].MAX_NUMBER) + 1).toString().padStart(5, "0")
            : "00001";
    const PriceSysID = `REC${PriceNumber}`; // HEre we are generating the SysID by adding REC prefix to the SysID for PRICE_TRN table
    const priceCatego = 'GRP00014'; // This is the default price category we are using for now its GRP00014

   // const SysI = `ITM${ItemCode}`; // HEre we are generating the SysID by adding ITM prefix to the SysID for ITEM_MST table
   // console.log("Item Code:", SysI); // This part use by me for testing that the SysID is generated correctly now its no need anymore but I will keep it just in case

    // THese are common SQL quaries to insert data into the database we have to use two quaries to insert data into two tables because of our some architecture decisions
    const queryItemMaster = `
      INSERT INTO [cspMaster].[dbo].[ITEM_MST]
	      ([LocID]
        ,[SysID]
        ,[ItemName]
        ,[ItemCode]
        ,[ItemGroup]
        ,[ItemSubGroup]
        ,[ItemDiscription]
        ,[RetailPrice]
        ,[PurchasedPrice]
        ,[AvlQty]
        ,[SinhalaName]
        ,[MasterItemCode])
      VALUES (
        '${LocID}'
        ,'${ItemCode}'
        ,'${itmName}'
        ,LEFT('${ItemCode}', 3)
        ,'${mainGrp}'
        ,'${subGrp}'
        ,'No Description'
        ,${markPrice}
        ,${purchasePrice}
        ,${qty}
        ,'${sinhalaName}'
        ,'${ItemCode}'

      )
    `
    const queryPriceTRN = `
      INSERT INTO [cspMaster].[dbo].[PRICE_TRN]
           ([LocId]
           ,[SysId]
           ,[PriceCate]
           ,[ItemCode]
           ,[PriLevel]
           ,[UppCount]
           ,[MarkPrice]
           ,[RetPrice]
           ,[CredPrice]
           ,[DisPrice]
           ,[DisPrecen]
           ,[ActivStatus]
           ,[UserId]
           ,[PurPrice]
           ,[TrnYes]
           ,[MRP])
      VALUES (
          '${LocID}'
          ,'${PriceSysID}'
          ,'${priceCatego}'
          ,'${ItemCode}'
          ,1
          ,1000
          ,${cashPrice}
          ,${creditPrice}
          ,${wholesalePrice}
          ,${specialPrice}
          ,0
          ,1
          ,'UID00009'
          ,${purchasePrice}
          ,1
          ,${markPrice}

      )
    `
     
    const queryInventory = `INSERT INTO [cspMaster].[dbo].[INVENTORY_TRN] (ItemCode, GoodQty, LocID) 
                    VALUES ('${ItemCode}', '${qty}', '${LocID}')`;
    await queryDatabase(queryItemMaster);
    console.log("Item Master Inserted");
    await queryDatabase(queryPriceTRN);
    console.log("Price TRN Inserted");
    await queryDatabase(queryInventory);
    console.log("Inventory TRN Inserted");
    return  new Response(JSON.stringify({ message : "Successfully inserted" }), { status: 200 });
    /* SOmetimes even if this shows that we have successfully inserted but its false because errors such as Duplicating Primary keys aint showing here,
        It still showing that we have successfully isnerted  */
    
  } catch (error) {
    console.error("Error inserting item:", error);
    return new Response(JSON.stringify({ error: "Failed to insert item" }), { status: 500 });
  }

}
