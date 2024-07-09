'use client'
import React from "react";
import { useRouter } from 'next/navigation'  


const TeacherTerms = () => {
    const router = useRouter()
  return (
    <div className="font-header bg-stone-100 text-center pt-12 md:px-6 px-3">
      <h1 className="md:text-[30px] text-[20px] font-subtext font-bold">
        TERMS AND CONDITION FOR SCHOOLS
      </h1>

      <div className="text-justify md:ml-12 ml-3 mt-12 ">
        <h3 className="text-[18px] font-bold">1. Introduction</h3>
        <p className="max-w-[1000px] md:ml-6 text-[16px] font-medium">
          Welcome to Schooled Afrika. By accessing or using our website, you
          agree to comply with and be bound by the following terms and
          conditions. Please review them carefully. If you do not agree to these
          terms, you should not use this site
        </p>
      </div>

      <div className="text-justify md:ml-12 ml-3 mt-12 ">
        <h3 className="text-[18px] font-bold">2. Acceptance of Terms</h3>
        <p className="max-w-[1000px] md:ml-6 text-[16px] font-medium">
          By accessing and using the Schooled Afrika website (this "Site"), you
          accept and agree to be bound by the terms and provisions of this
          agreement. In addition, when using these particular services, you
          shall be subject to any posted guidelines or rules applicable to such
          services. Any participation in this service will constitute acceptance
          of this agreement.
        </p>
      </div>

      <div className="text-justify md:ml-12 ml-3 mt-12 ">
        <h3 className="text-[18px] font-bold">3. Change of Terms</h3>
        <p className="max-w-[1000px] md:ml-6 text-[16px] font-medium">
          Schooled Afrika reserves the right to modify these terms at any time.
          We will notify you of any changes by posting the new terms on the
          Site. You are advised to review these terms periodically for any
          changes. Changes to these terms are effective when they are posted on
          this page.
        </p>
      </div>
      <div className="text-justify md:ml-12 ml-3 mt-12 ">
        <h3 className="text-[18px] font-bold">4. Eligibility</h3>
        <p className="max-w-[1000px] md:ml-6 text-[16px] font-medium">
          To use our services, your School must be duly registered by the
          Federal Government of Nigeria and be able and competent to enter into
          the terms, conditions, obligations, affirmations, representations, and
          warranties set forth in these terms.
        </p>
      </div>

      <div className="text-justify md:ml-12 ml-3 mt-12">
        <h3 className="text-[18px] font-bold">5. User Accounts</h3>
        <p className="max-w-[1000px] md:ml-6 font-medium">
          To access certain features of the Site, you may be required to create
          an account. You agree to:
        </p>

        <div className="my-3 p-3 font-medium">
          <p className="py-2 text-[15px]">
            {" "}
            - Provide accurate, current, and complete information during the
            registration process.
          </p>
          <p className="py-2 text-[15px]">
            {" "}
            - Maintain and promptly update your account information to keep it
            accurate, current, and complete.{" "}
          </p>
          <p className="py-2 text-[15px]">
            {" "}
            - Maintain the security and confidentiality of your account
            credentials.
          </p>
          <p className="py-2 text-[15px]">
            {" "}
            - Notify us immediately of any unauthorized use of your account.
          </p>
        </div>
      </div>

      <div className="text-justify md:ml-12 ml-3 mt-12">
        <h3 className="text-[18px] font-bold">6. User Conduct</h3>
        <p className="max-w-[1000px] md:ml-6 font-medium">
          You agree not to use the Site for any unlawful purpose or in any way
          that might harm, damage, or disparage any other party. You further
          agree not to:
        </p>

        <div className="my-3 p-3 font-medium">
          <p className="py-2 text-[15px]">
            {" "}
            - Interfere with or disrupt the Site or servers or networks
            connected to the Site.
          </p>
          <p className="py-2 text-[15px]">
            {" "}
            - Violate any applicable local, state, national, or international
            law, or any regulations having the force of law.{" "}
          </p>
          <p className="py-2 text-[15px]">
            {" "}
            - Impersonate any person or entity or falsely state or otherwise
            misrepresent your affiliation with a person or entity.
          </p>
        </div>
      </div>

      <div className="text-justify md:ml-12 ml-3 mt-12 ">
        <h3 className="text-[18px] font-bold">7. Intellectual Property</h3>
        <p className="max-w-[1000px] md:ml-6 text-[16px] font-medium">
          All content on the Site, including but not limited to text, graphics,
          logos, images, audio clips, digital downloads, data compilations, and
          software, is the property of Schooled Afrika or its content suppliers
          and is protected by international copyright laws. The compilation of
          all content on this site is the exclusive property of Schooled Afrika,
          with copyright authorship for this collection by Schooled Afrika, and
          protected by international copyright laws.
        </p>
      </div>

      <div className="text-justify md:ml-12 ml-3 mt-12 ">
        <h3 className="text-[18px] font-bold">8. Termination</h3>
        <p className="max-w-[1000px] md:ml-6 text-[16px] font-medium">
          We may terminate or suspend your account and bar access to the Site
          immediately, without prior notice or liability, under our sole
          discretion, for any reason whatsoever, including without limitation if
          you breach the Terms.
        </p>
      </div>

      <div className="text-justify md:ml-12 ml-3 mt-12">
        <h3 className="text-[18px] font-bold">
          9. Privacy and Data Protection
        </h3>
        {/* <p className="max-w-[1000px] text-[16px] md:ml-6 font-medium">
          We may collect the following types of information:
        </p> */}

        <div className="my-3 p-3">
          <p className="py-2 text-[15px]">
            <span className="font-semibold text-[16px]">
              - Personal Information:
            </span>{" "}
            We collect and process personal information in accordance with our
            Privacy Policy. By agreeing to these Terms and Conditions, you
            consent to such processing.
          </p>
          <p className="py-2 text-[15px]">
            <span className="font-semibold text-[16px]">
              - Children's Privacy:
            </span>{" "}
            Parents consent to the collection of their child's personal
            information and agree to supervise their child’s online activities.
          </p>
        </div>
      </div>

      <div className="text-justify md:ml-12 ml-3 mt-12 ">
        <h3 className="text-[18px] font-bold">10. Limitation of Liability</h3>
        <p className="max-w-[1000px] md:ml-6 text-[16px] font-medium">
          To the fullest extent permitted by law, Schooled Afrika shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly, or any loss of data, use, goodwill, or other
          intangible losses, resulting from your use of the Site or Services
        </p>
      </div>
      <div className="text-justify md:ml-12 ml-3 mt-12 ">
        <h3 className="text-[18px] font-bold">11. Governing Laws</h3>
        <p className="max-w-[1000px] md:ml-6 text-[16px] font-medium">
          These Terms shall be governed and construed in accordance with the
          laws of Nigeria, without regard to its conflict of law provisions.
        </p>
      </div>

      <div className="text-justify md:ml-12 ml-3 mt-12">
        <h3 className="text-[18px] font-bold">12. Contact Us</h3>
        <p className="max-w-[1000px] md:ml-6 font-medium">
          If you have any questions about these Terms, please contact us at:
          <p className="my-3 text-[14px] font-medium">
            SchooledAfrika <br />
            Schooledafrika@gmail.com <br />
            +2347035082028 <br />
          </p>
        </p>
      </div>
      <div className="text-justify md:ml-12 ml-3 mt-12 pb-8">
        <h3 className="text-[18px] font-bold">Acknowledgement</h3>
        <p className="max-w-[1000px]  font-medium">
          By using the Service, you acknowledge that you have read these terms
          and agree to be bound by them.
        </p>
      </div>
     

     
     
    </div>
  );
};

export default TeacherTerms;
