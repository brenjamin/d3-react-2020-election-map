# NY Times 2020 Presidential Election Map Clone: D3 & React

A clone of the NY Times' 2020 Presidential Election Map made with D3, React, & SVG.

- [View project](https://brenjamin.github.io/d3-react-2020-election-map).
- [Link to the map on the NY Times' website](https://www.nytimes.com/interactive/2020/11/03/us/elections/results-president.html).

## Election Data (./src/data)

- County-level data adapted from [tonmcg's repository](https://github.com/tonmcg/US_County_Level_Election_Results_08-20) on creating maps from election results
- State-level data adapted from [MIT's Election Data](https://electionlab.mit.edu/data)

## Map Data (./src/data)

- County and Alaska Election District topojson created using mapshaper following the instructions in [tonmcg's repository](https://github.com/tonmcg/US_County_Level_Election_Results_08-20)
- State topojson created with mapshaper using state .shp files from the [census.gov website](https://www2.census.gov/geo/tiger/GENZ2019/shp/)
- City data adapted from [nicolaskruchten's top 1000 most populous US Cities data](https://github.com/plotly/datasets/blob/master/us-cities-top-1k.csv)

## Creating the map

I combined the unprojected state and county map geojson data into a single topojson file (.src/data/us-map.json), which is imported into the useUSMap.js file, and loaded in the main App.js file.

I had trouble pre-projecting the state and county data in a way that worked with the city data, so I ended up using the following projection for states, counties, and cities within the App itself (./components/ElectionMap):

<code>const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])</code>

I based this on the projection used in the [US Atlas TopoJSON repository](https://github.com/topojson/us-atlas).

## Other Helpful Resources

Some other resources that were helpful when I built this project include:

- [Mike Bostock's Command Line Cartography](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c)
- [Converting a Shapefile to TopoJSON for D3.js](https://github.com/MAPC/infrastructure/blob/master/docs/D3%20Map%20Setup.md)
- [How to Scale/Choose D3 Projection Settings from .shp File](https://stackoverflow.com/questions/48270218/how-to-scale-choose-d3-projection-settings-from-shp-file)
- [Mapshaper](https://mapshaper.org/)
- [Mapshaper Command Reference](https://github.com/mbloch/mapshaper/wiki/Command-Reference)
- Using D3, React, & SVG to create data visualizations based on [Curran Kelleher's course](https://www.youtube.com/watch?v=2LhoCfjm8R4)

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
