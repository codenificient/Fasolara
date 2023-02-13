interface Project
{
	id: string
	imageUrl: string
	progress: number
}

export const projects: Project[] = [
    {
		id: "Dori-SEN003",
		imageUrl: '/assets/astronergy.png',
		progress: 100
    },
    {
		id: "Ouahigouya-YTG001",
		imageUrl: '/assets/CanadianSolar.png',
		progress: 100
    },
    {
		id: "Gaoua-PNI001",
		imageUrl: '/assets/JASolar.png',
		progress: 96
    },
    {
		id: "Banfora-CMO002",
		imageUrl: '/assets/powergo.png',
		progress: 79
    },
    {
		id: "Koudougou-BKD001",
		imageUrl: '/assets/renesola.png',
		progress: 58
    },
    // {
	// 	id: "Tenkodogo",
	// 	imageUrl: '/assets/Vikram.png',
	// 	progress: 32
    // }
]