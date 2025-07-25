import { currentUser } from "@clerk/nextjs/server";

import { db } from "./db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) return null; // This will probably never happen due to new clerk middleware

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) return profile;

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
