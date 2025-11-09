'use client';

import React, { Suspense } from 'react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, SignOutButton, useUser } from '@clerk/nextjs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import logout from '../../public/logputicon.png';
import menuIcon from '../../public/menu.png';


function Navigation() {
  const { user } = useUser();
  const userName = user ? `${user.firstName} ${user.lastName}` : '';
  const userImage = user?.imageUrl || "";
  console.log(userImage);

  return (
    <nav className='flex items-center'>
      {/* --------------------- Desktop --------------------- */}
      <ul className='hidden lg:flex w-full h-[7.96vh] bg-[#000000] items-center'>
        <li className='min-w-[13.7vw] h-[3.61vh] flex justify-center items-center text-[#F39C12] font-bold text-[1.5vw] ml-[1.88vw]'>
          <Link href="/" >Aruna Ranasinghe</Link>
        </li>

        <SignedIn>
          <div className='flex flex-row w-[15.73vw] h-[2.78vh] justify-between items-center text-[#FFFFFF] text-[0.83vw] gap-[1.25vw] ml-[66.77vw]'>
            <li>Acedamics</li>
            <li>Past Papers</li>
            <UserButton />
            <SignOutButton>
              <Image src={logout} alt='logout icon' width={30} height={30} className='w-[1.56vw] h-[2.78vh]'/>
            </SignOutButton>
          </div>
        </SignedIn>

        <SignedOut>
          <div className='flex flex-row w-auto h-[2.78vh] justify-between items-center text-[#FFFFFF] text-[0.83vw] gap-[1.25vw] ml-[66.77vw]'>
            <li>Acedamics</li>
            <Link href="/sign-in">
              <button className='text-[#000000] w-[7.45vw] h-[2.78vh] bg-[#F39C12] rounded-[5px] flex justify-center items-center hover:cursor-pointer'>Sign in</button>
            </Link>
          </div>
        </SignedOut>
      </ul>

      {/* --------------------- Mobile --------------------- */}
      <div className='flex lg:hidden w-full h-[7.96vh] bg-[#000000] items-center flex-row'>
        <DropdownMenu>
          <DropdownMenuTrigger className='ml-[7.77vw]'>
            <Image src={menuIcon} alt="Menu Icon" width={50} height={50} className='w-[12.14vw] h-[5.45vh]' />
          </DropdownMenuTrigger>

          <div className='absolute top-[7.96vh] left-[0vw] z-10'>
            <DropdownMenuContent className='w-[89.08vw] h-[90.62vh] bg-[#000000] font-bold text-[#FFFFFF] text-[6.99vw] flex justify-center'>
              <div className='w-[72.09vw] h-[64.56vh] mt-[7.42vh] flex flex-col items-center'>

                <SignedIn>
                 
                  <DropdownMenu>
                    <button onClick={() => window.location.href = '/userprofile'} className='w-[72.09vw] h-[5.45vh] flex flex-row justify-between'>
                      <Image src={userImage} alt='user image' className='rounded-full w-[12.14vw] h-[5.45vh]'/>
                      <div className='text-[#FFFFFF]'>{userName}</div>
                    </button> 
                  </DropdownMenu>

                  <div className='mt-[7.42vh] border-1 border-white-600 w-[72.09vw]'></div> {/* just a white line */}

                  <div className='w-[72.09vw] h-[29.67vh] flex flex-col items-center justify-center'>
                    <div className='w-[50vw] h-[14.83vh] flex flex-col justify-between items-center'>
                      <DropdownMenuItem>
                        Academics
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        Past Papers
                      </DropdownMenuItem>
                    </div>
                  </div>

                  <div className='border-1 border-white-600 w-[72.09vw]'></div> {/* just a white line */}

                  <button className='w-[72.09vw] h-[5.45vh] rounded-[5px] bg-[#F39C12] flex justify-center items center mt-[7.42vh]'>Contact Aruna</button>

                  <div className='mt-[7.42vh] border-1 border-white-600 w-[72.09vw]'></div> {/* just a white line */}

                  <DropdownMenuItem>
                    <SignOutButton>
                      <button className='flex flex-row justify-start items-center w-[72.09vw] h-[5.45vh] mt-[7.42vh]'>
                        <Image src={logout} alt='logout icon' width={50} height={50} />
                        <div className='text-[#FFFFFF] ml-[6.8vw]'>Log out</div>
                      </button>
                    </SignOutButton>
                  </DropdownMenuItem>

                </SignedIn>

                {/* when user logged out */}
                <SignedOut>

                  <DropdownMenuItem>
                    Acedamics
                  </DropdownMenuItem>

                  <SignInButton>
                    <button className='text-[#000000] w-[36.41vw] h-[5.45vh] bg-[#F39C12] rounded-[5px] flex justify-center items-center hover:cursor-pointer'>Sign in</button>
                  </SignInButton>
                </SignedOut>

              </div>
            </DropdownMenuContent>
          </div>
        </DropdownMenu>

        <Link href="/" className='w-auto h-[4.14vh] text-[#F39C12] font-bold ml-[12.38vw] flex justify-center items-center text-[6.99vw]'>Aruna Ranasinghe</Link>

      </div>
    </nav>
  );
}

export default Navigation;
