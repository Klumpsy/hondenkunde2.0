import { getFileUrlRatingItem, getSingleRatingItem, getFileUrlsForProductImages } from "@/app/pocketbase/pocketbase";
import Link from "next/link";
import Image from "next/image";
import RatingBone from "@/app/components/ratingCard/RatingBone";
import Slider from "@/app/components/slider/Slider";
import { extractVideoID } from "@/app/helpers/videoHelper";

const RatingDetail = async ({ params }: any) => {

    const ratingDetail = await getSingleRatingItem(params.id);
    const coverImageUrl = await getFileUrlRatingItem(ratingDetail, 'coverImage');
    const urls = await getFileUrlsForProductImages(ratingDetail);

    return (
        <div className="bg-gray-900 py-8 pt-12 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4 z-1">
            <div className="relative h-[460px] rounded-lg bg-gray-300 mb-4 overflow-hidden">
                <Image src={coverImageUrl} 
                    alt="Product Image" 
                    layout="fill" 
                    objectFit="cover" 
                    className="absolute" />
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <a href='/artiRating'>
                            <button className="w-full bg-darkBlue text-orange py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                                Terug naar producten
                            </button>
                        </a>
                    </div>
                    <div className="w-1/2 px-2">
                        <a href={ratingDetail.buttonUrl} target="_blank">
                            <button className="w-full bg-orange text-darkBlue py-2 px-4 rounded-full font-bold hover:bg-gray-800 hover:text-orange">
                                {ratingDetail.buttonText}
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4 bg-gray-900 p-4">
                <h2 className="text-2xl font-bold mb-2 text-orange">{ratingDetail.title}</h2>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 text-white ">Price:</span>
                        <span className="text-gray-600 text-white">$29.99</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 text-white">Availability:</span>
                        <span className="text-gray-600 text-white">In Stock</span>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700 text-white">Beoordeeld door <span className='text-orange'>{ratingDetail.ratedBy} </span>:</span>
                    <div className="flex items-center mt-2 text-white">
                        <RatingBone rating={ratingDetail.rating} ratedBy={ratingDetail.ratedBy}/>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex space-x-2">
                            {ratingDetail.tags && ratingDetail.tags.map(tag => (
                             <p key={tag + ratingDetail.id + ratingDetail.buttonUrl} 
                                 className={`flex items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block ${tag}`}>
                                  {tag}
                                </p>
                            ))}
                    </div>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 text-white">Over dit product:</span>
                        <p className="text-gray-600 text-sm mt-2 text-white" dangerouslySetInnerHTML={{ __html: ratingDetail.explanationText}} />
                    </div>
                </div>
            </div>
        </div>
        <Slider imagePaths={urls}/>
        {ratingDetail.productVideo && ( 
            <div className="mt-7 max-w-[1000px] mx-auto w-full tablet:max-w-[90%] mobile:max-w-[90%]">
                <div className="relative" style={{paddingTop: '56.25%'}}> {/* This padding percentage represents a 16:9 aspect ratio */}
                    <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${extractVideoID(ratingDetail.productVideo)}`} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    />
                </div>
            </div>
        )}
    </div>
    );
}

export default RatingDetail;