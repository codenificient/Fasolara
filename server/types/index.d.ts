declare global
{
	namespace Express
	{
		interface Request
		{
			userId: String
			email: String
			addressId: String
			role: String
			teamId: String
		}
	}
}

export { }
