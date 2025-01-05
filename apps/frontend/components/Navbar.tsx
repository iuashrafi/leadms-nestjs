import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b px-4 py-3 flex gap-6 backdrop-blur bg-white/10">
      <div>
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
        </Link>
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
          <Link href="/logs">Interactions</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
