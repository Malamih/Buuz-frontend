import { Button } from "@/components/Button"
import Image from "next/image"

export const Hero = () => {
    return <section className="hero h-[calc(100vh-100px)]">
        <div className="bg absolute top-0 left-0 w-full md:w-[55%] bg-background h-full z-0 rounded-br-[200px]"></div>
        <div className="container gap-10 h-full flex items-center relative z-[1] text-onBackground">
            <div className="content w-full md:w-[50%] relative z-[1] text-center sm:text-left">
                <h1 className="text-5xl mb-6">Our Services</h1>
                <p className="mb-8 w-full md:w-[600px] text-2xl font-light">At Beez Production, we offer a full range of services designed to amplify your brand’s presences</p>
                <Button content="Contact us" classes="border-[#69696970] min-h-[55px] border-1 pl-6 rounded-xl" iconClasses="bg-[#2b2b2b] h-full rounded-lg" />
            </div>
            <div className="image hidden md:inline-block relative z-0 flex-1">
                <div className="image rounded-br-[75px] rounded-tl-[75px] overflow-hidden relative">
                    <div className="layer absolute top-0 left-0 w-full h-full bg-black opacity-60 lg:hidden"></div>
                    <Image src={"/services/heroImage.png"} width={1000} height={1000} alt="heroImage" className="w-[410px] rounded-br-[75px] rounded-tl-[75px]" />
                </div>
            </div>
        </div>
    </section>
}