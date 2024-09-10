// server.js
// matt ozborn 2024.09.01

// import nodejs modules
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import * as cheerio from 'cheerio';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// include a timestamp for all console.log messages
const server_log = console.log;
console.log = function(...args) {
    server_log.apply(console, [`[${new Date().toISOString()}]`, ...args]);
};

// setup the endpoint to receive the post request
app.post('/search', async (req, res) => {
    const { query } = req.body;

    // log client information
    const client_ip = req.ip;
    const user_agent = req.get('User-Agent');

    console.log('Received query from client:', query);
    console.log(`Client IP: ${client_ip}, User-Agent: ${user_agent}`);

    const search_url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent("site:dmp.com filetype:pdf " + query)}`;
    console.log('Sending request to DuckDuckGo:', search_url);

    try {
        const response = await fetch(search_url);
        const body = await response.text();
        //console.log(body);  // debug: printing the fetched data to the console
        const $ = cheerio.load(body);

        // scrape search results
        let results = [];
        $('.result__a').each((i, el) => {
            const title = $(el).text();
            const url = $(el).attr('href');
            results.push({ title, url });
        });

        //console.log('Scraped search results:', results);  // debug: printing the scraped results to the console
        res.json({ results });
    } catch (error) {
        console.error('Error fetching or scraping search results:', error);
        res.json({ error: 'An error occurred while fetching or scraping results.' });
    }
});

// setup the app to listen on specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
