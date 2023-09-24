'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Filter: React.FC = () => {
    const router = useRouter();
    const initialTags = ['vakantie', 'puppy', 'kluiven', 'voer', 'medicatie', 'speelgoed', 'verzorging'];
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        if(selectedTags.length) {
            router.push(`/blog?tags=${selectedTags.join(",")}`)
        } else {
            router.push(`/blog`)
        }
    }, [selectedTags, router]);

    const handleCheckboxChange = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(prevTags => prevTags.filter(t => t !== tag));
        } else {
            setSelectedTags(prevTags => [...prevTags, tag]);
        }
    };

    return (
        <div className="mb-3 flex w-full justify-center mt-5">
            {initialTags.map(tag => (
                <div key={tag}>
                    <input 
                        type="checkbox" 
                        id={tag} 
                        checked={selectedTags.includes(tag)} 
                        onChange={() => handleCheckboxChange(tag)}
                    />
                    <label className={`text-xs mr-2 py-1.5 px-4 text-gray-600 ${tag} rounded-2xl m-1`} htmlFor={tag}>{tag}</label>
                </div>
            ))}
        </div>
    );
}

export default Filter;