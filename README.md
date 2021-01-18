Playing with META_II from http://www.bayfronttechnologies.com/mc_tutorial.html
I want to modify it to my needs, make it more approachable to others too.

https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs
https://blog.developer.atlassian.com/scripting-with-node/

cd to the proect, then run this command and navigate to http://localhost:8080

    http-server


// run:
// 
//     node .
// 
// install:
// 
//     npm install -g .
// 
// run:
// 
//     meta_ii
// 
// uninstall:
// 
//     npm uninstall -g meta_ii

list globally installed apps:

    npm ls -g --depth=0

I was trying to recreate the META-II as an interpreter with a virtual machine that accepts 2 inputs: the input and the machine code compiler in the META II language.

for now, in this folder, run:

    node

And in it,

    META_II = require('./index.js').META_II;
    console.log( inpExample );
    console.log( codeExample );
    result = META_II(inpExample, codeExample);
    console.log( result );

TODO:

 * get rid of while loops that test each character, use regex instead.
 * convert stack frames to structured objects
 * write meta compiler with new version

