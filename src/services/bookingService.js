export const submitBookingForm = async (formData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (formData.passengers?.length > 0) {
                resolve({ success: true, bookingId: Math.floor(Math.random() * 10000) });
            } else {
                reject(new Error('No passengers provided'));
            }
        }, 700); // simulate API delay
    });
};