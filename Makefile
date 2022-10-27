export PATH := ./node_modules/.bin/:$(PATH)

all: style.min.css client.min.js

style.min.css: style.css
	ycssmin style.css > style.min.css

client.js: $(shell find src/client/ -name '*.js') $(shell find resources/ -name '*.json')
	browserify src/client/main.js -o ./client.js

client.min.js: client.js
	yuglify ./client.js
