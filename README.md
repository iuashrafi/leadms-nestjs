# Leads Management System

Deployed Link - https://leadms-nestjs.vercel.app/

## Project Overview

The **Leads Management System** project consists of:

1. **Frontend**: Modern User interface built using tailwind css, Shadcn and **Next js** hosted on vercel.
2. **Backend**: API services built using NodeJs's **Nest JS**, Postgres hosted on AWS EC2 and RDS.

## System Requirements

1. For using, Basic system(laptop/pc/mobile/tab) with browser and internet connection
2. For Development, 8GB RAM with intel i3 + is recommended

## Installation and Running Instructions

### Setup Instructions For Backend

This project is built using **NestJS** for the backend and uses **pnpm** for package management. Follow the steps below to set up the project locally.

#### Prerequisites

- Ensure you have **Node.js** installed (version 18 or higher recommended).
- Install **pnpm** package manager globally:
  ```bash
  npm install -g pnpm
  ```

#### Cloning the Repository (Backend)

- Clone the backend repository from GitHub:
  ```bash
  git clone https://github.com/iuashrafi/leadms-nestjs
  cd leadms-nestjs
  ```

#### Install the packages

- To install the packages run:
  ```bash
  pnpm install
  ```

#### Env configuration

Add a .env file to apps/backend folder

```bash
# incase you have local pg admin
DB_NAME='leadmsDb'
DB_HOST='localhost'
DB_USERNAME='postgres'
DB_PASSWORD='qwerty'
DB_PORT=5432



# or else Database url link
DATABASE_URL='postgresql://<username>:<password>@<host>:5432/leadmsDb'

```

#### Running the Development Server

- Start the development server using the following command:
  ```bash
  cd apps/backend
  pnpm run start:dev
  ```

## Setup Instructions For Frontend

The frontend is built using **NextJs**, Tailwindcss and shadcn library and It is hosted on vercel. Follow the steps below to set up the project locally.

#### Prerequisites(Skip if you have already done setup backend)

- Ensure you have **Node.js** installed (version 18 or higher recommended).
- Install **pnpm** globally:
  ```bash
  npm install -g pnpm
  ```

#### Running the Project Development Server

- Start the development server using the following command:
  ```bash
  cd apps/frontend
  pnpm run dev
  ```

## API Documentation

We have divided our backend into 3 modules. Each having its own controller, service and entities.

### Lead Module

1. getDashboardData API

- api endpoint to fetch all the data which are displayed in our dashboard like total leads, staffs, interactions count
- data also includes 5 recent leads, todays pending calls, recent interactions

2. createLead API

- to add leads in our RestaurantLead table

3. updateLead API

- to update the lead given its data and leadId

4. getAllLeads API

- to get all leads with infinite scroll pagination
- and basic leads filter by lead status - New, Active, Inactive
- basic search text

5. getLeadById API

- to get a information about a particular lead by its id
- also returns the list of staffs in that list
- also returns count of orders interaction and the rank of that lead
- rank is decided based on the no of orders, the more the orders placed, high is rank and hence, we can say that the lead has performed well

6. deleteLead API

- delete a lead along with its staffs and interactions made(cascade delete)

### Staff Module

1. createRestaurantStaff API

- api end point to add a staff to given lead(restaurant)
- body will the contain the staff details

2. getAllStaffs API

- api endpoint to get all staffs
- basic search text along with filter by role
- pagination with table format

3. updateStaff API

- api endpoint to update a staff given its staff id and details

4. deleteStaff API

- api endpoint to delete a staff with all the interactions made with that staff (cascading delete)

## Interaction Module

1. createInteraction API

- api endpoint to interact with a staff, body containing interactionDate, type(call, visit, order), notes, followUp

2. updateInteraction API

- api endpoint to update the above interaction

3. deleteInteraction API

- api endpoint to delete an interaction

4. getAllInteractions API

- api endpoint to get all interactions with pagination
- basic search text and filter interactions by type
- get interactions of a staff id(passed in query string)
- get interactions of a lead id

## Screenshots

Please check screenshots folder or directly the github link (incase the screenshots doesn't loads locally)
