import Image from "next/image";

interface RatingBoneProps {
  rating: number;
  ratedBy: string;
}

const RatingBone: React.FC<RatingBoneProps> = ({ rating, ratedBy }) => {
  const ratingTotal = Math.max(1, Math.min(10, rating));

  return (
    <div className="flex items-center">
      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-2 flex-shrink-0 ring-2 ring-orange/30">
        <Image
          src={`/images/${ratedBy}Rating.jpg`}
          fill
          sizes="40px"
          className="object-cover"
          alt="Rated by dog"
        />
      </div>
      
      <div className="flex items-center flex-wrap gap-0.5">
        {Array.from({ length: ratingTotal }).map((_, index) => (
          <div key={index}>
            <Image
              src="/images/filledBone.png"
              width={18}
              height={18}
              alt="Filled Bone"
            />
          </div>
        ))}

        {Array.from({ length: 10 - ratingTotal }).map((_, index) => (
          <div key={index + 10}>
            <Image
              src="/images/emptyBone.png"
              width={18}
              height={18}
              alt="Empty Bone"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBone;