all: build

build: clean
	mkdir build
	mkdir build/css
	mkdir build/img
	cp img/* build/img/
	minify -o build/index.html index.html
	purifycss index.html css/base-min.css css/custom.css css/grids-min.css css/grids-responsive-min.css --min --info --out build/css/min.css

clean:
	rm -rf build/
