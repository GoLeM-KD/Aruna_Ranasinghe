/*##################################################################################################################################################
####################################################################################################################################################
################################################################    LOGIC WRITTEN BY KAVIJA DULMITH    #############################################
###############################################################   FRONT-END WRITTEN BY SINETH DINSARA   ############################################ 
################################################################             02/09/2025                #############################################
####################################################################################################################################################
####################################################################################################################################################*/

'use client'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Image from 'next/image';


const AddItems = () => {
  const [itemName, setItemName] = useState('');
  const [sinhalaName, setSinhalaName] = useState('');
  const [itemSubgroup, setItemSubgroup] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [itemGroup, setItemGroup] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purPrice, setPurPrice] = useState('0.00');
  const [markedPrice, setMarkedPrice] = useState('0.00');
  const [cashPrice, setCashPrice] = useState('0.00');
  const [creditPrice, setCreditPrice] = useState('0.00');
  const [wholesalePrice, setWholesalePrice] = useState('0.00');
  const [specialPrice, setSpecialPrice] = useState('0.00');
  const [groups, setGroups] = useState([]); // To keep the all groups ** We dont need this array anymore but I keep this for future references
  const [subGrps, setSubGrps] = useState([]); // To keep the all subgroups
  const [mainGrps, setMainGrps] = useState([]); // To keep the all main groups
  const [loading, setLoading] = useState(false);


  async function logout() {
    await fetch('./api/logout', { method: 'POST' })
    window.location.href = '/auth/Login'
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!itemCode || !itemName || !quantity || !markedPrice || !cashPrice || !creditPrice) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Item Added!',
      text: `${itemName} has been successfully added to inventory`,
      confirmButtonColor: '#28a745',
      confirmButtonText: 'OK'
    }).then(() => {

      // Reset 
      setItemName('');
      setSinhalaName('');
      setItemSubgroup('');
      setItemCode('');
      setItemGroup('');
      setQuantity('');
      setMarkedPrice('0.00');
      setCashPrice('0.00');
      setCreditPrice('0.00');
      setWholesalePrice('0.00');
      setSpecialPrice('0.00');
    });
  };
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const resultsGroups = await fetch("/api/group");
        if (!resultsGroups.ok) throw new Error("Failed to fetch groups");
        const groupData = await resultsGroups.json();
        setGroups(Array.isArray(groupData) ? groupData : []);

        for (let i = 0; i < groupData.length; i++) {
          if (groupData[i].CateId === 'ITMSUBGR') {
            setSubGrps(prev => [...prev, groupData[i]]);
          } else if (groupData[i].CateId === 'ITEMGROU') {
            setMainGrps(prev => [...prev, groupData[i]]);
          }
        }

        const resultItemCode = await fetch("/api/items/itemCode");
        if (!resultItemCode.ok) throw new Error("Failed to fetch item code");
        const itemCodeData = await resultItemCode.json();
        setItemCode(itemCodeData);
        setLoading(false);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };

    const delayDebounce = setTimeout(fetchData, 300);
    return () => clearTimeout(delayDebounce);

  }, [])
  return (
    <div className="min-h-screen bg-gray-300">
      <div className="flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <div className="hidden lg:block w-64 min-h-screen bg-gray-400 shadow-lg lg:rounded-r-2xl p-4 lg:p-6 order-2 lg:order-1">
          {/* Desktop Title - Hidden on mobile */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-2xl font-bold text-gray-800">GLOBAL POS</h1>
          </div>

          <nav className="flex lg:flex-col justify-center lg:justify-start space-x-4 lg:space-x-0 lg:space-y-4">
            <Link href="/" >
              <div className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h7v7H3V7zm11 0h7v7h-7V7zM3 16h7v5H3v-5zm11 0h7v5h-7v-5z" />
                </svg>
                <span className="text-sm lg:text-base text-gray-600 font-medium">Stock</span>
              </div>
            </Link>

            <Link href="/Reports/DailySummary" >
            <div
              className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6h6v6M9 7h6m4 12H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm lg:text-base text-gray-600">Reports</span>
            </div>
            </Link>
            
            <Link href="/Add">
              <div className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg bg-green-100 cursor-pointer">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm lg:text-base text-green-700">Add Items</span>
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
        <div className="flex-1 p-3 sm:p-4 lg:p-6 order-1 lg:order-2 min-h-[calc(100dvh-48px)] md:min-h-0 pb-20 md:pb-0">
          {/* Form */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden text-[#000000]">
            <div className="bg-gradient-to-r from-[#1B4965] to-[#1B4965] px-6 py-4">
              <div className="flex items-center space-x-3">
                
                <div>
                  <h2 className="text-xl font-bold text-white">Item Information Form</h2>
                  <p className="text-blue-100 text-sm">Please fill in all required fields to submit your report</p>
                </div>
              </div>
            </div>

            {/* Form 2 */}
            <form action=".././api/items" className="p-6 space-y-8" method='POST'>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  General Item Information<hr/>
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="flex text-sm font-medium text-gray-700 mb-2 items-center"> 
                        Item Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="itmName"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Enter item name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required/>
                    </div>

                    <div>
                      <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                        
                        Sinhala Name
                      </label>
                      <input
                        type="text"
                        name='sinName'
                        value={sinhalaName}
                        onChange={(e) => setSinhalaName(e.target.value)}
                        placeholder="සිංහල නම"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                    </div>

                    <div>
                      <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                        Item Subgroup
                      </label>
                      <select
                        value={itemSubgroup}
                        name='subGrp'
                        onChange={(e) => setItemSubgroup(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {loading ? (
                          <option>Loading Sub Groups...</option>
                        ):(
                          subGrps.map((group) => (
                            <option key={group.SysId} value={group.SysId}>{group.GrpName}</option>
                        )))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                        Item Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name='itemCode'
                        defaultValue={itemCode}
                        placeholder="Enter item code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        />
                    </div>

                    <div>
                      <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                        Item Group <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={itemGroup}
                        name='mainGrp'
                        onChange={(e) => setItemGroup(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required>
                        {loading ? (
                          <option>Loading Groups...</option>
                        ):(
                          mainGrps.map((group) => (
                            <option key={group.SysId} value={group.SysId}>{group.GrpName}</option>
                        )))}
                      </select>
                    </div>

                    <div>
                      <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">  
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name='qty'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required/>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing*/}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  Pricing Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  <div>
                    <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">  
                      Purchased Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={purPrice}
                      name='purchasePrice'
                      onChange={(e) => setPurPrice(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required/>
                  </div>

                  <div>
                    <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">  
                      Marked Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={markedPrice}
                      name='markPrice'
                      onChange={(e) => setMarkedPrice(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required/>
                  </div>

                  <div>
                    <label className="flex text-sm font-medium text-gray-700 mb-2 items-center"> 
                      Cash Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name='cashPrice'
                      value={cashPrice}
                      onChange={(e) => setCashPrice(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required/>
                  </div>

                  <div>
                    <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                      Credit Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name='creditPrice'
                      value={creditPrice}
                      onChange={(e) => setCreditPrice(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required/>
                  </div>

                  <div>
                    <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                      Wholesale Price
                    </label>
                    <input
                      type="number"
                      name='wholePrice'
                      value={wholesalePrice}
                      onChange={(e) => setWholesalePrice(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  </div>

                  <div>
                    <label className="flex text-sm font-medium text-gray-700 mb-2 items-center">
                      Special Price
                    </label>
                    <input
                      type="number"
                      name='specPrice'
                      value={specialPrice}
                      onChange={(e) => setSpecialPrice(e.target.value)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"/>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setItemName('');
                    setSinhalaName('');
                    setItemSubgroup('');
                    setItemGroup('');
                    setQuantity('');
                    setMarkedPrice('0.00');
                    setCashPrice('0.00');
                    setCreditPrice('0.00');
                    setWholesalePrice('0.00');
                    setSpecialPrice('0.00');
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg cursor-pointer">
                  <span>Clear</span>
                </button>
                
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg cursor-pointer">
                  <span>Add Item</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Nav (Mobile) */}
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

          <Link href="/Reports/DailySummary" className="flex flex-col items-center text-xs px-3 py-1 text-gray-600 bg-red">
            <div className="flex flex-col items-center text-xs text-gray-600 bg-red">
              <svg className="w-5 h-5 mb-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6h6v6M9 7h6m4 12H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z" />
              </svg>
              <span>Reports</span>
            </div>
          </Link>
          
          <Link href="/Add" className="flex flex-col items-center text-xs px-3 py-1 bg-green-100 rounded-md">
            <div className="flex flex-col items-center text-xs bg-green-100 rounded-md">
              <svg className="w-5 h-5 mb-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-green-700 font-medium">Add Items</span>
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

export default AddItems;
