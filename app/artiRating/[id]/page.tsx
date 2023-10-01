import { getFileUrlRatingItem, getSingleRatingItem } from "@/app/pocketbase/pocketbase";
import Link from "next/link";
import Image from "next/image";
import RatingBone from "@/app/components/ratingCard/RatingBone";

const RatingDetail = async ({ params }: any) => {

    const ratingDetail = await getSingleRatingItem(params.id);
    const coverImageUrl = await getFileUrlRatingItem(ratingDetail, 'coverImage');

    return (
        <div className="bg-gray-100 py-8 mt-5">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
            <div className="relative h-[460px] rounded-lg bg-gray-300 mb-4 overflow-hidden">
                <Image src={coverImageUrl} 
                    alt="Product Image" 
                    layout="fill" 
                    objectFit="cover" 
                    className="absolute" />
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-darkBlue text-orange py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                            Add to Cart
                            </button>
                    </div>
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-orange text-darkBlue py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                            Add to Wishlist
                            </button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4 bg-gray-900 p-4">
                <h2 className="text-2xl font-bold mb-2 text-orange">{ratingDetail.title}</h2>
                <p className="text-gray-600 text-sm mb-4 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.</p>
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
                    <span className="font-bold text-gray-700 text-white">Select Color:</span>
                    <div className="flex items-center mt-2 text-white">
                        <RatingBone rating={ratingDetail.rating} ratedBy={ratingDetail.ratedBy}/>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700">Select Size:</span>
                    <div className="flex items-center mt-2">
                        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">S</button>
                        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">M</button>
                        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">L</button>
                        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">XL</button>
                        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">XXL</button>
                    </div>
                </div>
                <div>
                    <span className="font-bold text-gray-700 text-white">Over dit product:</span>
                    <p className="text-gray-600 text-sm mt-2 text-white" dangerouslySetInnerHTML={{ __html: ratingDetail.explanationText}} />

                </div>
            </div>
        </div>
    </div>
</div>
    );
}

export default RatingDetail;