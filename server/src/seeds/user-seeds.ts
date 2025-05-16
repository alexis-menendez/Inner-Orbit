// File: server/src/seeds/user-seeds.ts

import bcrypt from 'bcrypt';
import User from '../models/User';

export const seedUsers = async () => {
  const users = await Promise.all(
    [
      {
        username: 'WhimsyWoods',
        email: 'alexis.246.menendez@gmail.com',
        password: 'test123',
        firstName: 'Alexis',
        lastName: 'Menendez',
        dob: '1995-09-28',
        isDev: true,
      },
      {
        username: 'StarSeeker',
        email: 'starseeker@innerorbit.space',
        password: 'test123',
        firstName: 'Nova',
        lastName: 'Reed',
        dob: '1992-09-12',
        isDev: false,
      },
    ].map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );

  await User.deleteMany({});
  await User.insertMany(users);
  console.log(`✅ Seeded ${users.length} users`);
};
