"use server";

import Image from "next/image";

interface RatingBoneProps {
  rating: number;
  ratedBy: string;
}

const RatingBone: React.FC<RatingBoneProps> = ({ rating, ratedBy }) => {
  const ratingTotal = Math.max(1, Math.min(10, rating));

  return (
    <div className="flex">
      <Image
        src={`/images/${ratedBy}Rating.jpg`}
        className="rounded-full mr-3"
        width={40}
        height={40}
        alt="Rated by dog"
      />
      <div className="flex items-center">
        {Array.from({ length: ratingTotal }).map((_, index) => (
          <div key={index} className="mr-1">
            <Image
              src="/images/filledBone.png"
              width={20}
              height={20}
              alt="Filled Bone"
            />
          </div>
        ))}

        {Array.from({ length: 10 - ratingTotal }).map((_, index) => (
          <div key={index + 10} className="mr-1">
            <Image
              src="/images/emptyBone.png"
              width={20}
              height={20}
              alt="Empty Bone"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBone;
