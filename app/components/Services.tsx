import { Service } from "./Service";
import VideoClipIcon from "@/assets/icons/video-clip.svg";
import TvIcon from "@/assets/icons/tv.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import LaudIcon from "@/assets/icons/loud.svg";
import { twMerge } from "tailwind-merge";

export const Services = ({ classes, title }: { classes?: string, title?: boolean }) => {
  return (
    <section className={twMerge("services py-16", classes)}>
      <div className="container">
        {
          title ? <div className="title mb-20 text-center font-extralight text-xl">
            <h1 className="font-extralight mb-4 text-4xl">
              Our <b>Services</b>
            </h1>
            <p className="w-full max-w-[700px] m-auto">
              At Beez Production, we offer a full range of services designed to
              amplify your brand’s presence
            </p>
          </div> : null
        }
        <div className={twMerge("services flex justify-between flex-wrap gap-12", classes)}>
          <Service
            icon={<VideoClipIcon />}
            title="Video Production"
            desc="From concept creation to final edits, we deliver cinematic visuals that tell your brand’s story powerfully and effectively"
          />
          <Service
            icon={<TvIcon />}
            title="TV Commercials"
            desc="We specialize in creating commercials that grab attention and leave a powerful impression. Whether it’s humorous, dramatic, or action-packed, we deliver it with precision"
          />
          <Service
            icon={<PencilIcon />}
            title="Creative Concepts"
            desc="Looking for something unique? Our creative team develops fresh, out-of-the-box ideas that resonate with your audience and leave them wanting more"
          />
          <Service
            icon={<LaudIcon />}
            title="Marketing Campaigns"
            desc="From branding videos to promotional reels, we craft campaigns that effectively showcase your products and services to the right audience"
          />
        </div>
      </div>
    </section>
  );
};
