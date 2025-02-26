"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import deleteProperty from "@/app/actions/deleteProperty";

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property"
    );

    if (!confirmed) return;

    await deleteProperty(propId);

    const updatedProperties = properties.filter((prop) => prop._id !== propId);

    setProperties(updatedProperties);

    toast.success("Property deleted successfully");
  };

  return properties.map((prop) => (
    <div key={prop._id} className="mb-10">
      <Link href={`/properties/${prop._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={prop.images[0]}
          width={1000}
          height={250}
          alt="Property 1"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{prop.name}</p>
        <p className="text-gray-600">
          Address: {prop.location.street}, {prop.location.city},{" "}
          {prop.location.state}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${prop._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(prop._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
