## Overview

This is a Laravel backend/Next.js frontend project to create, read, update, delete and import data.

### Start servers

Firstly run, `composer install` from the backend directory and `npm install` on the frontend directory to successfully grab all packages.

To start the backend server, from the backend directory - `php artisan serve` - this must run on `localhost:8000`.

To start the frontend server, from the frontend directory - `npm run dev` - this must run on `localhost:3000`.

### Set up database & env files

<strong>Backend:</strong></br>
Copy `.env.example` and fill in your database connection details.

Set `QUEUE_CONNECTION=database`

Generate application encryption key `php artisan key:generate`

<strong>Frontend:</strong></br>
Create an `env.local` file and insert `NEXT_PUBLIC_BACKEND_URL=http://localhost:8000`

### Migrate all tables

`php artisan migrate`

### Importing data

There is a queue job set up on CSV imports. Please run `php artisan queue:work` in the terminal to keep jobs ticking over.

### Check routes work

After these steps, try `http://localhost:8000/api/devices`, which should return a small JSON object and an empty data array.

### Documentation

Documentation for all endpoints available at `http://localhost:8000/request-docs/`.

### Final rundown:

- <strong>JSON API built in Laravel</strong>
  - Authentication for `POST`, `PUT`, `DELETE` routes using Sanctum
  - User cannot do anything other than make `GET` requests if they are not registered and logged in.
  - Validation on `POST` and `PUT` endpoints.
  - Queue job on all CSV imports to prevent any overloading.
  - CSV saved to storage/csv directory
- <strong>Consumed in React using Next.js</strong>
  - Tabular view for all data (example, real and import previews).
  - User can post a single device, or import from a CSV file.
  - Quickly edit a few records by clicking on the field name (when logged in).
  - Delete a record by using the button in the update column.
  - Small-ish CSV imports will be able to see a preview of data (selects first 50 fields of CSV file) - for larger files this is turned off.
  - User can decide whether to proceed by looking at these rows in the browser.

<hr>
    
One small part I didn't get around to was undoing imports.

My logic was to put an `import_id` on all fields imported in that one batch, and then remove relevant fields if user chooses `id:x` from a select field or similar. For whatever reason, I couldn't get the import_id into the batch using Laravel Excel package. Would still like to find out why though (I'll say it's the package 🤣)!
