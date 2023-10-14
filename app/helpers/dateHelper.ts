
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

export const isNew = (dateString: string) => {
    const createdDate = new Date(dateString);  
    const currentDate = new Date();

    const createdTime = createdDate.getTime();
    const currentTime = currentDate.getTime();

    const differenceInMilliseconds = currentTime - createdTime;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return differenceInDays <= 3;
};

