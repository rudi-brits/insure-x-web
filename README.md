# insure-x-web

## Installation

Unzip the project folder
Copy the insure.x.web folder to your working directory
Open the working directory in your IDE i.e. VSCODE

Install the application dependencies by running:

```sh
npm install
```

Open the .env file and ensure that the VITE_INSURE_X_API_URL references the base URL of the Insure.X.App correctly
Also refer to the Insure.X.App launchSettings.json file in the Insure.X.Api/Properties folder for the applicationUrl

## Development

Start Insure.X.App API and make sure it is running 
Start the application in development mode by running:

```sh
npm run dev
```

## Production

Build the application in production mode by running:

```sh
npm run build
```

## Overview

Once the application runs you will have two menu items:

Clients
Investments

Clicking on each will display data in a grid format which is filterable, sortable and can be paged.

## Clients

The Client grid will use text in the search input for partial matches on first name, surname and id number.
Clicking on a client will provide a summary of the client details and a grid of the client's investments.

Here you can use the date input to select a future date for displaying the projected interest effect on the capital amount.

NOTE: if the date filter is not visible - use the Add Filter button to display it.

## Clients

The Investment grid will use text in the search input for partial matches on first name, surname of the client.

Clicking on an investment will open details for the specific investments with a similar date input for projected calculation as mention for clients



