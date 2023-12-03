import { useSignal } from "@preact/signals";
import { Handlers } from "$fresh/server.ts";
import Slide from "../components/Slide.tsx";
import ProjectsIcon from "../components/icons/ProjectsIcon.tsx";
import TreeIcon from "../components/icons/TreeIcon.tsx";
import ContactIcon from "../components/icons/ContactIcon.tsx";
import { asset, Head } from "$fresh/runtime.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
};

export default function Home() {
  const count = useSignal(5);
  return (
    <div class="mx-auto">
      <Head>
        <title>pyros.sh</title>
        <meta
          name="description"
          content="A fullstack developer from Bangalore who likes to create frameworks and programming languages."
        />
      </Head>
      <div>
        <div>
          <h1 class="text-3xl font-bold mb-4">Hello!</h1>
          <p>
            I'm{" "}
            <strong>Peter John</strong>, a fullstack developer from Bengaluru,
            India. I love writing code and I am lucky enough to do this as my
            job.
          </p>
          <p>
            I currently work for Equal Experts. I have a strong passion for
            golang but I also work with react and nodejs. I've mostly worked
            with startups and product based companies. I have gained a lot of
            domain specific knowledge in healthcare and finance during these
            startup years.
          </p>
          <p>
            I like to work on open source and hobby projects. Over the course of
            {" "}
            {new Date().getFullYear() - 2014}{" "}
            years I've accumulated a lot of useful projects used by many people
            around the world.
          </p>
        </div>
        <div>
          <div class="flex items-center mt-8 mb-4 [&>svg]:mr-2">
            <ProjectsIcon size="36" />
            <h2 class="my-0 text-3xl font-bold">Projects</h2>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
            <Slide
              title="Rust-embed"
              link="https://github.com/pyrossh/rust-embed"
              imgSrc={asset("/images/rust-embed.png")}
            >
              <p>
                A rust macro which loads files into the rust binary at compile
                time during release and loads the file from the fs during dev
              </p>
              <p>
                You can use this to embed your css, js and images into a single
                executable which can be deployed to your servers. Also it makes
                it easy to build a very small docker image for you to deploy
              </p>
            </Slide>
            <Slide
              title="Gromer"
              link="https://github.com/pyrossh/gromer"
              imgSrc={asset("/images/gromer.png")}
            >
              <p>
                Gromer is a framework and cli to build web apps in golang. It
                uses a declarative syntax using inline jsx like templates for
                components and pages.
              </p>
              <p>
                It also generates http handlers for your routes which follow a
                particular folder structure. Similar to other frameworks like
                nextjs, sveltekit. These handlers are also normal functions and
                can be imported in other packages to call them directly
              </p>
            </Slide>
            <Slide
              title="Palm"
              link="https://github.com/pyrossh/palm"
              imgSrc={asset("/images/pine.png")}
            >
              <p>
                A programming language with a syntax largely inspired by pyret
                and hush but with the simplicity of go.
              </p>
              <p>
                It has support for first class functions and has a clean syntax
                and can call C library functions directly. Pine programs will
                eventually be compiled to AMD64 and ARM64 and using QBE a small
                and fast compiler backend
              </p>
            </Slide>
            <Slide
              title="Gdx Studio"
              link="https://github.com/pyrossh/gdx-studio"
              imgSrc={asset("/images/gdx-studio.png")}
            >
              <p>GdxStudio is used for creating awesome games using libGDX.</p>
              <p>
                It has all the features of libGDX built-in so you can
                easily,start creating games with it. Automatic Asset Loading
                including Atlas, TextureRegions, BitmapFonts, Music, Sound.
                Tools like Font Editor, Particle Editor, Texture Packer,
                SceneEditor, MapEditor, ActorEditor, ImagingTools are already
                built into it
              </p>
            </Slide>
            <section class="flex flex-col flex-1">
              <div class="flex text-3xl font-bold child-svg:mr-2">
                <TreeIcon size="36" />
                Interests
              </div>
              <div class="ml-1 mt-6 mb-4">
                These are some of the stuff I work on
              </div>
              <ul class="grid gap-2 grid-cols-3 ml-4 [&>li]:list-disc [&>li]:px-0 [&>li]:py-1 [&>li:marker]:text-black">
                <li>HTML</li>
                <li>Javascript</li>
                <li>CSS</li>
                <li>SVG</li>
                <li>Go</li>
                <li>Rust</li>
                <li>Node</li>
                <li>Java</li>
                <li>React</li>
                <li>Postgres</li>
                <li>k8s</li>
                <li>Serverless</li>
              </ul>
            </section>
            <section class="flex flex-col flex-1">
              <div class="flex text-3xl font-bold child-svg:mr-2">
                <ContactIcon size="36" />
                Contact
              </div>
              <div class="ml-1 mt-6 mb-4">
                You can contact me through any of these methods
              </div>
              <div class="child:flex child:mb-3 child:ml-2 heir-a:ml-4 heir-a:text-blue">
                <div>
                  Email:
                  <a href="mailto:pyros2097@gmail.com">pyros2097@gmail.com</a>
                </div>
                <div>
                  Github:
                  <a href="https://github.com/pyrossh">pyrossh</a>
                </div>
                <div>
                  LinkedIn:
                  <a href="https://www.linkedin.com/in/peter-john-in">
                    pyrossh
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {
        /* <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div> */
      }
    </div>
  );
}
