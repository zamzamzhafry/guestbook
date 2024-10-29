// app/welcome/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';

export default function WelcomePage() {
  const searchParams = useSearchParams();
  const value = searchParams.get("value") || "No value provided";

  const genderParam = searchParams.get("gender");
   const genderValue = genderParam === "female" ? "nyonya" : genderParam === "male" ? "tuan" : "No gender provided";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <button className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4' onClick={() => window.location.href = "/"}> Kembali ke Menu</button>
      <h1 className="text-2xl font-bold mb-4 text-white">Selamat Datang</h1>
      <p className="text-lg text-white">
        {genderValue} : <span className="font-mono">{value}</span>
      </p>
    </div>
  );
}
