// Next.js
import Image from "next/image";

// Components
import { AuthForm } from "./components/AuthForm";

// Assets
import { authImg } from "@/assets";

const Home = () => {
  return (
    <main className="grow section-container grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8 py-7 lg:py-8 place-content-center">
      <div className="lg:order-2 relative aspect-19/10 lg:aspect-1920/2507 w-full overflow-hidden rounded-[20px] max-h-[calc(100dvh-66px)] lg:max-h-[calc(100dvh-162px)]">
        <Image
          src={authImg}
          alt=""
          fill
          placeholder="blur"
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="(max-width: 640px) calc(100vw - 24px), (max-width:768px) 592px, (max-width: 1024px) 704px, (max-width: 1280px) 464px, (max-width: 1536px) 592px, 720px"
        />
      </div>
      <AuthForm />
    </main>
  );
};

export default Home;
