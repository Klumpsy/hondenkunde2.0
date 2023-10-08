import { FaArrowUp } from 'react-icons/fa';

const Button = () => {
  const scrollToTop = () => {
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth' // if you want a smooth scrolling effect
      });
  };

  return (
      <button 
          onClick={scrollToTop}
          className="h-12 rounded-lg bg-orange font-bold px-5 text-white"
      >
       <FaArrowUp color='white'/>
      </button>
  );
};

export default Button;