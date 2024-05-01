import prisma from "../prismaConnect";

export const deleteStudent = async (id: string) => {
  const deletedUser = await prisma.student.delete({ where: { id } });
};
export const deleteTeacher = async (id: string) => {
  const deletedUser = await prisma.school.delete({ where: { id } });
};
export const deleteSchool = async (id: string) => {
  const deletedUser = await prisma.teacher.delete({ where: { id } });
};
export const deleteParent = async (id: string) => {
  const deletedUser = await prisma.parents.delete({ where: { id } });
};
