export const formatDate = (date) => {
    let date = new Date(date).toLocaleString()
    return date
}

export const shorten = (str, maxLen, separator = ' ') => {
	if (str.length <= maxLen) return str;
	return str.substr(0, str.lastIndexOf(separator, maxLen));
};