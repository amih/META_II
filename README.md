# A very small Meta_II meta compiler and an initial SQL-to-EOSIO smart contract compiler

Playing with META_II from http://www.bayfronttechnologies.com/mc_tutorial.html
I want to modify it to my needs, make it more approachable to others too.

0. no need to do npm install, just make sure you have http-server installed globally (or any other local dev http server you like)
1. cd to the project folder
2. http-server # will serve the index.html page, one-time install: npm install -g http-server
3. Select 'ia15. meta_ii with loops, use with ca05' from the first list on the left
4. Select 'ca05 added STORE AND LOAD VARIABLES' from the center list
   This will immediately run the code on the input and produce the output in the right textarea.
5. click the ⤺ arrow to copy the output to the center text area
   The output is an extended and improved version of the previous code, the light blue background indicates that the new output is identical to the code, so this is a new meta-compiler! 
6. Select 'ia16. sql to eosio' which will output the compiler
   Now the output contains a specific compiler, not a meta-compiler, it is the sql-to-eos compiler
7. click the ⤺ arrow to copy the output to the code text area
8. Select 'ia17. create table example' to see the sql2eos compiler in action!
9. Copy the output to a file with .cpp suffix, e.g. customer.cpp
10. compile it using > eosio-cpp customer.cpp

TODO:

 V get rid of while loops that test each character, use regex instead.
 * convert stack frames to structured objects
 * write meta compiler with new version
 * self contained output javascript meta_ii with interpreter
 * minimize initial Meta_II code and bootstrap from it

for future reference:
	https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs
	https://blog.developer.atlassian.com/scripting-with-node/
