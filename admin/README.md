# FasoLara Admin Dashboard

The Next.JS based admin dashboard for the FasoLara platform

We have recently connected the dashboard to live data from backend, and now the users and conversations on the `/messages` page is using sample data from the GraphQL backend.  The remaining pages are based on generated JSON data for illustration and visual styling purposes

Curently completed scaffolding the various pages and initial routing with more changes coming soon to the Layout

Visit the published website at https://fasolara.vercel.app/

## Getting Started

Create a `.env` file in the root of the downloaded project directory and add the GraphQL link as `NEXT_PUBLIC_CLIENT_DEV` for development environment. The Apollo server backend is currently available at https://fasolaraapollo.vercel.app/api

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### February 2023 edit:

Currently all normal pages and routes are moved into the Next.JS 13 app directory and authentication is added to secure all routes. 

## Roadmap

- [x] Create the Figma design for Admin Dashboard
-  [x] Create a skeleton of the main user interface
- [x] Create the main user interface with dummy data
- [x] Upgrade to Next.JS 13
- [x] Convert all pages to the app directory
- [x] Connect to the admin dashboard with the backend server
- [x] Enable the login functionality to secure all routes
- [ ] Add form to create new objects 
- [ ]  Decide on a validation library
- [ ]  Add a table for list of objects
- [ ]  Create more charts
- [ ]  Bring back Tailwind CSS
- [ ]  Add media queries
- [ ] Add new layout for login and signup pages
- [ ] Update sidebar to reflect authentication status
- [ ] Update Profile menu to reflect authentication
- [ ] Update Projects page to use database objects
- [ ] Add transactions page
- [ ] Update sidebar to include remaining pages
- [ ] Redefine role based authorization
- [ ] Add modal for editing existing objects
- [ ] Add admin role to remove existing objects
- [ ] Add integration tests for all routes and GraphQL queries


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
