// eslint-disable-next-line no-useless-escape
const isValidEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

const inputValidation = (name: string, value: string) => {
  switch (name) {
    case 'email':
      return isValidEmail.test(value);
    case 'password':
      return isValidPassword.test(value);
    case 'firstName' || 'lastName':
      return value?.length > 0;
    default:
      return true;
  }
};

export default inputValidation;
