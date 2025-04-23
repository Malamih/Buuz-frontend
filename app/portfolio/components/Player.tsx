import Image from "next/image";
import PlayIcon from "@/assets/icons/play.svg";

export const Player = () => {
  return (
    <section className="player">
      <div className="container px-0">
        <div className="default w-full">
          <div className="video bg-gray-900 relative flex justify-center rounded-tl-[100px] rounded-br-[100px] overflow-hidden">
            <div className="image w-full">
              <Image
                src={"/portfolio/main.png"}
                width={1000}
                height={1000}
                alt="default"
                className="w-full object-cover"
              />
              <div className="playIcon cursor-pointer absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                <PlayIcon className="scale-50 md:scale-100" />
              </div>
              <div className="content w-full justify-center absolute bottom-[30px] left-2/4 -translate-x-2/4 flex items-center gap-4 md:gap-12">
                <div className="label-value text-xs lg:text-lg">
                  <h1 className="font-bold">DATE</h1>
                  <p className="font-light">FEB 24, 2024</p>
                </div>
                <div className="label-value text-xs lg:text-lg">
                  <h1 className="font-bold">CLIENT</h1>
                  <p className="font-light">MIRMAZ ACADEMY</p>
                </div>
                <div className="label-value text-xs lg:text-lg">
                  <h1 className="font-bold">TYPE</h1>
                  <p className="font-light">COMMERCIAL</p>
                </div>
              </div>
            </div>
          </div>
          <div className="title px-4 sm:p-0 text-2xl sm:text-4xl my-6 font-bold">
            <h1>Mirmaz Academy TVC | مرماز تحلها</h1>
          </div>
          <div className="profile px-4 sm:p-0 flex gap-4">
            <Image
              src={"/portfolio/profile.png"}
              width={60}
              height={60}
              alt="profile"
            />
            <div className="content">
              <h1 className="text-2xl font-bold">Beez Production</h1>
              <p className="date text-lg font-light">4 months ago</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
