import prisma from "../prismaConnect";
import bcrypt from "bcryptjs";
// here we modify students
export const modifyStudent = async (id: string, updateData: any) => {
  await prisma.student.update({
    where: {
      id: id,
    },
    data: {
      ...updateData,
    },
  });
};
// here we modify parents
export const modifyParents = async (id: string, updateData: any) => {
  await prisma.parents.update({
    where: {
      id: id,
    },
    data: {
      ...updateData,
    },
  });
};
// here we modify teachers
export const modifyTeachers = async (id: string, updateData: any) => {
  await prisma.teacher.update({
    where: {
      id: id,
    },
    data: {
      ...updateData,
    },
  });
};

// below
// we update only the password of the user
export const studentPasswordUpdate = async (
  id: string,
  oldPassword: string,
  newPassword: string
) => {
  // lets get the user from the database
  const user = await prisma.student.findUnique({
    where: { id },
    select: { password: true },
  });

  // lets compare the password in the database
  // and check if it matches with the oldpassword user send
  const doesPasswordMatch = await bcrypt.compare(oldPassword, user?.password!);

  if (!doesPasswordMatch) {
    return new Response(
      JSON.stringify({ message: "Your old password is incorrect" }),
      { status: 400, statusText: "old password is incorrect" }
    );
  }
  // now we can update the user because the oldpassword does match
  // first lets hash the new password
  const hashedpassword = bcrypt.hashSync(newPassword, 12);
  console.log(hashedpassword);
  const passwordUpdate = await prisma.student.update({
    where: { id },
    data: {
      password: hashedpassword,
    },
  });
  console.log(passwordUpdate);
  // now, we can return a successful, password update message
  return new Response(
    JSON.stringify({ message: "password updated successfully" }),
    { status: 200, statusText: "success" }
  );
};

export const teacherPasswordUpdate = async (
  id: string,
  oldPassword: string,
  newPassword: string
) => {
  // lets get the user from the database
  const user = await prisma.teacher.findUnique({
    where: { id },
    select: { password: true },
  });
  // lets compare the password in the database
  // and check if it matches with the oldpassword user send
  const doesPasswordMatch = await bcrypt.compare(oldPassword, user?.password!);
  if (!doesPasswordMatch) {
    return new Response(
      JSON.stringify({ message: "Your old password is incorrect" }),
      { status: 400, statusText: "old password is incorrect" }
    );
  }
  // now we can update the user because the oldpassword does match
  // first lets hash the new password
  const hashedpassword = bcrypt.hashSync(newPassword, 12);
  const passwordUpdate = await prisma.teacher.update({
    where: { id },
    data: {
      password: hashedpassword,
    },
  });
  // now, we can return a successful, password update message
  return new Response(
    JSON.stringify({ message: "password updated successfully" }),
    { status: 200, statusText: "success" }
  );
};
export const parentsPasswordUpdate = async (
  id: string,
  oldPassword: string,
  newPassword: string
) => {
  // lets get the user from the database
  const user = await prisma.parents.findUnique({
    where: { id },
    select: { password: true },
  });
  // lets compare the password in the database
  // and check if it matches with the oldpassword user send
  const doesPasswordMatch = await bcrypt.compare(oldPassword, user?.password!);
  if (!doesPasswordMatch) {
    return new Response(
      JSON.stringify({ message: "Your old password is incorrect" }),
      { status: 400, statusText: "old password is incorrect" }
    );
  }
  // now we can update the user because the oldpassword does match
  // first lets hash the new password
  const hashedpassword = bcrypt.hashSync(newPassword, 12);
  const passwordUpdate = await prisma.parents.update({
    where: { id },
    data: {
      password: hashedpassword,
    },
  });
  // now, we can return a successful, password update message
  return new Response(
    JSON.stringify({ message: "password updated successfully" }),
    { status: 200, statusText: "success" }
  );
};
