import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchCollegeById(id: string) {
  noStore();
  try {
    const college = await prisma.college.findUnique({
      where: { id },
    });
    return college;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch college.');
  }
}
