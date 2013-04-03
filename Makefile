REPORTER = min

test:
	@./node_modules/.bin/mocha --reporter $(REPORTER) -u tdd

.PHONY: test