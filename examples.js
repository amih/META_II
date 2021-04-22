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
code_c["ca05a with loops and skipifzero"] = `	ADR METAIIWITHLOOPS
METAIIWITHLOOPS
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
	TST '.loop('
	BF L20
	ID
	BE
	STORENAME arrName
	BE
	TST ','
	BE
	ID
	BE
	STORENAME idxName
	BE
	TST ')'
	BE
	TST '['
	BE
	CL 'INITVAR '
	LOADNAME idxName
	OUT
	LB
	GN1
	OUT
L21
	CLL OUTPUT
	BT L21
	SET
	BE
	CL 'INCVAR '
	LOADNAME idxName
	OUT
	CL 'PREPAREARRLENGTH '
	LOADNAME arrName
	OUT
	CL 'COMPARE '
	LOADNAME idxName
	OUT
	CL 'BF '
	GN1
	OUT
	TST ']'
	BE
L20
	BT L22
	TST '.skipifzero('
	BF L23
	ID
	BE
	STORENAME idxName
	BE
	TST ')'
	BE
	TST '['
	BE
	CL 'INITVAR ZERO'
	OUT
	CL 'PREPARE '
	LOADNAME idxName
	OUT
	CL 'COMPARE ZERO'
	OUT
	CL 'BF '
	GN1
	OUT
L24
	CLL OUTPUT
	BT L24
	SET
	BE
	LB
	GN1
	OUT
	TST ']'
	BE
L23
	BT L22
	ID
	BF L25
	CL 'CLL '
	CI
	OUT
L25
	BT L22
	SR
	BF L26
	CL 'TST '
	CI
	OUT
L26
	BT L22
	TST '.ID'
	BF L27
	CL 'ID'
	OUT
L27
	BT L22
	TST '.NUMBER'
	BF L28
	CL 'NUM'
	OUT
L28
	BT L22
	TST '.STRING'
	BF L29
	CL 'SR'
	OUT
L29
	BT L22
	TST '->[]'
	BF L30
	ID
	BE
	CL 'STORENAMEARR '
	CI
	OUT
L30
	BT L22
	TST '.CLEARNAMEARR'
	BF L31
	ID
	BE
	CL 'CLEARNAMEARR '
	CI
	OUT
L31
	BT L22
	TST '->'
	BF L32
	ID
	BE
	CL 'STORENAME '
	CI
	OUT
L32
	BT L22
	TST '('
	BF L33
	CLL EX1
	BE
	TST ')'
	BE
L33
	BT L22
	TST '.EMPTY'
	BF L34
	CL 'SET'
	OUT
L34
	BT L22
	TST '$'
	BF L35
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
L35
L22
	R
OUTPUT
	TST '{'
	BF L36
L37
	CLL OUT1
	BT L37
	SET
	BE
	TST '}'
	BE
L36
	BT L38
	TST '.LABEL'
	BF L39
	CL 'LB'
	OUT
	CLL OUT1
	BE
L39
L38
	BF L40
	CL 'OUT'
	OUT
L40
L41
	R
OUT1
	TST '*1'
	BF L42
	CL 'GN1'
	OUT
L42
	BT L43
	TST '*2'
	BF L44
	CL 'GN2'
	OUT
L44
	BT L43
	TST '*N'
	BF L45
	ID
	BE
	CL 'LOADNAME '
	CI
	OUT
L45
	BT L43
	TST '+N'
	BF L46
	ID
	BE
	CL 'INCVAR '
	CI
	OUT
L46
	BT L43
	TST '+INIT'
	BF L47
	ID
	BE
	CL 'INITVAR '
	CI
	OUT
L47
	BT L43
	TST '^N'
	BF L48
	ID
	BE
	CL 'ARRLENGTH '
	CI
	OUT
L48
	BT L43
	TST '~PREPNAME'
	BF L49
	ID
	BE
	CL 'PREPARE '
	CI
	OUT
L49
	BT L43
	TST '~PREPARR'
	BF L50
	ID
	BE
	CL 'PREPAREARRLENGTH '
	CI
	OUT
L50
	BT L43
	TST '~COMPARE'
	BF L51
	ID
	BE
	CL 'COMPARE '
	CI
	OUT
L51
	BT L43
	TST '['
	BF L52
	ID
	BE
	TST ']'
	BE
	CL 'LOADIDX '
	CI
	OUT
L52
	BT L43
	TST '*'
	BF L53
	CL 'CI'
	OUT
L53
	BT L43
	SR
	BF L54
	CL 'CL '
	CI
	OUT
L54
	BT L43
	TST '.NL'
	BF L55
	CL 'NL'
	OUT
L55
	BT L43
	TST '.LB'
	BF L56
	CL 'LB'
	OUT
L56
	BT L43
	TST '.TB'
	BF L57
	CL 'TB'
	OUT
L57
	BT L43
	TST '.LM+'
	BF L58
	CL 'LMI'
	OUT
L58
	BT L43
	TST '.LM-'
	BF L59
	CL 'LMD'
	OUT
L59
L43
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
input_i["ia15stepping. meta_ii with loops, use with ca05"] = `.SYNTAX METAIIWITHLOOPS
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
      '->[]' .ID {'STORENAMEARR '*} /
      '.CLEARNAMEARR' .ID {'CLEARNAMEARR '*} /
      '->'    .ID {'STORENAME '*}    /
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
       '[' .ID ']' {'LOADIDX '*} /
       '*'     {'CI'}   /
       .STRING {'CL '*} /
       '.NL'   {'NL'} /
       '.LB'   {'LB'} /
       '.TB'   {'TB'} /
       '.LM+'  {'LMI'} /
       '.LM-'  {'LMD'} ;
.END`;
input_i["ia15modernized. meta_ii with loops, use with ca05"] = `.SYNTAX METAIIWITHLOOPS
METAIIWITHLOOPS = '.SYNTAX' .ID {'ADR ' *} $ ST '.END' {'END'};
ST = .ID .LABEL * '=' EX1 ';' {'R'};
EX1 = EX2 $('/' {'BT ' *1} EX2 ) .LABEL *1 ;
EX2 = (EX3 {'BF ' *1} / OUTPUT) $(EX3 {'BE'} / OUTPUT) .LABEL *1 ;
EX3 = '.loop(' .ID -> arrName ',' .ID -> idxName '['
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
      '->[]' .ID {'STORENAMEARR '*} /
      '.CLEARNAMEARR' .ID {'CLEARNAMEARR '*} /
      '->'    .ID {'STORENAME '*}    /
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
       '[' .ID ']' {'LOADIDX '*} /
       '*'     {'CI'}   /
       .STRING {'CL '*} /
       '.NL'   {'NL'} /
       '.LB'   {'LB'} /
       '.TB'   {'TB'} /
       '.LM+'  {'LMI'} /
       '.LM-'  {'LMD'} ;
.END`;
input_i["ia15modernized+skipifzero. meta_ii with loops, use with ca05"] = `.SYNTAX METAIIWITHLOOPS
METAIIWITHLOOPS = '.SYNTAX' .ID {'ADR ' *} $ ST '.END' {'END'};
ST = .ID .LABEL * '=' EX1 ';' {'R'};
EX1 = EX2 $('/' {'BT ' *1} EX2 ) .LABEL *1 ;
EX2 = (EX3 {'BF ' *1} / OUTPUT) $(EX3 {'BE'} / OUTPUT) .LABEL *1 ;
EX3 = '.loop(' .ID -> arrName ',' .ID -> idxName ')' '['
            { 'INITVAR ' *N idxName }
            .LABEL *1
            $ OUTPUT
            { 'INCVAR ' *N idxName }
            { 'PREPAREARRLENGTH ' *N arrName }
            { 'COMPARE ' *N idxName }
            { 'BF ' *1 }
      ']'  /
      '.skipifzero(' .ID -> idxName ')' '['
            { 'INITVAR ZERO' }
            { 'PREPARE ' *N idxName }
            { 'COMPARE ZERO' }
            { 'BF ' *1 }
            $ OUTPUT
            .LABEL *1
      ']'/
      .ID       {'CLL '*} /
      .STRING   {'TST '*} /
      '.ID'     {'ID'}    /
      '.NUMBER' {'NUM'}   /
      '.STRING' {'SR'}    /
      '->[]' .ID {'STORENAMEARR '*} /
      '.CLEARNAMEARR' .ID {'CLEARNAMEARR '*} /
      '->'    .ID {'STORENAME '*}    /
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
       '[' .ID ']' {'LOADIDX '*} /
       '*'     {'CI'}   /
       .STRING {'CL '*} /
       '.NL'   {'NL'} /
       '.LB'   {'LB'} /
       '.TB'   {'TB'} /
       '.LM+'  {'LMI'} /
       '.LM-'  {'LMD'} ;
.END`;
input_i["ia16. SQL2EOS"] = `.SYNTAX SQL2EOS
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
{ .LB *N TheDatabaseName '(name receiver, name blockchainAccount,  datastream<const char*> ds): contract(receiver, blockchainAccount, ds) {}' };
DATABASEOUTTEMPLATEFOOTER = { .LB '};'};
TABLEOUTTEMPLATE = 
{ .LB }
{ .LB '/////////////////////'}
{ .LB '// TABLE: ' *N TheTableName}
{ .LB '/////////////////////'}
{ .LB }
{ .LB 'public:' .LM+ }
{ .LB '// ACTION: ' *N TheTableName '-INSERT'}
{ .LB '[[eosio::action]] void ' *N TheTableName 'i(name user' .LM+ }
.loop(fieldName, ii)[
    { .LB ', ' ~PREPNAME fieldType ~LOADIDX ii ' ' ~PREPNAME fieldName ~LOADIDX ii }
]
{ .LB .LM- ') {' .LM+ }
{ .LB 'require_auth( user );'}
{ .LB *N TheTableName '_multi_index theTableVariable( get_self(), get_first_receiver().value );'}
{ .LB 'auto iterator = theTableVariable.find(user.value);'}
{ .LB 'check(iterator == theTableVariable.end(), "Record already exist");'}
{ .LB 'theTableVariable.emplace(user, [&]( auto& row ) {' .LM+ }
{ .LB 'row.key = user;'}
.loop(fieldName, ii)[
    { .LB 'row.' ~PREPNAME fieldName ~LOADIDX ii ' = ' ~PREPNAME fieldName ~LOADIDX ii ';' }
]
{ .LB .LM- '});' }
{ .LB .LM- '}' }

{ .LB '// ACTION: ' *N TheTableName '-UPDATE'}
{ .LB '[[eosio::action]] void ' *N TheTableName 'u(name user' .LM+ }
.loop(fieldName, ii)[
    { .LB ', ' ~PREPNAME fieldType ~LOADIDX ii ' ' ~PREPNAME fieldName ~LOADIDX ii }
]
{ .LB .LM- ') {' .LM+ }
{ .LB 'require_auth( user );'}
{ .LB *N TheTableName '_multi_index theTableVariable( get_self(), get_first_receiver().value );'}
{ .LB 'auto iterator = theTableVariable.find(user.value);'}
{ .LB 'check(iterator != theTableVariable.end(), "Record does not exist");'}
{ .LB 'theTableVariable.modify(iterator, user, [&]( auto& row ) {' .LM+ }
{ .LB 'row.key = user;'}
.loop(fieldName, ii)[
    { .LB 'row.' ~PREPNAME fieldName ~LOADIDX ii ' = ' ~PREPNAME fieldName ~LOADIDX ii ';' }
]
{ .LB .LM- '});' }
{ .LB .LM- '}' }

{ .LB '// ACTION: ' *N TheTableName '-DELETE'}
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
.loop(fieldName, ii)[
    { .LB ~PREPNAME fieldType ~LOADIDX ii ' ' ~PREPNAME fieldName ~LOADIDX ii ';' }
]
{ .LB 'uint64_t primary_key() const { return key.value; }'}
{ .LB .LM- '};'}

{ .LB 'using ' *N TheTableName '_multi_index = eosio::multi_index<"' *N TheTableName '"_n, ' *N TheTableName '_struct>;' .LM- }
;
.END`;
input_i["ia16modernized. SQL2EOS"] = `.SYNTAX SQL2EOS
SQL2EOS = CREATEDATABASE DATABASEOUTTEMPLATEHEADER $ CREATETABLE DATABASEOUTTEMPLATEFOOTER;
CREATEDATABASE = 'CREATE' 'DATABASE' .ID -> TheDatabaseName ';';
CREATETABLE = 'CREATE' 'TABLE' .ID -> TheTableName .CLEARNAMEARR fieldName .CLEARNAMEARR fieldType '(' FIELD $(',' FIELD) ')' TABLEOUTTEMPLATE ';';
FIELD = .ID ->[] fieldName .ID ->[] fieldType;
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
{ .LB *N TheDatabaseName '(name receiver, name blockchainAccount,  datastream<const char*> ds): contract(receiver, blockchainAccount, ds) {}' };
DATABASEOUTTEMPLATEFOOTER = { .LB '};'};
TABLEOUTTEMPLATE = 
{ .LB }
{ .LB '/////////////////////'}
{ .LB '// TABLE: ' *N TheTableName}
{ .LB '/////////////////////'}
{ .LB }
{ .LB 'public:' .LM+ }
{ .LB '// ACTION: ' *N TheTableName '-INSERT'}
{ .LB '[[eosio::action]] void ' *N TheTableName 'i(name user' .LM+ }
.loop(fieldName, ii)[
    { .LB ', ' ~PREPNAME fieldType[ii] ' ' ~PREPNAME fieldName[ii]}
]
{ .LB .LM- ') {' .LM+ }
{ .LB 'require_auth( user );'}
{ .LB *N TheTableName '_multi_index theTableVariable( get_self(), get_first_receiver().value );'}
{ .LB 'auto iterator = theTableVariable.find(user.value);'}
{ .LB 'check(iterator == theTableVariable.end(), "Record already exist");'}
{ .LB 'theTableVariable.emplace(user, [&]( auto& row ) {' .LM+ }
{ .LB 'row.key = user;'}
.loop(fieldName, ii)[
    { .LB 'row.' ~PREPNAME fieldName[ii] ' = ' ~PREPNAME fieldName[ii] ';' }
]
{ .LB .LM- '});' }
{ .LB .LM- '}' }

{ .LB '// ACTION: ' *N TheTableName '-UPDATE'}
{ .LB '[[eosio::action]] void ' *N TheTableName 'u(name user' .LM+ }
.loop(fieldName, ii)[
    { .LB ', ' ~PREPNAME fieldType[ii] ' ' ~PREPNAME fieldName[ii] }
]
{ .LB .LM- ') {' .LM+ }
{ .LB 'require_auth( user );'}
{ .LB *N TheTableName '_multi_index theTableVariable( get_self(), get_first_receiver().value );'}
{ .LB 'auto iterator = theTableVariable.find(user.value);'}
{ .LB 'check(iterator != theTableVariable.end(), "Record does not exist");'}
{ .LB 'theTableVariable.modify(iterator, user, [&]( auto& row ) {' .LM+ }
{ .LB 'row.key = user;'}
.loop(fieldName, ii)[
    { .LB 'row.' ~PREPNAME fieldName[ii] ' = ' ~PREPNAME fieldName[ii] ';' }
]
{ .LB .LM- '});' }
{ .LB .LM- '}' }

{ .LB '// ACTION: ' *N TheTableName '-DELETE'}
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
.loop(fieldName, ii)[
    { .LB ~PREPNAME fieldType[ii] ' ' ~PREPNAME fieldName[ii] ';' }
]
{ .LB 'uint64_t primary_key() const { return key.value; }'}
{ .LB .LM- '};'}

{ .LB 'using ' *N TheTableName '_multi_index = eosio::multi_index<"' *N TheTableName '"_n, ' *N TheTableName '_struct>;' .LM- }
;
.END`;
input_i["ia16a. SQL2EOS with auto increment PRIMARY KEY"] = `.SYNTAX SQL2EOS
SQL2EOS = CREATEDATABASE DATABASEOUTTEMPLATEHEADER $ CREATETABLE DATABASEOUTTEMPLATEFOOTER;
CREATEDATABASE = 'CREATE' 'DATABASE' .ID -> TheDatabaseName ';';
CREATETABLE = 'CREATE' 'TABLE' .ID -> TheTableName .CLEARNAMEARR fieldName .CLEARNAMEARR fieldType '(' FIELD $(',' FIELD) ')' TABLEOUTTEMPLATE ';';
FIELD = .ID ->[] fieldName .ID ->[] fieldType;
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
{ .LB *N TheDatabaseName '(name receiver, name blockchainAccount,  datastream<const char*> ds): contract(receiver, blockchainAccount, ds) {}' };
DATABASEOUTTEMPLATEFOOTER = { .LB '};'};
TABLEOUTTEMPLATE = 
{ .LB }
{ .LB '/////////////////////'}
{ .LB '// TABLE: ' *N TheTableName}
{ .LB '/////////////////////'}
{ .LB 'public:' .LM+ }
{ .LB '[[eosio::action]] void ' *N TheTableName 'i( // ACTION: ' *N TheTableName '-INSERT' .LM+ }
{ .LB '// TODO: remove the comma before the first parameter!'}
.loop(fieldName, ii)[
    { .LB ', ' ~PREPNAME fieldType[ii] ' ' ~PREPNAME fieldName[ii] }
]
{ .LB .LM- ') {' .LM+ }
{ .LB '// require_auth( user ); // who has permission to make this operation? the calling user?'}
{ .LB 'require_auth( get_self() ); // who has permission to make this operation? the owner of the blockchain account where the smart contract is?'}
{ .LB *N TheTableName '_multi_index theTableVariable( get_self(), get_first_receiver().value );'}
{ .LB 'theTableVariable.emplace( get_self(), [&]( auto& row ) {' .LM+ }
{ .LB 'row.id = theTableVariable.available_primary_key();'}
.loop(fieldName, ii)[
    { .LB 'row.' ~PREPNAME fieldName[ii] ' = ' ~PREPNAME fieldName[ii] ';' }
]
{ .LB .LM- '});' }
{ .LB .LM- '}' }

{ .LB '[[eosio::action]] void ' *N TheTableName 'u( // ACTION: ' *N TheTableName '-UPDATE' .LM+ }
{ .LB '  uint64_t id' }
.loop(fieldName, ii)[
    { .LB ', ' ~PREPNAME fieldType[ii] ' ' ~PREPNAME fieldName[ii] }
]
{ .LB .LM- ') {' .LM+ }
{ .LB 'require_auth( get_self() );'}
{ .LB *N TheTableName '_multi_index theTableVariable( get_self(), get_first_receiver().value );'}
{ .LB 'auto iterator = theTableVariable.find(id);'}
{ .LB 'check(iterator != theTableVariable.end(), "Record does not exist");'}
{ .LB 'theTableVariable.modify(iterator, get_self(), [&]( auto& row ) {' .LM+ }
.loop(fieldName, ii)[
    { .LB 'row.' ~PREPNAME fieldName[ii] ' = ' ~PREPNAME fieldName[ii] ';' }
]
{ .LB .LM- '});' }
{ .LB .LM- '}' }

{ .LB '[[eosio::action]] void ' *N TheTableName 'd(uint64_t id) { // ACTION: ' *N TheTableName '-DELETE' .LM+ }
{ .LB 'require_auth( get_self() );'}
{ .LB *N TheTableName '_multi_index theTableVariable( get_self(), get_first_receiver().value);'}
{ .LB 'auto iterator = theTableVariable.find(id);'}
{ .LB 'check(iterator != theTableVariable.end(), "Record does not exist");'}
{ .LB 'theTableVariable.erase(iterator);'}
{ .LB .LM- '}' }

{ .LB .LM- 'private:' .LM+ }
{ .LB 'struct [[eosio::table]] ' *N TheTableName '_struct {' .LM+ }
{ .LB 'uint64_t id;'}
.loop(fieldName, ii)[
    { .LB ~PREPNAME fieldType[ii] ' ' ~PREPNAME fieldName[ii] ';' }
]
{ .LB 'uint64_t primary_key() const { return id; }'}
{ .LB .LM- '};'}

{ .LB 'using ' *N TheTableName '_multi_index = eosio::multi_index<"' *N TheTableName '"_n, ' *N TheTableName '_struct>;' .LM- }
;
.END`;
input_i["ia17. create table example"] = `CREATE DATABASE demo111;

CREATE TABLE customer (
  id uint64_t,
  accountName name,
  firstName string,
  yearOfBirth uint16_t
);

CREATE TABLE product (
  id uint8_t,
  productName name,
  productDescription string,
  productPrice uint16_t
);`;
input_i["ia17. create table for AUTO INCREMENT"] = `CREATE DATABASE demo111;

CREATE TABLE customer (
  accountName name,
  firstName string,
  yearOfBirth uint16_t
);

CREATE TABLE product (
  productName name,
  productDescription string,
  productPriceSmallInt uint8_t,
  productPriceFloat float
);`;
input_i["ia18. create table future - not working yet"] = `CREATE DATABASE demoDatabase;

-- future version will include:
-- 1. SQL style comments like these lines, starting with double dash and a space until the end of the line
-- 2. Constraints on string lengths and numerical bounds which will be checked in the INSERT and UPDATE actions
-- 3. Primary Key and Secondary Indexes

CREATE TABLE customer (
  accountName name,
  id uint64_t( 1 .. 230 ),
  firstName string(20),
  yearOfBirth uint16_t ( 1900 .. 2200 ),
  PRIMARY KEY (accounttName),
  INDEX (id),
  INDEX (firstName, yearOfBirth)
);

CREATE TABLE product (
  productName name,
  id uint64_t,
  productDescription string(250),
  productPrice float(0..300),
  prodFloatRangeMaxLimited float(..300),
  PRIMARY KEY productName
);`;
