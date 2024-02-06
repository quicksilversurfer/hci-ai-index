/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
export default async function About() {
  return (
    <main className="text-base-950 dark:text-base-paper grow px-4 sm:px-8 2xl:px-0">
      <h1 className="text-8xl font-display font-medium mt-24">about</h1>
      <section className="grid grid-cols-12 mt-24 gap-12">
        <div className="col-span-12 lg:col-span-6">
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
        <div className="col-span-12 lg:col-span-6">
          <h2 className="font-mono mb-4 uppercase text-sm">Motivation</h2>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            I've long been fascinated by the rich history and academic research
            behind human-computer interaction and interaction design. As a
            designer, I'm always seeking to learn new things that can fuel my
            work with fresh inspiration and perspectives. I often find that
            reading papers provides me with meaningful depth and knowledge that
            appeals to my innate desire to learn more about the world, and this
            field that I am so passionate about.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            Over the years, I've realized that academic literature isn't always
            the most accessible, especially for my fellow designers who've
            arrived in this field through their own unique, non-traditional
            journeys. Papers can be dense, technical, and frankly dull to pore
            through sometimes. With so much research out there, just figuring
            out where to start can be an intimidating barrier.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            My hope with this website is to synthesize some of the seminal HCI
            papers into simplified outlines and topics. This is by no means a
            comprehensive academic guide, but rather my humble attempt to
            distill the key developments in HCI history into digestible
            takeaways. A little passion project from one learning designer to
            others who share my curiosity.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            Through this effort, I learned so much about the foundations of HCI
            and also became acutely aware of all that I don't yet fully grasp.
            But most rewarding of all, was discovering so many fascinating
            perspectives that I believe will help me approach design challenges
            in new and interesting ways.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            If you found any value in these amateur compilations, or they
            provide a springboard to explore papers that pique your interests -
            I'm overjoyed! My sincere wish is that this site sparks your own
            learning adventures into the captivating world of HCI. A little
            vantage point for you to explore your own interests in this
            wonderful field.
          </p>
          <h2 className="font-mono mt-8 mb-4 uppercase text-sm">
            Looking Back, Looking Forward
          </h2>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            With AI ushering in a paradigm shift, it's especially important
            today to bridge the academic, and practitioner sides of HCI. As
            Susanne Bødker notes in{" "}
            <a
              href="https://www.amazon.com/HCI-Remixed-Reflections-Influenced-Community/dp/0262050889"
              className="link-style"
            >
              HCI Remixed
            </a>
            , "..we need to keep reminding ourselves of how and why, our
            everyday technology came into being. In order to be better at
            pointing to the future, it needs to be aware of its history too."
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            I really believe that understanding our academic history is crucial
            for innovating thoughtfully. While we must keep sight of future
            opportunities, we shouldn't overlook the hard-won UX principles of
            the past. In fact, longstanding HCI concepts, once impossible, may
            open new possibilities when reimagined through modern capabilities.
          </p>
          <p className="mt-4 text-base font-sans font-light text-pretty">
            If my little contribution helps even one fellow traveller uncover
            inspiring ideas - that alone makes every hour invested here
            worthwhile.
          </p>
          <div className="border-t border-base-200 dark:border-base-800 mt-12">
            <h2 className="font-mono mb-4 uppercase text-sm mt-12">
              Process & Tools
            </h2>
            <p className="mt-4 text-base font-sans font-light text-pretty">
              I built this site using{" "}
              <a href="https://nextjs.org/" className="link-style">
                Next.js
              </a>{" "}
              for the frontend framework along with{" "}
              <a href="https://tailwindcss.com/" className="link-style">
                Tailwind
              </a>{" "}
              for styling. For the backend database, I went with{" "}
              <a href="https://supabase.com/" className="link-style">
                Supabase
              </a>{" "}
              for its simplicity and generous free tier.
            </p>
            <p className="mt-4 text-base font-sans font-light text-pretty">
              Figuring out where to start with all the seminal literature was
              definitely intimidating. I leaned heavily on AI to help point me
              in the right direction. I began by prompting OpenAI's latest
              natural language model, GPT-4, to suggest some of the most
              influential HCI papers over time. I supplemented the AI's
              recommendations using tools like{" "}
              <a href="https://www.connectedpapers.com/" className="link-style">
                Connected Papers
              </a>{" "}
              to discover additional relevant works cited together. Reading
              lists from{" "}
              <a
                href="https://ic.gatech.edu/phd-hcc-hci-reading-list"
                className="link-style"
              >
                top university programs
              </a>{" "}
              , alongside references from books such as Ben Shneiderman's{" "}
              <a
                href="https://www.amazon.com/Human-Centered-AI-Ben-Shneiderman/dp/0192845292"
                className="link-style"
              >
                Human-Centered AI
              </a>{" "}
              also provided a great foundation.
            </p>
            <p className="mt-4 text-base font-sans font-light text-pretty">
              To generate the paper summaries, I created GPT-4 Assistants on
              OpenAI and simply prompted titles without any full-text uploads.
              The impressively accurate overviews demonstrate how much knowledge
              these models have accumulated through pre-training alone!
            </p>
            <p className="mt-4 text-base font-sans font-light text-pretty">
              Organizing the sprawling academic content coherently was an
              iterative learning process. After several attempts plus many GPT-4
              prompting cycles, I finally landed on categorical groupings that
              made intuitive sense. The interconnected and overlapping nature of
              HCI research makes it quite challenging to categorize papers into
              neat buckets, but I eventually landed on the current structure,
              which feels right, and provides a nice overview.
            </p>
            <p className="mt-4 text-base font-sans font-light text-pretty">
              I also implemented semantic search using a Retrieval Augmented
              Generation (RAG) with a{" "}
              <a href="https://www.pinecone.io/" className="link-style">
                Pinecone
              </a>{" "}
              vector database backend. I created embeddings of the the paper
              summaries which are then used for comparison against user queries,
              surfacing relevant results. Ultimately, interpreting search
              queries by semantic similarity rather than just keywords. The
              results are decent but could be further improved by higher quality
              embeddings from larger volumes of HCI content, or enhanching the
              search through keywords. There is ongoing research in this area,
              and as capabilities and techniques evolve, I hope to integrate
              them into this project.
            </p>
            <p className="mt-4 text-base font-sans font-light text-pretty">
              On the whole, this project gave me hands-on experience with
              cutting-edge AI across summarization, classification, information
              retrieval, and language generation. I also gained full stack web
              development skills thanks to Next.js and Supabase. But most of
              all, it's thrilling to have a platform to share my passion for
              HCI, and to be able to contribute to the community in my own small
              way.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
