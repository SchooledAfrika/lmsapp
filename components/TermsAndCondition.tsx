import React from "react";

function Terms() {
  return (
    <div className="p-5">
      <div className="">
        <div className="flex flex-col items-center w-[80%] lg:w-[50%] m-auto">
          <h1 className="text-5xl text-center font-bold">
            Terms and Conditions
          </h1>
          <p className="text-justify py-3">
            These Terms and Conditions ("Terms") govern the use of our services
            provided by Schooled Afrika and for learning management system
            referred to us from our partners or completed by us on their behalf
            ("The business," "company,” “we," "us," or "our") and apply to all
            users ("customer(s)," "you," or "your") of our learning platform,
            website, and related services. By contracting or using our services,
            you agree to comply with these Terms. Please read these Terms
            carefully.
          </p>

          <div>
            <p className="text-xl font-medium">1. Users Responsibilities:</p>
            <ol className="py-2 text-justify">
              <li>
                You are responsible for providing accurate and complete
                information during the registration process, including but not
                limited to date, time, addresses and phone number.
              </li>
              <li>
                Any changes, modifications, or requests related to your plan and
                payment should be communicated promptly to us.
              </li>
            </ol>

            <p className=" text-xl font-medium">2. Payment:</p>
            <ol className="py-2 text-justify">
              <li>
                All prices quoted or metered are in USD ($) and include
                applicable taxes, unless stated otherwise. Additional charges,
                may apply and will be clearly stated before you make a payment.
              </li>
              <li>
                We accept payments in cash and all major credit/ debit cards.
                Card payments are subject to a minimum of $0000.
              </li>
              <li>
                Payment can be made on the platform without asy fear of detail
                exposure.
              </li>
            </ol>

            <p className="text-xl font-medium">3. Refunds: </p>
            <ol className="py-2 text-justify">
              <li>
                Refunds will be issued using the original payment method unless
                otherwise specified.
              </li>
              <li>
                Requests for refunds must be made within 14 days of the original
                purchase date. After this period, no refunds will be issued.
              </li>
              <li>
                Refunds are only applicable if the user has not completed more
                than 25% of the course content. Completion is determined by
                tracking the lessons and modules accessed.
              </li>
            </ol>

            <p className="text-xl font-medium"> 4. Privacy: </p>
            <ol className="py-2 text-justify">
              <li>
                We are committed to protecting your privacy. Our Privacy Policy
                outlines how we collect, use, and protect your personal
                information.
              </li>
              <li>
                By using our Service, you consent to the collection and use of
                your data as described in our Privacy Policy, which includes
                details on data collection, processing, and storage.
              </li>
              <li>
                We only collect personal information that is necessary for the
                effective provision of our Service, such as your name, email
                address, and payment details.
              </li>
            </ol>

            <p className="text-xl font-medium">5. Dispute and Governing Law:</p>
            <ol className="py-2 text-justify">
              <li>
                If you have any complaints, concerns or disputes related to
                cancellations or refunds, please contact us via email. We will
                make reasonable efforts to address your concerns in a timely
                manner.
              </li>
              <li>
                These Terms are governed by English law. Any disputes arising
                from these Terms will be subject to the exclusive jurisdiction
                of the courts in Nigeria.
              </li>
            </ol>

            <p className="text-md mt-5 mb-9">
              By using our services, you agree to these Terms and acknowledge
              that you have read and understood them. If you do not agree with
              these Terms, please refrain from using our services. We reserve
              the right to update or modify these Terms at any time, and any
              changes will be effective upon posting on our platform. It is your
              responsibility to review these Terms periodically for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
