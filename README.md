# bambu-stock-chart

I have developed this Single Page Application to display various stock options using React. This is part of a technical assessment.

For clarity, I have documented a brief development plan for this technical test.

## API Calls

I use [axios](https://github.com/axios/axios) for its convenience features, and as a personal preference.

## Mobile responsiveness

This application is not mobile responsive. View only in desktop browsers.

## Styling

This project will be short-term and small-scale, so I have opted not to use any CSS framework for styling. Components will be styled primarily using CSS Flexbox for efficiency.

I also avoided using CSS preprocessors as styling is lean for the application of this size.

## API Calls

API calls will be made to [Alpha Vantage](https://www.alphavantage.co/). To optimise load time, one API will be called each time a stock option is selected.

### Running the app

Clone this repo, cd to its containing folder<br>

then run `npm start` to run the app in development mode<br>

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
