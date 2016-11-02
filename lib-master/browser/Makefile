# make all

.PHONY: js
js:
	mkdir -p dist
	babel --watch es6/browser.js --out-file dist/browser.js

.PHONY: server
server:
	browser-sync start --server --files='index.html, dist, es6'

.PHONY: clean
clean:
	rm -r dist

.PHONY: all
all:
	make js & make server & wait
