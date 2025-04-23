"use client"

import { CustomInput } from "@/components/CustomInput"
import { CustomTextarea } from "@/components/CustomTextarea"
import Image from "next/image"
import { useState } from "react"
import CheckedIcon from "@/assets/icons/checked.svg"
import clsx from "clsx"

export const ContactForm = () => {
    const [servicesCheckBoxes, setServicesCheckBoxes] = useState([
        {
            title: "Video Production",
            active: false,
            value: "video-production",
            name: "service"
        },
        {
            title: "Creative Concepts",
            active: false,
            value: "creative-concepts",
            name: "service"
        },
        {
            title: "Tvc Commercial",
            active: false,
            value: "tvc-commercial",
            name: "service"
        },
        {
            title: "Marketing Campaigns",
            active: false,
            value: "marketing-campaigns",
            name: "service"
        },
    ])

    const setActive = (value: string) => {
        const services = [...servicesCheckBoxes]
        const index = services.findIndex(service => service.value == value)
        services[index].active = !services[index].active
        console.log(value);
        setServicesCheckBoxes(services)
    }

    return (
        <section className="contactForm text-onBackground bg-[#262626] lg:bg-[linear-gradient(to_right,_#262626_50%,_white_50%)]">
            <div className="container flex gap-4 flex-col lg:flex-row p-0">
                <div className="logo z-0 absolute top-[90%] left-0 w-[300px]">
                    <Image src={"/darkLogo.svg"} alt="logo" width={300} height={400} />
                </div>
                <div className="title lg:w-full min-w-[400px] pt-[100px]">
                    <h1 className="font-bold mb-4 text-4xl md:text-6xl italic">Let's talk!</h1>
                    <p className="font-light w-full max-w-[500px] text-2xl md:text-5xl italic">Ready to create the <b>buzz</b> your brand needs?</p>
                </div>
                <form className="flex m-auto z-10 flex-col gap-4 py-12 px-2 bg-white text-black">
                    <h1 className="text-center text-4xl mb-12">Contact us</h1>
                    <CustomInput label="Name" placeholder="Your Name" id="name" type="text" />
                    <CustomInput label="Email" placeholder="Your Email" id="email" type="email" />
                    <CustomInput label="Mobile number" placeholder="+964 0000000000" id="phone_number" type="phoneNumber" />
                    <CustomTextarea id="message" label="How can we help?" placeholder="Your Message..." />
                    <div className="services">
                        <h1 className="text-2xl font-bold mb-6">Services</h1>
                        <div className="checkBoxes flex flex-wrap gap-4">
                            {servicesCheckBoxes.map((service, i: number) => {
                                return <div className="service cursor-pointer w-full lg:w-[calc(50%-16px)] text-[#848484] text-2xl font-light flex items-center gap-2" key={i}>
                                    <div className="input relative min-w-[25px] min-h-[25px] border border-[#848484]">
                                        <div className={clsx("active opacity-0 absolute flex top-0  items-center justify-center left-0 w-full h-full bg-background", {
                                            'opacity-100': service.active
                                        })}>
                                            <CheckedIcon className="scale-70 fill-onBackground" />
                                        </div>
                                        <input type="checkbox" className="hidden" onInput={() => setActive(service.value)} name={service.name} value={service.value} id={service.value} />
                                    </div>
                                    <label htmlFor={service.value} className="cursor-pointer select-none">{service.title}</label>
                                </div>
                            })}
                        </div>
                    </div>
                    <button className="text-3xl py-4 px-4 bg-[#262626] mt-4 cursor-pointer text-white rounded-xl">Get Started</button>
                </form>
            </div >
        </section >
    )
}