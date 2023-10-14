'use client'
import { useRouter, usePathname  } from "next/navigation";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const ShareOnSocials: React.FC<ShareOnSocialsProps> = ({ title}) => {
    const encodeURIString = (s: string) => encodeURIComponent(s);

    const pathName = usePathname()
    const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`;

    const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIString(fullUrl)}`;
    const xShareLink = `https://twitter.com/intent/tweet?text=${encodeURIString(title)}&url=${encodeURIString(fullUrl)}`;
    const whatsappShareLink = `https://wa.me/?text=${encodeURIString(title)}%20${encodeURIString(fullUrl)}`;
  
    return (
    <div className="p-4 bg-gray-100 rounded-md">
        <div className="flex justify-center items-center space-x-4">
            <a className="hover:text-blue-500" href={facebookShareLink} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                <BsFacebook size={32} />
            </a>
            <a className="hover:text-gray-500" href={xShareLink} target="_blank" rel="noopener noreferrer" aria-label="Tweet">
                <FaXTwitter size={32} />
            </a>
            <a className="hover:text-green-400" href={whatsappShareLink} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
                <BsWhatsapp size={32} />
            </a>
        </div>
    </div>
    );
  };
  
  export default ShareOnSocials;