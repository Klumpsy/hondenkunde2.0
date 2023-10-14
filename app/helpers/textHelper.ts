export const estimateReadingTime = (text: string) => {
    const wordsPerMinute = 200; 
    const words = text.split(/\s+/g).length;
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes);
}