// app/welcome/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

const WelcomeContent = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get("value") || "Tidak ada nama";
  const genderParam = searchParams.get("gender");
  const genderValue =
    genderParam === "female" ? "nyonya" : genderParam === "male" ? "tuan" : "Tidak ada Gender";

  return (
    
    
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Welcome Page</h1>
      <p className="text-lg text-white">
        {genderValue} : <span className="font-mono">{value}</span>
      </p>
    </div>
  );
};

export default function WelcomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Card className="w-[350px]">
      //   <CardHeader>
      //     <CardTitle>Create project</CardTitle>
      //     <CardDescription>Deploy your new project in one-click.</CardDescription>
      //   </CardHeader>
      //   <CardContent>
      //     <form>
      //       <div className="grid w-full items-center gap-4"> {genderValue} : <span className="font-mono">{value}</span>
      //         <div className="flex flex-col space-y-1.5">
      //           <Label htmlFor="name">Name</Label>
      //           <Input id="name" placeholder="Name of your project" />
      //         </div>
      //         <div className="flex flex-col space-y-1.5">
      //           <Label htmlFor="framework">Framework</Label>
      //           <Select>
      //             <SelectTrigger id="framework">
      //               <SelectValue placeholder="Select" />
      //             </SelectTrigger>
      //             <SelectContent position="popper">
      //               <SelectItem value="next">Next.js</SelectItem>
      //               <SelectItem value="sveltekit">SvelteKit</SelectItem>
      //               <SelectItem value="astro">Astro</SelectItem>
      //               <SelectItem value="nuxt">Nuxt.js</SelectItem>
      //             </SelectContent>
      //           </Select>
      //         </div>
      //       </div>
      //     </form>
      //   </CardContent>
      //   <CardFooter className="flex justify-between">
      //     <Button variant="outline">Cancel</Button>
      //     <Button>Deploy</Button>
      //   </CardFooter>
      </Card> */}
      
      {/* <div className='flex justify-center'>
      <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.history.back()}>Back Home</button>

      </div> */}



      <WelcomeContent />
    </Suspense>
  );
}
