npm_binary_path = ./node_modules/.bin

style.min.css: style.css
	$(npm_binary_path)/ycssmin style.css > style.min.css

client.js: src/client/main.js
	$(npm_binary_path)/browserify src/client/main.js -o ./client.js

client.min.js: client.js
	$(npm_binary_path)/yuglify ./client.js
