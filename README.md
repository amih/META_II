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

# HOW TO USE:

 * bootstrap the compiler using the instructions above
 * the database name is the contract name and should be the folder and file name too, e.g. demo111
 * play with the CREATE TABLE commands, auto compile happens 3 seconds after the last key stroke
 * create a folder with the contract name e.g. demo111
 * copy the smart contract c++ from the output to a text file with the same name with a cpp extension e.g. demo111.cpp
 * cd to the folder and run:

    eosio-cpp demo111.cpp

    // The auto increment version has a bug: remove the comma before the first parameter in the INSERT action. TODO: extend the compiler to handle this case.  
    // this will compile the file and output a demo111.wasm and demo111.abi which can be uploaded to a blockchain account.  
    // start a temporary blockchain just for testing, using:  

    nodeos -e -p eosio --plugin eosio::producer_plugin --plugin eosio::producer_api_plugin --plugin eosio::chain_api_plugin --plugin eosio::http_plugin --plugin eosio::history_plugin --plugin eosio::history_api_plugin --filter-on="*" --access-control-allow-origin='*' --contracts-console --http-validate-host=false --verbose-http-errors > nodeos.log 2>&1 & echo $! > "eosd.pid"

    curl http://localhost:8888/v1/chain/get_info | jq  
    cleos get info  
    cleos get account eosio  
    cleos get accounts BY_PUB_KEY  
    cleos create account eosio newaccount PUB_KEY_FOR_NEW_ACCOUNT  
    cleos get account newaccount  
    
    // move up one level, to the folder above the one with the contract

    cd ..

    // this will upload the contract to the account on the blockchain:

    cleos set contract newaccount demo111  
    cleos get account newaccount  
    cleos get table newaccount newaccount product  
    cleos get table newaccount newaccount customer  

    // INSERT a new row to the product table:

    cleos push action newaccount producti '[ "eosio", "headset", 1, "the most amazing head set for audiophils!", 230 ]' -p eosio@active  
    cleos get table newaccount newaccount product  
    cleos push action newaccount productu '[ "eosio", "HeadSet", 1, "The BESTES!?!?!?!? head set for audiophils!", 2300 ]' -p eosio@active  
    cleos get table newaccount newaccount product  
    cleos push action newaccount producti '[ "newaccount", "Banana", 12345678901234567890, "Fruit is good for you", 12 ]' -p newaccount@active  
    cleos get table newaccount newaccount product  

    ## SHOW TABLES:
    cleos get abi newaccount  > abi.json
    cleos get abi newaccount2 > abi2.json
    
    ## SELECT * FROM newaccount2.product:
    cleos get table newaccount2 newaccount2 product

    // INSERT to AUTO INCREMENT table:

    cleos push action newaccount2 producti '[ "headset", "the most amazing head set for audiophils!", 230,  1.2  ]' -p newaccount2@active  
    cleos push action newaccount2 producti '[ "headset", "the most amazing head set for audiophils!", 230,  1.23 ]' -p newaccount2@active  
    cleos push action newaccount2 producti '[ "headset", "the most amazing head set for audiophils!", 230, 12.40 ]' -p newaccount2@active  
    cleos push action newaccount2 producti '[ "turntable", "Vintage mp3 player", 1234567890, 1290.42 ]' -p newaccount2@active  
    cleos get table newaccount2 newaccount2 product  
    cleos push action newaccount2 productu '[ 1, "lemon", "Sour friut, careful!", 2330999,  0.25 ]' -p newaccount2@active  
    cleos get table newaccount2 newaccount2 product  

    // to stop the blockchain,

    tail -f nodeos.log  
    kill \`cat "eosd.pid"\`  
    tail -f nodeos.log  

    // don't have the eosd.pid file? Here is how to stop the blockchain without it:

    ps aux | grep nodeos

    // you'll get 3 lines with the nodeos command you typed to start the blockchain, look for the lowest process number at the beginning of the lines and use that:

   kill theProcessNumber

# TODO:

 V get rid of while loops that test each character, use regex instead.
 * convert stack frames to structured objects
 * write meta compiler with new version
 * self contained output javascript meta_ii with interpreter
 * minimize initial Meta_II code and bootstrap from it

for future reference:
	https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs
	https://blog.developer.atlassian.com/scripting-with-node/
