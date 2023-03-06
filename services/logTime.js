/**
 * 
 * @param {String} text
 * @returns {String} Return Text with ISO Time --- for log !  
 */
module.exports = (text) => {
    console.log(`[${new Date().toISOString()}]:`,text);
};