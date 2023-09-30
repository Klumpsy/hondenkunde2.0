import Image from 'next/image'; // Ensure you have this import if you haven't already
import Link from 'next/link'; // Importing Link to properly handle client-side navigation

type HeaderProps = {
  imageName: string;
  linkHref: string;
  titleText: string;
  anchorText: string;
};

const Header = ({ imageName, linkHref, titleText, anchorText }: HeaderProps) => (
  <header>
  <div className="relative w-full h-screen flex items-center justify-center" style={{ height: '40rem' }}>
    <div className="absolute w-full h-full">
      <Image
        src={`/images/${imageName}`}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute z-0"
      />
    </div>
    <div className="z-10 bg-gray-500 bg-opacity-50 absolute w-full h-full" />
    <div className="z-20 text-center">
      <h1 className="mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-orange md:text-5xl lg:text-6xl">
        {titleText}
      </h1>
      <Link href={linkHref}>
        <p className="inline-block mt-7 px-4 py-2 bg-darkBlue text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500" style={{ maxWidth: '250px' }}>
          {anchorText}
        </p>
      </Link>
    </div>
  </div>
</header>
);

export default Header;