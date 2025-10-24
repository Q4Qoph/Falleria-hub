import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="w-28 h-20 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer">
        <Image
          src="/logo.png"
          alt="Logo"
          width={70}
          height={70}
          className="object-cover"
        />
      </div>
    </Link>
  );
};

export default Logo;
