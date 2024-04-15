export const formatPhone = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    const match = input.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    let formattedNumber = '';
    if (match) {
      formattedNumber += match[1] ? `(${match[1]}` : '';
      formattedNumber += match[2] ? `) ${match[2]}` : '';
      formattedNumber += match[3] ? `-${match[3]}` : '';
    }
    e.target.value = formattedNumber;
  }

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}
