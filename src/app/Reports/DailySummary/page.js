/*##################################################################################################################################################
####################################################################################################################################################
################################################################    LOGIC WRITTEN BY KAVIJA DULMITH    #############################################
###############################################################   FRONT-END WRITTEN BY SINETH DINSARA   ############################################ 
################################################################             28/08/2025                #############################################
####################################################################################################################################################
####################################################################################################################################################*/

'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Link from 'next/link';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('daily');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [reportItem, setReportItem] = useState([]);
  const [loading, setLoading] = useState(false);

  // This is the function which fetches report Data when we click the generate report button
  // It fetches the data from the API and updates the reportItem state
  // It also handles loading state and error handling
  async function fetchReport() {
    try {
      setLoading(true);
      const res = await fetch(`/api/dailysummary?Date=${startDate}`, { method: 'GET' });
      const reportData = await res.json();
      console.log("KAVIJA fetched data:", reportData);

      // make sure it's always an array
      if (Array.isArray(reportData)) {
        setReportItem(reportData);
      } else if (reportData && typeof reportData === 'object') {
        setReportItem([reportData]);
      } else {
        setReportItem([]);
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      setReportItem([]);
    } finally {
      setLoading(false);
    }
  } 

  // Actually this is the function which we connect to the generate report button 
  /* 
    From here we trigger the fetchReport function after validation
  */
  const handleGenerateReport = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      Swal.fire({
        icon: 'error',
        title: 'Date Required',
        text: 'Please select both start and end dates',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
      return;
    }

    // INFORIMING ALERT: that the report is being generated
    Swal.fire({
      icon: 'info',
      title: 'Generating Report',
      text: `Generating ${selectedReport === 'p&l' ? 'P&L' : 'Daily Summary'} report for ${startDate}`,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK'
    });

    fetchReport(); // fetch after validation
  };

  async function logout() {
    await fetch('./api/logout', { method: 'POST' })
    window.location.href = '/auth/Login'
  } 

  // I used this to check items array but no need more but I keep this for future debugging **KAVIJA DULMITH**
  /* 
    Actually this debugging method isnt working now because this is in UseEffect hook
    this work after the page load but we store the reportItem after clicking the generate report button
    so this will not work now but I keep this for future debugging
  */
  useEffect(() => {
    console.log("reportItem updated:", reportItem);
  }, [reportItem]);

  return (
    <div className="select-none min-h-[917px] md:min-h-screen bg-gray-300 flex w-full max-w-[412px] md:max-w-none mx-auto px-3 md:px-0 overflow-x-hidden text-[#000000]">
      {/* Navigation Sidebar */}
      <div className="hidden md:block w-64 bg-gray-400 shadow-lg rounded-r-2xl p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">GLOBAL POS</h1>
        </div>
        
        <nav className="flex lg:flex-col justify-center lg:justify-start space-x-4 lg:space-x-0 lg:space-y-4">
            <Link href="/" >
                <div
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                    role="button"
                    tabIndex={0}
                >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h7v7H3V7zm11 0h7v7h-7V7zM3 16h7v5H3v-5zm11 0h7v5h-7v-5z" />
                    </svg>
                    <span className="text-gray-600">Stock</span>
                </div>
            </Link>

            <Link href="/Reports/DailySummary">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-100 cursor-pointer">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6h6v6M9 7h6m4 12H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-green-700 font-medium">Reports</span>
                </div>
            </Link>

            <Link href="/Add">
              <div className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm lg:text-base text-gray-600">Add Items</span>
              </div>
            </Link>
            
            <div
              className=" bg-[#b23b3b] flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg hover:bg-[#8a0c03] cursor-pointer transition-colors"
              role="button"
              tabIndex={0}
              >
              <div className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500">
                <Image src="/logout.png" width={5} height={5} className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" alt="logout"/>
              </div>
              <button className="text-sm lg:text-base text-white" onClick={logout}>Log Out</button>
            </div>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-3 sm:p-6 lg:p-8">
        {/* Report Controls */}
        <div className="bg-white rounded-2xl p-3 sm:p-5 shadow-sm mb-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full">
              <Link href="/Reports/DailySummary">
                <div className='w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-green-100 text-green-700'>
                    Daily-Summary Report
                </div>
              </Link>
              <Link href="/Reports/P&L">
                <div className='w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200'>
                  P&L II Report
                </div>
              </Link>
            </div>

            <form className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full" onSubmit={handleGenerateReport}>
              <div className="grid grid-cols-1 sm:grid-cols-[auto_auto_auto] items-center gap-2 w-full sm:ml-[60px]">
                <input type='text' className="border border-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-fulls" disabled/>
                <input
                  type="date"
                  value={startDate}
                  name="Date"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-fulls"/>
              </div>
              
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
              >
                Generate Report
              </button>
            </form>
          </div>
        </div>

        {/* Content Area */} {/*################################################    I HAVE TO FETCH REPORT HERE     ################################################### */}
        {selectedReport === 'daily' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 items-stretch max-w-full mb-[80px]">
            <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 h-full order-2 lg:order-1">
              <div className="flex justify-end space-x-2 mb-2">
                <button className="px-3 py-1 rounded-md text-xs bg-gray-600 hover:bg-gray-700 text-white">EXCEL</button>
              </div>
              <div className="border rounded-xl p-3 sm:p-4 overflow-auto max-h-[70vh] bg-white">
                <div className="text-[10px] leading-4 text-gray-700">
                  
                  {/* Title */}
                  <div className="text-center mb-4">
                    <h2 className="text-red-600 font-bold text-lg underline"> DAILY SUMMARY </h2>
                  </div>
                  
                  {loading ? (
                    <div className="mb-4">
                      <div className='w-full h-full flex justify-center items-center'> 
                        <Image src="/reportLoading.gif" alt='Loading Image' width={50} height={50}/>
                      </div>
                    </div>
                  ) : Array.isArray(reportItem) && reportItem.length > 0 ? (
                    reportItem.map((item, idx) => (
                      <div key={idx}>
                        {/* Invoice */}
                        <div className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-semibold">Total Invoice Amount:</span>
                            <span className="font-semibold">{item.TotInvoAmt}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>Total No. Of Invoices:</span>
                            <span>{item.TotNumOfInvo}</span>
                          </div>
                          <div className="ml-4 space-y-1">
                            <div className="flex justify-between">
                              <span>Cash:</span>
                              <span>{item.CashTotal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Credit:</span>
                              <span>{item.CreditTot}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cheques:</span>
                              <span>{item.TotCheq}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Gift Voucher:</span>
                              <span>{item.GVAmt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Credit Card:</span>
                              <span>{item.CreCardAmt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Other:</span>
                              <span>{item.DebiNote}</span>
                            </div>
                          </div>
                        </div>

                        <hr className="border-dashed border-gray-400 my-3" />

                        {/* Credit settlement */}
                        <div className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-semibold">Total Credit Settlement:</span>
                            <span className="font-semibold">{item.TotAmouOfCS}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>Total No. Of Settlements:</span>
                            <span>{item.TotNumOfCS}</span>
                          </div>
                          <div className="ml-4 space-y-1">
                            <div className="flex justify-between">
                              <span>Cash:</span>
                              <span>{item.CSCashAmt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Credit:</span>
                              <span>{item.CSCCAmt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cheques:</span>
                              <span>{item.CSChqAmt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Other:</span>
                              <span>{item.CSDNAmt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Gift Voucher:</span>
                              <span>{item.CSGVAmt}</span>
                            </div>
                          </div>
                        </div>

                        <hr className="border-dashed border-gray-400 my-3" />

                        {/* Expense section */}
                        <div className="mb-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-semibold">OPENING DRAWER AMOUNT:</span>
                              <span>{item.OpnDrawAmt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>CASH RECEIVING FROM INVOICE:</span>
                              <span>{item.TotInvoAmt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>CASH RECEIVING FROM CREDIT SETTLEMENT:</span>
                              <span>{item.TotAmouOfCS}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>CASH RECEIVING - [DIRECT DRAWER]:</span>
                              <span>{item.CshReceive}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>TOTAL CASH WITHDRAWALS - [DIRECT DRAWER]:</span>
                              <span>{item.CshWithdra}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>OTHER EXPENSES:</span>
                              <span>{item.OtherExpences}</span>
                            </div>
                          </div>
                        </div>

                        <hr className="border-dashed border-gray-400 my-3" />

                        {/* Final balance */}
                        <div className="text-center">
                          <div className="flex justify-between items-center">
                            <span className="text-red-600 font-semibold">FINAL DRAWER BALANCE FOR THE DAY:</span>
                            <span className="text-red-600 font-semibold underline">{item.Finaleee}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[480px]">
                      <img
                        src="/search.png"
                        alt="Search Illustration"
                        className="w-48 h-48 object-contain mb-4"/>
                      <p className="text-gray-600 text-base italic">No Data Yet</p>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="bg-gray-100 rounded-2xl flex items-center justify-center p-5 sm:p-6 h-full order-1 lg:order-2">
              <img
                src="/daily.png"
                alt="Daily Summary Illustration"
                className="w-full max-w-[280px] sm:max-w-[360px] lg:w-[420px] h-auto max-h-full object-contain"/>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[480px]">
            <img
              src="/search.png"
              alt="Search Illustration"
              className="w-48 h-48 object-contain mb-4"/>
            <p className="text-gray-600 text-base italic">No Data Yet</p>
          </div>
        )}
      </div>

      {/*------Nav bar for mobile-------- */}
      <div className="md:hidden fixed inset-x-0 bottom-0 bg-gray-300 z-50 [padding-bottom:env(safe-area-inset-bottom)]">
        <div className="max-w-[412px] mx-auto flex justify-around py-2">
          <Link href="/" className="flex flex-col items-center text-xs px-3 py-1 text-gray-600 bg-red">
            <div className="flex flex-col items-center text-xs text-gray-600 bg-red">
              <svg className="w-5 h-5 mb-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h7v7H3V7zm11 0h7v7h-7V7zM3 16h7v5H3v-5zm11 0h7v5H7v-5z" />
              </svg>
              <span>Stock</span>
            </div>
          </Link>

          <Link href="/Reports/DailySummary" className="flex flex-col items-center text-xs px-3 py-1 bg-green-100 rounded-md">
            <div className="flex flex-col items-center text-xs bg-green-100 rounded-md">
              <svg className="w-5 h-5 mb-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6h6v6M9 7h6m4 12H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z" />
              </svg>
              <span className="text-green-700 font-medium">Reports</span>
            </div>
          </Link>
          
          <Link href="/Add">
            <div
              className="flex flex-col items-center text-xs px-3 py-1 text-gray-600">
              <svg className="w-5 h-5 mb-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Items</span>
            </div>
          </Link>

          <button 
            className="flex flex-col items-center text-xs px-3 py-1 text-gray-600 bg-[#b23b3b] rounded-md"
            onClick={logout}
          >
            <Image src="/logout.png" alt="logout" width={3} height={3} className="w-5 h-5 mb-1 text-gray-500"/>
            <span className="text-[#FFFFFF]">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;

// DONE ND DUSTED 30-08-2025