/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
export default async function About() {
  return (
    <main className="text-base-950 dark:text-base-paper grow">
      <h1 className="text-8xl font-display font-medium mt-24">about</h1>
      <section className="grid grid-cols-12 mt-24 gap-12">
        <div className="col-span-6">
          <Image
            src="/about/alto.jpeg"
            width={1000}
            height={500}
            alt="Xerox. Children using the Alto personal computer, ca. 1979. Courtesy of PARC."
            className="w-full rounded-sm"
          />
          <p className="font-mono font-extralight text-base-700 dark:text-base-500 text-xs w-full mt-3">
            Xerox. Children using the Alto personal computer, ca. 1979. Courtesy
            of PARC.
          </p>
        </div>
        <div className="col-span-6">
          <h2 className="font-mono mb-4 uppercase text-sm">Motivation</h2>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            I've long wanted to build a perspective into the history of Human
            Computer Interaction (HCI) or Interaction design and dig deeper into
            its origins, and the rich and diverse academic research that has
            helped shape what it is today. I often find reading research
            provides a level of depth, new knowledge, and new perspectives that
            deeply appeals to me. As many designers might attest to, being
            curious, and a continuous learner lies at the heart of being a
            designer. Research, at least for me, has been one source of
            continuous inspiration, understanding, and motivation that fuels my
            passion for Interaction design.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            Also, from my own experiences, I've noticed that designers often
            don't engage or show interest in reading academic papers. Which is
            understandable, as academic papers can often be dense, highly
            technical and theoretical. Certainly not immediately appealing as a
            beatifully crafted, visually engaging layout or interaction.
            Moreover, the sheer volume of HCI research, understanding what to
            read, and even how to read a paper can be quite overvhelming.
          </p>

          <p className="mt-4 text-base font-sans font-light text-pretty">
            So with this project, I attempted to synthesize some of the most
            influential academic research into broad outlines and topics,
            capturing some of it’s seminal papers that illustrate it’s history,
            key developments, and areas of research. This is by no means meant
            be to comprehensive, or expertly compiled - but it is an attempt at
            simplifying a vast body of literature into relevant, and digestible
            areas.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            This was also a project for me to learn more about current AI
            capabilities, and to try out full stack development. I built this
            site using Next.js, Tailwind, with Supabase as the database. I've
            also implemented semantic search using Retrieval Augemented
            Generation (RAG) using PineCone as the vector database.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            I learned a great deal about HCI through this effort, but more
            importantly I learned a lot more about what I don’t know. This
            project helped me discover so much new research, and new
            perspectives that I believe will help me see and try things in new
            ways. I sincerely hope you’ve found something useful here, or at the
            very least, hope it serves as a vantage point for you to explore
            your own interests in this wonderful field.
          </p>
          <h2 className="font-mono mt-8 mb-4 uppercase text-sm">
            Looking Back, Looking Forward
          </h2>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            With AI ushering in a paradigm shift, I believe it's especially
            important today to bridge the academic, and practitioner sides of
            HCI. As Susanne Bødker notes in HCI Remixed, "..we need to keep
            reminding ourselves of how and why, our everyday technology came
            into being. In order to be better at pointing to the future, it
            needs to be aware of its history too."
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            We should be careful not to take the ideas, principles, and models
            developed in the past for granted, but rather, to understand the
            context in which they were developed, and reflect on how they can be
            applied to the present and future. Moreover, there are decades-old
            ideas once unachievable or too ahead of their time that are newly
            relevant. We can reignite innovation by building on seminal concepts
            now realizable through new capabilities.
          </p>
        </div>
      </section>
    </main>
  );
}
