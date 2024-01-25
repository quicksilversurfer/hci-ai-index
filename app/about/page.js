/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
export default async function About() {
  return (
    <main className="text-base-950 dark:text-base-paper">
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

        <div className="col-span-6 col-start-7">
          <p className="text-base font-sans font-normal text-pretty">
            Human-computer interaction (HCI) has grown from a speciality area in
            computer science in the 1980s, to the vast integrative and diverse
            discipline as it exists today. It has quickly expanded to embrace
            perspectives from cognitive science, human factors engineering,
            psychology, design, information systems, systems engineering, and
            many areas of design. As John M. Carroll puts it - "There is no
            unified concept of an HCI professional."
          </p>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            The landscape of core HCI concepts and skills is far more
            differentiated and complex than it was in the 1980s. Today, HCI
            programs train many different types of professionals: user
            experience designers, interaction designers, usability engineers,
            user researchers, information architects, and more. The field
            evolved from its origins as a niche specialization to become an
            umbrella discipline expanding through the synthesis of diverse
            concepts, theories, and technical skills from both academia and
            industry. And so, it might be best characterized, as a community of
            communities.
          </p>
          <h2 className="font-mono mt-8 mb-4 uppercase text-sm">Motivation</h2>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            As an outsider without a traditional design background, I've long
            wanted to dive deeper into the history of this field I'm so
            passionate about. Peicing together it's rich history, and finding my
            own synthesis of the literature has been challenging yet rewarding.
            Like falling down a rabbit hole into wonderland. There is so much
            phenomenal research happening which practitioners often aren't aware
            of until stumbling upon a relevant paper or thesis that shines a
            light on topics one is researching.
          </p>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            The scale and complexity of HCI can quickly become overwhelming. But
            richness comes with some messiness. Although there are clear
            contours to this vast field, there can be innumerous pathways that
            are illuminated by one's own personal interests, and topics they
            care about. This project documents my attempt at mapping some of my
            interests within the vastness of HCI literature. At the very least,
            I hope it serves as a vantage point for others to explore this
            field.
          </p>

          <h2 className="font-mono mt-8 mb-4 uppercase text-sm">Process</h2>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            I integrated LLMs (Large Language Models), such as GPT-4, and Claude
            2 deeply into my workflow for this project. My main goal being to
            get a feel for these new design materials and understand their
            current capabilities. I leveraged these models for everything from
            identifying seminal works, to creating high-level categorizations,
            and finally coaxing them to produce consistent summaries of these
            works.
          </p>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            Overall, the results have been quite impressive. I have never before
            used a technology that has been so instrumental and general purpose
            in my workflow - perhaps only search comes close. However, despite
            the initial astonishment at capabilities, you quickly start hitting
            the limits of these tools in terms of either the quality or depth
            you may be looking for. These models are also quite brittle, and
            each answer often requires careful review. Every so often there will
            be a minor hallucination that throws you completely off, reminding
            you that large language models are essentially just making educated
            guesses based on probabilities over billions of vectors. As OpenAI
            recommends, prompt engineering makes a substantial difference to the
            output. And I have a much greater appreciation for prompt
            engineering as a discipline than when I started the project.
          </p>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            What I think works great is that this technology or tool offers me a
            generous starting position - with a simple enough prompt, I was able
            to get a list of 25 influential papers that I could start with.
            After that, I was hooked. Or rather, ready to dive deeper down the
            rabbit hole. I started to immediately debate why certain papers and
            theories were included or excluded, or what that right level of
            summaries should be, and where should I go to learn more. And on and
            on it went.
          </p>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            Over a period of time doing my own research through tools like
            Connected Papers(which I highly recommend), and reading books such
            as HCI Remixed, or reading references from Ben Schneidermann's
            excellent book on Human Centered AI, I gradually built outlines of
            my search that felt complete. Over time, I could see repeating
            patterns and core topics emerge which offered useful feedback, and
            boundaries that guided my exploration. These topics, after some
            iteration, eventually formed the 6 high level categories that you
            see the collections organized into.
          </p>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            Excited with this progress, I set upon to collect more papers that
            would enrich these collections, though admittedly I have not yet
            read them in depth, but rather skimmed and reviewed the abstracts.
            My hope is to over time get deeply familiar with them, as that was
            part of my motivation for building this project initially. Besides
            having reams of documents with various categorizations of these
            works, innumerous summaries, and scattered notes across my note
            taking tools, I also have a substantial list of papers in a Notion
            table that I aim to read, and include here eventually.
          </p>
          <h2 className="font-mono mt-8 mb-4 uppercase text-sm">Technology</h2>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            Building this project using Next.js, Supabase, and Tailwind with a
            bit of help from Github Copilot has been a joy. I've missed the flow
            of web development, and leveraging Next.js's latest features like
            React Server Components (RSC) introduces a simple and performant way
            to build applications. The ease of use of Supabase using it's
            powerful APIs, and in-app editors helped me overcome the challenge a
            front-end developer experience thinking about the backend. I've
            thoroughly enjoyed using Tailwind and it's utility-classes which are
            quite flexible, powerful and bring an unexpected delight to writing
            CSS.
          </p>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            I'm genuinely excited about the future of these frameworks and
            tools, and foresee using them frequently to get started on new
            projects. The combination of Next.js for its server-side rendering
            and ahead-of-time compilation, Supabase for quick and scalable data
            storage, and Tailwind for rapid UI development gives me an easy to
            use stack that I look forward to applying to more projects.
          </p>
          <h2 className="font-mono mt-8 mb-4 uppercase text-sm">
            Looking Back, Looking Forward
          </h2>
          <p className="mt-4 text-base font-sans font-normal text-pretty">
            With AI ushering in a paradigm shift, I believe it's especially
            important today to bridge the academic, and practiotioning side of
            HCI. As Susanne Bødker notes in HCI Remixed, "..we need to keep
            reminding ourselves of how and why, our everyday technology came
            into being. In order to be better at pointing to the future, it
            needs to be aware of its history too." We should be careful not to
            take the ideas, principles, and models developed in the past for
            granted, but rather, to understand the context in which they were
            developed, and reflect on how they can be applied to the present and
            future. Moreover, there are decades-old ideas once unachievable or
            too ahead of their time that are newly relevant. We can reignite
            innovation by building on seminal concepts now realizable through
            new capabilities.
          </p>
        </div>
      </section>
    </main>
  );
}
