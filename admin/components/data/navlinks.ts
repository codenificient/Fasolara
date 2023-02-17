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
    icon: "fa6-solid:map-location",
    name: "locations",
    to: "/location",
    color: "Red",
    children: [
      {
        id: "a07-126-4512",
        icon: "wpf:worldwide-location",
        name: "all locations",
        to: "/alllocations",
        color: "Red",
      },
      {
        id: "b07-126-4512",
        icon: "material-symbols:add-location-alt-rounded",
        name: "new location",
        to: "/createaddress",
        color: "Red",
      },
      {
        id: "c07-126-4512",
        icon: "material-symbols:edit-location-alt",
        name: "edit location",
        to: "/editaddress",
        color: "Red",
      },
    ],
  },
  {
    id: "95-576-1907",
    icon: "fa6-solid:envelope-open",
    name: "messages",
    to: "/message",
    color: "Mauv",
  },
  {
    id: "03-597-2115",
    icon: "fa6-solid:boxes-packing",
    name: "orders",
    to: "/order",
    color: "Aquamarine",
    children: [
      {
        id: "07-126-45a12",
        icon: "material-symbols:order-play-sharp",
        name: "all orders",
        to: "/allorders",
        color: "Red",
      },
      {
        id: "07-126-45b12",
        icon: "material-symbols:add-shopping-cart",
        name: "new order",
        to: "/createorder",
        color: "Red",
      },
      {
        id: "07-126-45c12",
        icon: "fluent:text-bullet-list-square-edit-24-filled",
        name: "edit order",
        to: "/editorder",
        color: "Red",
      },
    ],
  },
  {
    id: "04-956-1972",
    icon: "fa6-solid:solar-panel",
    name: "panels",
    to: "/panel",
    color: "Blue",
    children: [
      {
        id: "07-126-4a512",
        icon: "mdi:solar-panel-large",
        name: "all panels",
        to: "/allpanels",
        color: "Red",
      },
      {
        id: "07-126-4b512",
        icon: "la:solar-panel",
        name: "new panel",
        to: "/createpanel",
        color: "Red",
      },
      {
        id: "07-126-4c512",
        icon: "gis:layer-edit",
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
    icon: "fa6-solid:list-check",
    name: "projects",
    to: "/project",
    color: "Maroon",
    children: [
      {
        id: "07-126-f4512",
        icon: "oi:project",
        name: "all projects",
        to: "/allprojects",
        color: "Red",
      },
      {
        id: "07-126-e4512",
        icon: "mdi:invoice-add",
        name: "new project",
        to: "/createproject",
        color: "Red",
      },
      {
        id: "07-126-d4512",
        icon: "simple-icons:openproject",
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
    icon: "fa6-solid:file-invoice-dollar",
    name: "transactions",
    to: "/transaction",
    color: "Teal",
    children: [
      {
        id: "07-126-a4512",
        icon: "mdi:bank-transfer",
        name: "all transfers",
        to: "/alltransactions",
        color: "Red",
      },
      {
        id: "07-126-b4512",
        icon: "mdi:wallet-add",
        name: "new transxn",
        to: "/createtransaction",
        color: "Red",
      },
      {
        id: "07-126-c4512",
        icon: "fluent:data-usage-edit-24-filled",
        name: "edit transxn",
        to: "/edittransaction",
        color: "Red",
      },
    ],
  },
  {
    id: "22-610-6437",
    icon: "fa6-solid:people-group",
    name: "users",
    to: "/user",
    color: "Orange",
    children: [
      {
        id: "07-126-4512a",
        icon: "ph:users-four-bold",
        name: "all users",
        to: "/allusers",
        color: "Red",
      },
      {
        id: "07-126-4512b",
        icon: "material-symbols:person-add-rounded",
        name: "new user",
        to: "/createuser",
        color: "Red",
      },
      {
        id: "07-126-4512c",
        icon: "fa-solid:edit",
        name: "edit user",
        to: "/edituser",
        color: "Red",
      },
    ],
  },
];