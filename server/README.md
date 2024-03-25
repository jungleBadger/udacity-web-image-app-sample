# Image App Server

## Description

Image App Server is a backend service designed for uploading, listing, and manipulating images. It provides endpoints for clients to interact with the server to manage images within a defined structure.

## Features

- Upload images to the server.
- List available images.
- Resize images to specified dimensions.
- Retrieve raw and processed images.

## Usage

Before using the application, compile the TypeScript code to JavaScript using the build script, and then start the server.

```bash
npm run build
npm start
```

For development purposes, you can run the server in development mode using:

```bash
npm run dev
```

### API Endpoints

The server runs on port `3000` and exposes the following endpoints:

#### HTML/JS Client application

- **GET** `/` - Access the frontend application.


 
  Direct link: http://localhost:3000/



#### Upload Image

- **POST** `/api/images/upload` - Uploads an image to the server.

  Sample usage:

  ```bash
  curl -X POST -F "image=@path_to_image.jpg" http://localhost:3000/api/images/upload
  ```

#### List Images

- **GET** `/api/images/list` - Lists all uploaded images.

  Sample usage:

  ```bash
  curl http://localhost:3000/api/images/list
  ```

#### Get Raw Image

- **GET** `/api/images/fetch/raw?fileName={fileName}` - Retrieves the original image.

  Sample usage:

  ```bash
  curl http://localhost:3000/api/images/fetch/raw?fileName=sample.jpg
  ```

#### Get Processed Image

- **GET** `/api/images/fetch/processed/?fileName={fileName}` - Retrieves the processed image.

  Sample usage:

  ```bash
  curl http://localhost:3000/api/images/fetch/processed?fileName=sample-100x100.jpg
  ```

#### Resize Image

- **POST** `/api/images/resize` - Resizes an image and returns the new image path.

  Sample usage:

  ```bash
  curl -X POST http://localhost:3000/api/images/resize?filePath=sample.jpg&width=100&height=100
  ```

## Development and Testing

To ensure code quality, linting and formatting scripts are provided, as well as a test suite.

- Run linting:
  ```bash
  npm run lint
  ```

- Fix linting issues:
  ```bash
  npm run lint:fix
  ```

- Format code:
  ```bash
  npm run format
  ```

- Run tests with coverage report:
  ```bash
  npm test
  ```

## Contributing

Contributions to the Image App Server are welcome. Please ensure that your code conforms to the project's linting and formatting standards.

---

Created by dcerag - Licensed under ISC
```

Make sure to update this README with actual endpoints once they are fully implemented and tested. You may also want to provide more detailed usage examples, including any required headers or body content for POST requests.
