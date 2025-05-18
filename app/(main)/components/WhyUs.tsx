"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReasonIcon from "@/assets/icons/reason.svg";
gsap.registerPlugin(ScrollTrigger);

export const WhyUs = ({ classes }: { classes?: string }) => {
  const reasons = [
    {
      title: "Innovative Storytelling",
      desc: "We create content that captures hearts and mindvs",
      order: "01",
      active: false,
    },
    {
      title: "Creative Expertise",
      desc: "Fresh ideas tailored to your brand's needs",
      order: "02",
      active: false,
    },
    {
      title: "Tailored Solutions",
      desc: "Customized strategies to achieve your goals",
      order: "03",
      active: false,
    },
    {
      title: "Professional Quality",
      desc: "High-end visuals with meticulous attention to detail",
      order: "04",
      active: false,
    },
    {
      title: "Collaborative Process",
      desc: "We listen, we create, and we deliver",
      order: "05",
      active: false,
    },
  ];

  const imageRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const reasonsWrapper = useRef<HTMLDivElement>(null);

  // تكوين ScrollTrigger لأجهزة iOS
  useEffect(() => {
    // إعداد ScrollTrigger بشكل أفضل لأجهزة iOS
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    });

    // التحقق مما إذا كان الجهاز يستخدم iOS
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);

    if (isIOS) {
      // إضافة فئة CSS خاصة بأجهزة iOS
      document.documentElement.classList.add("is-ios");

      // ضبط إعدادات ScrollTrigger الافتراضية لأجهزة iOS
      ScrollTrigger.defaults({
        preventOverlaps: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          // استخدام استدعاء requestAnimationFrame لتحسين الأداء
          if (!self.isActive) return;
          window.requestAnimationFrame(() => {
            // تنفيذ أي تحديثات هنا إذا لزم الأمر
          });
        },
      });
    }

    // تنظيف عند إلغاء التركيب
    return () => {
      // إيقاف أي ScrollTrigger مفعلة
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useGSAP(() => {
    // استخدام setTimeout بدل setInterval لتجنب معالجة كثيرة غير ضرورية
    // وأيضاً نقلل وقت التحديث إلى مرة واحدة فقط بعد تحميل الصفحة
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true); // تحديث كامل مرة واحدة
    }, 1000);

    // إنشاء timeline للصورة
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        scrub: 0.3, // قيمة أعلى من صفر لتنعيم الحركة في iOS
      },
    });

    // تثبيت الصورة أثناء التمرير
    if (imageRef.current) {
      tl.to(imageRef.current, {
        scrollTrigger: {
          pin: true,
          trigger: imageRef.current,
          scrub: 0.3, // تنعيم أكثر
          anticipatePin: 1,
          start: "top 120px",
          fastScrollEnd: true, // تحسين أداء iOS
          invalidateOnRefresh: true, // مهم للأجهزة المحمولة
        },
      });
    }

    // تحريك عناصر الأسباب
    const reasons = reasonsWrapper.current?.querySelectorAll(".reason");
    if (reasons) {
      reasons.forEach((r) => {
        gsap.to(r, {
          opacity: 1,
          y: 0,
          x: 0,
          scrollTrigger: {
            trigger: r,
            scrub: 0.3, // تنعيم أكثر
            start: "top 80%", // بدء مبكر قليلا
            end: "top 50%",
            toggleActions: "play none none reverse", // تحسين على iOS
          },
        });
      });
    }

    // تنظيف
    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [container]);

  return (
    <section
      className={twMerge("overflow-hidden pt-40", classes)}
      ref={container}
    >
      <div className="container">
        <div className="title text-center font-extralight mb-28">
          <h1 className="mb-3 text-4xl">
            Why Choose <b>Beez Production?</b>
          </h1>
          <p className="w-full md:w-[800px] m-auto">
            Choosing the right partner for your production needs can make all
            the difference. Here's why Beez Production is your best choice
          </p>
        </div>
        <div className="content flex justify-between gap-12">
          <div className="reasons pt-24 pb-24" ref={reasonsWrapper}>
            {reasons.map((reason, i: number) => {
              return (
                <div
                  className="reason flex relative gap-5 min-h-[300px] opacity-0 translate-y-[200px]"
                  key={i}
                >
                  <div className="icon hidden md:inline-block">
                    <ReasonIcon />
                  </div>
                  <div className="title-desc relative">
                    <div className="reason-number font-extralight absolute top-[-60%] left-0 w-full h-full text-[220px] opacity-10 pointer-events-none">
                      <span className="relative z-[1]">{"0" + (i + 1)}</span>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold">{reason.title}</h1>
                    <p className="text-lg font-light">{reason.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="image w-[50%] hidden lg:inline-block rounded-bl-[100px] overflow-hidden h-[calc(95vh-110px)] shadow-lg"
            ref={imageRef}
          >
            <Image
              src={"/home/reasons/1.png"}
              width={1000}
              height={1000}
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
