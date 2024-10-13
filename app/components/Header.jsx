"use client";  
import { useRouter } from 'next/navigation'
import logo from '../../public/logo.png'
import Image from 'next/image'

export default function Header()  {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleHomePage = () => {
    router.push('/')
  }

  return (
    <header className="flex justify-between items-center px-8 shadow-lg h-24 bg-white">
      <div className="flex items-center space-x-4">
        <Image onClick={handleHomePage} src={logo} width={200} height={200} className=" cursor-pointer" /> 
      </div>
      <div>
        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Giriş Yap
        </button>
      </div>
    </header>
  );
};

