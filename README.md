# Basic JMN Mood: code exercice.

Please provide in a text file a section of self crafted code (in a language of your choice) with associated unit tests that demonstrates a test driven approach to meeting the following acceptance criteria:

> **Given** I have a command line window open  
> **And** I type in a {input filename} "c:\{folder}\texttoreverse.txt" of saved text file that contains the {input text} "abcdef12345"  
> **And** I type in a {output filename} "c:\{folder}\textreversed.txt" of a text file that will be created  
> **When** press return  
> **Then** the command line reads the input file: {input file} has been reversed and output to the file: {output filename} with the reversed content: {output text} "54321fedcba"  
> **And** the file {output filename} "c:\{folder}\textreversed.txt" is created  
> **And** the contents of the file contains {output text} "54321fedcba"  

Please note the following constraints:
* Demonstrate a TDD approach.
* Unit tests should not hit the file system.
* Return your code in simple text file as it will be rejected by Mood Media firewall.
* Do not send binaries as we are not going to run any application and will simply look at the code in a text editor.


## Prerequisites
**Node.js** : install version 0.9.6 or up. See [node.js](http://nodejs.org/) for install on your system.  
**GNUMake** :

* For Debian:

		sudo apt-get install make

* For Redhat,CentOS:

		sudo rpm -ivh make

* For Windows : see binary installation [Make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm)

## Installation
* Start a command line window
* Goes in the root of the application git clone
* with dev modules dependencies(test frameworks installation), Execute command:

		npm install
* for production only application Execute command:

		npm install --production

## Execute test
Remark: should be perform as specified above with the dev modules dependencies install.
* Start a command line window
* Goes in the root of the application git clone
* Execute command:

		Make
### Example test result :

Test result :

	../lib/ReversFile.js - Reverse file
		✓ getInstance() - instance should create
		processArguments() - when i process arguments
			✓ it should return false for unspecified source file
			✓ it should test source file exists.
			✓ it should return false for unspecified destination file
			✓ sourceFileName getter should return same as processed argument after valid check
			✓ destFileName getter should return same as processed argument after valid check
		readSourceFile() - when i read source file
			✓ it should call the filesystem readFileSync once
			✓ read file failed goes throw error
			✓ getData() - it should set the data content to the read file content
		reverseSourceData() - when i reverse the data
			✓ it should return data with reversed source content
		writeReverseContent() - when i save the data
			✓ it should call the writeFileSync to write the data to the filesystem
			✓ write file failed goes throw error
	12 tests complete (333 ms)

Code Coverage result:

	=============================== Coverage summary ===============================
	Statements   : 100% ( 28/28 )
	Branches     : 100% ( 10/10 )
	Functions    : 100% ( 10/10 )
	Lines        : 100% ( 28/28 )
	================================================================================

## Execute application
* Start a command line window
* Goes in the root of the application git clone
* Execute command:

		node app/app.js {input filename} {output filename}
