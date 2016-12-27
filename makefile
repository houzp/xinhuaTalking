# @Author: SuperWoods
# @Date:   2016-05-31-08:41:37
# @Email:  st_sister@iCloud.com
# @Last modified by:   SuperWoods
# @Last modified time: 2016-12-27-19:41:27
# @License: MIT
#
# .PHONY: clean
# clean:
# 	rm -r bundle
# ------------------------------------------------------------------------ mkdir

.PHONY: mk
mk:
	mkdir -p bundle
	mkdir -p css
	mkdir -p js
	mkdir -p img
	mkdir -p jade
	mkdir -p local
	mkdir -p sundries

# -------------------------------------------------------------------------- css

.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/index.css --output bundle/index.min.css
# --------------------------------------------------------------------------- js

.PHONY: js
js:
	mkdir -p bundle
	babel --watch js/cover.js --out-file bundle/cover.min.js &
	babel --watch js/zoom.js --out-file bundle/zoom.min.js &
	babel --watch js/index.js --out-file bundle/index.min.js &
	babel --watch js/footer.js --out-file bundle/footer.min.js

# ----------------------------------------------------------------------- server

.PHONY: server
server:
	gulp autowatch-jade &
	browser-sync start --server --files='index.html, bundle, css, js, img, jade'

# -------------------------------------------------------------------------- all

.PHONY: all
all:
	make css & make js & make server & wait
