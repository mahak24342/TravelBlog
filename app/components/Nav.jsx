'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Plane } from 'lucide-react'
import { useSession,signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { data: session } = useSession();
  const router=useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Plane className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">TravelBlog</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
           
            {!session ? (
              // If not authenticated, redirect to /login
              <button
                onClick={() => router.push("/login")}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign In
              </button>
            ) : (
              // If authenticated, show user info and Sign out
              <div className="flex items-center space-x-4">
                <p className="text-gray-700">Hello, {session.user.name}</p>
               <Image onClick={()=>router.push('/'+session.user.email)}src={session.user.image}height={50} width={50} className='rounded-full p-2'/>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                alt="">
                  Sign Out
                </button>

                </div>
            )}
            <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Destinations</Link>
            <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Bookings</Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2  space-y-1">
          {!session ? (
              // If not authenticated, redirect to /login
              <button
                onClick={() => router.push("/login")}
                className="bg-blue-500 text-white py-2 px-4 ml-28 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign In
              </button>
            ) : (
              // If authenticated, show user info and Sign out
              <div className="flex flex-col items-center space-x-2">
                <p className="text-gray-700">Hello, {session.user.name}</p>
               <Image onClick={()=>router.push('/'+session.user.email)}src={session.user.image}height={50} width={50} className='rounded-full p-2'/>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white py-1 px-1 rounded-lg hover:bg-red-600 transition duration-300"
                alt="">
                  Sign Out
                </button>

                </div>
            )}         
            <Link href="/about" className="block ml-28 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Trips</Link>
            <Link href="/contact" className="block ml-28  rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Bookings</Link>
          </div>
        </div>
      )}
    </nav>
  )
}