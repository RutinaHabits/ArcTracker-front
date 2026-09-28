import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <span>DashBoard</span> <br />
      <Link href={"/dashboard/profile"}>Profile</Link>
      <Link href={"/dashboard/statistics"}>Statistics</Link>
    </div>
  );
}
