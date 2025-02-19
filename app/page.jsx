import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">Home Page</h1>
      <Link href="/properties">View Properties</Link>
    </div>
  );
};

export default HomePage;
