# bambu-stock-chart

![snapshot of application](https://raw.githubusercontent.com/leeshuzheng/bambu-stock-chart/master/src/snapshot.png)

I have developed this Single Page Application to display various stock options using React. This is part of a technical assessment. This application was scaffolded using Create React App due to time constraints on my end.

For clarity, I have documented a brief development plan for this technical test.

## API Calls

I use [axios](https://github.com/axios/axios) for its convenience features, and as a personal preference.

## API Calls

API calls were made to [Alpha Vantage](https://www.alphavantage.co/). To optimise load time, one API will be called each time a stock option is selected.

As I was on a free account and was only able to make 5 calls to the endpoint every minute, I have stored the JSON returned locally to facilitate testing.

## Mobile responsiveness

This application is not mobile responsive. View only in desktop browsers.

## Styling

This project will be short-term and small-scale, so I have opted not to use any CSS framework for styling. Components will be styled primarily using CSS Flexbox for efficiency.

I also avoided using CSS preprocessors as styling is lean for the application of this size.

### Running the app

Clone this repo, cd to its containing folder<br>

Install packages by running `npm i`<br>

then run `npm start` to run the app in development mode<br>

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
