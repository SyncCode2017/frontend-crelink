export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}; 

// Function to convert block timestamp to readable date
export const blockTimestampToDate = (timestamp: number | string | bigint): Date => {
    // Convert input to number if it's a string or bigint
    const timestampNum = typeof timestamp === "string" ? parseInt(timestamp) : Number(timestamp);

    // Validate the input
    if (isNaN(timestampNum)) {
        throw new Error("Invalid timestamp provided");
    }

    // Multiply by 1000 because JavaScript Date expects milliseconds
    const date = new Date(timestampNum * 1000);

    // Return formatted date string
    return date//.toUTCString(); // Or use toLocaleString() for local timezone
}