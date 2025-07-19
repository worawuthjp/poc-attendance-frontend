// types/qr.ts
export interface QrCode {
  id: string;
  createdAt: any;
  lat: number;
  lon: number;
}

export interface QrScan {
  scanId: string;
  guessId: string;
  ip: string;
  lat: number;
  lon: number;
  distance: number;
  scannedAt: any;
}
