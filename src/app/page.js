import Image from "next/image";
import ImageT from '../../public/poster2.jpg'
import CalssCardDesktop from '../../public/schedule.png'
import CalssCardMobile from '../../public/scheduleM.png'
import A from '../../public/A+.png'
import Badge from '../../public/medal.png'
import poster1 from '../../public/poser1.jpg';
import poster2 from '../../public/poster2.jpg';
import poster3 from '../../public/poster3.jpg';
import Pin from '../../public/pin.png'

export default function Home() {
  return (
    <div className="w-full h-full flex ">
      {/* ----------------------------------------------------------Desktop----------------------------------------------------------- */}
      <div className='hidden lg:flex w-full h-full bg-[#000000] mt-[7.96vh] flex-col'>

        {/* Section 1 (Hero) */}
        <div className="w-full h-[138.89vh] flex flex-col bg-[#000000] mt-[3.43vh]">

          {/* Image and little bit explaination */}
          <div className="w-full flex flex-row justify-evenly items-start">

            <div className="w-[23.8vw] min-h-[51.48vh] bg-[#FFFFFF] overflow-hidden">
              <Image src={ImageT} alt="test Image" width={457} height={556}/>
            </div>

            <div className="w-[25.89vw] h-full flex flex-col justify-start items-center">
              <p className="text-[1.67vw] text-[#FFFFFF] text-center">
                “If you are focusing on improving then you are already won”
              </p>

              {/* Info Box */}
              <div className="w-[25.89vw] h-auto flex flex-col items-center mt-[3.7vh]">
                <div className="w-[20.68vw] h-auto flex flex-col items-start">
                  <p className="text-[1vw] text-[#B0B0B0]">Advance Level Engineering Technology</p>
                  <p className="text-[1.67vw] font-bold text-[#F39C12] text-left">Aruna Ranasinghe</p>
                  <p className="text-[1vw] text-[#B0B0B0]">NDES(IET) B.ENG(UK)(UG) B.TECH(UVOT)(UG)</p>
                </div>
              </div>

              {/* List Box */}
              <div className="w-[25.89vw] flex justify-center items-center mt-[3.7vh]">
                <ul className="w-[20.68vw] h-auto flex flex-col items-start text-[#FFFFFF] list-disc pl-5">
                  <li>Indeepa - Gampaha</li>
                  <li>Sipla - Athurugiriya</li>
                  <li>Apex - Kegalla</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="w-full h-[83.89vh] absolute z-1 top-[57.32vh]">
            <div className="w-full h-[83.89vh] flex justify-center items-center">
              <Image src={CalssCardDesktop} alt="class Schedule" width={1585} height={906} className="w-[82.55vw] h-[83.89vh]"/>
            </div>
          </div>

        </div>

        {/* Section 2 (About) */}
        <div className="w-full h-[71.3vh] bg-[rgba(255,255,255,0.1)] flex items-center mt-[10.09vh]">

          <div className="w-[74.48vw] h-[62.78vh] flex flex-row ml-[3.54vw]">
            <Image src={ImageT} alt="test Image" width={712} height={678} />

            <div className="w-[34.79vw] h-[41.76vh] flex flex-col ml-[2.6vw]">
              <h2 className="text-[1vw] text-[#FFFFFF] font-bold">ABOUT ARUNA RANASINGHE</h2>
              <p className="text-[2.6vw] text-[#F39C12] font-bold mt-[2.41vh]">Aruna Ranasinghe’s Story</p>
              <p className="text-[1vw] text-[#B0B0B0] mt-[2.41vh]">
                After finishing the G.C.E (O/L) he started his tuition journey by teaching mathematics for G.C.E (O/L) students.
                Then he faced G.C.E (A/L) and got selected to University of Colombo for Engineering with great G.C.E (A/L) results.
                He started his journey of teaching for Advance Level in Engineering Technology in 2019 and he was graduated on 2022 in Engineering.
              </p>
              <div className="w-[34.79vw] h-auto flex justify-center items-center mt-[2.41vh]">
                <ul className="w-auto h-auto flex flex-col list-disc text-[1vw] text-[#B0B0B0]">
                  <li>10+ of years teaching experience</li>
                  <li>Having a lot ranking students</li>
                  <li>Teaching with practical examples</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-[15.63vw] h-[27.78vh] absolute z-1 top-[186.94vh] left-[76.3vw]">
            <Image src={A} alt="A+" width={300} height={300} className="w-[15.63vw] h-[27.78vh]" />
          </div>

          <div className="min-w-[10.42vw] min-h-[25.74vh] absolute z-1 top-[152.59vh] left-[87.19vw]">
            <Image src={Badge} alt="badge" width={200} height={278} className="min-w-[10.42vw] min-h-[25.74vh]" />
          </div>
        </div>

        {/* Section 3 (few posters) */}
        <div className="w-full h-[73.5vh] flex flex-col justify-start items-center mt-[11.11vh]">

          <div className="w-full h-[2.87vh] flex justify-center items-center">
            <p className="text-[1.67vw] text-[#FFFFFF] font-bold">NOTICE!</p>
          </div>

          <div className="w-[90.06vw] h-[66.37vh] flex flex-row justify-evenly items-start mt-[3.97vh]">
            <div className="w-[26.35vw] h-[52.05vh]">
              <Image src={Pin} alt="Pin" width={50.27} height={45} className="w-[2.62vw] min-h-[4.17vh] absolute top-[250vh] left-[19vw] drop-shadow-pinS z-10"/>
              <Image src={poster1} alt="Poster1" width={505.97} height={562.19} className="w-[26.35vw] h-[52.05vh] animate-wiggle"/>
            </div>

            <div className="w-[23.53vw] h-[59.35vh]">
              <Image src={Pin} alt="Pin" width={50.27} height={45} className="w-[2.62vw] min-h-[4.17vh] absolute top-[250vh] left-[48.33vw] drop-shadow-pinS z-10"/>
              <Image src={poster2} alt="Poster1" width={451.7} height={641} className="w-[23.53vw] h-[59.35vh] animate-wiggle"/>
            </div>

            <div className="w-[29.27vw] h-[52.04vh]">
              <Image src={Pin} alt="Pin" width={50.27} height={45} className="w-[2.62vw] min-h-[4.17vh] absolute top-[250vh] left-[75.45vw] drop-shadow-pinS z-10"/>
              <Image src={poster3} alt="Poster1" width={562} height={562} className="w-[29.27vw] h-[52.04vh] animate-wiggle"/>
            </div>

          </div>
        </div>

      </div>

      {/*----------------------------------------------------------- Mobile ------------------------------------------------------------ */}
      <div className="flex lg:hidden w-full min-h-screen bg-[#000000] flex-col justify-start items-center pt-[7.96vh]">
        {/* Image of Aruna sir */}
        <div className="w-[65.53vw] aspect-[1/1] flex overflow-hidden mt-[1.2vh]">
          <Image src={poster3} alt="test Image" width={267} height={267} className="w-full h-full object-cover" />
        </div>

        {/* Text Content */}
        <div className="w-full flex flex-col justify-center items-center mt-[1.2vh]">
          <p className="text-[4.66vw] text-[#B0B0B0]">Advance Level Engineering Technology</p>
          <p className="text-[7.77vw] font-bold text-[#F39C12]">Aruna Ranasinghe</p>
          <p className="text-[4.66vw] text-[#B0B0B0]">
            NDES(IET) B.ENG(UK)(UG) B.TECH(UVOT)(UG)
          </p>
          <ul className="text-[4.66vw] text-[#FFFFFF] list-disc list-inside mt-[4.69vh]">
            <li>Indeepa - Gampaha</li>
            <li>Sipla - Athurugiriya</li>
            <li>Apex - Kegalla</li>
          </ul>
        </div>

        <div className="w-full h-[68.7vh] flex justify-center items-center mt-[6.22vh]">
          <Image src={CalssCardMobile} alt="class Schedule" width={360} height={630} className="w-[87.38vw] h-[68.7vh]"/>
        </div>

        <div className="w-full h-[109.27vh] flex flex-col items-start justify-center bg-[rgba(255,255,255,0.1)]">
          <h2 className="text-[4.66vw] text-[#FFFFFF] font-bold ml-[3.64vw]">ABOUT ARUNA RANASINGHE</h2>
          
          <div className="w-[24.27vw] min-h-[15.16vh] absolute z-10 top-[146vh] left-[74.76vw]">
            <Image src={Badge} alt="badge" width={100} height={100} className="w-[24.27vw] h-full object-cover"/>
          </div>

          <div className="w-full h-[44.17vh] flex justify-center items-center mt-[1.2vh]">
            <div className="w-[98.3vw] h-[44.17vh] flex">
              <Image src={poster3} alt="test Image" width={267} height={267} className="w-full h-full object-cover"/>
            </div>
          </div>

          <p className="w-[77.67vw] h-[9.38vh] text-[#F39C12] text-[7.77vw] font-bold mt-[1.2vh] ml-[3.64vw]">Aruna Ranasinghe’s Story</p>
          <p className="text-[4.66vw] text-[#B0B0B0] mt-[2vh] ml-[3.64vw]">After finishing the G.C.E (O/L) he started his tuition journey by teaching mathematics for G.C.E (O/L) students, Then he faced G.C.E (A/L) and got selected to University of Colombo for Engineering with great G.C.E (A/L) results. He started his journey of teaching for Advance Level in Engineering Technology in 2019 and he was graduated on 2022 in Engineering.</p>
          
          <div className="w-full h-[13.2vh] flex justify-center items-center">
            <ul className="w-[71.84vw] h-[13.2vh] flex flex-col items-start justify-center list-disc text-[4.66vw] text-[#B0B0B0]">
              <li>10+ of years teaching experience</li>
              <li>Having a lot ranking students</li>
              <li>Teaching with practical examples</li>
            </ul>
          </div>

        </div>

        <div className="w-full h-[152.38vh] flex flex-col items-center justify-center">
          <p className="font-bold text-[#FFFFFF] text-[4.66vw] mb-[5.96vh]">NOTICE!</p>

          <div className="w-[84.98vw] h-[42.42vh] flex overflow-hidden animate-wiggle">
            <Image src={Pin} alt="Pin" width={30.16} height={27} className="absolute w-[7.32vw] h-[2.94vh] left-[46.36vw] drop-shadow-pinS"/>
            <Image src={poster1} alt="Poster1" width={350.1} height={389} className="w-[84.98vw] h-[42.42vh]"/>
          </div>


          <div className="w-[85.01vw] h-[54.2vh] flex overflow-hidden mt-[1.61vh] mb-[1.61vh] animate-wiggle">
            <Image src={Pin} alt="Pin" width={30.16} height={27} className="absolute w-[7.32vw] h-[2.94vh] left-[46.36vw] drop-shadow-pinS"/>
            <Image src={poster2} alt="Poster1" width={350.23} height={497} className="w-[85.01vw] h-[54.2vh]"/>
          </div>


          <div className="w-[85.01vw] h-[54.2vh] flex overflow-hidden mb-[1.61vh] animate-wiggle">
            <Image src={Pin} alt="Pin" width={30.16} height={27} className="absolute w-[7.32vw] h-[2.94vh] left-[46.36vw] drop-shadow-pinS"/>
            <Image src={poster3} alt="Poster1" width={350} height={350} className="w-[84.95vw] h-[38.17vh]"/> 
          </div>
        </div>

      </div>

      


    </div>
  );
}
