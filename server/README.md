# Apollo GraphQL server for the FasoLara Platform

This repo replaces Express GraphQL with Apollo GraphQL. Will enventually support subscriptions. This has user authentication and uses middlewares to secure the majority of the GraphQL queries

## Functionalities available

- <b>models</b>: user, login, registerUser, account, address, bank, comment, country, location, employee, order, panel, project, province, salary, supplier, team, transaction, village
- <b>typeDefs</b>: user, login, registerUser, account, address, bank, comment, country, employee, order, panel, project, province, salary, supplier, team, transaction, village
- <b>resolvers</b>: user, login, registerUser, account, address, bank, comment, country, employee, order, panel, project, province, salary, supplier, team, transaction, village

## Functionalities to Implement

- <b>Models</b>: location, session, agenda, activity
  - create, update, delete, read
- <b>Resolvers</b>: location, session, agenda, activity
  - create, update, delete, Read
- <b>typeDefs</b>: location, session, activity, agenda
  - Create, Update, Delete, Get
- <b>Subscription</b>: location, session, activity, agenda

# Database Design

![Organizational Chart](chart.png "Lara Stakeholder Chart")

Roadmap

- [ ] Add extra resolvers for fetching related data
- [ ] Add resolvers for updating specific fields
- [ ] Implement role based authorization for mutations
- [ ] Add role based authorization for sensitive queries
- [ ] Add remaining tests
- [ ] Add gh actions
- [ ] Add swagger api for docs


## Testing

- <b>Apollo Server</b>
  - Supertest
  - EasyGraphQLTester
  - Mocha
  - Chai
