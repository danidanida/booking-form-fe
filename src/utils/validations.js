export const isValidThaiPhone = (value) =>
    /^\+66\d{9}$/.test(value) || 'Invalid Thai phone – must be +66 plus 9 digits';

export const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email address';

export const isValidPassport = (value) =>
    /^[A-Za-z0-9]+$/.test(value) || 'Passport number should only contain letters and numbers';
