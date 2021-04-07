input_i = {};
code_c = {};
code_c["ca05 added STORE AND LOAD VARIABLES"] = `	ADR METAII
METAII
	TST '.SYNTAX'
	BF L1
	ID
	BE
	CL 'ADR '
	CI
	OUT
L2
	CLL ST
	BT L2
	SET
	BE
	TST '.END'
	BE
	CL 'END'
	OUT
L1
L3
	R
ST
	ID
	BF L4
	LB
	CI
	OUT
	TST '='
	BE
	CLL EX1
	BE
	TST ';'
	BE
	CL 'R'
	OUT
L4
L5
	R
EX1
	CLL EX2
	BF L6
L7
	TST '/'
	BF L8
	CL 'BT '
	GN1
	OUT
	CLL EX2
	BE
L8
L9
	BT L7
	SET
	BE
	LB
	GN1
	OUT
L6
L10
	R
EX2
	CLL EX3
	BF L11
	CL 'BF '
	GN1
	OUT
L11
	BT L12
	CLL OUTPUT
	BF L13
L13
L12
	BF L14
L15
	CLL EX3
	BF L16
	CL 'BE'
	OUT
L16
	BT L17
	CLL OUTPUT
	BF L18
L18
L17
	BT L15
	SET
	BE
	LB
	GN1
	OUT
L14
L19
	R
EX3
	ID
	BF L20
	CL 'CLL '
	CI
	OUT
L20
	BT L21
	SR
	BF L22
	CL 'TST '
	CI
	OUT
L22
	BT L21
	TST '.ID'
	BF L23
	CL 'ID'
	OUT
L23
	BT L21
	TST '.NUMBER'
	BF L24
	CL 'NUM'
	OUT
L24
	BT L21
	TST '.STRING'
	BF L25
	CL 'SR'
	OUT
L25
	BT L21
	TST '.STORENAME'
	BF L26
	ID
	BE
	CL 'STORENAME '
	CI
	OUT
L26
	BT L21
	TST '('
	BF L27
	CLL EX1
	BE
	TST ')'
	BE
L27
	BT L21
	TST '.EMPTY'
	BF L28
	CL 'SET'
	OUT
L28
	BT L21
	TST '$'
	BF L29
	LB
	GN1
	OUT
	CLL EX3
	BE
	CL 'BT '
	GN1
	OUT
	CL 'SET'
	OUT
L29
L21
	R
OUTPUT
	TST '{'
	BF L30
L31
	CLL OUT1
	BT L31
	SET
	BE
	TST '}'
	BE
L30
	BT L32
	TST '.LABEL'
	BF L33
	CL 'LB'
	OUT
	CLL OUT1
	BE
L33
L32
	BF L34
	CL 'OUT'
	OUT
L34
L35
	R
OUT1
	TST '*1'
	BF L36
	CL 'GN1'
	OUT
L36
	BT L37
	TST '*2'
	BF L38
	CL 'GN2'
	OUT
L38
	BT L37
	TST '*N'
	BF L39
	ID
	BE
	CL 'LOADNAME '
	CI
	OUT
L39
	BT L37
	TST '*'
	BF L40
	CL 'CI'
	OUT
L40
	BT L37
	SR
	BF L41
	CL 'CL '
	CI
	OUT
L41
L37
	R
  END`;
input_i["ia15. meta_ii with loops, use with ca05"] = `.SYNTAX METAIIWITHLOOPS
METAIIWITHLOOPS = '.SYNTAX' .ID {'ADR ' *} $ ST '.END' {'END'};
ST = .ID .LABEL * '=' EX1 ';' {'R'};
EX1 = EX2 $('/' {'BT ' *1} EX2 ) .LABEL *1 ;
EX2 = (EX3 {'BF ' *1} / OUTPUT) $(EX3 {'BE'} / OUTPUT) .LABEL *1 ;
EX3 = '.loop(' .ID .STORENAME arrName ',' .ID .STORENAME idxName '['
            { 'INITVAR ' *N idxName }
            .LABEL *1
            $ OUTPUT
            { 'INCVAR ' *N idxName }
            { 'PREPAREARRLENGTH ' *N arrName }
            { 'COMPARE ' *N idxName }
            { 'BF ' *1 }
      ']' ')' /
      .ID       {'CLL '*} /
      .STRING   {'TST '*} /
      '.ID'     {'ID'}    /
      '.NUMBER' {'NUM'}   /
      '.STRING' {'SR'}    /
      '.STORENAMEARR' .ID {'STORENAMEARR '*} /
      '.CLEARNAMEARR' .ID {'CLEARNAMEARR '*} /
      '.STORENAME'    .ID {'STORENAME '*}    /
      '(' EX1 ')'             /
      '.EMPTY'  {'SET'}   /
      '$' .LABEL *1 EX3 {'BT ' *1} {'SET'} ;
OUTPUT = ('{' $OUT1 '}' / '.LABEL' {'LB'} OUT1) {'OUT'};
OUT1 = '*1'    {'GN1'}  /
       '*2'    {'GN2'}  /
       '*N'    .ID {'LOADNAME ' *} /
       '+N'    .ID {'INCVAR '   *} /
       '+INIT' .ID {'INITVAR '  *} /
       '^N'    .ID {'ARRLENGTH '*} /
       '~PREPNAME' .ID {'PREPARE '  *} /
       '~PREPARR'  .ID {'PREPAREARRLENGTH '  *} /
       '~COMPARE'    .ID {'COMPARE '  *} /
       '~LOADIDX' .ID {'LOADIDX '*} /
       '*'     {'CI'}   /
       .STRING {'CL '*} /
       '.NL'   {'NL'} /
       '.LB'   {'LB'} /
       '.TB'   {'TB'} /
       '.LM+'  {'LMI'} /
       '.LM-'  {'LMD'} ;
.END`;
input_i["ia16. sql to eosio"] = `.SYNTAX SQL2EOS
SQL2EOS = CREATEDATABASE DATABASEOUTTEMPLATEHEADER $ CREATETABLE DATABASEOUTTEMPLATEFOOTER;
CREATEDATABASE = 'CREATE' 'DATABASE' .ID .STORENAME TheDatabaseName ';';
CREATETABLE = 'CREATE' 'TABLE' .ID .STORENAME TheTableName .CLEARNAMEARR fieldName .CLEARNAMEARR fieldType '(' FIELD $(',' FIELD) ')' TABLEOUTTEMPLATE ';';
FIELD = .ID .STORENAMEARR fieldName .ID .STORENAMEARR fieldType;
DATABASEOUTTEMPLATEHEADER = 
{ .LB '// SQL2EOS 1st version, one table per smart contract 20210304'}
{ .LB '// Limitations: the primary key is hard coded as the user'}
{ .LB '// not sure it compiles!'}
{ .LB '// no validation checks, on table name, should be a valid eosio name'}
{ .LB '// no validation checks, on the fields, strings are unlimited in length!'}
{ .LB '// https://github.com/EOSIO/eos/blob/release/2.0.x/libraries/chain/abi_serializer.cpp#L90'}
{ .LB '#include <eosio/eosio.hpp>' .NL 'using namespace eosio;' .NL 'using namespace std;' }
{ .LB 'class [[eosio::contract("' *N TheDatabaseName '")]] ' *N TheDatabaseName ' : public eosio::contract {' }
{ .LB 'public:' .LM+ }
{ .LB *N TheDatabaseName '(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}' };
DATABASEOUTTEMPLATEFOOTER = { .LB '};'};
TABLEOUTTEMPLATE = 
{ .LB }
{ .LB '//////////////////////'}
{ .LB '// TABLE: ' *N TheTableName}
{ .LB '//////////////////////'}
{ .LB }
{ .LB 'public:' .LM+ }
{ .LB '// ACTION: ' *N TheTableName '-INSERT'}
{ .LB '//--------------------'}
{ .LB '[[eosio::action]] void ' *N TheTableName 'i(name user' .LM+ }
.loop(fieldName, ii [
    { .LB ', ' ~PREPNAME fieldType ~LOADIDX ii ' ' ~PREPNAME fieldName ~LOADIDX ii }
])
{ .LB .LM- ') {' .LM+ }
{ .LB 'require_auth( user );'}
{ .LB *N TheTableName '_multi_index theTableVariable( get_self(), get_first_receiver().value );'}
{ .LB 'auto iterator = theTableVariable.find(user.value);'}
{ .LB 'check(iterator == theTableVariable.end(), "Record already exist");'}
{ .LB 'theTableVariable.emplace(user, [&]( auto& row ) {' .LM+ }
{ .LB 'row.key = user;'}
.loop(fieldName, ii [
    { .LB 'row.' ~PREPNAME fieldName ~LOADIDX ii ' = ' ~PREPNAME fieldName ~LOADIDX ii ';' }
])
{ .LB .LM- '});' }
{ .LB .LM- '}' }

{ .LB '// ACTION: ' *N TheTableName '-UPDATE'}
{ .LB '//--------------------'}
{ .LB '[[eosio::action]] void ' *N TheTableName 'u(name user' .LM+ }
.loop(fieldName, ii [
    { .LB ', ' ~PREPNAME fieldType ~LOADIDX ii ' ' ~PREPNAME fieldName ~LOADIDX ii }
])
{ .LB .LM- ') {' .LM+ }
{ .LB 'require_auth( user );'}
{ .LB *N TheTableName '_multi_index theTableVariable( get_self(), get_first_receiver().value );'}
{ .LB 'auto iterator = theTableVariable.find(user.value);'}
{ .LB 'check(iterator != theTableVariable.end(), "Record does not exist");'}
{ .LB 'theTableVariable.modify(iterator, user, [&]( auto& row ) {' .LM+ }
{ .LB 'row.key = user;'}
.loop(fieldName, ii [
    { .LB 'row.' ~PREPNAME fieldName ~LOADIDX ii ' = ' ~PREPNAME fieldName ~LOADIDX ii ';' }
])
{ .LB .LM- '});' }
{ .LB .LM- '}' }

{ .LB '// ACTION: ' *N TheTableName '-DELETE'}
{ .LB '//--------------------'}
{ .LB '[[eosio::action]] void ' *N TheTableName 'd(name user) { // delete is a reserved word in cpp :(' .LM+ }
{ .LB 'require_auth(user);'}
{ .LB *N TheTableName '_multi_index theTableVariable( get_self(), get_first_receiver().value);'}
{ .LB 'auto iterator = theTableVariable.find(user.value);'}
{ .LB 'check(iterator != theTableVariable.end(), "Record does not exist");'}
{ .LB 'theTableVariable.erase(iterator);'}
{ .LB .LM- '}' }

{ .LB .LM- 'private:' .LM+ }
{ .LB 'struct [[eosio::table]] ' *N TheTableName '_struct {' .LM+ }
{ .LB 'name key;'}
.loop(fieldName, ii [
    { .LB ~PREPNAME fieldType ~LOADIDX ii ' ' ~PREPNAME fieldName ~LOADIDX ii ';' }
])
{ .LB 'uint64_t primary_key() const { return key.value; }'}
{ .LB .LM- '};'}

{ .LB 'using ' *N TheTableName '_multi_index = eosio::multi_index<"' *N TheTableName '"_n, ' *N TheTableName '_struct>;' .LM- }
;
.END`;
input_i["ia17. create table example"] = `CREATE DATABASE demoDatabase;

CREATE TABLE customer (
  accountName name,
  id uint64_t,
  firstName string,
  yearOfBirth uint16_t
);

CREATE TABLE product (
  productName name,
  id uint64_t,
  productDescription string,
  productPrice uint16_t
);`;