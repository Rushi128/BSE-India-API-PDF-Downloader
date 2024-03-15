# BSE India API PDF Downloader

This Node.js script automates the process of downloading PDF files from the BSE India Corporate announcement API based on specific search criteria, such as category, date range, and type. It uses Axios for HTTP requests and file handling, allowing users to fetch and store PDFs locally for further analysis or archiving purposes.

## Features

- Fetches PDF files from the BSE India API
- Customizable search criteria (category, date range, type)
- Downloads and saves PDFs locally in a specified directory

## Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager) for installing dependencies

## Usage

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Update the `headers` object in the script with valid BSE India API headers.
4. Run the script using `node index.js` or `npm start`.

## Configuration

- Modify the `fromDate`, `toDate`, and other parameters in the script as needed.
- Customize the download directory by changing the `downloadDir` variable.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
