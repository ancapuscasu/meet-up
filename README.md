Meet app is a progressive, serverless web application that uses the Google Calendar API to provide information about educational events to full-stack developers. Users can filter events by location, expand events to see detailed descriptions and view summary event information using charts.

The coding objectives of this project were to:
- Build a simple React app using a test-driven approach
- Set up and configure a cloud-based server to perform user authentication and authorisation using OAuth2.0

Note that as this project was built for educational purposes the events fetched from the Google Calendar are fictitious. 

## Live website

Visit Meet app [here](https://ancapuscasu.github.io/meet-up/)

## Key features

- Meet app displays a list of upcoming developer events, showing for each event: the title, date, time and location. A "Show details" button toggles a full event description and a link to the details on the user's Google calendar.
- By default 12 events are displayed from across all locations. Users can search for specific event locations and specify the number of events that they wish to see displayed.
- A progress bar appears while the page loads and updates.
- Alerts are displayed to notify the user if a location requested does not exist and if the requested number of events exceeds the maximum number that the page can display. 
- In addition to the events the app displays two charts implemented using Recharts. A pie chart shows the events summarized by subject area and a scatter chart shows the number of events by location.
- Meet app is progressive and can be used offline where it will display events cached during the most recent visit. An alert indicates to the user when they are working offline.
- The app is responsive and adjusts automatically to fit the screen size available.
- The app uses OAuth2.0 to implement efficient user authentication and authorization. Users sign in with Google and provide consent to access their Google calendar. This completes the authorization process and takes users directly to the main page displaying the events.
- The cloud-based server that handles the authorisation process is hosted by AWS Lambda. The framework Serverless was used to configure the endpoints and deploy the event handlers.

## Technologies

- React
- Jest
- Enzyme
- jest-cucumber
- Puppeteer
- Serverless
- Googleapis
- Axios
- Atatus
- nprogress
- Recharts
- gh-pages
