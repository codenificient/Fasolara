"use client"

interface InputProps
{
	id: string
	name: string
	label: string
	inputType: string
	placeholder?: string
	min?: number
	max?: number
}

const TwInput: React.FC<InputProps> = ( { id, name, label, placeholder, inputType, min, max } ) =>
{
	return (
		<div className="relative mt-8">
			<input id={id} name={name} type={inputType} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-slate-600" placeholder={placeholder} min={min} max={max} />
			<label htmlFor={id} className="absolute left-2 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-400 peer-focus:text-sm peer-focus:bg-[#303030] peer-focus:ml-2 peer-focus:p-1">{label}</label>
		</div>
	)
}

export default TwInput
