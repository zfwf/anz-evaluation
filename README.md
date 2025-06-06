# anz-evaluation
For tech evaluation at ANZ

## Usage

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Routes

### /tokenize examples
```
$ curl -d '["4111-1111-1111-1111"]' -H "Content-Type: application/json" -X POST http://localhost:3000/tokenize

["b3f846b293cec081f0740bdaaecbea387754943b9e2ff6d83b8b459d1bbb43ac"]%     
```

### /detokenize examples
```
# first run the /tokenize example above to seed the DB

$ curl -d '["b3f846b293cec081f0740bdaaecbea387754943b9e2ff6d83b8b459d1bbb43ac"]' -H "Content-Type: application/json" -X POST http://localhost:3000/detokenize

["4111-1111-1111-1111"]%     
```
