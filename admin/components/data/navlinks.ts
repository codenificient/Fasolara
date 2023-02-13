interface Link
{
	id: string
	icon: string
	name: string
	to: string
	color: string,
	children?: Array<Link>
}

export const icons: Link[] = [
  // {
  // 	id: '18-625-4152',
  // 	icon: 'fas fa-home',
  // 	name: 'accueil',
  // 	to: '/',
  // 	color: 'Mauv'
  // },
  // {
  // 	id: '04-562-3505',
  // 	icon: 'fas fa-wallet',
  // 	name: 'accounts',
  // 	to: '/accounts',
  // 	color: 'Orange'
  // },
  // {
  // 	id: '26-565-5447',
  // 	icon: 'fas fa-location',
  // 	name: 'addresses',
  // 	to: '/addresses',
  // 	color: 'Fuscia'
  // },
  // {
  // 	id: '41-733-7317',
  // 	icon: 'fas fa-university',
  // 	name: 'banks',
  // 	to: '/banks',
  // 	color: 'Pink'
  // },
  // {
  // 	id: '34-012-6726',
  // 	icon: 'fas fa-users',
  // 	name: 'communities',
  // 	to: '/communities',
  // 	color: 'Blue'
  // },
  // {
  // 	id: '59-542-2547',
  // 	icon: 'fas fa-flag',
  // 	name: 'countries',
  // 	to: '/countries',
  // 	color: 'Maroon'
  // },
  // {
  // 	id: '20-470-9577',
  // 	icon: 'fa-solid fa-users-line',
  // 	name: 'employees',
  // 	to: '/employees',
  // 	color: 'Crimson'
  // },
  // {
  // 	id: '88-435-4328',
  // 	icon: 'fa-solid fa-money-check-dollar',
  // 	name: 'investors',
  // 	to: '/investors',
  // 	color: 'Mauv'
  // },
  {
    id: "07-126-4512",
    icon: "fas fa-map-marked",
    name: "locations",
    to: "/location",
    color: "Red",
    children: [
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "all locations",
        to: "/alllocations",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "new location",
        to: "/createaddress",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "edit location",
        to: "/editaddress",
        color: "Red",
      },
    ],
  },
  {
    id: "95-576-1907",
    icon: "fas fa-envelope-open",
    name: "messages",
    to: "/message",
    color: "Mauv",
  },
  {
    id: "03-597-2115",
    icon: "fa-solid fa-boxes-packing",
    name: "orders",
    to: "/order",
    color: "Aquamarine",
    children: [
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "all orders",
        to: "/allorders",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "new order",
        to: "/createorder",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "edit location",
        to: "/editaddress",
        color: "Red",
      },
    ],
  },
  {
    id: "04-956-1972",
    icon: "fas fa-solar-panel",
    name: "panels",
    to: "/panel",
    color: "Blue",
    children: [
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "all panels",
        to: "/allpanels",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "new panel",
        to: "/createpanel",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "edit panel",
        to: "/editpanel",
        color: "Red",
      },
    ],
  },
  // {
  // 	id: '33-956-5980',
  // 	icon: 'fas fa-people-carry',
  // 	name: 'partners',
  // 	to: '/partners',
  // 	color: 'Violet'
  // },
  {
    id: "68-093-1982",
    icon: "fas fa-tasks",
    name: "projects",
    to: "/project ",
    color: "Maroon",
    children: [
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "all projects",
        to: "/allprojects",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "new project",
        to: "/createproject",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "edit project",
        to: "/editproject",
        color: "Red",
      },
    ],
  },
  // {
  // 	id: '59-761-1912',
  // 	icon: 'fa-solid fa-users-rectangle',
  // 	name: 'teams',
  // 	to: '/teams',
  // 	color: 'Green'
  // },
  // {
  // 	id: '47-100-1997',
  // 	icon: 'fa-solid fa-money-bill-trend-up',
  // 	name: 'reports',
  // 	to: '/reports',
  // 	color: 'Teal'
  // },
  // {
  // 	id: '25-471-0345',
  // 	icon: 'fas fa-cog',
  // 	name: 'settings',
  // 	to: '/settings',
  // 	color: 'Crimson'
  // },
  // {
  // 	id: '73-964-3972',
  // 	icon: 'fa-solid fa-warehouse',
  // 	name: 'suppliers',
  // 	to: '/suppliers',
  // 	color: 'Blue'
  // },
  {
    id: "67-309-8077",
    icon: "fas fa-file-invoice-dollar",
    name: "transactions",
    to: "/transactions",
    color: "Teal",
    children: [
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "all transactions",
        to: "/alltransactions",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "new transaction",
        to: "/createtransaction",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "edit transaction",
        to: "/edittransaction",
        color: "Red",
      },
    ],
  },
  {
    id: "22-610-6437",
    icon: "fa-solid fa-people-group",
    name: "users",
    to: "/user",
    color: "Orange",
    children: [
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "all users",
        to: "/allusers",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "new user",
        to: "/createuser",
        color: "Red",
      },
      {
        id: "07-126-4512",
        icon: "fas fa-map-marked",
        name: "edit user",
        to: "/edituser",
        color: "Red",
      },
    ],
  },
];