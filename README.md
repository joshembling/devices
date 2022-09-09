## Overview

This is a Laravel backend/Next.js frontend project to create, read, update, delete and import data.

### Start servers

To start the backend server, from the root directory `cd backend` and then `php artisan serve` - this must run on `localhost:8000`.

To start the frontend server, from the root directory `cd frontend` and then `npm run dev` - this must run on `localhost:3000`.

### Migrate all tables

`php artisan migrate`

### Importing data

There is a queue job set up on CSV imports. Please run `php artisan queue:work` in the terminal to keep jobs ticking over.

###

Documentation for all endpoints available at `http://localhost:8000/request-docs/`.

### Final rundown:

- <strong>JSON API built in Laravel</strong>
  - Authentication for POST, PUT, DELETE routes using Sanctum
  - User cannot do anything other than make GET requests if they are not registered and logged in.
  - Validation on POST and PUT endpoints.
  - Queue job on all CSV imports to prevent any overloading.
- <strong>Consumed in React using Next.js</strong>
  - Tabular view for all data (example, real and import).
  - User can post a single device, or import from a CSV file.
  - Quickly edit a few records by clicking on the field name (when logged in).
  - Delete a record by using the button in the update column.
  - Small-ish CSV imports will be able to see a preview of data (selects first 50 fields of CSV file) - for larger files this is not possible.
  - User can decide whether to proceed by looking at these rows in the browser.

<hr>
    
One small part I didn't get around to was undoing imports.

My logic was to put an `import_id` on all fields imported in that one batch, and then remove relevant fields if user chooses `id:x` from a select field or similar. For whatever reason, I couldn't get the import_id into the batch using Laravel Excel package. Would still like to find out why though (I'll say it's the package 🤣)!
