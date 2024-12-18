import prisma from "../prismaConnect";

export const deleteStudent = async (id: string) => {
  await prisma.student.delete({ where: { id } });
};
export const deleteTeacher = async (id: string) => {
  await prisma.teacher.delete({ where: { id } });
};
export const deleteParent = async (id: string) => {
  await prisma.parents.delete({ where: { id } });
};
