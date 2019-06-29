/**
 * Capitalize a string.
 * @param   {String}    str     The string on which apply capitalizing
 * @returns {String}            The capitalized string
 */
function capitalize(str) 
{
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = capitalize;