import Image from "next/image";
import styles from "../styles/about.module.scss";
import { twMerge } from "tailwind-merge";

export const AboutSection = () => {
  return (
    <section className={twMerge("about", styles.about)}>
      <div className="container">
        <div className={styles.cards}>
          <div
            className={twMerge("overflow-hidden", styles.card, styles.card1)}
          >
            <Image
              src={"/about/card-1.png"}
              alt="background"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div className={twMerge("", styles.card, styles.card2)}>
            <Image
              src={"/about/card-2.png"}
              alt="background"
              width={1000}
              height={1000}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div
            className={twMerge(
              "text-center px-2 py-14 bg-background text-onBackground",
              styles.card,
              styles.card3
            )}
          >
            <h1 className="font-bold text-3xl mb-4 lg:text-5xl">25+</h1>
            <p className="uppercase font-light text-lg lg:text-xl">Years Of Experiance</p>
          </div>
          <div
            className={twMerge(
              "bg-gray-300 py-10 px-8",
              styles.card,
              styles.card4
            )}
          >
            <h2 className="uppercase mb-12 text-sm sm:text-lg font-medium">Who We Are</h2>
            <h1 className="font-bold text-4xl sm:text-5xl mb-12">
              Beez Production is an Iraqi video production
            </h1>
            <p className="font-light text-lg sm:text-xl text-justify">
              dedicated to redefining creativity and storytelling in the world
              of advertising. Specializing in high-quality TV commercials and
              imaginative creative concepts, we transform ordinary ideas into
              extraordinary visuals that leave lasting impressions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
