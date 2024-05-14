import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { FaDownload, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Button } from "./ui/button";

const ApplicantDetails = () => {
  return (
    <section className="my-[80px] md:my-4">
      <Container>
        <div className="flex justify-between items-center mb-5">
          <span className="font-bold">Details</span>
          <Link href="/school-dashboard/job-listing" className="cursor-pointer">
            <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
          </Link>
        </div>
        <div className="block md:flex gap-4">
          <div className="flex-1 bg-[#FFFFFF] rounded-[5px] py-5 px-8">
            <p className="font-bold text-[18px] pb-2">Economics</p>
            <div className="flex gap-6">
              <div className="flex gap-2 font-bold text-[12px]">
                <Image
                  src="/svgs/grade.svg"
                  width={15}
                  height={15}
                  alt="Grade"
                />
                <span>Grade 10</span>
              </div>
              <div className="flex gap-2 font-bold text-[12px]">
                <Image
                  src="/svgs/location-black.svg"
                  width={9}
                  height={9}
                  alt="Location"
                />
                <span>Lagos</span>
              </div>
            </div>
            <hr className="my-[20px]" />
            <div>
              <p className="font-bold text-[16px] pb-2">Details</p>
              <span className="text-[14px] font-medium">
                We are seeking a dynamic and creative Classroom Teacher with a
                good knowledge of social sciences subjects to join our new
                education community. As a Classroom Teacher, you will play a
                pivotal role in fostering a stimulating and inclusive learning
                environment where students can thrive academically, socially,
                and emotionally. Your passion for education, innovative teaching
                methods, and commitment to nurturing individual growth will be
                integral to our mission of providing an exceptional learning
                experience.
              </span>
              <p className="font-bold text-[16px] pb-2 pt-4">
                Responsibilities
              </p>
              <ul className="text-[14px] font-medium list-disc pl-6">
                <li className="pb-1">
                  Plan, prepare, and deliver lesson plans and instructional
                  materials that facilitate active learning.
                </li>
                <li>
                  Develops schemes of work, lesson plans, and tests that are by
                  established procedures.
                </li>
              </ul>
              <div className="text-[#359C71] text-center pt-6 pb-2 text-[14px] cursor-pointer">
                Read More Details
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#FFFFFF] rounded-[5px] h-[60vh] md:h-[45vh] py-5 px-8">
            <div className="block md:flex mt-5 gap-5">
              <Image
                src="/applicantImg.png"
                alt="Applicant Image"
                width={130}
                height={10}
                className="h-[20vh]"
              />
              <div>
                <p className="flex gap-2 font-bold text-[17px] mb-2">
                  David Olushola
                  <Image
                    src="/svgs/checkMark.svg"
                    width={20}
                    height={20}
                    alt="Check Mark"
                  />
                </p>
                <span className="text-[12px] font-bold">⭐ 4.7/5</span>
                <div className="flex flex-col my-5">
                  <p className="inline mb-1 text-[12px] font-medium">
                    <FaEnvelope className="inline mr-1" />
                    Odomaurice@gmail.com
                  </p>
                  <p className="inline text-[12px] font-medium">
                    <FaPhoneAlt className="inline mr-1" />
                    +234 912 7836 353
                  </p>
                </div>
                <Link href={"/school-dashboard/job-listing/new"}>
                  <Button className="flex items-center sm:gap-4 bg-secondary px-[20px] text-white text-[12px] py-7 my-3">
                    <Image
                      src="/svgs/pdfIcon.svg"
                      width={20}
                      height={20}
                      className="mr-2"
                      alt="Download"
                    />
                    <div className="text-left">
                      <p>Applicants Credentials</p>
                      <p className="text-[10px]">100.01 kb</p>
                    </div>

                    <FaDownload />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ApplicantDetails;
