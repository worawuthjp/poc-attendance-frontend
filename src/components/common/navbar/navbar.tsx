import Link from 'next/link';

export default function Navbar() {
  return (
    <div>
      <div className="flex w-full justify-between p-2">
        <Link href="/create-qr" className="rounded px-3 py-2 hover:bg-blue-300" children="สร้าง QRCODE" />
        <Link href="/" className="rounded px-3 py-2 hover:bg-blue-300" children="Scanner" />
      </div>
    </div>
  );
}
