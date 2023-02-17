
const Loading = () =>
{
	return (
		<div>
			<p>Loading...</p>
			<ul className='list-disc pl-6 mt-4 space-y-2'>
				{
					[...Array( 20 ).keys()].map( i => (
						<li key={i}>
							<span className='inline-block h-5 animate-pulse w-full'
								style={{
									animationDelay: `${i * 0.5}s`,
									animationDuration: "1s"
								}}
							/>
						</li>
					) )
				}
			</ul>
		</div>
	)
}

export default Loading
