import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    <header>
      <nav className="w-full border-b px-4 py-3 flex gap-6">
        <div>
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
        </div>

        <ul className="flex items-center text-md space-x-6">
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
            <Link href="/leads">Leads</Link>
          </li>
          <li>
            <Link href="/staffs">Staffs</Link>
          </li>
          <li>
            <Link href="/logs">Call Logs</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;