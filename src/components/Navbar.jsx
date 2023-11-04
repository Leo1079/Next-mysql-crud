import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
  <ul className="flex space-x-4 justify-between">
    <li>
      <Link href="/">
        <h1 className="text-white font-bold text-xl">Market Products</h1>
      </Link>
    </li>
    <li className="justify-end">
      <Link href="/new">
        <p className="text-white font-bold text-xl ">New</p>
      </Link>
    </li>
  </ul>
</nav>

  
  );
};

export default Navbar;
