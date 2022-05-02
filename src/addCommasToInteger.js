/**
 * Takes in a numeric integer or a string representing an integer,
 * returns the same value but with commas separating every 3 decimal places.
 * @param {string} integer
 * @returns string
 */
const addCommasToInteger = (integer) => {
    return integer
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default addCommasToInteger;