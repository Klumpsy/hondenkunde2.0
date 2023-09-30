import Link from "next/link";

const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}): JSX.Element => {
  return (
    <>
      <div
        className={`fixed w-full h-full bg-gray-900 top-0 left-0 transition-transform duration-100 ease-in-out transform ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
        style={{zIndex: 1000}}
      >
      <button className="absolute right-0 p-5" onClick={toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          />
        </svg>
      </button>

        <ul className="sidebar-nav text-white mt-20 text-center leading-relaxed text-xl">
          <li>
            <Link href="/">
              <p>Home</p>
            </Link>
              </li>
          <li>
            <Link href="/artiRating" onClick={toggle}>
              <p>Arti's Rating</p>
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={toggle}>
              <p>Blog</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;