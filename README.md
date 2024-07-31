# Note Taker

## Description

The Note Taker application allows users to create, save, and delete notes. Built with Express.js for the backend and vanilla JavaScript for the frontend, this application enables users to manage their notes efficiently with a simple interface.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Create Notes:** Users can create new notes by entering a title and text.
- **View Notes:** Users can view all their saved notes on the sidebar.
- **Delete Notes:** Users can delete any note by clicking the trash icon next to it.
- **Clear Form:** Users can clear the form fields with the clear button.

## Usage

1. **Navigate to the Application:**

   Open your web browser and go to [http://localhost:3001](http://localhost:3001).

2. **Create a Note:**

   - Click the "Get Started" button to go to the notes page.
   - Enter a title and text in the form fields.
   - Click the "Save Note" button to save the note.

3. **View and Delete Notes:**

   - All saved notes will appear on the sidebar.
   - Click on a note title to view it.
   - Click the trash icon next to a note to delete it.

4. **Clear the Form:**

   - Click the "Clear Form" button to reset the form fields.

## API Routes

### `GET /api/notes`

- **Description:** Fetches all saved notes.
- **Response:** Array of note objects.

### `POST /api/notes`

- **Description:** Saves a new note.
- **Request Body:**
  ```json
  {
    "title": "Note Title",
    "text": "Note Text"
  }
  ## API Routes

### DELETE /api/notes/:id
- **Description:** Deletes a note by ID.
- **URL Params:**
  - `id` (string): The ID of the note to delete.
- **Response:** Success message.

## Contributing

1. Fork the repository.

2. Create a feature branch:
    ```bash
    git checkout -b feature/YourFeature
    ```

3. Commit your changes:
    ```bash
    git commit -m "Add feature: YourFeature"
    ```

4. Push to the branch:
    ```bash
    git push origin feature/YourFeature
    ```

5. Create a Pull Request.

   Go to the repository on GitHub and create a new pull request from your branch.

