export const VisionAndValue = () => {
  const cards = [
    {
      title: "The Buzz That You Need",
      desc: "",
      list: [],
      areaId: "main",
    },
    {
      title: "Our Mission",
      desc: "To elevate Iraqi TV commercials to new levels of creativity and directing. We believe every brand has a story to tell, and our job is to make sure your audience not only hears it but feels it",
      areaId: "mission",
      list: [],
    },
    {
      title: "Our Vision",
      desc: "We aim to be the most innovative and influential video production company in Iraq, known for our cutting-edge creativity and high-quality content. Our goal is to create commercials that go beyond promotion and become memorable experiences",
      areaId: "vision",
      list: [],
    },
    {
      title: "Our Values",
      desc: "",
      list: [
        {
          title: "Creativity",
          desc: "We push boundaries to craft original ideas that make your brand stand out.",
        },
        {
          title: "Quality",
          desc: " Excellence in every detail, from scripting to post-production.",
        },
        {
          title: "Collaboration",
          desc: "Your vision matters, and we make it our priority.",
        },
        {
          title: "Innovation",
          desc: "Continuously evolving to stay ahead of industry trends.",
        },
        {
          title: "Integrity",
          desc: "Building lasting relationships based on trust and transparency.",
        },
      ],
      areaId: "values",
    },
  ];
  const cardsEl = cards.map((card, i: number) => {
    return (
      <div className="card" key={i}>
        <h1 className="font-bold text-lg py-4 px-5 bg-white rounded-2xl">
          {card.title}
        </h1>
        <p>{card.desc}</p>
      </div>
    );
  });
  return (
    <section className="mission-vision-value">
      <div className="cards">{cardsEl}</div>
    </section>
  );
};
