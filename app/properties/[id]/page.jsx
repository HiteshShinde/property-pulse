import Link from "next/link";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyImages from "@/components/PropertyImages";
import { FaArrowLeft } from "react-icons/fa";

const DynamicPropertyPage = async ({ params }) => {
  await connectDB();

  if (!params || !params.id) {
    return <p>Error: Property ID is missing.</p>;
  }

  let property;
  try {
    property = await Property.findById(params.id).lean();
    if (!property) {
      return <p>Property not found.</p>;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* Property Info */}
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default DynamicPropertyPage;
