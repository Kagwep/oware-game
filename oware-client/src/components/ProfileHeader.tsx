import React, { useState,useEffect } from 'react'
import '../css/ProfileHeader.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import player from '../assets/images/player.png'
import coin from '../assets/images/coin.png'
import { Link  } from 'react-router-dom';
import '../css/item.css'
import creator from '../assets/images/player.png'
import item from '../assets/images/item.jfif'
import WalletAddress from './Customs/WAlletAddress';
import {useAppContext} from '../providers/AppProvider';
import { ethers } from 'ethers';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

interface Player {
  playerAddress: string;
  username: string;
  gamesPlayed: number;
  rewardsCount: number;
  playerRank: number;
  wins: string[]; // Array storing game IDs of wins
}

interface List {
  list_id: number;
  user: string; 
  timestamp: number; 
}

interface Claim {
  claim_id: number;
  user: string;
  token_claim_amount: string; 
}


const ProfileHeader = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide:true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  };

  const { contract,account } = useAppContext()


  const[playerInfo , setPlayerInfo] = useState<Player[] >([]);
  const[playersInfo , setPlayersInfo] = useState<Player[] >([]);
  const [tokenBalance, setTokenBalances] = useState<number | null>(null);
  const [lists, setList] = useState<List[] | null>(null);
  const [claims, setClaims] = useState<Claim[] | null>(null);
  const [value, setValue] = React.useState('1');
  const [showModalClaim, setShowModalClaim] = useState(false);
  const [showModalTransfer, setShowModalTransfer] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [infoMes, setInfoMes] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [action, setAction] = useState<string>('');

    const handleClaimSubmit = async () => {

      if (contract) {
      const calldata = [amount]
      const mycall = contract.populate("claim", calldata)
      try {
        const res = await contract.claim(mycall.calldata);
        setAction('Claim token')
        setInfoMes('Claim successful amount will be transfered to your address')
      } catch (e) {
        setAction('Claim token')
        setInfoMes('Claim Unsuccesful:')
      }
      }else{
        setAction('Claim token')
        setInfoMes('Please connect wallet to complete this action')
      }
      setShowModalClaim(false);
      setShowModalInfo(true);
    };


    const handleTransferSubmit = async() => {
      if (contract) {
        const calldata = [to, amount]
        const mycall = contract.populate("token_transfer", calldata)
        try {
          const res = await contract.token_transfer(mycall.calldata)
          setAction('Transfer token')
          setInfoMes(`Transfer successful amount will be transfered to ${to} address`)
        } catch (e) {
          setAction('Transfer token')
          setInfoMes('Transfer unsuccesful')
        }}else{
          setAction('Transfer token')
          setInfoMes("Please connect you wallet before performing this action")  
        }
      setShowModalTransfer(false);
      setShowModalInfo(true);
    }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


      useEffect(() => {
        const fetchData = async () => {
          console.log(contract)
            if (contract) {
              contract.get_token_allocation().then((res: React.SetStateAction<number | null>) => {
                setTokenBalances(res)
              }).catch((e: any) => {
                console.log("Error loading package:- ", e)
              })
              contract.get_claims().then((res: React.SetStateAction<Claim[] | null>) => {
                setClaims(res);
              }).catch((e: any) => {
                console.log("Error loading package:- ", e)
              })
              contract.get_token_list().then((res: React.SetStateAction<List[] | null>) => {
                setList(res);
              }).catch((e: any) => {
                console.log("Error loading package:- ", e)
              })
            }
        };

        fetchData(); // Call the function inside useEffect

    }, [contract]); 

    //console.log("token balances",tokenBalance);


  return (
    <>
    <div className='item section__padding'>
        <div className="item-image">
          <img src={item} alt="item" />
        </div>
          <div className="item-content">
            <div className="item-content-title">
              {
                account ? (
                  <WalletAddress address={account[0]} />
                ):(
                  <h1 className='text-sky-500'> connect wallet </h1>
                )
              }
              
              <p>Tokens <span className='text-blue-500'> {tokenBalance && parseFloat(ethers.utils.formatEther(tokenBalance)) !==0  ? tokenBalance.toString() : 'play to earn tokens'}</span> </p>
            </div>
            <div className="item-content-creator">
              <div><p>Player</p></div>
              <div>
                <img src={creator} alt="creator" />
                <p> {playerInfo && playerInfo.length > 0 && (
                        <span>{playerInfo[0].username}</span>
                    )}</p>
              </div>
            </div>
            <div className="item-content-detail">
              <p>Rank: 
              {playerInfo && playerInfo.length > 0 && (
                        <span>{playerInfo[0].playerRank}</span>
                    )}
              </p>
              <p>Wins:
              {playerInfo && playerInfo.length > 0 && (
                        <span>{playerInfo[0].wins.length}</span>
                    )}
              </p>
            </div>
            <div className="item-content-buy">
              <button className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => setShowModalClaim(true)}>Claim </button>
              <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => setShowModalTransfer(true)}>Transafer</button>
            </div>
          </div>
      </div>
    <div className='headerProfile section__padding'>
      <div className="headerProfile-content">
        <div>
          <h1>Play, Win, collect, and Claim</h1>
          <img className='shake-vertical' src={coin} alt="" />
        </div>
      </div>

      <Box sx={{     width: {
      xs: '100%', 
      sm: '90%',  
      md: '60%',  
    }, typography: 'body1',color:'white' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' , fontWeight:30}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{}}>
            <Tab sx={{color:'green', fontWeight:30,  }} label="Tokens Earned" value="1" />
            <Tab sx={{color:'green', fontWeight:30,  }} label="Claims" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xl font-bold font-medium  text-orange-700 uppercase tracking-wider">List ID</th>
                        <th className="px-6 py-3 text-left text-xl font-medium text-orange-700 uppercase tracking-wider">Player</th>
                        <th className="px-6 py-3 text-left text-xl font-medium text-orange-700 uppercase tracking-wider">Date</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {lists && lists.map((list) => (
                        <tr key={list.list_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{list.list_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{list.user}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{list.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </TabPanel>
        <TabPanel sx={{
          borderRadius:10
        }} value="2">
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xl font-bold font-medium text-amber-700 uppercase tracking-wider">Claim ID</th>
                        <th className="px-6 py-3 text-left text-xl font-bold font-medium text-amber-700 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xl font-bold font-medium text-amber-700 uppercase tracking-wider">Amount</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {claims && claims.map((claim) => (
                        <tr key={claim.claim_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.claim_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.user}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{claim.token_claim_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </TabPanel>
      </TabContext>
    </Box>
    {showModalClaim && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Please Enter the amount you wish to claim</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModalClaim(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleClaimSubmit}>
                  <input
                  className="shadow appearance-none border text-3xl rounded w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  
                    placeholder="Enter amount"
                  />
                </form>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModalClaim(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalClaim && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}

      {showModalTransfer && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Please Enter the amount you wish to claim</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModalTransfer(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleTransferSubmit}>
                  <input
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  
                    placeholder="Enter amount"
                  />
                  <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                   
                    placeholder="Enter recepient"
                  />
                </form>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModalTransfer(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModalTransfer && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
      {showModalInfo && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">{action}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModalInfo(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  {infoMes}
                </p>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModalInfo(false)}
                >
                  Cancel
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
      {showModalInfo && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
    </div>
    </>
  )
}

export default ProfileHeader;