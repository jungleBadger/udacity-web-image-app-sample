# Image App

This project is a simple web application for image manipulation, allowing users to upload images, view a gallery of uploaded images, and resize images on demand.

## Showcase

A video showcase of the application in action can be found in the `assets/showcase` directory.

![Showcase Video](./assets/showcase/showcase.mp4)

---

## Client

### Purpose

The client-side application provides a user interface for interacting with the image server. Users can:

- View a list of uploaded images, displayed as thumbnails.
- Upload new images to the server.
- Select any image from the list and specify a width and height to resize.
- View the resized image in their browser.

The client makes use of the server's RESTful API endpoints to perform these actions without the need for a page reload, providing a smooth and responsive experience.

### Technology Stack

The client is built with:

- HTML5: For structuring the web page.
- CSS: For styling the page elements.
- Vanilla JavaScript: To handle events, manipulate the DOM, and communicate with the server via AJAX requests.

## Server

You can check more details about the operations in the [dedicated Server README.md file](./server/README.md)

### Purpose

The server-side application is responsible for handling the requests made from the client. It provides RESTful API endpoints for:

- Listing all uploaded images.
- Uploading new images.
- Resizing images according to the provided dimensions.
- Serving resized images.

The server also includes a suite of unit tests to ensure the API functions correctly.

### Endpoints

- `GET /images/raw`: Lists all raw images.
- `POST /images/upload`: Uploads a new image to the server.
- `POST /images/resize`: Resizes an image with specified dimensions.
- `GET /images/fetch/processed`: Retrieves the processed image.
- `GET /images/fetch/raw`: Retrieves the raw image.

### Technology Stack

The server is built with:

- Node.js: The JavaScript runtime for building the server.
- Express.js: The web application framework for creating the API endpoints.
- Sharp: A Node.js module for image processing.
- Jest: The testing framework used for writing unit tests.
- Supertest: A library for testing HTTP assertions.
- Morgan: A middleware for logging HTTP requests.
- TypeScript: A typed superset of JavaScript for writing more robust server code.



## Getting Started

To get started with the project, clone the repository and install the dependencies for both client and server:

```sh
# Install server dependencies
cd server && npm install

# Install client dependencies if any (e.g., if using a build tool or package manager)
cd ../client && npm install
