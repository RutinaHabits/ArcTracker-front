import Link from "next/link";

export default function Home() {
  return (
    <div>
      <span>
        LandingPage <br />
      </span>
      <Link href={"/sing-in"}>sing in </Link>
      <Link href={"/sing-up"}>sing up</Link>
    </div>
  );
}
