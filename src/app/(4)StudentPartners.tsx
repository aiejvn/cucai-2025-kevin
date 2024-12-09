"use client";
import Image from "next/image";
import { Pixelify_Sans } from "next/font/google";
import { student_partners } from "@/data/student_partners";

export const PixelifySans = Pixelify_Sans({
  subsets: ["cyrillic", "latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

interface Partner {
  name: string;
  logo: string;
  university: string;
  website: string;
  insta: string;
}

const chunk_array = (array: Partner[], size: number) => {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};


export function StudentPartners({windowWidth, isDark}:{windowWidth:number, isDark:boolean}) {

  // console.log(windowWidth);
  // console.log(Math.floor(windowWidth / 382));
  
  const chunked_partners = chunk_array(
    student_partners,
    Math.min(Math.floor(windowWidth / 382), 3)
  );

  var fade_speed = 5;

  const start_color = isDark ? [60, 60, 128] : [111, 169, 242];
  const end_color = isDark ? [23, 20, 86] : [116, 173, 246];
  const qmind_color = isDark ? [60, 60, 128] : [131, 187, 243];

  const gradients = Array.from({ length: chunked_partners.length }, (_, i) => ({
    from: `rgb(${start_color[0] - i * fade_speed}, ${start_color[1] - i * fade_speed}, ${start_color[2]})`,
    to: `rgb(${end_color[0] - (i + 1) * fade_speed}, ${
      end_color[1] - (i + 1) * fade_speed
    }, ${end_color[2]})`,
  }));

  console.log(gradients);

  return (
    <div id="student-partners" className="fourth-section">
      <div>
        <div className="title">
          <p className="small-liner">OUR STUDENT PARTNERS</p>
          {windowWidth >= 768 ? (
            <h1 className="big-liner">
              {"Empowering Tomorrow's Experts Today"}
            </h1>
          ) : (
            <>
              <h1 className={"big-liner " + PixelifySans.className}>
                {"Empowering Tomorrow's Experts Today"}
              </h1>
            </>
          )}
        </div>
        <div className="partner-content">
          <div 
            className="partner-feature flex flex-col md:flex-row gap-8 overflow-hidden"
            style={{
              background: `rgb(${qmind_color[0]}, ${qmind_color[1]}, ${qmind_color[2]})`,
            }}
          >
            <div className="main-partner-text">
              <h1 className={`main-partner-title self-end ${isDark ? "invert" : ""}`}>QMIND</h1>
              <p className="main-partner-details self-end">
                {"Queen's University"}
              </p>
              <p className="main-partner-links">
                <a className={`inner-text ml-[32px] ${isDark ? "invert" : ""}`} href="https://qmind.ca/">
                  <u>Website</u>
                  <Image
                    src={"/Link.png"}
                    width={24}
                    height={24}
                    alt="Link Symbol"
                    className="link-symbol"
                  />
                </a>
                <a
                  className={`inner-text ml-[32px] ${isDark ? "invert" : ""}`}
                  href="https://www.instagram.com/qmind.ai/"
                >
                  <u>Insta</u>
                  <Image
                    src={"/insta.png"}
                    width={24}
                    height={24}
                    alt="Insta Symbol"
                    className="link-symbol"
                  />
                </a>
              </p>
            </div>
            <Image
              src={"/logos/qmind-logo.png"}
              width={488}
              height={155}
              alt="QMIND Logo"
              className="main-feature-logo"
            />
          </div>
          {/* TODO: Fix typing problem */}
          <div className="partner-grid">
            {chunked_partners.map((row, row_index) => (
              <div className="partner-rows items-baseline" key={"Partner Rows"}>
                {row.map((partner) => (
                  <div key={partner.name}>
                    <div className="py-4 px-8">
                      <div
                        className="partner-body flex flex-col h-[347px] w-[382px] gap-4 -ml-[50px]"
                        key={partner.name}
                        style={{
                          background: `linear-gradient(to bottom, ${gradients[row_index].from}, ${gradients[row_index].to})`,
                        }}
                      >
                        <img
                          src={partner.logo}
                          className="w-[182px] h-[100px] mt-8 object-contain " 
                        ></img>
                        <p className="font-bold !text-[23pt]">{partner.name}</p>
                        <p className="text-[16pt] font-normal">
                          {partner.university}
                        </p>

                        <p className="partner-inner-text">
                          <a className="partner-links" href={partner.website}>
                            <u className="partner-link-text">Website</u>
                            <Image
                              src={"/Link.png"}
                              width={24}
                              height={24}
                              alt="Link Symbol"
                              className={`link-symbol ${isDark ? "invert" : ""}`}
                            />
                          </a>
                          <a
                            className="partner-links ml-[32px]"
                            href={partner.insta}
                          >
                            <u className="partner-link-text">Insta</u>
                            <Image
                              src={"/insta.png"}
                              width={24}
                              height={24}
                              alt="Insta Symbol"
                              className={`link-symbol ${isDark ? "invert" : ""}`}
                            />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <a href="/" className="partner-button--wrapper">
        <img
          src="become_a_partner.png"
          alt="Become A Partner"
          className="mt-8 ml-[40px] h-[61px] w-[220px]"
        />
      </a>
    </div>
  );
}
