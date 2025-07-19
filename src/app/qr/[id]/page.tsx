
'use client'

import { db } from '@/src/lib/firebase'
import { calcDistanceMeters } from '@/src/lib/geolocation'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

function QrCodeIdPage() {

    const params = useParams<{id: string}>()
    const [data, setData]= useState({
        id: '',
        lat: '',
        lon: ''
    })

    const [output, setOutput] = useState('')

    const getLocation = (): Promise<{ lat: number; lon: number }> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      reject
    );
  });

    const getQrCodeData = async () => {
        const q = query(collection(db, 'qr-codes'), where('id', '==', params.id))
        const snap = await getDocs(q)
        const results = snap.docs.map(d=>d.data())
        console.log(results)
        if(results.length > 0){
            setData({
                id: results[0].id,
                lat: results[0].lat,
                lon: results[0].lon,
            })
        }
    }

    const calculation = async () => {
        // const currentLatLon = await getLocation();
        // console.log(currentLatLon)
        // const distance = calcDistanceMeters(Number(data.lat), Number(data.lon), currentLatLon.lat, currentLatLon.lon)
        // console.log(distance)

        const p1 = { lat: 13.877248, lon: 99.8342656 };
const p2 = { lat: 13.877300, lon: 99.834300 };
const d = calcDistanceMeters(p1.lat, p1.lon, p2.lat, p2.lon);
console.log(d); // ได้ ~7 เมตร (ถูกต้อง)
    }

    useEffect(() => {
      getQrCodeData()
      
    
      return () => {
        
      }
    }, [params.id])

    useEffect(()=>{
        calculation()
    },[data.id])
    
  return (
    <div>Qrcode Id: {params.id}</div>
  )
}

export default QrCodeIdPage