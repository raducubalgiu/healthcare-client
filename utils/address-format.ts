export const addressFormat = (
	addressLine1: string,
	addressLine2: string,
	city: string,
	county: string,
	country: string
) => {
	return `${addressLine1}, ${addressLine2}, ${city}, ${county}, ${country}`;
};
