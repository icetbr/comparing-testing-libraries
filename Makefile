chokidar=./node_modules/chokidar-cli/index.js '{test,src}/*.js' --initial -c 'printf "\033c";
lab=./node_modules/@hapi/lab/bin/lab --silence test/employeeLabTest.js

lab:
	$(lab) || true

labWatch:
	$(chokidar) $(lab)'

labPerf:
	for i in `seq 1 10`; do  $(lab); done