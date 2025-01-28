# DuckDuckGo Dork Search

A web application designed to query DuckDuckGo using custom search inputs. The results are then scraped to display efficiently and within the interface so we don't have to navigate away from the app.

## Features

- User-friendly and minimal interface for entering search queries.
- Utilizes MDBootstrap for styling and design components.
- Custom buttons and spinners for a bit of styling and user interaction.
- DuckDuckGo search results scraped and displayed dynamically.
  
## Project Structure

The repository contains the following files:

- **index.html**: The main web page containing the form for search input, along with links to stylesheets and scripts.
- **script.js**: JavaScript file that handles the logic for submitting search queries and dynamically displaying results.
- **server.js**: Backend logic for handling requests and communicating with external services.

## Technologies Used

- **HTML5**: Structuring the web page.
- **CSS3 & MDBootstrap**: For styling and design.
- **JavaScript**: For handling the search logic and dynamically updating the page.
- **Node.js**: Backend server logic.

## How to Run

### Prerequisites

- A web browser to view the frontend.
- [Node.js](https://nodejs.org/) for running the server.
- Access to the DuckDuckGo search engine.

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mattozborn/dmp-gs.git
   cd dmp-gs
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the server**:

   ```bash
   node server.js
   ```

4. **Open the frontend**:

   Open `index.html` in your web browser.

5. **Start Searching**:

   - Enter your search term in the input field.
   - Click the search button to query DuckDuckGo and see the results

## Acknowledgements

- **MDBootstrap**: Used for styling and layout.
- **Font Awesome**: For icons used in the project.
- **DuckDuckGo**: The search engine powering the search functionality.

