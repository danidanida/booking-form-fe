export const submitBookingForm = async (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData.passengers?.length > 0) {
        resolve({
          status: 200,
          data: { id: 1234 }
        });
      } else {
        reject({
          status: 400,
          data: { message: 'No passengers provided' }
        });
      }
    }, 700); // simulate API delay
  });
};