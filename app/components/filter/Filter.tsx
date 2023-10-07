'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Filter: React.FC = () => {
    const router = useRouter();
    const initialTags = ['Kluiven', 'Vakantie', 'Training', 'Voeding', 'Gezondheid'];
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
        <div className="flex flex-col bg-white p-4 rounded shadow-lg">
          {initialTags.map(tag => (
             <div key={tag} className="flex items-center space-x-2 cursor-pointer mt-1">
              <input 
                type="checkbox" 
                id={tag} 
                checked={selectedTags.includes(tag)} 
                onChange={() => handleCheckboxChange(tag)}
              />
              <label 
                htmlFor={tag} 
                className={`${tag} rounded-full text-center p-2 w-full`}
              >
                {tag}
              </label>
            </div>
          ))}
        </div>
      ); 
}

export default Filter;