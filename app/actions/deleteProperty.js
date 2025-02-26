"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propId);

  if (!property) {
    throw new Error("Property not found");
  }

  //   Verify ownership of the property
  if (property.owner.toString() !== userId) {
    throw new Error("You are not authorized to delete this property");
  }

  //   Extract public ID from Image URL
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  //   Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    }
  }

  //   Delete property from the database
  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
