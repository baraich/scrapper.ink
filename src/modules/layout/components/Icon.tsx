import Image from "next/image";
import Link from "next/link";

interface Props {
  width?: number;
  height?: number;
}

export default function Icon({ width = 24, height = 24 }: Props) {
  return (
    <Link href={"/"}>
      <Image
        className="grayscale"
        src={"/logo.svg"}
        width={width}
        height={height}
        alt="Logo"
      />
    </Link>
  );
}
