/*###################################################################################################################################################
#####################################################################################################################################################
################################################################     KAVIJA DULMITH    ##############################################################
################################################################       23/08/2025      ##############################################################
#####################################################################################################################################################
####################################################################################################################################################*/

import { queryDatabase } from '../../db';

/*
    This is the function which gives all customers that avaliable in CUSTOMER_MST for the invoice
    then User can choose the customer that he wants to place the invoice
*/
export async function GET() {

    try {

        const query = `
            SELECT [LocID]
            ,[SysID]
            ,[CusName]
            ,[CusCode]
            FROM [cspMaster].[dbo].[CUSTOMER_MST]
        `
        const customers = await queryDatabase(query);
        console.log(customers)
        return new Response(JSON.stringify(customers || []),{
            status: 200,
            headers: { "Content-Type": "application/json" }
        })

    } catch (err) {

        return new Response(JSON.stringify([]), { status: 500 });
    }
}

// MUST BE COMPLETE IN FUTURE