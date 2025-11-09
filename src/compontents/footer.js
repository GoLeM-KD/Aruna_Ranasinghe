import React, { Suspense } from 'react'
import Image from 'next/image'
import SocialMedias from './sociallink.json';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function footer() {
  return (
    <div className='flex bg-[#000000]'>
        {/* ------------------------------------Desktop----------------------------------------------------------- */}
        <div className='hidden lg:flex w-full h-[39.07vh] bg-[rgba(130,130,130,0.50)] items-center'>

            <div className='w-[20.78vw] h-[31.57vh] flex flex-col ml-[3.54vw]'>
                <p className='text-[1.67vw] text-[#F39C12] font-bold'>Aruna Ranasinghe</p>
                <p className='text-[1vw] text-[#B0B0B0]'>NDES(IET) B.ENG(UK)(UG) B.TECH(UVOT)(UG) </p>

                <div className='w-[20.78vw] h-[5.56vh] flex flex-row justify-start items-center gap-[0.94vw] mt-[2.87vh]'>
                    {SocialMedias.map((social)=>(
                        <Link key={social.id} href={social.Link} target="_blank">
                            <Image src={social.img} alt={social.media} width={60} height={60} className='w-[2.5vw] h-[2.5vw]'/>
                        </Link>
                    ))}
                </div>
                
                <p className='text-[0.78vw] text-[#FFFFFF] mt-[14.91vh]'>© 2025 Aruna Ranasinghe. All Rights Reserved </p>

            </div>

            <div className='w-[5.89vw] h-[31.57vh] flex flex-col ml-[13.7vw]'>
                <p className='text-[#B0B0B0] text-[1vw] font-bold'>Quick Links</p>
                <Suspense>
                    <SignedIn>
                        <ul className='text-[#B0B0B0] text-[1vw] mt-[2.31vh] flex flex-col gap-[1.3vh] ml-[0.3vw]'>
                            <li>Academics</li>
                            <li>Past Papers</li>
                        </ul>
                    </SignedIn>
                </Suspense>

                <Suspense>
                    <SignedOut>
                        <ul className='text-[#B0B0B0] text-[1vw] mt-[2.31vh] flex flex-col gap-[1.3vh] ml-[0.3vw]'>
                            <li>Academics</li>
                        </ul>
                    </SignedOut>
                </Suspense>
            </div>

            <div className='min-w-[9.27vw] h-[31.57vh] flex flex-col ml-[20vw]'>
                <p className='font-bold text-[#B0B0B0] text-[1vw]'>Institutes</p>
                <ul className='text-[#B0B0B0] text-[1vw] flex flex-col gap-[1.3vh] mt-[2.31vh]'>
                    <li>Indeepa - Gampaha</li>
                    <li>Sipla - Athurugiriya</li>
                    <li>Apex - Kegalla</li>
                </ul>

            </div>

            <div className='w-[15.94vw] h-[31.57vh] flex flex-col justify-end items-end ml-[8.65vw]'>
                <div className='w-[15.94vw] h-[5.37vh] flex justify-start mb-[20vh]'> 
                    <button className='w-[13.65vw] h-[5.37vh] bg-[#F39C12] rounded-[5px] text-[#FFFFFF] text-[1vw]'>
                        Contact Aruna
                    </button>
                </div>

                <p className='text-[0.78vw] text-[#FFFFFF]'>Privacy Policy | {"<GALAXTRIX/>"}</p>

            </div>

        </div>

        {/*------------------------------------------------------Mobile------------------------------------------------ */}
        <div className='flex lg:hidden w-full h-[92.69vh] bg-[rgba(130,130,130,0.50)] flex-col items-center justify-center'>

            <p className='text-[7.77vw] text-[#F39C12] font-bold'>Aruna Ranasinghe</p>
            <p className='text-[4.66vw] text-[#B0B0B0]'>NDES(IET) B.ENG(UK)(UG) B.TECH(UVOT)(UG) </p>

            <div className='w-[71.36vw] h-[6.54vh] flex flex-row justify-start items-center gap-[4.37vw] mt-[2.84vh]'>
                    {SocialMedias.map((social)=>(
                        <Link key={social.id} href={social.Link} target="_blank">
                            <Image src={social.img} alt={social.media} width={60} height={60} className='w-[14.56vw] h-[6.54vh]'/>
                        </Link>
                    ))}
            </div>

            <div className='w-[28.16vw] h-[14.94vh] flex flex-col justify-center items-center'>
                <p className='text-[#B0B0B0] text-[4.66vw] font-bold'>Quick Links</p>
                <Suspense>
                    <SignedIn>
                        <ul className='text-[#B0B0B0] text-[4.66vw] mt-[2.73vh] flex flex-col gap-[1.53vh] justify-center items-center'>
                            <li>Academics</li>
                            <li>Past Papers</li>
                        </ul>
                    </SignedIn>
                </Suspense>

                <Suspense>
                    <SignedOut>
                        <ul className='text-[#B0B0B0] text-[4.66vw] mt-[2.73vh] flex flex-col gap-[1.53vh]'>
                            <li>Academics</li>
                        </ul>
                    </SignedOut>
                </Suspense>
            </div>

            <p className='font-bold text-[#B0B0B0] text-[4.66vw] mt-[5.56vh]'>Institutes</p>
            <ul className='text-[#B0B0B0] text-[4.66vw] flex flex-col gap-[1.53vh] mt-[2.73vh] justify-center items-center'>
                <li>Indeepa - Gampaha</li>
                <li>Sipla - Athurugiriya</li>
                <li>Apex - Kegalla</li>
            </ul>
            
            <button className='w-[63.59vw] h-[6.32vh] bg-[#F39C12] rounded-[5px] text-[#FFFFFF] text-[4.66vw] mt-[5.56vh]'>
                Contact Aruna
            </button>

            <p className='text-[3.64vw] text-[#FFFFFF] mt-[7.31vh]'>© 2025 Aruna Ranasinghe. All Rights Reserved </p>

            <p className='text-[3.64vw] text-[#FFFFFF] mt-[2.84vh]'>Privacy Policy | {"<GALAXTRIX/>"}</p>
        
            

        </div>

    </div>
  )
}
