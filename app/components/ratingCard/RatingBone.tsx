import Image from 'next/image';

const RatingBone = ({ artisRating }) => {

  const rating = Math.max(1, Math.min(10, artisRating));

  return (
    <div className="flex items-center">

      {Array.from({ length: rating }).map((_, index) => (
        <div key={index} className="mr-1">
          <Image src="/images/filledBone.png" width={20} height={20} alt="Filled Bone" />
        </div>
      ))}

      {Array.from({ length: 10 - rating }).map((_, index) => (
        <div key={index + 10} className="mr-1">
          <Image src="/images/emptyBone.png" width={20} height={20} alt="Empty Bone" />
        </div>
      ))}
    </div>
  );
}

export default RatingBone;
