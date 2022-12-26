export const formatDate = (date) => {
    return new Date(date).toLocaleString()
}

export const shorten = (str, maxLen, separator = ' ') => {
	if (str.length <= maxLen) return str;
	return str.substr(0, str.lastIndexOf(separator, maxLen));
};