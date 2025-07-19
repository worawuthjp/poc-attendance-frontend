/**
 * คำนวณระยะห่างระหว่าง 2 จุด (lat, lon) บนโลก
 * @param lat1 ละติจูดจุดที่ 1
 * @param lon1 ลองจิจูดจุดที่ 1
 * @param lat2 ละติจูดจุดที่ 2
 * @param lon2 ลองจิจูดจุดที่ 2
 * @returns ระยะทาง (เมตร)
 */
export function calcDistanceMeters(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371000; // รัศมีโลก (เมตร)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}