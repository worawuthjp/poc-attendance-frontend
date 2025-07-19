'use client'

// pages/create-qr.tsx
import { db } from "@/src/lib/firebase";
import { QrCode } from "@/src/types/qr";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const getLocation = (): Promise<{ lat: number; lon: number }> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      reject
    );
  });

export default function CreateQR() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [qrId, setQrId] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);
  const [url, setUrl] = useState('')

  useEffect(() => {
    getLocation()
      .then(setLocation)
      .catch(() => alert("กรุณาเปิด location"));
    
      if(typeof window !== "undefined"){
        setUrl(`https://${window.location.hostname}`)
      }
  }, []);

  const handleGenerate = async () => {
    if (!location) return;
    const id = uuidv4();
    setQrId(id);
    const data: QrCode = {
      id,
      createdAt: Timestamp.now(),
      lat: location.lat,
      lon: location.lon,
    };
    await addDoc(collection(db, "qr-codes"), data);
    setSaved(true);
  };

  return (
    <div className="w-full p-4 text-center bg-white text-black">
      <h2>สร้าง QR พร้อมตำแหน่ง</h2>

      <div style={{ marginTop: 20 }} className="min-w-[220px] min-h-[220px] text-center w-full">
        {qrId && location && (
          <div className="text-center justify-center flex">
            <QRCodeCanvas
              value={`${url}/qr/${qrId}`}
              size={220}
            />
          </div>

        )}
      </div>



      {saved && <p>บันทึก QR สำเร็จ!</p>}
      {location && (
        <p>
          ตำแหน่งคุณ: lat {location.lat}, lon {location.lon}
        </p>
      )}

      <button className="border rounded-xl p-3 my-2 cursor-pointer bg-blue-400 text-black" onClick={handleGenerate} disabled={!location || !!qrId}>
        Generate QR
      </button>
    </div>
  );
}
