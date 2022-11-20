const fetcher = async (endpoint: string) => {
	const res = await fetch("http://localhost:3200/wp-json" + endpoint)
	const data = await res.json()
	return data
}

export default fetcher
