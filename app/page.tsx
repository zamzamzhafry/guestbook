'use client'
// import Image from "next/image";
import QRCode from "react-qr-code";
// import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [inputGenderValue, setInputGenderValue] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000"; // Fallback for local development

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleChangeGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setInputGenderValue(value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-rows-[1fr_1fr]">
        <h3 className="text-center sm:text-left text-foreground">Ketik teks untuk generate QR</h3>
        <div className="pb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something here"
          className="text-foreground"
        />
        </div>
        <select name="" id="" value={inputGenderValue} onChange={handleChangeGender} className="text-foreground">
          <option value="male" defaultChecked>Bapak/Sdr</option>
          <option value="female">Ibu/Nona</option>
        </select>
      </main>
      
 <QRCode
          value={inputValue ? `${baseUrl}/welcome?value=${encodeURIComponent(inputValue)}&gender=${encodeURIComponent(inputGenderValue)}` : ""}
        />

    </div>
  );
}
