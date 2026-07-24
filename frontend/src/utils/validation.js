export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateAuthInput = ({ email, password }) => {
    if (email !== undefined && !EMAIL_REGEX.test(email.trim())) {
        return "Please enter a valid email address.";
    }
    if (password !== undefined && password.length < 8) {
        return "Password must be at least 8 characters long.";
    }
    return null;
};
