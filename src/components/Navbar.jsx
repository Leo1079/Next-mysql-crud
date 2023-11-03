import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            <p className="text-white">Inicio</p>
          </Link>
        </li>

        <li>
          <Link href="/new">
            <p className="text-white">New</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
