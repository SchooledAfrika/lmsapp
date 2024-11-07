import React from "react";
import Container from "./Container";

const HowItWorks = () => {
  return (
    <Container>
      <div className="font-header">
        <h1 className="font-bold text-center text-[24px] my-6">HOW IT WORKS</h1>
        <div className="px-4 ">
          <h2 className="font-semibold text-[20px] mb-2 underline">Introduction</h2>
          <p className="text-[15px]">This section covers the wholesome guide on how the entire application works. Our desire is that our users, even if they are not tech-savvy, can navigate the web application and their respective dashboards. The web application has five (5) different types of users and roles. Firstly, there are teachers who teach, then Students who recieve lectures, parents who perform supervisory roles exclusively for their wards, then the superadmin and sub-admins. We will delve into each of these roles and how they use the application individually as their roles permit. </p>
        </div>
         {/* Teachers */}
        <div className="px-4  my-3">
          <h2 className="font-semibold text-[18px] mb-2 underline">Teachers</h2>
          <p className="text-[15px]">This category of users perform tutorial duties, they can create classes, create video courses (limited to PRO users),purchase and take video courses by other teachers or SchooledAfrika Admins, set exams and resources, grade students, hold live sessions and apply to jobs posted by SchooledAfrika Admins. </p> <br />
          <p className="text-[15px]">Once a user clicks on the register call-to-action (CTA) button, they select the "register as teacher" option which navigates them to the progressive pages where they complete their registration with the necessary data we require to authenticate and validate them as teachers: their names, emails, phone numbers, resumes, passwords, profile pictures, total hours taught online etc. </p> <br/>
          <p className="text-[15px]">Upon successful registration, they are provided with their respective dashboards which is very easy to use, there is an overview page which has pie and bar charts showing the teacher's progress, there is a classroom page where the teacher can create classes, fetch all created classes and add tests and resources to individual classes as well as view individual classes and also delete individual classes, there is a one-on-one section page where the teacher can create his/her section profile which will show on the find-tutors page on the website and from here too the teacher can start see the sections they were booked in, we have two different types of sessions: the homework support session and the private session, there is also a page for test and resources where the teacher can set tests and resources, there is also a finance page for monitoring their finances, then calendar page for viewing schedules and settings page.</p> 
        </div>

         {/* Students */}
         <div className="px-4  my-3">
          <h2 className="font-semibold text-[18px] mb-2 underline">Students</h2>
          <p className="text-[15px]">This category of users recieve lectures by joining live sessions, they can rate and review teachers,purchase and take video courses, take exams and view resources etc. </p> <br />
          <p className="text-[15px]">Once a user clicks on the register call-to-action (CTA) button, they select the "register as student" option which navigates them to the progressive pages where they complete their registration with the necessary data we require to authenticate and validate them as students: their names, emails, phone numbers, grades, passwords, profile pictures, description etc. </p> <br/>
          <p className="text-[15px]">Upon successful registration, they are provided with their respective dashboards which is very easy to use, there is an overview page which has pie and bar charts showing the student's progress, there is a classroom page where the student can see classes they are enrolled in,  take tests (exams) and view resources to individual classes as well as view individual classes, there is a one-on-one section page where the students can see  sessions they are enrolled in, there is also a page for test and resources where the teacher can see tests and resources, there is also a finance page for monitoring their finances, then calendar page for viewing schedules and settings page.</p> 
        </div>

         {/* Parents */}
         <div className="px-4  my-3">
          <h2 className="font-semibold text-[18px] mb-2 underline">Parents</h2>
          <p className="text-[15px]">This category of users perform supervisory roles to their registered ward(s). Once a user clicks on the register call-to-action (CTA) button, they select the "register as parent" option which navigates them to the progressive pages where they complete their registration with the necessary data we require to authenticate and validate them as parents: their names, emails, phone numbers, grades, passwords, profile pictures, description, ward's name, email, password, profile picture, grade etc. </p> <br/>
          <p className="text-[15px]">Upon successful registration, they are provided with a ward-options page where they can either select a ward or add more wards after which they are led to their dashboard  with the information of the selected ward, while in their dashboard, they can switch wards or add more wards from the overview page,  there is an overview page which has pie and bar charts showing the student's progress, there is a classroom page where the parent can see classes their wards are enrolled in, there is a test and assessments page where they can see the assessments and tests their wards have taken and their grades as well as remarks, there is a teachers page where they can see the teachers teaching their children as well as request a special teacher, there is a one-on-one section page where the parents can see  sessions their wards are enrolled in,  there is also a finance page for monitoring their finances, then calendar page for viewing their schedules and settings page.</p> 
        </div>
        {/* Admins */}
        <div className="px-4  my-3">
          <h2 className="font-semibold text-[18px] mb-2 underline">Superadmins and admins</h2>
          <p className="text-[15px]">This category of users perform supervisory and monitoring roles on the web application. They can approve and remove users who go against the policies and terms of the application.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default HowItWorks;
