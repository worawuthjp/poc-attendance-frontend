"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface QrCodeValue {
  id: string,
}

function ScannerPage() {

  const [openCamera, setOpenCamera] = useState(false)
  const router = useRouter()

  const onScanQrCode = (rawValue: string)=>{

    if(rawValue.startsWith('http://') ||rawValue.startsWith('https://')){
      router.replace(rawValue)
    }
  }
  return (
    <div className="text-center p-4">

      <div className="text-2xl font-bold"><h1>Scanner</h1></div>
      <div className="border rounded min-h-[400px] lg:max-w-[400px] mx-auto my-3">
        {openCamera && <Scanner onScan={result=> {
          if(result.length > 0){
            onScanQrCode(result[0].rawValue)
          }
        }} />}
      </div>
      <div>
        <button onClick={()=>setOpenCamera(val=>!val)} className=" bg-blue-500 p-3 text-white">{openCamera ? 'ปิดกล้อง': 'เปิดกล้อง'}</button>
      </div>
    </div>
  )
}

export default ScannerPage