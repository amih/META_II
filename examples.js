input_i = {};
input_i["i01. demo, AEXP example assignments"] =`
fern:=5+6;
ace:=fern*5;
waldo:=fern+alpha/-beta^gamma;`;

input_i["i02. demo, AEXP example assignment compiler"] =`
.SYNTAX AEXP

AEXP = AS $AS .,
AS = .ID .OUT('address ' *) ':=' EX1 .OUT('store') ';' .,
EX1 = EX2 $('+' EX2 .OUT('add') /
            '-' EX2 .OUT('sub') ) .,
EX2 = EX3 $('*' EX3 .OUT('mpy') /
            '/' EX3 .OUT('div') ) .,
EX3 = EX4 $('^' EX3 .OUT('exp')) .,
EX4 = '+' EX5 / '-' EX5 .OUT('minus') / EX5 .,
EX5 = .ID  .OUT('load ' *) /
      .NUMBER .OUT('literal ' *) /
      '(' EX1 ')' .,

.END`;

input_i["i03. Meta II syntax (paper fig. 5)"] =`
.SYNTAX PROGRAM

OUT1 = '*1' .OUT('GN1') / '*2' .OUT('GN2') /
'*' .OUT('CI') / .STRING .OUT('CL '*).,

OUTPUT = ('.OUT' '('
$OUT1 ')' / '.LABEL' .OUT('LB') OUT1) .OUT('OUT') .,

EX3 = .ID .OUT('CLL '*) / .STRING
.OUT('TST '*) / '.ID' .OUT('ID') /
'.NUMBER' .OUT('NUM') /
'.STRING' .OUT('SR') / '(' EX1 ')' /
'.EMPTY' .OUT('SET') /
'$' .LABEL *1 EX3
.OUT('BT ' *1) .OUT('SET').,

EX2 = (EX3 .OUT('BF ' *1) / OUTPUT)
$(EX3 .OUT('BE') / OUTPUT)
.LABEL *1 .,

EX1 = EX2 $('/' .OUT('BT ' *1) EX2 )
.LABEL *1 .,

ST = .ID .LABEL * '=' EX1
'.,' .OUT('R').,

PROGRAM = '.SYNTAX' .ID .OUT('ADR ' *)
$ ST '.END' .OUT('END').,

.END`;

input_i["i04. Meta II syntax (i03 reordered)"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' .ID .OUT('ADR ' *)
          $ ST
          '.END' .OUT('END') .,

ST = .ID .LABEL * '=' EX1 '.,' .OUT('R') .,

EX1 = EX2 $('/' .OUT('BT ' *1) EX2 )
      .LABEL *1 .,

EX2 = (EX3 .OUT('BF ' *1) / OUTPUT)
      $(EX3 .OUT('BE') / OUTPUT)
      .LABEL *1 .,

EX3 = .ID       .OUT('CLL '*) /
      .STRING   .OUT('TST '*) /
      '.ID'     .OUT('ID')    /
      '.NUMBER' .OUT('NUM')   /
      '.STRING' .OUT('SR')    /
      '(' EX1 ')'             /
      '.EMPTY'  .OUT('SET')   /
      '$' .LABEL *1 EX3 .OUT('BT ' *1) .OUT('SET') .,

OUTPUT = ('.OUT' '('$OUT1 ')' /
          '.LABEL' .OUT('LB') OUT1)
         .OUT('OUT') .,

OUT1 = '*1'    .OUT('GN1')  /
       '*2'    .OUT('GN2')  /
       '*'     .OUT('CI')   /
       .STRING .OUT('CL '*) .,

.END`;

input_i["i05. add semicolon line end"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' .ID .OUT('ADR ' *)
          $ ST
          '.END' .OUT('END') .,

ST = .ID .LABEL * '=' EX1 ';' .OUT('R') .,

EX1 = EX2 $('/' .OUT('BT ' *1) EX2 )
      .LABEL *1 .,

EX2 = (EX3 .OUT('BF ' *1) / OUTPUT)
      $(EX3 .OUT('BE') / OUTPUT)
      .LABEL *1 .,

EX3 = .ID       .OUT('CLL '*) /
      .STRING   .OUT('TST '*) /
      '.ID'     .OUT('ID')    /
      '.NUMBER' .OUT('NUM')   /
      '.STRING' .OUT('SR')    /
      '(' EX1 ')'             /
      '.EMPTY'  .OUT('SET')   /
      '$' .LABEL *1 EX3 .OUT('BT ' *1) .OUT('SET') .,

OUTPUT = ('.OUT' '('$OUT1 ')' /
          '.LABEL' .OUT('LB') OUT1)
         .OUT('OUT') .,

OUT1 = '*1'    .OUT('GN1')  /
       '*2'    .OUT('GN2')  /
       '*'     .OUT('CI')   /
       .STRING .OUT('CL '*) .,

.END`;

input_i["i06. use semicolon line end"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' .ID .OUT('ADR ' *)
          $ ST
          '.END' .OUT('END') ;

ST = .ID .LABEL * '=' EX1 ';' .OUT('R') ;

EX1 = EX2 $('/' .OUT('BT ' *1) EX2 )
      .LABEL *1 ;

EX2 = (EX3 .OUT('BF ' *1) / OUTPUT)
      $(EX3 .OUT('BE') / OUTPUT)
      .LABEL *1 ;

EX3 = .ID       .OUT('CLL '*) /
      .STRING   .OUT('TST '*) /
      '.ID'     .OUT('ID')    /
      '.NUMBER' .OUT('NUM')   /
      '.STRING' .OUT('SR')    /
      '(' EX1 ')'             /
      '.EMPTY'  .OUT('SET')   /
      '$' .LABEL *1 EX3 .OUT('BT ' *1) .OUT('SET') ;

OUTPUT = ('.OUT' '('$OUT1 ')' /
          '.LABEL' .OUT('LB') OUT1)
         .OUT('OUT') ;

OUT1 = '*1'    .OUT('GN1')  /
       '*2'    .OUT('GN2')  /
       '*'     .OUT('CI')   /
       .STRING .OUT('CL '*) ;

.END`;

input_i["i07. add new output control"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' .ID .OUT('ADR ' *)
          $ ST
          '.END' .OUT('END') ;

ST = .ID .LABEL * '=' EX1 ';' .OUT('R') ;

EX1 = EX2 $('/' .OUT('BT ' *1) EX2 )
      .LABEL *1 ;

EX2 = (EX3 .OUT('BF ' *1) / OUTPUT)
      $(EX3 .OUT('BE') / OUTPUT)
      .LABEL *1 ;

EX3 = .ID       .OUT('CLL '*) /
      .STRING   .OUT('TST '*) /
      '.ID'     .OUT('ID')    /
      '.NUMBER' .OUT('NUM')   /
      '.STRING' .OUT('SR')    /
      '(' EX1 ')'             /
      '.EMPTY'  .OUT('SET')   /
      '$' .LABEL *1 EX3 .OUT('BT ' *1) .OUT('SET') ;
 
OUTPUT = ('.OUT' '('$OUT1 ')' / 
          '.LABEL' .OUT('LB') OUT1) 
         .OUT('OUT') ;

OUT1 = '*1'    .OUT('GN1')  /
       '*2'    .OUT('GN2')  /
       '*'     .OUT('CI')   /
       .STRING .OUT('CL '*) /
       '#'     .OUT('GN')   /
       '.NL'   .OUT('NL')   /
       '.LB'   .OUT('LB')   /
       '.TB'   .OUT('TB')   /
       '.LM+'  .OUT('LMI')  /
       '.LM-'  .OUT('LMD')  ;

.END`;

input_i["i08. delete old output control"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' .ID .OUT('ADR ' *)
          $ ST 
          '.END' .OUT('END') ;

ST = .ID .LABEL * '=' EX1 ';' .OUT('R') ;

EX1 = EX2 $('/' .OUT('BT ' *1) EX2 )
      .LABEL *1 ;

EX2 = (EX3 .OUT('BF ' *1) / OUTPUT)
      $(EX3 .OUT('BE') / OUTPUT)
      .LABEL *1 ;

EX3 = .ID       .OUT('CLL '*) /
      .STRING   .OUT('TST '*) /
      '.ID'     .OUT('ID')    /
      '.NUMBER' .OUT('NUM')   /
      '.STRING' .OUT('SR')    /
      '(' EX1 ')'             /
      '.EMPTY'  .OUT('SET')   /
      '$' .LABEL *1 EX3 .OUT('BT ' *1) .OUT('SET') ;

OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'     .OUT('CI')   / 
       .STRING .OUT('CL '*) /
       '#'     .OUT('GN')   /
       '.NL'   .OUT('NL')   /
       '.LB'   .OUT('LB')   /
       '.TB'   .OUT('TB')   /
       '.LM+'  .OUT('LMI')  /
       '.LM-'  .OUT('LMD')  ;

.END`;

input_i["i09. use new output control"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' .ID .OUT(.LB .TB 'ADR ' * .NL)
          $ ST
          '.END' .OUT(.TB 'END' .NL) ;

ST = .ID .OUT(.LB * .NL) '=' EX1 ';' .OUT(.TB 'R' .NL) ;

EX1 = EX2 $('/' .OUT(.TB 'BT L'# .NL) EX2 )
      .OUT(.LB 'L'# .NL) ;

EX2 = (EX3 .OUT(.TB 'BF L'# .NL) / OUTPUT)
      $(EX3 .OUT(.TB 'BE' .NL) / OUTPUT)
      .OUT(.LB 'L'# .NL) ;

EX3 = .ID       .OUT(.TB 'CLL '* .NL) /
      .STRING   .OUT(.TB 'TST '* .NL) /
      '.ID'     .OUT(.TB 'ID' .NL)    /
      '.NUMBER' .OUT(.TB 'NUM' .NL)   /
      '.STRING' .OUT(.TB 'SR' .NL)    /
      '(' EX1 ')'                     /
      '.EMPTY'  .OUT(.TB 'SET' .NL)   /
      '$' .OUT(.LB 'L'# .NL) EX3 .OUT(.TB 'BT L'# .NL) .OUT(.TB 'SET' .NL) ;

OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'     .OUT(.TB 'CI' .NL)   /
       .STRING .OUT(.TB 'CL '* .NL) /
       '#'     .OUT(.TB 'GN' .NL)   /
       '.NL'   .OUT(.TB 'NL' .NL)   /
       '.LB'   .OUT(.TB 'LB' .NL)   /
       '.TB'   .OUT(.TB 'TB' .NL)   /
       '.LM+'  .OUT(.TB 'LMI' .NL)  /
       '.LM-'  .OUT(.TB 'LMD' .NL)  ;

.END`;

input_i["i10. convert i09 to js functions"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' .ID
            .OUT(.LB '// '*' compiler' .NL)
            .OUT('function compiler (input) {' .LM+ .NL)
            .OUT('inbuf = input ;' .NL)
            .OUT('inp = 0 ;' .NL)
            .OUT('outbuf = \"\" ;' .NL)
            .OUT('margin = 0 ;' .NL)
            .OUT('gnlabel = 1 ;' .NL)
            .OUT('rule'*'() ;' .NL)
            .OUT('return outbuf ;' .NL)
            .OUT(.LM- '} ;' .NL .NL)
          $ ST
          '.END' ;

ST = .ID .OUT(.LB 'function rule'*' () {' .LM+ .NL)
     .OUT('var rname = \"'*'\" ;' .NL)
     .OUT('var rlabel = 0 ;' .NL)
     '=' EX1 ';'
     .OUT(.LM- '} ;' .NL .NL) ;

EX1 = EX2 $('/' .OUT('if (!flag) {' .LM+ .NL) EX2 .OUT(.LM- '} ;' .NL) ) ;

EX2 = (EX3 .OUT('if (flag) {' .LM+ .NL) / OUTPUT .OUT('if (true) {' .LM+ .NL) )
      $(EX3 .OUT('if (!flag) runBEjsfn(rname);' .NL) / OUTPUT)
      .OUT(.LM- '} ;' .NL) ;

EX3 = .ID       .OUT('rule'*'();' .NL) /
      .STRING   .OUT('runTST('*');' .NL) /
      '.ID'     .OUT('runID();' .NL)     /
      '.NUMBER' .OUT('runNUM();' .NL)    /
      '.STRING' .OUT('runSR();' .NL)     /
      '(' EX1 ')'                        /
      '.EMPTY'  .OUT('runSET();' .NL)    /
      '$' .OUT('runSET();' .NL)
          .OUT('while (flag) {' .LM+ .NL)
           EX3 
          .OUT('};' .LM- .NL) 
          .OUT('runSET();' .NL) ;

OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'     .OUT('runCI();' .NL)    /
       .STRING .OUT('runCL('*');' .NL) /
       '#'     .OUT('if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;' .NL)
               .OUT('runCL(rlabel.toString());' .NL) /
       '.NL'   .OUT('runextNL();' .NL)    /
       '.LB'   .OUT('runLB();' .NL)    /
       '.TB'   .OUT('runextTB();' .NL)    /
       '.LM+'  .OUT('runextLMI();' .NL)   /
       '.LM-'  .OUT('runextLMD();' .NL)   ;

.END`;

input_i["i11. add token rules to i09"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' .ID .OUT(.LB .TB 'ADR ' * .NL)
          $ PR  
          '.TOKENS'
          $ TR
          '.END' .OUT(.TB 'END' .NL) ;

PR = .ID .OUT(.LB * .NL) '=' EX1 ';' .OUT(.TB 'R' .NL) ; 

TR = .ID .OUT(.LB * .NL) ':' TX1 ';' .OUT(.TB 'R' .NL) ;

EX1 = EX2 $('/' .OUT(.TB 'BT L'# .NL) EX2 )
      .OUT(.LB 'L'# .NL) ;

EX2 = (EX3 .OUT(.TB 'BF L'# .NL) / OUTPUT)
      $(EX3 .OUT(.TB 'BE' .NL) / OUTPUT)
      .OUT(.LB 'L'# .NL) ;

EX3 = .ID       .OUT(.TB 'CLL '* .NL) /
      .STRING   .OUT(.TB 'TST '* .NL) /
      '.ID'     .OUT(.TB 'ID' .NL)    /
      '.NUMBER' .OUT(.TB 'NUM' .NL)   /
      '.STRING' .OUT(.TB 'SR' .NL)    /
      '(' EX1 ')'                     /
      '.EMPTY'  .OUT(.TB 'SET' .NL)   /
      '$' .OUT(.LB 'L'# .NL) EX3 .OUT(.TB 'BT L'# .NL) .OUT(.TB 'SET' .NL) ;

OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'     .OUT(.TB 'CI' .NL)   /
       .STRING .OUT(.TB 'CL '* .NL) /
       .NUMBER .OUT(.TB 'CC '* .NL) /
       '#'     .OUT(.TB 'GN' .NL)   /
       '.NL'   .OUT(.TB 'NL' .NL)   /
       '.LB'   .OUT(.TB 'LB' .NL)   /
       '.TB'   .OUT(.TB 'TB' .NL)   /
       '.LM+'  .OUT(.TB 'LMI' .NL)  /
       '.LM-'  .OUT(.TB 'LMD' .NL)  ;

TX1 = TX2 $('/' .OUT(.TB 'BT T'# .NL) TX2) 
      .OUT(.LB 'T'# .NL) ;

TX2 = TX3 .OUT(.TB 'BF T'# .NL)
      $(TX3 .OUT(.TB 'RF' .NL) )
      .OUT(.LB 'T'# .NL) ;

TX3 = ( '.TOKEN'         .OUT(.TB 'TFT' .NL) /
        '.DELTOK'        .OUT(.TB 'TFF' .NL) /
        '$' .OUT(.LB 'T'# .NL) TX3 .OUT(.TB 'BT T'# .NL) ) 
                         .OUT(.TB 'SET' .NL)               /
      '.ANYBUT(' CX1 ')' .OUT(.TB 'NOT' .NL .TB 'SCN' .NL) /
      '.ANY(' CX1 ')'    .OUT(.TB 'SCN' .NL)               /
      .ID                .OUT(.TB 'CLL ' * .NL)            /
      '(' TX1 ')'                                          ;
            
CX1 = CX2 $('!' .OUT(.TB 'BT C'# .NL) CX2) .OUT(.LB 'C'# .NL) ;
CX2 = CX3 (':' .OUT(.TB 'CGE ' * .NL) .OUT(.TB 'BF D'# .NL) 
               CX3
               .OUT(.TB 'CLE ' * .NL) .OUT(.LB 'D' # .NL) /
           .EMPTY .OUT(.TB 'CE ' * .NL)                   ) ;
CX3 = .NUMBER ;

.END`;

input_i["i11jf. add token rules to i10"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' .ID
            .OUT(.LB '// '*' compiler' .NL)
            .OUT('function compiler (input) {' .LM+ .NL)
            .OUT('inbuf = input ;' .NL)
            .OUT('inp = 0 ;' .NL)
            .OUT('outbuf = \"\" ;' .NL)
            .OUT('margin = 0 ;' .NL)
            .OUT('gnlabel = 1 ;' .NL)
            .OUT('runextTFF();' .NL)
            .OUT('rule'*'() ;' .NL)
            .OUT('return outbuf ;' .NL)
            .OUT(.LM- '} ;' .NL .NL)
          $ PR
          '.TOKENS'
          $ TR
          '.END' ;

PR = .ID .OUT(.LB 'function rule'*' () {' .LM+ .NL)
     .OUT('var rname = \"'*'\" ;' .NL)
     .OUT('var rlabel = 0 ;' .NL)
     '=' EX1 ';'
     .OUT(.LM- '} ;' .NL .NL) ;

TR = .ID .OUT(.LB 'function rule'*' () {' .LM+ .NL)
     .OUT('var rname = \"'*'\" ;' .NL)
     .OUT('var rlabel = 0 ;' .NL)
     ':' TX1 ';'
     .OUT(.LM- '} ;' .NL .NL) ;

EX1 = EX2 $('/' .OUT('if (!flag) {' .LM+ .NL) EX2 .OUT(.LM- '} ;' .NL) ) ;

EX2 = (EX3 .OUT('if (flag) {' .LM+ .NL) / OUTPUT .OUT('if (true) {' .LM+ .NL) )
      $(EX3 .OUT('if (!flag) runBEjsfn(rname);' .NL) / OUTPUT)
      .OUT(.LM- '} ;' .NL) ;

EX3 = .ID       .OUT('rule'*'();' .NL) /
      .STRING   .OUT('runTST('*');' .NL) /
      '.ID'     .OUT('runID();' .NL)     /
      '.NUMBER' .OUT('runNUM();' .NL)    /
      '.STRING' .OUT('runSR();' .NL)     /
      '(' EX1 ')'                        /
      '.EMPTY'  .OUT('runSET();' .NL)    /
      '$' .OUT('runSET();' .NL)
          .OUT('while (flag) {' .LM+ .NL)
           EX3 
          .OUT('};' .LM- .NL) 
          .OUT('runSET();' .NL) ;

OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'     .OUT('runCI();' .NL)    /
       .STRING .OUT('runCL('*');' .NL) /
       .NUMBER .OUT('runextCC('*');' .NL) /
       '#'     .OUT('if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;' .NL)
               .OUT('runCL(rlabel.toString());' .NL) /
       '.NL'   .OUT('runextNL();' .NL)    /
       '.LB'   .OUT('runLB();' .NL)    /
       '.TB'   .OUT('runextTB();' .NL)    /
       '.LM+'  .OUT('runextLMI();' .NL)   /
       '.LM-'  .OUT('runextLMD();' .NL)   ;

TX1 = TX2 $('/' .OUT('if (!flag) {' .LM+ .NL) TX2 .OUT(.LM- '} ;' .NL) ) ;

TX2 = TX3 .OUT('if (flag) {' .LM+ .NL) 
      $(TX3 .OUT('if (!flag) return;' .NL) ) 
      .OUT(.LM- '} ;' .NL) ;

TX3 = ( '.TOKEN'         .OUT('runextTFT();' .NL) /
        '.DELTOK'        .OUT('runextTFF();' .NL) /
        '$' .OUT('runSET();' .NL)
            .OUT('while (flag) {' .LM+ .NL)
             TX3 
            .OUT('};' .LM- .NL)                   )
        .OUT('runSET();' .NL)                       /
      '.ANYBUT(' CX1 ')' .OUT('runextNOT();' .NL)
                         .OUT('runextSCN();' .NL)   /
      '.ANY(' CX1 ')'    .OUT('runextSCN();' .NL)   /
      .ID                .OUT('rule'*'();' .NL)     /
      '(' TX1 ')'                                   ;
            
CX1 = CX2 $('!' .OUT('if (!flag) {' .LM+ .NL) CX2 .OUT(.LM- '} ;' .NL) ) ;
CX2 = CX3 (':' .OUT('runextCGE('*');' .NL) .OUT('if (flag) {' .LM+ .NL) 
               CX3
               .OUT('runextCLE('*');' .NL) .OUT(.LM- '} ;' .NL) /
           .EMPTY .OUT('runextCE('*');' .NL)                    ) ;
CX3 = .NUMBER ;

.END`;

input_i["i12. use token rules"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' ID .OUT(.LB .TB 'ADR ' * .NL)
          $ PR  
          '.TOKENS'
          $ TR
          '.END' .OUT(.TB 'END' .NL) ;

PR = ID .OUT(.LB * .NL) '=' EX1 ';' .OUT(.TB 'R' .NL) ; 

TR = ID .OUT(.LB * .NL) ':' TX1 ';' .OUT(.TB 'R' .NL) ;

EX1 = EX2 $('/' .OUT(.TB 'BT L'# .NL) EX2 )
      .OUT(.LB 'L'# .NL) ;

EX2 = (EX3 .OUT(.TB 'BF L'# .NL) / OUTPUT)
      $(EX3 .OUT(.TB 'BE' .NL) / OUTPUT)
      .OUT(.LB 'L'# .NL) ;

EX3 = ID        .OUT(.TB 'CLL '* .NL)        /
      STRING    .OUT(.TB 'TST ' 39 * 39 .NL) /
      '(' EX1 ')'                            /
      '.EMPTY'  .OUT(.TB 'SET' .NL)          /
      '.LITCHR' .OUT(.TB 'LCH' .NL)          /
      '$' .OUT(.LB 'L'# .NL) EX3 .OUT(.TB 'BT L'# .NL) .OUT(.TB 'SET' .NL) ;

OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'     .OUT(.TB 'CI' .NL)          /
       STRING  .OUT(.TB 'CL ' 39 * 39 .NL) /
       NUMBER  .OUT(.TB 'CC '* .NL)        /
       '#'     .OUT(.TB 'GN' .NL)          /
       '.NL'   .OUT(.TB 'NL' .NL)          /
       '.LB'   .OUT(.TB 'LB' .NL)          /
       '.TB'   .OUT(.TB 'TB' .NL)          /
       '.LM+'  .OUT(.TB 'LMI' .NL)         /
       '.LM-'  .OUT(.TB 'LMD' .NL)         ;

TX1 = TX2 $('/' .OUT(.TB 'BT T'# .NL) TX2) 
      .OUT(.LB 'T'# .NL) ;

TX2 = TX3 .OUT(.TB 'BF T'# .NL)
      $(TX3 .OUT(.TB 'RF' .NL) )
      .OUT(.LB 'T'# .NL) ;

TX3 = ( '.TOKEN'         .OUT(.TB 'TFT' .NL) /
        '.DELTOK'        .OUT(.TB 'TFF' .NL) /
        '$' .OUT(.LB 'T'# .NL) TX3 .OUT(.TB 'BT T'# .NL) ) 
                         .OUT(.TB 'SET' .NL)               /
      '.ANYBUT(' CX1 ')' .OUT(.TB 'NOT' .NL .TB 'SCN' .NL) /
      '.ANY(' CX1 ')'    .OUT(.TB 'SCN' .NL)               /
      ID                 .OUT(.TB 'CLL ' * .NL)            /
      '(' TX1 ')'                                          ;
            
CX1 = CX2 $('!' .OUT(.TB 'BT C'# .NL) CX2) .OUT(.LB 'C'# .NL) ;
CX2 = CX3 (':' .OUT(.TB 'CGE ' * .NL) .OUT(.TB 'BF D'# .NL) 
               CX3
               .OUT(.TB 'CLE ' * .NL) .OUT(.LB 'D' # .NL) /
           .EMPTY .OUT(.TB 'CE ' * .NL)                   ) ;
CX3 = NUMBER ;

.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
STRING : PREFIX .ANY(39) .TOKEN $.ANYBUT(13!10!39) .DELTOK .ANY(39) ;
ALPHA  : .ANY(65:90!97:122) ;
DIGIT  : .ANY(48:57) ;

.END`;

input_i["i12jf. use token rules"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' ID
            .OUT(.LB '// '*' compiler' .NL)
            .OUT('function compiler (input) {' .LM+ .NL)
            .OUT('inbuf = input ;' .NL)
            .OUT('inp = 0 ;' .NL)
            .OUT('outbuf = \"\" ;' .NL)
            .OUT('margin = 0 ;' .NL)
            .OUT('gnlabel = 1 ;' .NL)
            .OUT('runextTFF();' .NL)
            .OUT('rule'*'() ;' .NL)
            .OUT('return outbuf ;' .NL)
            .OUT(.LM- '} ;' .NL .NL)
          $ PR
          '.TOKENS'
          $ TR
          '.END' ;

PR = ID .OUT(.LB 'function rule'*' () {' .LM+ .NL)
     .OUT('var rname = \"'*'\" ;' .NL)
     .OUT('var rlabel = 0 ;' .NL)
     '=' EX1 ';'
     .OUT(.LM- '} ;' .NL .NL) ;

TR = ID .OUT(.LB 'function rule'*' () {' .LM+ .NL)
     .OUT('var rname = \"'*'\" ;' .NL)
     .OUT('var rlabel = 0 ;' .NL)
     ':' TX1 ';'
     .OUT(.LM- '} ;' .NL .NL) ;

EX1 = EX2 $('/' .OUT('if (!flag) {' .LM+ .NL) EX2 .OUT(.LM- '} ;' .NL) ) ;

EX2 = (EX3 .OUT('if (flag) {' .LM+ .NL) / OUTPUT .OUT('if (true) {' .LM+ .NL) )
      $(EX3 .OUT('if (!flag) runBEjsfn(rname);' .NL) / OUTPUT)
      .OUT(.LM- '} ;' .NL) ;

EX3 = ID        .OUT('rule'*'();' .NL)   /
      STRING    .OUT('runTST(' 39 * 39 ');' .NL) /
      '(' EX1 ')'                        /
      '.EMPTY'  .OUT('runSET();' .NL)    /
      '.LITCHR' .OUT('runextLCH();' .NL) /
      '$' .OUT('runSET();' .NL)
          .OUT('while (flag) {' .LM+ .NL)
           EX3 
          .OUT('};' .LM- .NL) 
          .OUT('runSET();' .NL) ;

OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'    .OUT('runCI();' .NL)    /
       STRING .OUT('runCL(' 39 * 39 ');' .NL) /
       NUMBER .OUT('runextCC('*');' .NL) /
       '#'    .OUT('if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;' .NL)
              .OUT('runCL(rlabel.toString());' .NL) /
       '.NL'  .OUT('runextNL();' .NL)    /
       '.LB'  .OUT('runLB();' .NL)       /
       '.TB'  .OUT('runextTB();' .NL)    /
       '.LM+' .OUT('runextLMI();' .NL)   /
       '.LM-' .OUT('runextLMD();' .NL)   ;

TX1 = TX2 $('/' .OUT('if (!flag) {' .LM+ .NL) TX2 .OUT(.LM- '} ;' .NL) ) ;

TX2 = TX3 .OUT('if (flag) {' .LM+ .NL) 
      $(TX3 .OUT('if (!flag) return;' .NL) ) 
      .OUT(.LM- '} ;' .NL) ;

TX3 = ( '.TOKEN'         .OUT('runextTFT();' .NL) /
        '.DELTOK'        .OUT('runextTFF();' .NL) /
        '$' .OUT('runSET();' .NL)
            .OUT('while (flag) {' .LM+ .NL)
             TX3 
            .OUT('};' .LM- .NL)                   )
        .OUT('runSET();' .NL)                       /
      '.ANYBUT(' CX1 ')' .OUT('runextNOT();' .NL)
                         .OUT('runextSCN();' .NL)   /
      '.ANY(' CX1 ')'    .OUT('runextSCN();' .NL)   /
      ID                 .OUT('rule'*'();' .NL)     /
      '(' TX1 ')'                                   ;
            
CX1 = CX2 $('!' .OUT('if (!flag) {' .LM+ .NL) CX2 .OUT(.LM- '} ;' .NL) ) ;
CX2 = CX3 (':' .OUT('runextCGE('*');' .NL) .OUT('if (flag) {' .LM+ .NL) 
               CX3
               .OUT('runextCLE('*');' .NL) .OUT(.LM- '} ;' .NL) /
           .EMPTY .OUT('runextCE('*');' .NL)                    ) ;
CX3 = NUMBER ;

.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
STRING : PREFIX .ANY(39) .TOKEN $.ANYBUT(13!10!39) .DELTOK .ANY(39) ;
ALPHA  : .ANY(65:90!97:122) ;
DIGIT  : .ANY(48:57) ;

.END`;

input_i["i13. add comments and litchr to i12"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' ID .OUT(.LB .TB 'ADR ' * .NL)
          $(PR / COMMENT)  
          '.TOKENS'
          $(TR / COMMENT)
          '.END' .OUT(.TB 'END' .NL) ;

PR = ID .OUT(.LB * .NL) '=' EX1 ';' .OUT(.TB 'R' .NL) ; 

TR = ID .OUT(.LB * .NL) ':' TX1 ';' .OUT(.TB 'R' .NL) ;

COMMENT = '[' CMLINE ']' .OUT(.LB ';' * .NL) ;

EX1 = EX2 $('/' .OUT(.TB 'BT L'# .NL) EX2 )
      .OUT(.LB 'L'# .NL) ;

EX2 = (EX3 .OUT(.TB 'BF L'# .NL) / OUTPUT)
      $(EX3 .OUT(.TB 'BE' .NL) / OUTPUT)
      .OUT(.LB 'L'# .NL) ;

EX3 = ID        .OUT(.TB 'CLL '* .NL)        /
      STRING    .OUT(.TB 'TST ' 39 * 39 .NL) /
      '(' EX1 ')'                            /
      '.EMPTY'  .OUT(.TB 'SET' .NL)          /
      '.LITCHR' .OUT(.TB 'LCH' .NL)          /
      '$' .OUT(.LB 'L'# .NL) EX3 .OUT(.TB 'BT L'# .NL) .OUT(.TB 'SET' .NL) ;

OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'     .OUT(.TB 'CI' .NL)          /
       STRING  .OUT(.TB 'CL ' 39 * 39 .NL) /
       NUMBER  .OUT(.TB 'CC '* .NL)        /
       '#'     .OUT(.TB 'GN' .NL)          /
       '.NL'   .OUT(.TB 'NL' .NL)          /
       '.LB'   .OUT(.TB 'LB' .NL)          /
       '.TB'   .OUT(.TB 'TB' .NL)          /
       '.LM+'  .OUT(.TB 'LMI' .NL)         /
       '.LM-'  .OUT(.TB 'LMD' .NL)         ;

TX1 = TX2 $('/' .OUT(.TB 'BT T'# .NL) TX2) 
      .OUT(.LB 'T'# .NL) ;

TX2 = TX3 .OUT(.TB 'BF T'# .NL)
      $(TX3 .OUT(.TB 'RF' .NL) )
      .OUT(.LB 'T'# .NL) ;

TX3 = ( '.TOKEN'         .OUT(.TB 'TFT' .NL) /
        '.DELTOK'        .OUT(.TB 'TFF' .NL) /
        '$' .OUT(.LB 'T'# .NL) TX3 .OUT(.TB 'BT T'# .NL) ) 
                         .OUT(.TB 'SET' .NL)               /
      '.ANYBUT(' CX1 ')' .OUT(.TB 'NOT' .NL .TB 'SCN' .NL) /
      '.ANY(' CX1 ')'    .OUT(.TB 'SCN' .NL)               /
      ID                 .OUT(.TB 'CLL ' * .NL)            /
      '(' TX1 ')'                                          ;
            
CX1 = CX2 $('!' .OUT(.TB 'BT C'# .NL) CX2) .OUT(.LB 'C'# .NL) ;
CX2 = CX3 (':' .OUT(.TB 'CGE ' * .NL) .OUT(.TB 'BF D'# .NL) 
               CX3
               .OUT(.TB 'CLE ' * .NL) .OUT(.LB 'D' # .NL) /
           .EMPTY .OUT(.TB 'CE ' * .NL)                   ) ;
CX3 = NUMBER / SQUOTE .LITCHR ;

.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
STRING : PREFIX .ANY(39) .TOKEN $.ANYBUT(13!10!39) .DELTOK .ANY(39) ;
ALPHA  : .ANY(65:90!97:122) ;
DIGIT  : .ANY(48:57) ;
SQUOTE : PREFIX .ANY(39) ;
CMLINE : .TOKEN $.ANYBUT(10!13!93) .DELTOK ;

.END`;

input_i["i13jf. add comments and litchr to i12jf"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' ID
            .OUT(.LB '// '*' compiler' .NL)
            .OUT('function compiler (input) {' .LM+ .NL)
            .OUT('inbuf = input ;' .NL)
            .OUT('inp = 0 ;' .NL)
            .OUT('outbuf = \"\" ;' .NL)
            .OUT('margin = 0 ;' .NL)
            .OUT('gnlabel = 1 ;' .NL)
            .OUT('runextTFF();' .NL)
            .OUT('rule'*'() ;' .NL)
            .OUT('return outbuf ;' .NL)
            .OUT(.LM- '} ;' .NL .NL)
          $(PR / COMMENT)
          '.TOKENS'
          $(TR / COMMENT)
          '.END' ;

PR = ID .OUT(.LB 'function rule'*' () {' .LM+ .NL)
     .OUT('var rname = \"'*'\" ;' .NL)
     .OUT('var rlabel = 0 ;' .NL)
     '=' EX1 ';'
     .OUT(.LM- '} ;' .NL .NL) ;

TR = ID .OUT(.LB 'function rule'*' () {' .LM+ .NL)
     .OUT('var rname = \"'*'\" ;' .NL)
     .OUT('var rlabel = 0 ;' .NL)
     ':' TX1 ';'
     .OUT(.LM- '} ;' .NL .NL) ;

COMMENT = '[' CMLINE ']' .OUT('//' * .NL) ;

EX1 = EX2 $('/' .OUT('if (!flag) {' .LM+ .NL) EX2 .OUT(.LM- '} ;' .NL) ) ;

EX2 = (EX3 .OUT('if (flag) {' .LM+ .NL) / OUTPUT .OUT('if (true) {' .LM+ .NL) )
      $(EX3 .OUT('if (!flag) runBEjsfn(rname);' .NL) / OUTPUT)
      .OUT(.LM- '} ;' .NL) ;

EX3 = ID        .OUT('rule'*'();' .NL)   /
      STRING    .OUT('runTST(' 39 * 39 ');' .NL) /
      '(' EX1 ')'                        /
      '.EMPTY'  .OUT('runSET();' .NL)    /
      '.LITCHR' .OUT('runextLCH();' .NL) /
      '$' .OUT('runSET();' .NL)
          .OUT('while (flag) {' .LM+ .NL)
           EX3 
          .OUT('};' .LM- .NL) 
          .OUT('runSET();' .NL) ;

OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'    .OUT('runCI();' .NL)    /
       STRING .OUT('runCL(' 39 * 39 ');' .NL) /
       NUMBER .OUT('runextCC('*');' .NL) /
       '#'    .OUT('if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;' .NL)
              .OUT('runCL(rlabel.toString());' .NL) /
       '.NL'  .OUT('runextNL();' .NL)    /
       '.LB'  .OUT('runLB();' .NL)       /
       '.TB'  .OUT('runextTB();' .NL)    /
       '.LM+' .OUT('runextLMI();' .NL)   /
       '.LM-' .OUT('runextLMD();' .NL)   ;

TX1 = TX2 $('/' .OUT('if (!flag) {' .LM+ .NL) TX2 .OUT(.LM- '} ;' .NL) ) ;

TX2 = TX3 .OUT('if (flag) {' .LM+ .NL) 
      $(TX3 .OUT('if (!flag) return;' .NL) ) 
      .OUT(.LM- '} ;' .NL) ;

TX3 = ( '.TOKEN'         .OUT('runextTFT();' .NL) /
        '.DELTOK'        .OUT('runextTFF();' .NL) /
        '$' .OUT('runSET();' .NL)
            .OUT('while (flag) {' .LM+ .NL)
             TX3 
            .OUT('};' .LM- .NL)                   )
        .OUT('runSET();' .NL)                       /
      '.ANYBUT(' CX1 ')' .OUT('runextNOT();' .NL)
                         .OUT('runextSCN();' .NL)   /
      '.ANY(' CX1 ')'    .OUT('runextSCN();' .NL)   /
      ID                 .OUT('rule'*'();' .NL)     /
      '(' TX1 ')'                                   ;
            
CX1 = CX2 $('!' .OUT('if (!flag) {' .LM+ .NL) CX2 .OUT(.LM- '} ;' .NL) ) ;
CX2 = CX3 (':' .OUT('runextCGE('*');' .NL) .OUT('if (flag) {' .LM+ .NL) 
               CX3
               .OUT('runextCLE('*');' .NL) .OUT(.LM- '} ;' .NL) /
           .EMPTY .OUT('runextCE('*');' .NL)                    ) ;
CX3 = NUMBER / SQUOTE .LITCHR ;

.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
STRING : PREFIX .ANY(39) .TOKEN $.ANYBUT(13!10!39) .DELTOK .ANY(39) ;
ALPHA  : .ANY(65:90!97:122) ;
DIGIT  : .ANY(48:57) ;
SQUOTE : PREFIX .ANY(39) ;
CMLINE : .TOKEN $.ANYBUT(10!13!93) .DELTOK ;

.END`;

input_i["i14. use comments and litchr"] =`
.SYNTAX PROGRAM
[ Example Metacompiler Definition ]
[ interpreter code version ]
[ James M. Neighbors ]

[ body of compiler definition ]
PROGRAM = '.SYNTAX' ID .OUT(.LB .TB 'ADR ' * .NL)
          $(PR / COMMENT)  
          '.TOKENS'
          $(TR / COMMENT)
          '.END' .OUT(.TB 'END' .NL) ;

[ parsing rule definition ]
PR = ID .OUT(.LB * .NL) '=' EX1 ';' .OUT(.TB 'R' .NL) ; 

[ token rule definition ]
TR = ID .OUT(.LB * .NL) ':' TX1 ';' .OUT(.TB 'R' .NL) ;

[ comment definition ]
COMMENT = '[' CMLINE ']' .OUT(.LB ';' * .NL) ;

[ parsing expressions ]
EX1 = EX2 $('/' .OUT(.TB 'BT L'# .NL) EX2 )
      .OUT(.LB 'L'# .NL) ;

EX2 = (EX3 .OUT(.TB 'BF L'# .NL) / OUTPUT)
      $(EX3 .OUT(.TB 'BE' .NL) / OUTPUT)
      .OUT(.LB 'L'# .NL) ;

EX3 = ID        .OUT(.TB 'CLL '* .NL)        /
      STRING    .OUT(.TB 'TST ' 39 * 39 .NL) /
      '(' EX1 ')'                            /
      '.EMPTY'  .OUT(.TB 'SET' .NL)          /
      '.LITCHR' .OUT(.TB 'LCH' .NL)          /
      '$' .OUT(.LB 'L'# .NL) EX3 .OUT(.TB 'BT L'# .NL) .OUT(.TB 'SET' .NL) ;

[ output expressions ]
OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'     .OUT(.TB 'CI' .NL)          /
       STRING  .OUT(.TB 'CL ' 39 * 39 .NL) /
       NUMBER  .OUT(.TB 'CC '* .NL)        /
       '#'     .OUT(.TB 'GN' .NL)          /
       '.NL'   .OUT(.TB 'NL' .NL)          /
       '.LB'   .OUT(.TB 'LB' .NL)          /
       '.TB'   .OUT(.TB 'TB' .NL)          /
       '.LM+'  .OUT(.TB 'LMI' .NL)         /
       '.LM-'  .OUT(.TB 'LMD' .NL)         ;

[ token expressions ]
TX1 = TX2 $('/' .OUT(.TB 'BT T'# .NL) TX2) 
      .OUT(.LB 'T'# .NL) ;

TX2 = TX3 .OUT(.TB 'BF T'# .NL)
      $(TX3 .OUT(.TB 'RF' .NL) )
      .OUT(.LB 'T'# .NL) ;

TX3 = ( '.TOKEN'         .OUT(.TB 'TFT' .NL) /
        '.DELTOK'        .OUT(.TB 'TFF' .NL) /
        '$' .OUT(.LB 'T'# .NL) TX3 .OUT(.TB 'BT T'# .NL) ) 
                         .OUT(.TB 'SET' .NL)               /
      '.ANYBUT(' CX1 ')' .OUT(.TB 'NOT' .NL .TB 'SCN' .NL) /
      '.ANY(' CX1 ')'    .OUT(.TB 'SCN' .NL)               /
      ID                 .OUT(.TB 'CLL ' * .NL)            /
      '(' TX1 ')'                                          ;

[ character expressions ]            
CX1 = CX2 $('!' .OUT(.TB 'BT C'# .NL) CX2) .OUT(.LB 'C'# .NL) ;
CX2 = CX3 (':' .OUT(.TB 'CGE ' * .NL) .OUT(.TB 'BF D'# .NL) 
               CX3
               .OUT(.TB 'CLE ' * .NL) .OUT(.LB 'D' # .NL) /
           .EMPTY .OUT(.TB 'CE ' * .NL)                   ) ;
CX3 = NUMBER / SQUOTE .LITCHR ;

[ token definitions ]
.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
STRING : PREFIX .ANY(39) .TOKEN $.ANYBUT(13!10!39) .DELTOK .ANY(39) ;
ALPHA  : .ANY('A:'Z!'a:'z) ;
DIGIT  : .ANY('0:'9) ;
SQUOTE : PREFIX .ANY('') ;
CMLINE : .TOKEN $.ANYBUT(10!13!']) .DELTOK ;

.END`;

input_i["i14jf. use comments and litchr"] =`
.SYNTAX PROGRAM
[ Example Metacompiler Definition ]
[ javascript function version ]
[ James M. Neighbors ]

[ body of compiler definition ]
PROGRAM = '.SYNTAX' ID
            .OUT(.LB '// '*' compiler' .NL)
            .OUT('function compiler (input) {' .LM+ .NL)
            .OUT('inbuf = input ;' .NL)
            .OUT('inp = 0 ;' .NL)
            .OUT('outbuf = \"\" ;' .NL)
            .OUT('margin = 0 ;' .NL)
            .OUT('gnlabel = 1 ;' .NL)
            .OUT('runextTFF();' .NL)
            .OUT('rule'*'() ;' .NL)
            .OUT('return outbuf ;' .NL)
            .OUT(.LM- '} ;' .NL .NL)
          $(PR / COMMENT)
          '.TOKENS'
          $(TR / COMMENT)
          '.END' ;

[ parsing rule definition ]
PR = ID .OUT(.LB 'function rule'*' () {' .LM+ .NL)
     .OUT('var rname = \"'*'\" ;' .NL)
     .OUT('var rlabel = 0 ;' .NL)
     '=' EX1 ';'
     .OUT(.LM- '} ;' .NL .NL) ;

[ token rule definition ]
TR = ID .OUT(.LB 'function rule'*' () {' .LM+ .NL)
     .OUT('var rname = \"'*'\" ;' .NL)
     .OUT('var rlabel = 0 ;' .NL)
     ':' TX1 ';'
     .OUT(.LM- '} ;' .NL .NL) ;

[ comment definition ]
COMMENT = '[' CMLINE ']' .OUT('//' * .NL) ;

[ parsing expressions ]
EX1 = EX2 $('/' .OUT('if (!flag) {' .LM+ .NL) EX2 .OUT(.LM- '} ;' .NL) ) ;

EX2 = (EX3 .OUT('if (flag) {' .LM+ .NL) / OUTPUT .OUT('if (true) {' .LM+ .NL) )
      $(EX3 .OUT('if (!flag) runBEjsfn(rname);' .NL) / OUTPUT)
      .OUT(.LM- '} ;' .NL) ;

EX3 = ID        .OUT('rule'*'();' .NL)   /
      STRING    .OUT('runTST(' 39 * 39 ');' .NL) /
      '(' EX1 ')'                        /
      '.EMPTY'  .OUT('runSET();' .NL)    /
      '.LITCHR' .OUT('runextLCH();' .NL) /
      '$' .OUT('runSET();' .NL)
          .OUT('while (flag) {' .LM+ .NL)
           EX3 
          .OUT('};' .LM- .NL) 
          .OUT('runSET();' .NL) ;

[ output expressions ]
OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'    .OUT('runCI();' .NL)    /
       STRING .OUT('runCL(' 39 * 39 ');' .NL) /
       NUMBER .OUT('runextCC('*');' .NL) /
       '#'    .OUT('if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;' .NL)
              .OUT('runCL(rlabel.toString());' .NL) /
       '.NL'  .OUT('runextNL();' .NL)    /
       '.LB'  .OUT('runLB();' .NL)       /
       '.TB'  .OUT('runextTB();' .NL)    /
       '.LM+' .OUT('runextLMI();' .NL)   /
       '.LM-' .OUT('runextLMD();' .NL)   ;

[ token expressions ]
TX1 = TX2 $('/' .OUT('if (!flag) {' .LM+ .NL) TX2 .OUT(.LM- '} ;' .NL) ) ;

TX2 = TX3 .OUT('if (flag) {' .LM+ .NL) 
      $(TX3 .OUT('if (!flag) return;' .NL) ) 
      .OUT(.LM- '} ;' .NL) ;

TX3 = ( '.TOKEN'         .OUT('runextTFT();' .NL) /
        '.DELTOK'        .OUT('runextTFF();' .NL) /
        '$' .OUT('runSET();' .NL)
            .OUT('while (flag) {' .LM+ .NL)
             TX3 
            .OUT('};' .LM- .NL)                   )
        .OUT('runSET();' .NL)                       /
      '.ANYBUT(' CX1 ')' .OUT('runextNOT();' .NL)
                         .OUT('runextSCN();' .NL)   /
      '.ANY(' CX1 ')'    .OUT('runextSCN();' .NL)   /
      ID                 .OUT('rule'*'();' .NL)     /
      '(' TX1 ')'                                   ;
            
[ character expressions ]            
CX1 = CX2 $('!' .OUT('if (!flag) {' .LM+ .NL) CX2 .OUT(.LM- '} ;' .NL) ) ;
CX2 = CX3 (':' .OUT('runextCGE('*');' .NL) .OUT('if (flag) {' .LM+ .NL) 
               CX3
               .OUT('runextCLE('*');' .NL) .OUT(.LM- '} ;' .NL) /
           .EMPTY .OUT('runextCE('*');' .NL)                    ) ;
CX3 = NUMBER / SQUOTE .LITCHR ;

[ token definitions ]
.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
STRING : PREFIX .ANY(39) .TOKEN $.ANYBUT(13!10!39) .DELTOK .ANY(39) ;
ALPHA  : .ANY('A:'Z!'a:'z) ;
DIGIT  : .ANY('0:'9) ;
SQUOTE : PREFIX .ANY('') ;
CMLINE : .TOKEN $.ANYBUT(10!13!']) .DELTOK ;

.END`;

input_i["i14js. convert i14jf to js object"] =`
.SYNTAX PROGRAM
[ Example Metacompiler Definition ]
[ fully contained javascript object version ]
[ James M. Neighbors ]

[ body of compiler definition ]
PROGRAM = '.SYNTAX' ID 
          .OUT(.LB '// ' * ' compiler' .NL)
          .OUT('compiler = {' .LM+ .NL .NL)
          PREAMBLE
          $(PR / COMMENT)  
          '.TOKENS'
          $(TR / COMMENT)
          '.END' 
          POSTAMBLE 
          .OUT(.LM- '}' .NL) ;     
                                            
[ object definition preamble ]
PREAMBLE = .OUT('compile: function (input) {' .LM+ .NL)
           .OUT('// initialize compiler variables' .NL)
           .OUT('this.inbuf = input ;' .NL)
           .OUT('this.initialize() ;' .NL)
           .OUT('// call the first rule' .NL)
           .OUT('this.ctxpush(' 39 * 39 ') ;' .NL)
           .OUT('this.rule' * '() ;' .NL)
           .OUT('this.ctxpop() ;' .NL)
           .OUT('// special case handling of first rule failure' .NL)
           .OUT('if ((!this.eflag) && (!this.pflag)) {' .LM+ .NL)
           .OUT('this.eflag = true ;' .NL)
           .OUT('this.erule = ' 39 * 39 ' ;' .NL)
           .OUT('this.einput = this.inp ; } ;' .LM- .NL)
           .OUT('return this.eflag ;' .NL)
           .OUT(.LM- '},' .NL .NL) ;


[ runtime and object definition postamble ] 
POSTAMBLE = 
           .OUT('// runtime variables' .NL)
           .OUT('pflag: false ,' .NL)
           .OUT('tflag: false ,' .NL)
           .OUT('eflag: false ,' .NL)
           .OUT('inp: 0 ,' .NL)
           .OUT('inbuf:  ' 39 39 ' ,' .NL)
           .OUT('outbuf:  ' 39 39 ' ,' .NL)
           .OUT('erule:  ' 39 39 ' ,' .NL)
           .OUT('einput: 0 ,' .NL)
           .OUT('token: ' 39 39 ' ,' .NL)
           .OUT('labelcount: 0 ,' .NL)
           .OUT('stackframesize: 3 ,' .NL)
           .OUT('stackframe: 0 ,' .NL)
           .OUT('stos: -1 ,' .NL)
           .OUT('stack: [] ,' .NL .NL)

           .OUT('initialize: function () {'.LM+ .NL)
           .OUT('// initialize for another compile' .NL)
           .OUT('this.pflag = false ;' .NL)
           .OUT('this.tflag = false ;' .NL)
           .OUT('this.eflag = false ;' .NL)
           .OUT('this.inp = 0 ;' .NL)
           .OUT('this.outbuf = ' 39 39 ' ;' .NL)
           .OUT('this.erule = ' 39 39 ' ;' .NL)
           .OUT('this.einput = 0 ;' .NL)
           .OUT('this.token = ' 39 39 ' ;' .NL)
           .OUT('this.labelcount = 1 ;' .NL)
           .OUT('this.stackframe = -1 ;' .NL)
           .OUT('this.stos = -1 ;' .NL)
           .OUT('this.stack = [] ;' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('ctxpush: function (rulename){' .LM+ .NL)
           .OUT('// push and initialize a new stackframe' .NL)
           .OUT('var LM ;' .NL)  
           .OUT('// new context inherits current context left margin' .NL)
           .OUT('LM = 0; if (this.stackframe >= 0) LM = this.stack[this.stackframe + 2] ;' .NL)
           .OUT('this.stos++ ;' .NL)
           .OUT('this.stackframe = this.stos * this.stackframesize ;' .NL)
           .OUT('// stackframe definition' .NL)
           .OUT('this.stack[this.stackframe + 0] = 0 ;        // generated label' .NL)
           .OUT('this.stack[this.stackframe + 1] = rulename ; // called rule name' .NL)
           .OUT('this.stack[this.stackframe + 2] = LM ;       // left margin' .NL)
           .OUT(.LM- '},' .NL .NL) 

           .OUT('ctxpop: function (){' .LM+ .NL)
           .OUT('// pop and possibly deallocate old stackframe' .NL)
           .OUT('this.stos-- ; // pop stackframe' .NL)
           .OUT('this.stackframe = this.stos * this.stackframesize ;' .NL)
           .OUT(.LM- '},' .NL .NL)          

           .OUT('out: function (s){' .LM+ .NL)
           .OUT('// output string' .NL)
           .OUT('var i ;' .NL)
           .OUT('// if newline last output, add left margin before string' .NL)
           .OUT('if (this.outbuf.charAt(this.outbuf.length - 1) == ' 39 92 'n' 39 ') {' .NL)
           .OUT('  i = this.stack[this.stackframe + 2] ;' .NL)
           .OUT('  while (i>0) { this.outbuf += ' 39 ' ' 39 ' ; i-- } ; } ;' .NL)
           .OUT('this.outbuf += s ;' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('eol: function (){' .LM+ .NL)
           .OUT('// output end of line' .NL)
           .OUT('this.outbuf += ' 39 92 'n' 39 ' ;' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('test: function (s) {' .LM+ .NL)
           .OUT('// test for a string in the input' .NL)
           .OUT('var i ;' .NL)
           .OUT('// delete whitespace' .NL) 
           .OUT('while ((this.inbuf.charAt(this.inp) == ' 39 ' ' 39 ')  ||' .NL)
           .OUT('       (this.inbuf.charAt(this.inp) == ' 39 92 'n' 39 ') ||' .NL) 
           .OUT('       (this.inbuf.charAt(this.inp) == ' 39 92 'r' 39 ') ||' .NL)
           .OUT('       (this.inbuf.charAt(this.inp) == ' 39 92 't' 39 ') ) this.inp++ ;' .NL)
           .OUT('// test string case insensitive' .NL) 
           .OUT('this.pflag = true ; i = 0 ;' .NL)
           .OUT('while (this.pflag && (i < s.length) && ((this.inp+i) < this.inbuf.length) )' .NL)
           .OUT('{ this.pflag = (s.charAt(i).toUpperCase() ==' .NL)
           .OUT('                this.inbuf.charAt(this.inp+i).toUpperCase()) ;' .NL)
           .OUT('  i++ ; } ;' .NL)
           .OUT('this.pflag = this.pflag && (i == s.length) ;' .NL)
           .OUT('// advance input if found' .NL) 
           .OUT('if (this.pflag) this.inp = this.inp + s.length ;' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('err: function () {' .LM+ .NL)
           .OUT('// compilation error, provide error indication and context' .NL)
           .OUT('this.eflag = true ;' .NL)
           .OUT('this.erule = this.stack[this.stackframe + 1] ;' .NL)
           .OUT('this.einput = this.inp ;' .NL)
           .OUT(.LM- '}' .NL .NL) ;

[ parsing rule definition ]
PR = ID .OUT('rule'* ': function () {' .LM+ .NL)
     '=' EX1 ';'
     .OUT(.LM- '} ,' .NL .NL) ;

[ token rule definition ]
TR = ID .OUT('rule'* ': function () {' .LM+ .NL)
     ':' TX1 ';'
     .OUT(.LM- '} ,' .NL .NL) ;

[ comment definition ]
COMMENT = '[' CMLINE ']' .OUT('//' * .NL) ;

[ parsing expressions ]
EX1 = EX2 $('/' .OUT('if (!this.pflag) {' .LM+ .NL) EX2 .OUT(.LM- '} ;' .NL) ) ;

EX2 = (EX3 .OUT('if (this.pflag) {' .LM+ .NL) / OUTPUT .OUT('if (true) {' .LM+ .NL) )
      $(EX3 .OUT('if (!this.pflag) this.err();' .NL) / OUTPUT)
      .OUT(.LM- '} ;' .NL) ;


EX3 = ID        .OUT('this.ctxpush(' 39 * 39 ') ;' .NL)
                .OUT('this.rule' * '() ;' .NL)
                .OUT('this.ctxpop() ;' .NL)
                .OUT('if (this.eflag) return ;' .NL)  /
      STRING    .OUT('this.test(' 39 * 39 ');' .NL) /
      '(' EX1 ')'                            /
      '.EMPTY'  .OUT('this.pflag = true ;' .NL)    /
      '.LITCHR' .OUT('this.token = this.inbuf.charCodeAt(this.inp) ;' .NL)
                .OUT('this.inp++ ;' .NL)  /
      '$' .OUT('this.pflag = true ;' .NL)
          .OUT('while (this.pflag) {' .LM+ .NL)
           EX3 
          .OUT(.LM- '} ;' .NL)
          .OUT('this.pflag = true ;' .NL) ;

[ output expressions ]
OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'     .OUT('this.out(this.token) ;' .NL)          /
       STRING  .OUT('this.out(' 39 * 39 ') ;' .NL) /
       NUMBER  .OUT('this.out(String.fromCharCode(' * ')) ;' .NL)        /
       '#'     .OUT('if (this.stack[this.stackframe + 0] == 0) {' .LM+ .NL) 
               .OUT('this.stack[this.stackframe + 0] = this.labelcount ;' .NL)
               .OUT('this.labelcount++ ; } ;' .LM- .NL) 
               .OUT('this.out(this.stack[this.stackframe + 0]) ;' .NL) /
       '.NL'   .OUT('this.eol() ;' .NL)          /
       '.LB'             /
       '.TB'   .OUT('this.out(' 39 92 't' 39 ') ;' .NL)          /
       '.LM+'  .OUT('this.stack[this.stackframe + 2] += 2 ;' .NL) /
       '.LM-'  .OUT('this.stack[this.stackframe + 2] -= 2 ;' .NL) ;

[ token expressions ]
TX1 = TX2 $('/' .OUT('if (!this.pflag) {' .LM+ .NL) TX2 .OUT(.LM- '} ;' .NL) ) ;

TX2 = TX3 .OUT('if (this.pflag) {' .LM+ .NL) 
      $(TX3 .OUT('if (!this.pflag) return;' .NL) ) 
      .OUT(.LM- '} ;' .NL) ;

TX3 = ( '.TOKEN'  .OUT('this.tflag = true ; ' .NL)
                  .OUT('this.token = ' 39 39 ' ;' .NL) /
        '.DELTOK' .OUT('this.tflag = false ;' .NL) /
        '$' .OUT('this.pflag = true ;' .NL)
            .OUT('while (this.pflag) {' .LM+ .NL)
             TX3 
            .OUT(.LM- '};' .NL) )
        .OUT('this.pflag = true ;' .NL) /
      '.ANYBUT(' CX1 ')' .OUT('this.pflag = !this.pflag ;' .NL) 
        .OUT('if (this.pflag) {' .LM+ .NL)
        .OUT('if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;' .NL)
        .OUT('this.inp++ } ;' .LM- .NL) /
      '.ANY(' CX1 ')' 
        .OUT('if (this.pflag) {' .LM+ .NL)
        .OUT('if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;' .NL)
        .OUT('this.inp++ } ;' .LM- .NL) /
      ID                 
        .OUT('this.ctxpush(' 39 * 39 ') ;' .NL)
        .OUT('this.rule' * '() ;' .NL)
        .OUT('this.ctxpop() ;' .NL)
        .OUT('if (this.eflag) return ;' .NL)  /
      '(' TX1 ')'  ;

[ character expressions ]            
CX1 = .OUT('this.pflag = ' .LM+ .NL)
      CX2 $('!' .OUT(' ||' .NL) CX2)
      .OUT(.LM- ' ;' .NL) ;
CX2 = CX3 (':' .OUT('((this.inbuf.charCodeAt(this.inp) >= ' * ') &&' .NL)
               CX3
               .OUT(' (this.inbuf.charCodeAt(this.inp) <= ' * ')  )' ) /
           .EMPTY .OUT('(this.inbuf.charCodeAt(this.inp) == ' * ') ' )  ) ;
CX3 = NUMBER / SQUOTE .LITCHR ;

[ token definitions ]
.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
STRING : PREFIX .ANY(39) .TOKEN $.ANYBUT(13!10!39) .DELTOK .ANY(39) ;
ALPHA  : .ANY('A:'Z!'a:'z) ;
DIGIT  : .ANY('0:'9) ;
SQUOTE : PREFIX .ANY('') ;
CMLINE : .TOKEN $.ANYBUT(10!13!']) .DELTOK ;

.END`;

input_i["i02a. demo, AEXP example assignment compiler"] =`
.SYNTAX AEXP

AEXP = AS $AS ;
AS = ID .OUT(.TB 'address ' * .NL) ':=' RX1 .OUT(.TB 'store' .NL) ';' ;
RX1 = RX2 ('='  RX2 .OUT(.TB 'eq' .NL) /
           '<'  RX2 .OUT(.TB 'lt' .NL) /
           '>'  RX2 .OUT(.TB 'gt' .NL) /
           '<=' RX2 .OUT(.TB 'le' .NL) /
           '>=' RX2 .OUT(.TB 'ge' .NL) /
           .EMPTY) ;
RX2 = '~' EX0 .OUT(.TB 'not' .NL) / EX0 ;
EX0 = EX1 ('<-' EX1 .OUT(.TB 'shl' .NL) /
           '->' EX2 .OUT(.TB 'shr' .NL) /
           .EMPTY) ;
EX1 = EX2 $('+' EX2 .OUT(.TB 'add' .NL) /
            '-' EX2 .OUT(.TB 'sub' .NL) ) ;
EX2 = EX3 $('*' EX3 .OUT(.TB 'mpy' .NL) /
            '/' EX3 .OUT(.TB 'div' .NL) ) ;
EX3 = EX4 $('^' EX3 .OUT(.TB 'exp' .NL)) ;
EX4 = '+' EX5 / '-' EX5 .OUT(.TB 'minus' .NL) / EX5 ;
EX5 = ID  .OUT(.TB 'load ' * .NL) /
      NUMBER .OUT(.TB 'literal ' * .NL) /
      '(' EX1 ')' ;

.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN .ANY('A:'Z!'a:'z) $(.ANY('A:'Z!'a:'z) / .ANY('0:'9)) .DELTOK ;
NUMBER : PREFIX .TOKEN .ANY('0:'9) $.ANY('0:'9) .DELTOK ;

.END`;

input_i["i01a. demo, AEXP2 backup value assignments"] =`
fern:=5+6;
ace:=fern*5;
waldo:=fern+alpha/-beta^gamma;
fern:=5<=6;
ace:=fern*5>=bob;
waldo:=fern<-alpha<=beta->gamma;`;

input_i["i15js. js metacompiler with backup"] =`
.SYNTAX PROGRAM
[ Example Metacompiler Definition ]
[ fully contained javascript object version with backup ]
[ James M. Neighbors ]

[ body of compiler definition ]
PROGRAM = '.SYNTAX' ID 
          .OUT(.LB '// ' * ' compiler' .NL)
          .OUT('compiler = {' .LM+ .NL .NL)
          PREAMBLE
          $(PR / COMMENT)  
          '.TOKENS'
          $(TR / COMMENT)
          '.END' 
          POSTAMBLE 
          .OUT(.LM- '}' .NL) ;     
                                            
[ object definition preamble ]
PREAMBLE = .OUT('compile: function (input) {' .LM+ .NL)
           .OUT('// initialize compiler variables' .NL)
           .OUT('this.inbuf = input ;' .NL)
           .OUT('this.initialize() ;' .NL)
           .OUT('// call the first rule' .NL)
           .OUT('this.ctxpush(' 39 * 39 ') ;' .NL)
           .OUT('this.rule' * '() ;' .NL)
           .OUT('this.ctxpop() ;' .NL)
           .OUT('// special case handling of first rule failure' .NL)
           .OUT('if ((!this.eflag) && (!this.pflag)) {' .LM+ .NL)
           .OUT('this.eflag = true ;' .NL)
           .OUT('this.erule = ' 39 * 39 ' ;' .NL)
           .OUT('this.einput = this.inp ; } ;' .LM- .NL)
           .OUT('return this.eflag ;' .NL)
           .OUT(.LM- '},' .NL .NL) ;


[ runtime and object definition postamble ] 
POSTAMBLE = 
           .OUT('// runtime variables' .NL)
           .OUT('pflag: false ,' .NL)
           .OUT('tflag: false ,' .NL)
           .OUT('eflag: false ,' .NL)
           .OUT('inp: 0 ,' .NL)
           .OUT('inbuf:  ' 39 39 ' ,' .NL)
           .OUT('outbuf:  ' 39 39 ' ,' .NL)
           .OUT('erule:  ' 39 39 ' ,' .NL)
           .OUT('einput: 0 ,' .NL)
           .OUT('token: ' 39 39 ' ,' .NL)
           .OUT('labelcount: 0 ,' .NL)
           .OUT('stackframesize: 6 ,' .NL)
           .OUT('stackframe: 0 ,' .NL)
           .OUT('stos: -1 ,' .NL)
           .OUT('stack: [] ,' .NL .NL)

           .OUT('initialize: function () {'.LM+ .NL)
           .OUT('// initialize for another compile' .NL)
           .OUT('this.pflag = false ;' .NL)
           .OUT('this.tflag = false ;' .NL)
           .OUT('this.eflag = false ;' .NL)
           .OUT('this.inp = 0 ;' .NL)
           .OUT('this.outbuf = ' 39 39 ' ;' .NL)
           .OUT('this.erule = ' 39 39 ' ;' .NL)
           .OUT('this.einput = 0 ;' .NL)
           .OUT('this.token = ' 39 39 ' ;' .NL)
           .OUT('this.labelcount = 1 ;' .NL)
           .OUT('this.stackframe = -1 ;' .NL)
           .OUT('this.stos = -1 ;' .NL)
           .OUT('this.stack = [] ;' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('ctxpush: function (rulename){' .LM+ .NL)
           .OUT('// push and initialize a new stackframe' .NL)
           .OUT('var LM ;' .NL)  
           .OUT('// new context inherits current context left margin' .NL)
           .OUT('LM = 0; if (this.stackframe >= 0) LM = this.stack[this.stackframe + 2] ;' .NL)
           .OUT('this.stos++ ;' .NL)
           .OUT('this.stackframe = this.stos * this.stackframesize ;' .NL)
           .OUT('// stackframe definition' .NL)
           .OUT('this.stack[this.stackframe + 0] = 0 ;        // generated label' .NL)
           .OUT('this.stack[this.stackframe + 1] = rulename ; // called rule name' .NL)
           .OUT('this.stack[this.stackframe + 2] = LM ;       // left margin' .NL)
           .OUT('// clear additional stackframe backtracking entries' .NL)
           .OUT('this.bkclear() ;' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('ctxpop: function (){' .LM+ .NL)
           .OUT('// pop and possibly deallocate old stackframe' .NL)
           .OUT('this.stos-- ; // pop stackframe' .NL)
           .OUT('this.stackframe = this.stos * this.stackframesize ;' .NL)
           .OUT(.LM- '},' .NL .NL)          

           .OUT('out: function (s){' .LM+ .NL)
           .OUT('// output string' .NL)
           .OUT('var i ;' .NL)
           .OUT('// if newline last output, add left margin before string' .NL)
           .OUT('if (this.outbuf.charAt(this.outbuf.length - 1) == ' 39 92 'n' 39 ') {' .NL)
           .OUT('  i = this.stack[this.stackframe + 2] ;' .NL)
           .OUT('  while (i>0) { this.outbuf += ' 39 ' ' 39 ' ; i-- } ; } ;' .NL)
           .OUT('this.outbuf += s ;' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('eol: function (){' .LM+ .NL)
           .OUT('// output end of line' .NL)
           .OUT('this.outbuf += ' 39 92 'n' 39 ' ;' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('test: function (s) {' .LM+ .NL)
           .OUT('// test for a string in the input' .NL)
           .OUT('var i ;' .NL)
           .OUT('// delete whitespace' .NL) 
           .OUT('while ((this.inbuf.charAt(this.inp) == ' 39 ' ' 39 ')  ||' .NL)
           .OUT('       (this.inbuf.charAt(this.inp) == ' 39 92 'n' 39 ') ||' .NL) 
           .OUT('       (this.inbuf.charAt(this.inp) == ' 39 92 'r' 39 ') ||' .NL)
           .OUT('       (this.inbuf.charAt(this.inp) == ' 39 92 't' 39 ') ) this.inp++ ;' .NL)
           .OUT('// test string case insensitive' .NL) 
           .OUT('this.pflag = true ; i = 0 ;' .NL)
           .OUT('while (this.pflag && (i < s.length) && ((this.inp+i) < this.inbuf.length) )' .NL)
           .OUT('{ this.pflag = (s.charAt(i).toUpperCase() ==' .NL)
           .OUT('                this.inbuf.charAt(this.inp+i).toUpperCase()) ;' .NL)
           .OUT('  i++ ; } ;' .NL)
           .OUT('this.pflag = this.pflag && (i == s.length) ;' .NL)
           .OUT('// advance input if found' .NL) 
           .OUT('if (this.pflag) this.inp = this.inp + s.length ;' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('bkerr: function () {' .LM+ .NL)
           .OUT('// compilation error, provide error indication and context' .NL)
           .OUT('this.eflag = true ;' .NL)
           .OUT('this.erule = this.stack[this.stackframe + 1] ;' .NL)
           .OUT('this.einput = this.inp ;' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('bkset: function () {' .LM+ .NL)
           .OUT('// set backtrack context on stack' .NL)
           .OUT('this.stack[this.stackframe + 3] = this.inp ;           // input position' .NL)
           .OUT('this.stack[this.stackframe + 4] = this.outbuf.length ; // output position' .NL)
           .OUT('this.stack[this.stackframe + 5] = this.token ;         // current token' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('bkclear: function () {' .LM+ .NL)
           .OUT('// clear backtrack context on stack' .NL)
           .OUT('this.stack[this.stackframe + 3] = -1 ; // input position' .NL)
           .OUT('this.stack[this.stackframe + 4] = -1 ; // output position' .NL)
           .OUT('this.stack[this.stackframe + 5] = ' 39 39 ' ; // current token' .NL)
           .OUT(.LM- '},' .NL .NL)

           .OUT('bkrestore: function () {' .LM+ .NL)
           .OUT('// restore context for backtracking' .NL)
           .OUT('this.eflag = false ;' .NL)
           .OUT('this.inp = this.stack[this.stackframe + 3] ;           // input position' .NL)
           .OUT('this.outbuf = this.outbuf.substring(0,this.stack[this.stackframe + 4]) ; // output position' .NL)
           .OUT('this.token = this.stack[this.stackframe + 5] ;         // current token' .NL)
           .OUT(.LM- '}' .NL .NL) ;

[ parsing rule definition ]
PR = ID .OUT('rule'* ': function () {' .LM+ .NL)
     '=' EX1 ';'
     .OUT(.LM- '} ,' .NL .NL) ;

[ token rule definition ]
TR = ID .OUT('rule'* ': function () {' .LM+ .NL)
     ':' TX1 ';'
     .OUT(.LM- '} ,' .NL .NL) ;

[ comment definition ]
COMMENT = '[' CMLINE ']' .OUT('//' * .NL) ;

[ parsing expressions ]
EX1 = EX2 $('/' .OUT('if ((!this.pflag) && (!this.eflag)) {' .LM+ .NL)
                EX2
                .OUT(.LM- '} ;' .NL) ) ;

EX2 = (EX3 .OUT('if (this.pflag) {' .LM+ .NL) /
       OUTPUT .OUT('if (true) {' .LM+ .NL) )
      .OUT('while (!this.eflag) {' .LM+ .NL)
      $(EX3 .OUT('if (!this.pflag) this.bkerr();' .NL)
            .OUT('if (this.eflag) break ;' .NL) /
        OUTPUT)
      .OUT('break }' .LM- .NL)
      .OUT(.LM- '} ;' .NL) ;

EX3 = ID        .OUT('this.ctxpush(' 39 * 39 ') ;' .NL)
                .OUT('this.rule' * '() ;' .NL)
                .OUT('this.ctxpop() ;' .NL) /
      STRING    .OUT('this.test(' 39 * 39 ');' .NL) /
      '(' EX1 ')'                            /
      '.EMPTY'  .OUT('this.pflag = true ;' .NL)    /
      '.LITCHR' .OUT('this.token = this.inbuf.charCodeAt(this.inp) ;' .NL)
                .OUT('this.inp++ ;' .NL)  /
      '.PASS'   .OUT('this.inp = 0 ;' .NL)  /
      '$' .OUT('this.pflag = true ;' .NL)
          .OUT('while (this.pflag & !this.eflag) {' .LM+ .NL)
           EX3 
          .OUT(.LM- '} ;' .NL)
          .OUT('this.pflag = !this.eflag ;' .NL) /
      '[' .OUT('this.bkset() ;' .NL)
          EX1
          $('|' .OUT('if (!this.pflag) {' .LM+ .NL)
                .OUT('if (this.eflag) this.bkrestore() ;' .NL)
                EX1
                .OUT(.LM- '} ;' .NL) )
      ']' .OUT('if (this.eflag) this.bkrestore() ;' .NL)
          .OUT('this.bkclear() ;' .NL) ;

[ output expressions ]
OUTPUT = '.OUT' '('$OUT1 ')' ;

OUT1 = '*'     .OUT('this.out(this.token) ;' .NL)          /
       STRING  .OUT('this.out(' 39 * 39 ') ;' .NL) /
       NUMBER  .OUT('this.out(String.fromCharCode(' * ')) ;' .NL)        /
       '#'     .OUT('if (this.stack[this.stackframe + 0] == 0) {' .LM+ .NL) 
               .OUT('this.stack[this.stackframe + 0] = this.labelcount ;' .NL)
               .OUT('this.labelcount++ ; } ;' .LM- .NL) 
               .OUT('this.out(this.stack[this.stackframe + 0]) ;' .NL) /
       '.NL'   .OUT('this.eol() ;' .NL)          /
       '.LB'             /
       '.TB'   .OUT('this.out(' 39 92 't' 39 ') ;' .NL)          /
       '.LM+'  .OUT('this.stack[this.stackframe + 2] += 2 ;' .NL) /
       '.LM-'  .OUT('this.stack[this.stackframe + 2] -= 2 ;' .NL) ;

[ token expressions ]
TX1 = TX2 $('/' .OUT('if (!this.pflag) {' .LM+ .NL) TX2 .OUT(.LM- '} ;' .NL) ) ;

TX2 = TX3 .OUT('if (this.pflag) {' .LM+ .NL) 
      $(TX3 .OUT('if (!this.pflag) return;' .NL) ) 
      .OUT(.LM- '} ;' .NL) ;

TX3 = ( '.TOKEN'  .OUT('this.tflag = true ; ' .NL)
                  .OUT('this.token = ' 39 39 ' ;' .NL) /
        '.DELTOK' .OUT('this.tflag = false ;' .NL) /
        '$' .OUT('this.pflag = true ;' .NL)
            .OUT('while (this.pflag) {' .LM+ .NL)
             TX3 
            .OUT(.LM- '};' .NL) )
        .OUT('this.pflag = true ;' .NL) /
      '.ANYBUT(' CX1 ')' .OUT('this.pflag = !this.pflag ;' .NL) 
        .OUT('if (this.pflag) {' .LM+ .NL)
        .OUT('if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;' .NL)
        .OUT('this.inp++ } ;' .LM- .NL) /
      '.ANY(' CX1 ')' 
        .OUT('if (this.pflag) {' .LM+ .NL)
        .OUT('if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;' .NL)
        .OUT('this.inp++ } ;' .LM- .NL) /
      ID                 
        .OUT('this.ctxpush(' 39 * 39 ') ;' .NL)
        .OUT('this.rule' * '() ;' .NL)
        .OUT('this.ctxpop() ;' .NL)
        .OUT('if (this.eflag) return ;' .NL)  /
      '(' TX1 ')'  ;

[ character expressions ]            
CX1 = .OUT('this.pflag = ' .LM+ .NL)
      CX2 $('!' .OUT(' ||' .NL) CX2)
      .OUT(.LM- ' ;' .NL) ;
CX2 = CX3 (':' .OUT('((this.inbuf.charCodeAt(this.inp) >= ' * ') &&' .NL)
               CX3
               .OUT(' (this.inbuf.charCodeAt(this.inp) <= ' * ')  )' ) /
           .EMPTY .OUT('(this.inbuf.charCodeAt(this.inp) == ' * ') ' )  ) ;
CX3 = NUMBER / SQUOTE .LITCHR ;

[ token definitions ]
.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
STRING : PREFIX .ANY(39) .TOKEN $.ANYBUT(13!10!39) .DELTOK .ANY(39) ;
ALPHA  : .ANY('A:'Z!'a:'z) ;
DIGIT  : .ANY('0:'9) ;
SQUOTE : PREFIX .ANY('') ;
CMLINE : .TOKEN $.ANYBUT(10!13!']) .DELTOK ;

.END`;

input_i["i02b. demo, AEXP2 backup assignment compiler"] =`
.SYNTAX AEXP2

AEXP2 = AS $AS ;
AS = ID .OUT(.TB 'address ' * .NL) ':=' RX1 .OUT(.TB 'store' .NL) ';' ;
RX1 = RX2 ['='  RX2 .OUT(.TB 'eq' .NL) |
           '<'  RX2 .OUT(.TB 'lt' .NL) |
           '>'  RX2 .OUT(.TB 'gt' .NL) |
           '<=' RX2 .OUT(.TB 'le' .NL) |
           '>=' RX2 .OUT(.TB 'ge' .NL) |
           .EMPTY] ;
RX2 = '~' EX0 .OUT(.TB 'not' .NL) / EX0 ;
EX0 = EX1 ('<-' EX1 .OUT(.TB 'shl' .NL) /
           '->' EX2 .OUT(.TB 'shr' .NL) /
           .EMPTY) ;
EX1 = EX2 $['+' EX2 .OUT(.TB 'add' .NL) |
            '-' EX2 .OUT(.TB 'sub' .NL) ] ;
EX2 = EX3 $('*' EX3 .OUT(.TB 'mpy' .NL) /
            '/' EX3 .OUT(.TB 'div' .NL) ) ;
EX3 = EX4 $('^' EX3 .OUT(.TB 'exp' .NL)) ;
EX4 = '+' EX5 / '-' EX5 .OUT(.TB 'minus' .NL) / EX5 ;
EX5 = ID  .OUT(.TB 'load ' * .NL) /
      NUMBER .OUT(.TB 'literal ' * .NL) /
      '(' EX0 ')' ;

.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN .ANY('A:'Z!'a:'z) $(.ANY('A:'Z!'a:'z) / .ANY('0:'9)) .DELTOK ;
NUMBER : PREFIX .TOKEN .ANY('0:'9) $.ANY('0:'9) .DELTOK ;

.END`;

input_i["i04a. Meta II syntax (i03 reordered and tokens)"] =`
.SYNTAX PROGRAM

PROGRAM = '.SYNTAX' ID .OUT(.LB .TB 'ADR ' * .NL)
          $ ST
          '.END' .OUT(.TB 'END' .NL) ;

ST = ID .OUT(.LB * .NL) '=' EX1 '.,' .OUT(.TB 'R' .NL) ;

EX1 = EX2 $('/' .OUT(.TB 'BT L' # .NL) EX2 )
      .OUT(.LB 'L'# .NL) ;

EX2 = (EX3 .OUT(.TB 'BF L' # .NL) / OUTPUT)
      $(EX3 .OUT(.TB 'BE' .NL) / OUTPUT)
      .OUT(.LB 'L'# .NL) ;

EX3 = ID        .OUT(.TB 'CLL '* .NL) /
      STRING    .OUT(.TB 'TST '* .NL) /
      '.ID'     .OUT(.TB 'ID' .NL)    /
      '.NUMBER' .OUT(.TB 'NUM' .NL)   /
      '.STRING' .OUT(.TB 'SR' .NL)    /
      '(' EX1 ')'             /
      '.EMPTY'  .OUT(.TB 'SET' .NL)   /
      '$' .OUT(.LB 'L'# .NL) EX3 .OUT(.TB 'BT L' # .NL) .OUT(.TB 'SET' .NL) ;

OUTPUT = ('.OUT' '('$OUT1 ')' /
          '.LABEL' .OUT(.TB 'LB' .NL) OUT1)
         .OUT(.TB 'OUT' .NL) ;

OUT1 = '*1'    .OUT(.TB 'GN1' .NL)  /
       '*2'    .OUT(.TB 'GN2' .NL)  /
       '*'     .OUT(.TB 'CI' .NL)   /
       STRING  .OUT(.TB 'CL '* .NL) ;

.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
STRING : PREFIX .TOKEN .ANY(39) $.ANYBUT(13!10!39) .ANY(39) .DELTOK ;
ALPHA  : .ANY('A:'Z!'a:'z) ;
DIGIT  : .ANY('0:'9) ;

.END`;

input_i["i16. extract syntax to output"] =`
.SYNTAX SYNTAX
[ strip compiler definition to syntax equations in standard form ]
[ accepts Meta II and modified syntax ]
[ James M. Neighbors ]

[ body of compiler definition ]
SYNTAX = '.SYNTAX' ID .OUT(.LB '.SYNTAX ' * .NL .NL)
         $(PR / COMMENT)  
         ( '.TOKENS' .OUT(.LB '.TOKENS' .NL .NL)
                     $(TR / COMMENT) 
                     .OUT(.NL) /
           .EMPTY )
         '.END' .OUT(.LB '.END' .NL) ;

[ parsing rule definition ]
PR = ID '=' .OUT(.LB * ' = ' .LM+ ) 
     EX1 
     (';' / '.,') 
     .OUT(.LM- ';' .NL .NL); 

[ token rule definition ]
TR = ID ':' .OUT(.LB * ' : ' .LM+ ) TX1 ';' .OUT(.LM- ';' .NL ) ; 

[ comment definition ]
COMMENT = '[' CMLINE ']' ;

[ parsing expressions ]
EX1 = EX2 $('/' .OUT('/ ') EX2 ) ;

EX2 = (EX3 .OUT(' ') / OUTPUT) $(EX3 .OUT(' ') / OUTPUT) ;

EX3 = ID        .OUT(*)         /
      STRING    .OUT(39 * 39)   /
      '(' .OUT(.LM+ '( ') 
          EX1 
      ')' .OUT(.LM- ')')        /
      '.EMPTY'  .OUT('.EMPTY')  /
      '.LITCHR' .OUT('.LITCHR') /
      '$' .OUT('$') EX3         /
      '.ID'     .OUT('.ID')     /
      '.NUMBER' .OUT('.NUMBER') /
      '.STRING' .OUT('.STRING') /
      '[' .OUT('[ ')
          EX1 $('|' .OUT('| ') EX1)
      ']' .OUT(']') ;

[ output expressions ]
OUTPUT = '.OUT' '('$OUT1 ')' / '.LABEL' OUT1 ;

OUT1 = '*1'    /
       '*2'    /
       '*'     /
       STRING  /
       NUMBER  /
       '#'     /
       '.NL'   /
       '.LB'   /
       '.TB'   /
       '.LM+'  /
       '.LM-'  ;

[ token expressions ]
TX1 = TX2 $('/' .OUT('/ ') TX2) ; 

TX2 = TX3 .OUT(' ') $(TX3 .OUT(' ')) ;

TX3 = '.TOKEN'         .OUT('.TOKEN') /
      '.DELTOK'        .OUT('.DELTOK') /
      '$' .OUT('$') TX3  /
      '.ANYBUT(' .OUT('.ANYBUT(')
          CX1 
          ')' .OUT(')')     /
      '.ANY(' .OUT('.ANY(')
          CX1 
          ')' .OUT(')')     /
      ID      .OUT(*)       /
      '(' .OUT('(') 
          TX1 
      ')' .OUT(')')         ;

[ character expressions ]            
CX1 = CX2 $('!' .OUT('!') CX2) ;
CX2 = CX3 (':' .OUT(':') CX3 /
           .EMPTY            ) ;
CX3 = NUMBER .OUT(*) / SQUOTE .LITCHR .OUT(*) ;

[ token definitions ]
.TOKENS

PREFIX : $.ANY(32!9!13!10) ;
ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
STRING : PREFIX .ANY(39) .TOKEN $.ANYBUT(13!10!39) .DELTOK .ANY(39) ;
ALPHA  : .ANY('A:'Z!'a:'z) ;
DIGIT  : .ANY('0:'9) ;
SQUOTE : PREFIX .ANY('') ;
CMLINE : .TOKEN $.ANYBUT(10!13!']) .DELTOK ;

.END`;

code_c = {};
code_c["c00. demo, compiled assignments c[i01,c01] "] = `
\taddress fern
\tliteral 5
\tliteral 6
\tadd
\tstore
\taddress ace
\tload fern
\tliteral 5
\tmpy
\tstore
\taddress waldo
\tload fern
\tload alpha
\tload beta
\tminus
\tload gamma
\texp
\tdiv
\tadd
\tstore`

code_c["c01. demo, AEXP assignments compiler c[i02,c02] "] = `
\tADR AEXP
AEXP
\tCLL AS
\tBF L1
L2
\tCLL AS
\tBT L2
\tSET
\tBE
L1
L3
\tR
AS
\tID
\tBF L4
\tCL 'address '
\tCI
\tOUT
\tTST ':='
\tBE
\tCLL EX1
\tBE
\tCL 'store'
\tOUT
\tTST ';'
\tBE
L4
L5
\tR
EX1
\tCLL EX2
\tBF L6
L7
\tTST '+'
\tBF L8
\tCLL EX2
\tBE
\tCL 'add'
\tOUT
L8
\tBT L9
\tTST '-'
\tBF L10
\tCLL EX2
\tBE
\tCL 'sub'
\tOUT
L10
L9
\tBT L7
\tSET
\tBE
L6
L11
\tR
EX2
\tCLL EX3
\tBF L12
L13
\tTST '*'
\tBF L14
\tCLL EX3
\tBE
\tCL 'mpy'
\tOUT
L14
\tBT L15
\tTST '/'
\tBF L16
\tCLL EX3
\tBE
\tCL 'div'
\tOUT
L16
L15
\tBT L13
\tSET
\tBE
L12
L17
\tR
EX3
\tCLL EX4
\tBF L18
L19
\tTST '^'
\tBF L20
\tCLL EX3
\tBE
\tCL 'exp'
\tOUT
L20
L21
\tBT L19
\tSET
\tBE
L18
L22
\tR
EX4
\tTST '+'
\tBF L23
\tCLL EX5
\tBE
L23
\tBT L24
\tTST '-'
\tBF L25
\tCLL EX5
\tBE
\tCL 'minus'
\tOUT
L25
\tBT L24
\tCLL EX5
\tBF L26
L26
L24
\tR
EX5
\tID
\tBF L27
\tCL 'load '
\tCI
\tOUT
L27
\tBT L28
\tNUM
\tBF L29
\tCL 'literal '
\tCI
\tOUT
L29
\tBT L28
\tTST '('
\tBF L30
\tCLL EX1
\tBE
\tTST ')'
\tBE
L30
L28
\tR
\tEND`

code_c["c02. Meta II of fig. 5, m[i03,c02]"] = `
\tADR PROGRAM
OUT1
\tTST '*1'
\tBF L1
\tCL 'GN1'
\tOUT
L1
\tBT L2
\tTST '*2'
\tBF L3
\tCL 'GN2'
\tOUT
L3
\tBT L2
\tTST '*'
\tBF L4
\tCL 'CI'
\tOUT
L4
\tBT L2
\tSR
\tBF L5
\tCL 'CL '
\tCI
\tOUT
L5
L2
\tR
OUTPUT
\tTST '.OUT'
\tBF L6
\tTST '('
\tBE
L7
\tCLL OUT1
\tBT L7
\tSET
\tBE
\tTST ')'
\tBE
L6
\tBT L8
\tTST '.LABEL'
\tBF L9
\tCL 'LB'
\tOUT
\tCLL OUT1
\tBE
L9
L8
\tBF L10
\tCL 'OUT'
\tOUT
L10
L11
\tR
EX3
\tID
\tBF L12
\tCL 'CLL '
\tCI
\tOUT
L12
\tBT L13
\tSR
\tBF L14
\tCL 'TST '
\tCI
\tOUT
L14
\tBT L13
\tTST '.ID'
\tBF L15
\tCL 'ID'
\tOUT
L15
\tBT L13
\tTST '.NUMBER'
\tBF L16
\tCL 'NUM'
\tOUT
L16
\tBT L13
\tTST '.STRING'
\tBF L17
\tCL 'SR'
\tOUT
L17
\tBT L13
\tTST '('
\tBF L18
\tCLL EX1
\tBE
\tTST ')'
\tBE
L18
\tBT L13
\tTST '.EMPTY'
\tBF L19
\tCL 'SET'
\tOUT
L19
\tBT L13
\tTST '$'
\tBF L20
\tLB
\tGN1
\tOUT
\tCLL EX3
\tBE
\tCL 'BT '
\tGN1
\tOUT
\tCL 'SET'
\tOUT
L20
L13
\tR
EX2
\tCLL EX3
\tBF L21
\tCL 'BF '
\tGN1
\tOUT
L21
\tBT L22
\tCLL OUTPUT
\tBF L23
L23
L22
\tBF L24
L25
\tCLL EX3
\tBF L26
\tCL 'BE'
\tOUT
L26
\tBT L27
\tCLL OUTPUT
\tBF L28
L28
L27
\tBT L25
\tSET
\tBE
\tLB
\tGN1
\tOUT
L24
L29
\tR
EX1
\tCLL EX2
\tBF L30
L31
\tTST '/'
\tBF L32
\tCL 'BT '
\tGN1
\tOUT
\tCLL EX2
\tBE
L32
L33
\tBT L31
\tSET
\tBE
\tLB
\tGN1
\tOUT
L30
L34
\tR
ST
\tID
\tBF L35
\tLB
\tCI
\tOUT
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST '.,'
\tBE
\tCL 'R'
\tOUT
L35
L36
\tR
PROGRAM
\tTST '.SYNTAX'
\tBF L37
\tID
\tBE
\tCL 'ADR '
\tCI
\tOUT
L38
\tCLL ST
\tBT L38
\tSET
\tBE
\tTST '.END'
\tBE
\tCL 'END'
\tOUT
L37
L39
\tR
\tEND`

code_c["c03. Meta II reordered, c[i04,c02], m[i04,c03]"] = `
\tADR PROGRAM
PROGRAM
\tTST '.SYNTAX'
\tBF L1
\tID
\tBE
\tCL 'ADR '
\tCI
\tOUT
L2
\tCLL ST
\tBT L2
\tSET
\tBE
\tTST '.END'
\tBE
\tCL 'END'
\tOUT
L1
L3
\tR
ST
\tID
\tBF L4
\tLB
\tCI
\tOUT
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST '.,'
\tBE
\tCL 'R'
\tOUT
L4
L5
\tR
EX1
\tCLL EX2
\tBF L6
L7
\tTST '/'
\tBF L8
\tCL 'BT '
\tGN1
\tOUT
\tCLL EX2
\tBE
L8
L9
\tBT L7
\tSET
\tBE
\tLB
\tGN1
\tOUT
L6
L10
\tR
EX2
\tCLL EX3
\tBF L11
\tCL 'BF '
\tGN1
\tOUT
L11
\tBT L12
\tCLL OUTPUT
\tBF L13
L13
L12
\tBF L14
L15
\tCLL EX3
\tBF L16
\tCL 'BE'
\tOUT
L16
\tBT L17
\tCLL OUTPUT
\tBF L18
L18
L17
\tBT L15
\tSET
\tBE
\tLB
\tGN1
\tOUT
L14
L19
\tR
EX3
\tID
\tBF L20
\tCL 'CLL '
\tCI
\tOUT
L20
\tBT L21
\tSR
\tBF L22
\tCL 'TST '
\tCI
\tOUT
L22
\tBT L21
\tTST '.ID'
\tBF L23
\tCL 'ID'
\tOUT
L23
\tBT L21
\tTST '.NUMBER'
\tBF L24
\tCL 'NUM'
\tOUT
L24
\tBT L21
\tTST '.STRING'
\tBF L25
\tCL 'SR'
\tOUT
L25
\tBT L21
\tTST '('
\tBF L26
\tCLL EX1
\tBE
\tTST ')'
\tBE
L26
\tBT L21
\tTST '.EMPTY'
\tBF L27
\tCL 'SET'
\tOUT
L27
\tBT L21
\tTST '$'
\tBF L28
\tLB
\tGN1
\tOUT
\tCLL EX3
\tBE
\tCL 'BT '
\tGN1
\tOUT
\tCL 'SET'
\tOUT
L28
L21
\tR
OUTPUT
\tTST '.OUT'
\tBF L29
\tTST '('
\tBE
L30
\tCLL OUT1
\tBT L30
\tSET
\tBE
\tTST ')'
\tBE
L29
\tBT L31
\tTST '.LABEL'
\tBF L32
\tCL 'LB'
\tOUT
\tCLL OUT1
\tBE
L32
L31
\tBF L33
\tCL 'OUT'
\tOUT
L33
L34
\tR
OUT1
\tTST '*1'
\tBF L35
\tCL 'GN1'
\tOUT
L35
\tBT L36
\tTST '*2'
\tBF L37
\tCL 'GN2'
\tOUT
L37
\tBT L36
\tTST '*'
\tBF L38
\tCL 'CI'
\tOUT
L38
\tBT L36
\tSR
\tBF L39
\tCL 'CL '
\tCI
\tOUT
L39
L36
\tR
\tEND`

code_c["c04. Meta II semicolons, c[i05,c03], m[i06,c04]"] = `
\tADR PROGRAM
PROGRAM
\tTST '.SYNTAX'
\tBF L1
\tID
\tBE
\tCL 'ADR '
\tCI
\tOUT
L2
\tCLL ST
\tBT L2
\tSET
\tBE
\tTST '.END'
\tBE
\tCL 'END'
\tOUT
L1
L3
\tR
ST
\tID
\tBF L4
\tLB
\tCI
\tOUT
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST ';'
\tBE
\tCL 'R'
\tOUT
L4
L5
\tR
EX1
\tCLL EX2
\tBF L6
L7
\tTST '/'
\tBF L8
\tCL 'BT '
\tGN1
\tOUT
\tCLL EX2
\tBE
L8
L9
\tBT L7
\tSET
\tBE
\tLB
\tGN1
\tOUT
L6
L10
\tR
EX2
\tCLL EX3
\tBF L11
\tCL 'BF '
\tGN1
\tOUT
L11
\tBT L12
\tCLL OUTPUT
\tBF L13
L13
L12
\tBF L14
L15
\tCLL EX3
\tBF L16
\tCL 'BE'
\tOUT
L16
\tBT L17
\tCLL OUTPUT
\tBF L18
L18
L17
\tBT L15
\tSET
\tBE
\tLB
\tGN1
\tOUT
L14
L19
\tR
EX3
\tID
\tBF L20
\tCL 'CLL '
\tCI
\tOUT
L20
\tBT L21
\tSR
\tBF L22
\tCL 'TST '
\tCI
\tOUT
L22
\tBT L21
\tTST '.ID'
\tBF L23
\tCL 'ID'
\tOUT
L23
\tBT L21
\tTST '.NUMBER'
\tBF L24
\tCL 'NUM'
\tOUT
L24
\tBT L21
\tTST '.STRING'
\tBF L25
\tCL 'SR'
\tOUT
L25
\tBT L21
\tTST '('
\tBF L26
\tCLL EX1
\tBE
\tTST ')'
\tBE
L26
\tBT L21
\tTST '.EMPTY'
\tBF L27
\tCL 'SET'
\tOUT
L27
\tBT L21
\tTST '$'
\tBF L28
\tLB
\tGN1
\tOUT
\tCLL EX3
\tBE
\tCL 'BT '
\tGN1
\tOUT
\tCL 'SET'
\tOUT
L28
L21
\tR
OUTPUT
\tTST '.OUT'
\tBF L29
\tTST '('
\tBE
L30
\tCLL OUT1
\tBT L30
\tSET
\tBE
\tTST ')'
\tBE
L29
\tBT L31
\tTST '.LABEL'
\tBF L32
\tCL 'LB'
\tOUT
\tCLL OUT1
\tBE
L32
L31
\tBF L33
\tCL 'OUT'
\tOUT
L33
L34
\tR
OUT1
\tTST '*1'
\tBF L35
\tCL 'GN1'
\tOUT
L35
\tBT L36
\tTST '*2'
\tBF L37
\tCL 'GN2'
\tOUT
L37
\tBT L36
\tTST '*'
\tBF L38
\tCL 'CI'
\tOUT
L38
\tBT L36
\tSR
\tBF L39
\tCL 'CL '
\tCI
\tOUT
L39
L36
\tR
\tEND`

code_c["c05. accept new output, c[i07,c04], m[i07,c05]"] = `
\tADR PROGRAM
PROGRAM
\tTST '.SYNTAX'
\tBF L1
\tID
\tBE
\tCL 'ADR '
\tCI
\tOUT
L2
\tCLL ST
\tBT L2
\tSET
\tBE
\tTST '.END'
\tBE
\tCL 'END'
\tOUT
L1
L3
\tR
ST
\tID
\tBF L4
\tLB
\tCI
\tOUT
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST ';'
\tBE
\tCL 'R'
\tOUT
L4
L5
\tR
EX1
\tCLL EX2
\tBF L6
L7
\tTST '/'
\tBF L8
\tCL 'BT '
\tGN1
\tOUT
\tCLL EX2
\tBE
L8
L9
\tBT L7
\tSET
\tBE
\tLB
\tGN1
\tOUT
L6
L10
\tR
EX2
\tCLL EX3
\tBF L11
\tCL 'BF '
\tGN1
\tOUT
L11
\tBT L12
\tCLL OUTPUT
\tBF L13
L13
L12
\tBF L14
L15
\tCLL EX3
\tBF L16
\tCL 'BE'
\tOUT
L16
\tBT L17
\tCLL OUTPUT
\tBF L18
L18
L17
\tBT L15
\tSET
\tBE
\tLB
\tGN1
\tOUT
L14
L19
\tR
EX3
\tID
\tBF L20
\tCL 'CLL '
\tCI
\tOUT
L20
\tBT L21
\tSR
\tBF L22
\tCL 'TST '
\tCI
\tOUT
L22
\tBT L21
\tTST '.ID'
\tBF L23
\tCL 'ID'
\tOUT
L23
\tBT L21
\tTST '.NUMBER'
\tBF L24
\tCL 'NUM'
\tOUT
L24
\tBT L21
\tTST '.STRING'
\tBF L25
\tCL 'SR'
\tOUT
L25
\tBT L21
\tTST '('
\tBF L26
\tCLL EX1
\tBE
\tTST ')'
\tBE
L26
\tBT L21
\tTST '.EMPTY'
\tBF L27
\tCL 'SET'
\tOUT
L27
\tBT L21
\tTST '$'
\tBF L28
\tLB
\tGN1
\tOUT
\tCLL EX3
\tBE
\tCL 'BT '
\tGN1
\tOUT
\tCL 'SET'
\tOUT
L28
L21
\tR
OUTPUT
\tTST '.OUT'
\tBF L29
\tTST '('
\tBE
L30
\tCLL OUT1
\tBT L30
\tSET
\tBE
\tTST ')'
\tBE
L29
\tBT L31
\tTST '.LABEL'
\tBF L32
\tCL 'LB'
\tOUT
\tCLL OUT1
\tBE
L32
L31
\tBF L33
\tCL 'OUT'
\tOUT
L33
L34
\tR
OUT1
\tTST '*1'
\tBF L35
\tCL 'GN1'
\tOUT
L35
\tBT L36
\tTST '*2'
\tBF L37
\tCL 'GN2'
\tOUT
L37
\tBT L36
\tTST '*'
\tBF L38
\tCL 'CI'
\tOUT
L38
\tBT L36
\tSR
\tBF L39
\tCL 'CL '
\tCI
\tOUT
L39
\tBT L36
\tTST '#'
\tBF L40
\tCL 'GN'
\tOUT
L40
\tBT L36
\tTST '.NL'
\tBF L41
\tCL 'NL'
\tOUT
L41
\tBT L36
\tTST '.LB'
\tBF L42
\tCL 'LB'
\tOUT
L42
\tBT L36
\tTST '.TB'
\tBF L43
\tCL 'TB'
\tOUT
L43
\tBT L36
\tTST '.LM+'
\tBF L44
\tCL 'LMI'
\tOUT
L44
\tBT L36
\tTST '.LM-'
\tBF L45
\tCL 'LMD'
\tOUT
L45
L36
\tR
\tEND`

code_c["c06. reject old output, c[i08,c05]"] = `
\tADR PROGRAM
PROGRAM
\tTST '.SYNTAX'
\tBF L1
\tID
\tBE
\tCL 'ADR '
\tCI
\tOUT
L2
\tCLL ST
\tBT L2
\tSET
\tBE
\tTST '.END'
\tBE
\tCL 'END'
\tOUT
L1
L3
\tR
ST
\tID
\tBF L4
\tLB
\tCI
\tOUT
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST ';'
\tBE
\tCL 'R'
\tOUT
L4
L5
\tR
EX1
\tCLL EX2
\tBF L6
L7
\tTST '/'
\tBF L8
\tCL 'BT '
\tGN1
\tOUT
\tCLL EX2
\tBE
L8
L9
\tBT L7
\tSET
\tBE
\tLB
\tGN1
\tOUT
L6
L10
\tR
EX2
\tCLL EX3
\tBF L11
\tCL 'BF '
\tGN1
\tOUT
L11
\tBT L12
\tCLL OUTPUT
\tBF L13
L13
L12
\tBF L14
L15
\tCLL EX3
\tBF L16
\tCL 'BE'
\tOUT
L16
\tBT L17
\tCLL OUTPUT
\tBF L18
L18
L17
\tBT L15
\tSET
\tBE
\tLB
\tGN1
\tOUT
L14
L19
\tR
EX3
\tID
\tBF L20
\tCL 'CLL '
\tCI
\tOUT
L20
\tBT L21
\tSR
\tBF L22
\tCL 'TST '
\tCI
\tOUT
L22
\tBT L21
\tTST '.ID'
\tBF L23
\tCL 'ID'
\tOUT
L23
\tBT L21
\tTST '.NUMBER'
\tBF L24
\tCL 'NUM'
\tOUT
L24
\tBT L21
\tTST '.STRING'
\tBF L25
\tCL 'SR'
\tOUT
L25
\tBT L21
\tTST '('
\tBF L26
\tCLL EX1
\tBE
\tTST ')'
\tBE
L26
\tBT L21
\tTST '.EMPTY'
\tBF L27
\tCL 'SET'
\tOUT
L27
\tBT L21
\tTST '$'
\tBF L28
\tLB
\tGN1
\tOUT
\tCLL EX3
\tBE
\tCL 'BT '
\tGN1
\tOUT
\tCL 'SET'
\tOUT
L28
L21
\tR
OUTPUT
\tTST '.OUT'
\tBF L29
\tTST '('
\tBE
L30
\tCLL OUT1
\tBT L30
\tSET
\tBE
\tTST ')'
\tBE
L29
L31
\tR
OUT1
\tTST '*'
\tBF L32
\tCL 'CI'
\tOUT
L32
\tBT L33
\tSR
\tBF L34
\tCL 'CL '
\tCI
\tOUT
L34
\tBT L33
\tTST '#'
\tBF L35
\tCL 'GN'
\tOUT
L35
\tBT L33
\tTST '.NL'
\tBF L36
\tCL 'NL'
\tOUT
L36
\tBT L33
\tTST '.LB'
\tBF L37
\tCL 'LB'
\tOUT
L37
\tBT L33
\tTST '.TB'
\tBF L38
\tCL 'TB'
\tOUT
L38
\tBT L33
\tTST '.LM+'
\tBF L39
\tCL 'LMI'
\tOUT
L39
\tBT L33
\tTST '.LM-'
\tBF L40
\tCL 'LMD'
\tOUT
L40
L33
\tR
\tEND`

code_c["c07. use new output, c[i09,c06], m[i09,c07]"] = `
\tADR PROGRAM
PROGRAM
\tTST '.SYNTAX'
\tBF L1
\tID
\tBE
\tLB
\tTB
\tCL 'ADR '
\tCI
\tNL
L2
\tCLL ST
\tBT L2
\tSET
\tBE
\tTST '.END'
\tBE
\tTB
\tCL 'END'
\tNL
L1
L3
\tR
ST
\tID
\tBF L4
\tLB
\tCI
\tNL
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST ';'
\tBE
\tTB
\tCL 'R'
\tNL
L4
L5
\tR
EX1
\tCLL EX2
\tBF L6
L7
\tTST '/'
\tBF L8
\tTB
\tCL 'BT L'
\tGN
\tNL
\tCLL EX2
\tBE
L8
L9
\tBT L7
\tSET
\tBE
\tLB
\tCL 'L'
\tGN
\tNL
L6
L10
\tR
EX2
\tCLL EX3
\tBF L11
\tTB
\tCL 'BF L'
\tGN
\tNL
L11
\tBT L12
\tCLL OUTPUT
\tBF L13
L13
L12
\tBF L14
L15
\tCLL EX3
\tBF L16
\tTB
\tCL 'BE'
\tNL
L16
\tBT L17
\tCLL OUTPUT
\tBF L18
L18
L17
\tBT L15
\tSET
\tBE
\tLB
\tCL 'L'
\tGN
\tNL
L14
L19
\tR
EX3
\tID
\tBF L20
\tTB
\tCL 'CLL '
\tCI
\tNL
L20
\tBT L21
\tSR
\tBF L22
\tTB
\tCL 'TST '
\tCI
\tNL
L22
\tBT L21
\tTST '.ID'
\tBF L23
\tTB
\tCL 'ID'
\tNL
L23
\tBT L21
\tTST '.NUMBER'
\tBF L24
\tTB
\tCL 'NUM'
\tNL
L24
\tBT L21
\tTST '.STRING'
\tBF L25
\tTB
\tCL 'SR'
\tNL
L25
\tBT L21
\tTST '('
\tBF L26
\tCLL EX1
\tBE
\tTST ')'
\tBE
L26
\tBT L21
\tTST '.EMPTY'
\tBF L27
\tTB
\tCL 'SET'
\tNL
L27
\tBT L21
\tTST '$'
\tBF L28
\tLB
\tCL 'L'
\tGN
\tNL
\tCLL EX3
\tBE
\tTB
\tCL 'BT L'
\tGN
\tNL
\tTB
\tCL 'SET'
\tNL
L28
L21
\tR
OUTPUT
\tTST '.OUT'
\tBF L29
\tTST '('
\tBE
L30
\tCLL OUT1
\tBT L30
\tSET
\tBE
\tTST ')'
\tBE
L29
L31
\tR
OUT1
\tTST '*'
\tBF L32
\tTB
\tCL 'CI'
\tNL
L32
\tBT L33
\tSR
\tBF L34
\tTB
\tCL 'CL '
\tCI
\tNL
L34
\tBT L33
\tTST '#'
\tBF L35
\tTB
\tCL 'GN'
\tNL
L35
\tBT L33
\tTST '.NL'
\tBF L36
\tTB
\tCL 'NL'
\tNL
L36
\tBT L33
\tTST '.LB'
\tBF L37
\tTB
\tCL 'LB'
\tNL
L37
\tBT L33
\tTST '.TB'
\tBF L38
\tTB
\tCL 'TB'
\tNL
L38
\tBT L33
\tTST '.LM+'
\tBF L39
\tTB
\tCL 'LMI'
\tNL
L39
\tBT L33
\tTST '.LM-'
\tBF L40
\tTB
\tCL 'LMD'
\tNL
L40
L33
\tR
\tEND`

code_c["c08. compile to js functions, c[i10,c07]"] = `
\tADR PROGRAM
PROGRAM
\tTST '.SYNTAX'
\tBF L1
\tID
\tBE
\tLB
\tCL '// '
\tCI
\tCL ' compiler'
\tNL
\tCL 'function compiler (input) {'
\tLMI
\tNL
\tCL 'inbuf = input ;'
\tNL
\tCL 'inp = 0 ;'
\tNL
\tCL 'outbuf = \"\" ;'
\tNL
\tCL 'margin = 0 ;'
\tNL
\tCL 'gnlabel = 1 ;'
\tNL
\tCL 'rule'
\tCI
\tCL '() ;'
\tNL
\tCL 'return outbuf ;'
\tNL
\tLMD
\tCL '} ;'
\tNL
\tNL
L2
\tCLL ST
\tBT L2
\tSET
\tBE
\tTST '.END'
\tBE
L1
L3
\tR
ST
\tID
\tBF L4
\tLB
\tCL 'function rule'
\tCI
\tCL ' () {'
\tLMI
\tNL
\tCL 'var rname = \"'
\tCI
\tCL '\" ;'
\tNL
\tCL 'var rlabel = 0 ;'
\tNL
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST ';'
\tBE
\tLMD
\tCL '} ;'
\tNL
\tNL
L4
L5
\tR
EX1
\tCLL EX2
\tBF L6
L7
\tTST '/'
\tBF L8
\tCL 'if (!flag) {'
\tLMI
\tNL
\tCLL EX2
\tBE
\tLMD
\tCL '} ;'
\tNL
L8
L9
\tBT L7
\tSET
\tBE
L6
L10
\tR
EX2
\tCLL EX3
\tBF L11
\tCL 'if (flag) {'
\tLMI
\tNL
L11
\tBT L12
\tCLL OUTPUT
\tBF L13
\tCL 'if (true) {'
\tLMI
\tNL
L13
L12
\tBF L14
L15
\tCLL EX3
\tBF L16
\tCL 'if (!flag) runBEjsfn(rname);'
\tNL
L16
\tBT L17
\tCLL OUTPUT
\tBF L18
L18
L17
\tBT L15
\tSET
\tBE
\tLMD
\tCL '} ;'
\tNL
L14
L19
\tR
EX3
\tID
\tBF L20
\tCL 'rule'
\tCI
\tCL '();'
\tNL
L20
\tBT L21
\tSR
\tBF L22
\tCL 'runTST('
\tCI
\tCL ');'
\tNL
L22
\tBT L21
\tTST '.ID'
\tBF L23
\tCL 'runID();'
\tNL
L23
\tBT L21
\tTST '.NUMBER'
\tBF L24
\tCL 'runNUM();'
\tNL
L24
\tBT L21
\tTST '.STRING'
\tBF L25
\tCL 'runSR();'
\tNL
L25
\tBT L21
\tTST '('
\tBF L26
\tCLL EX1
\tBE
\tTST ')'
\tBE
L26
\tBT L21
\tTST '.EMPTY'
\tBF L27
\tCL 'runSET();'
\tNL
L27
\tBT L21
\tTST '$'
\tBF L28
\tCL 'runSET();'
\tNL
\tCL 'while (flag) {'
\tLMI
\tNL
\tCLL EX3
\tBE
\tCL '};'
\tLMD
\tNL
\tCL 'runSET();'
\tNL
L28
L21
\tR
OUTPUT
\tTST '.OUT'
\tBF L29
\tTST '('
\tBE
L30
\tCLL OUT1
\tBT L30
\tSET
\tBE
\tTST ')'
\tBE
L29
L31
\tR
OUT1
\tTST '*'
\tBF L32
\tCL 'runCI();'
\tNL
L32
\tBT L33
\tSR
\tBF L34
\tCL 'runCL('
\tCI
\tCL ');'
\tNL
L34
\tBT L33
\tTST '#'
\tBF L35
\tCL 'if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;'
\tNL
\tCL 'runCL(rlabel.toString());'
\tNL
L35
\tBT L33
\tTST '.NL'
\tBF L36
\tCL 'runextNL();'
\tNL
L36
\tBT L33
\tTST '.LB'
\tBF L37
\tCL 'runLB();'
\tNL
L37
\tBT L33
\tTST '.TB'
\tBF L38
\tCL 'runextTB();'
\tNL
L38
\tBT L33
\tTST '.LM+'
\tBF L39
\tCL 'runextLMI();'
\tNL
L39
\tBT L33
\tTST '.LM-'
\tBF L40
\tCL 'runextLMD();'
\tNL
L40
L33
\tR
\tEND`

code_c["c07jf. compile to js functions, c[i10,c08], m[i10,c07jf]"] = `
// PROGRAM compiler
function compiler (input) {
  inbuf = input ;
  inp = 0 ;
  outbuf = \"\" ;
  margin = 0 ;
  gnlabel = 1 ;
  rulePROGRAM() ;
  return outbuf ;
} ;

function rulePROGRAM () {
  var rname = \"PROGRAM\" ;
  var rlabel = 0 ;
  runTST('.SYNTAX');
  if (flag) {
    runID();
    if (!flag) runBEjsfn(rname);
    runLB();
    runCL('// ');
    runCI();
    runCL(' compiler');
    runextNL();
    runCL('function compiler (input) {');
    runextLMI();
    runextNL();
    runCL('inbuf = input ;');
    runextNL();
    runCL('inp = 0 ;');
    runextNL();
    runCL('outbuf = \"\" ;');
    runextNL();
    runCL('margin = 0 ;');
    runextNL();
    runCL('gnlabel = 1 ;');
    runextNL();
    runCL('rule');
    runCI();
    runCL('() ;');
    runextNL();
    runCL('return outbuf ;');
    runextNL();
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
    runSET();
    while (flag) {
      ruleST();
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST('.END');
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleST () {
  var rname = \"ST\" ;
  var rlabel = 0 ;
  runID();
  if (flag) {
    runLB();
    runCL('function rule');
    runCI();
    runCL(' () {');
    runextLMI();
    runextNL();
    runCL('var rname = \"');
    runCI();
    runCL('\" ;');
    runextNL();
    runCL('var rlabel = 0 ;');
    runextNL();
    runTST('=');
    if (!flag) runBEjsfn(rname);
    ruleEX1();
    if (!flag) runBEjsfn(rname);
    runTST(';');
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
  } ;
} ;

function ruleEX1 () {
  var rname = \"EX1\" ;
  var rlabel = 0 ;
  ruleEX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('/');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleEX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleEX2 () {
  var rname = \"EX2\" ;
  var rlabel = 0 ;
  ruleEX3();
  if (flag) {
    runCL('if (flag) {');
    runextLMI();
    runextNL();
  } ;
  if (!flag) {
    ruleOUTPUT();
    if (flag) {
      runCL('if (true) {');
      runextLMI();
      runextNL();
    } ;
  } ;
  if (flag) {
    runSET();
    while (flag) {
      ruleEX3();
      if (flag) {
        runCL('if (!flag) runBEjsfn(rname);');
        runextNL();
      } ;
      if (!flag) {
        ruleOUTPUT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
  } ;
} ;

function ruleEX3 () {
  var rname = \"EX3\" ;
  var rlabel = 0 ;
  runID();
  if (flag) {
    runCL('rule');
    runCI();
    runCL('();');
    runextNL();
  } ;
  if (!flag) {
    runSR();
    if (flag) {
      runCL('runTST(');
      runCI();
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.ID');
    if (flag) {
      runCL('runID();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.NUMBER');
    if (flag) {
      runCL('runNUM();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.STRING');
    if (flag) {
      runCL('runSR();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('(');
    if (flag) {
      ruleEX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
  if (!flag) {
    runTST('.EMPTY');
    if (flag) {
      runCL('runSET();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('$');
    if (flag) {
      runCL('runSET();');
      runextNL();
      runCL('while (flag) {');
      runextLMI();
      runextNL();
      ruleEX3();
      if (!flag) runBEjsfn(rname);
      runCL('};');
      runextLMD();
      runextNL();
      runCL('runSET();');
      runextNL();
    } ;
  } ;
} ;

function ruleOUTPUT () {
  var rname = \"OUTPUT\" ;
  var rlabel = 0 ;
  runTST('.OUT');
  if (flag) {
    runTST('(');
    if (!flag) runBEjsfn(rname);
    runSET();
    while (flag) {
      ruleOUT1();
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST(')');
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleOUT1 () {
  var rname = \"OUT1\" ;
  var rlabel = 0 ;
  runTST('*');
  if (flag) {
    runCL('runCI();');
    runextNL();
  } ;
  if (!flag) {
    runSR();
    if (flag) {
      runCL('runCL(');
      runCI();
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('#');
    if (flag) {
      runCL('if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;');
      runextNL();
      runCL('runCL(rlabel.toString());');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.NL');
    if (flag) {
      runCL('runextNL();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LB');
    if (flag) {
      runCL('runLB();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.TB');
    if (flag) {
      runCL('runextTB();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LM+');
    if (flag) {
      runCL('runextLMI();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LM-');
    if (flag) {
      runCL('runextLMD();');
      runextNL();
    } ;
  } ;
} ;
`

code_c["c09. accept tokens, c[i11,c07]"] = `
\tADR PROGRAM
PROGRAM
\tTST '.SYNTAX'
\tBF L1
\tID
\tBE
\tLB
\tTB
\tCL 'ADR '
\tCI
\tNL
L2
\tCLL PR
\tBT L2
\tSET
\tBE
\tTST '.TOKENS'
\tBE
L3
\tCLL TR
\tBT L3
\tSET
\tBE
\tTST '.END'
\tBE
\tTB
\tCL 'END'
\tNL
L1
L4
\tR
PR
\tID
\tBF L5
\tLB
\tCI
\tNL
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST ';'
\tBE
\tTB
\tCL 'R'
\tNL
L5
L6
\tR
TR
\tID
\tBF L7
\tLB
\tCI
\tNL
\tTST ':'
\tBE
\tCLL TX1
\tBE
\tTST ';'
\tBE
\tTB
\tCL 'R'
\tNL
L7
L8
\tR
EX1
\tCLL EX2
\tBF L9
L10
\tTST '/'
\tBF L11
\tTB
\tCL 'BT L'
\tGN
\tNL
\tCLL EX2
\tBE
L11
L12
\tBT L10
\tSET
\tBE
\tLB
\tCL 'L'
\tGN
\tNL
L9
L13
\tR
EX2
\tCLL EX3
\tBF L14
\tTB
\tCL 'BF L'
\tGN
\tNL
L14
\tBT L15
\tCLL OUTPUT
\tBF L16
L16
L15
\tBF L17
L18
\tCLL EX3
\tBF L19
\tTB
\tCL 'BE'
\tNL
L19
\tBT L20
\tCLL OUTPUT
\tBF L21
L21
L20
\tBT L18
\tSET
\tBE
\tLB
\tCL 'L'
\tGN
\tNL
L17
L22
\tR
EX3
\tID
\tBF L23
\tTB
\tCL 'CLL '
\tCI
\tNL
L23
\tBT L24
\tSR
\tBF L25
\tTB
\tCL 'TST '
\tCI
\tNL
L25
\tBT L24
\tTST '.ID'
\tBF L26
\tTB
\tCL 'ID'
\tNL
L26
\tBT L24
\tTST '.NUMBER'
\tBF L27
\tTB
\tCL 'NUM'
\tNL
L27
\tBT L24
\tTST '.STRING'
\tBF L28
\tTB
\tCL 'SR'
\tNL
L28
\tBT L24
\tTST '('
\tBF L29
\tCLL EX1
\tBE
\tTST ')'
\tBE
L29
\tBT L24
\tTST '.EMPTY'
\tBF L30
\tTB
\tCL 'SET'
\tNL
L30
\tBT L24
\tTST '$'
\tBF L31
\tLB
\tCL 'L'
\tGN
\tNL
\tCLL EX3
\tBE
\tTB
\tCL 'BT L'
\tGN
\tNL
\tTB
\tCL 'SET'
\tNL
L31
L24
\tR
OUTPUT
\tTST '.OUT'
\tBF L32
\tTST '('
\tBE
L33
\tCLL OUT1
\tBT L33
\tSET
\tBE
\tTST ')'
\tBE
L32
L34
\tR
OUT1
\tTST '*'
\tBF L35
\tTB
\tCL 'CI'
\tNL
L35
\tBT L36
\tSR
\tBF L37
\tTB
\tCL 'CL '
\tCI
\tNL
L37
\tBT L36
\tNUM
\tBF L38
\tTB
\tCL 'CC '
\tCI
\tNL
L38
\tBT L36
\tTST '#'
\tBF L39
\tTB
\tCL 'GN'
\tNL
L39
\tBT L36
\tTST '.NL'
\tBF L40
\tTB
\tCL 'NL'
\tNL
L40
\tBT L36
\tTST '.LB'
\tBF L41
\tTB
\tCL 'LB'
\tNL
L41
\tBT L36
\tTST '.TB'
\tBF L42
\tTB
\tCL 'TB'
\tNL
L42
\tBT L36
\tTST '.LM+'
\tBF L43
\tTB
\tCL 'LMI'
\tNL
L43
\tBT L36
\tTST '.LM-'
\tBF L44
\tTB
\tCL 'LMD'
\tNL
L44
L36
\tR
TX1
\tCLL TX2
\tBF L45
L46
\tTST '/'
\tBF L47
\tTB
\tCL 'BT T'
\tGN
\tNL
\tCLL TX2
\tBE
L47
L48
\tBT L46
\tSET
\tBE
\tLB
\tCL 'T'
\tGN
\tNL
L45
L49
\tR
TX2
\tCLL TX3
\tBF L50
\tTB
\tCL 'BF T'
\tGN
\tNL
L51
\tCLL TX3
\tBF L52
\tTB
\tCL 'RF'
\tNL
L52
L53
\tBT L51
\tSET
\tBE
\tLB
\tCL 'T'
\tGN
\tNL
L50
L54
\tR
TX3
\tTST '.TOKEN'
\tBF L55
\tTB
\tCL 'TFT'
\tNL
L55
\tBT L56
\tTST '.DELTOK'
\tBF L57
\tTB
\tCL 'TFF'
\tNL
L57
\tBT L56
\tTST '$'
\tBF L58
\tLB
\tCL 'T'
\tGN
\tNL
\tCLL TX3
\tBE
\tTB
\tCL 'BT T'
\tGN
\tNL
L58
L56
\tBF L59
\tTB
\tCL 'SET'
\tNL
L59
\tBT L60
\tTST '.ANYBUT('
\tBF L61
\tCLL CX1
\tBE
\tTST ')'
\tBE
\tTB
\tCL 'NOT'
\tNL
\tTB
\tCL 'SCN'
\tNL
L61
\tBT L60
\tTST '.ANY('
\tBF L62
\tCLL CX1
\tBE
\tTST ')'
\tBE
\tTB
\tCL 'SCN'
\tNL
L62
\tBT L60
\tID
\tBF L63
\tTB
\tCL 'CLL '
\tCI
\tNL
L63
\tBT L60
\tTST '('
\tBF L64
\tCLL TX1
\tBE
\tTST ')'
\tBE
L64
L60
\tR
CX1
\tCLL CX2
\tBF L65
L66
\tTST '!'
\tBF L67
\tTB
\tCL 'BT C'
\tGN
\tNL
\tCLL CX2
\tBE
L67
L68
\tBT L66
\tSET
\tBE
\tLB
\tCL 'C'
\tGN
\tNL
L65
L69
\tR
CX2
\tCLL CX3
\tBF L70
\tTST ':'
\tBF L71
\tTB
\tCL 'CGE '
\tCI
\tNL
\tTB
\tCL 'BF D'
\tGN
\tNL
\tCLL CX3
\tBE
\tTB
\tCL 'CLE '
\tCI
\tNL
\tLB
\tCL 'D'
\tGN
\tNL
L71
\tBT L72
\tSET
\tBF L73
\tTB
\tCL 'CE '
\tCI
\tNL
L73
L72
\tBE
L70
L74
\tR
CX3
\tNUM
\tBF L75
L75
L76
\tR
\tEND`

code_c["c09jf. accept tokens, c[i11jf,c07jf]"] = `
// PROGRAM compiler
function compiler (input) {
  inbuf = input ;
  inp = 0 ;
  outbuf = \"\" ;
  margin = 0 ;
  gnlabel = 1 ;
  rulePROGRAM() ;
  return outbuf ;
} ;

function rulePROGRAM () {
  var rname = \"PROGRAM\" ;
  var rlabel = 0 ;
  runTST('.SYNTAX');
  if (flag) {
    runID();
    if (!flag) runBEjsfn(rname);
    runLB();
    runCL('// ');
    runCI();
    runCL(' compiler');
    runextNL();
    runCL('function compiler (input) {');
    runextLMI();
    runextNL();
    runCL('inbuf = input ;');
    runextNL();
    runCL('inp = 0 ;');
    runextNL();
    runCL('outbuf = \"\" ;');
    runextNL();
    runCL('margin = 0 ;');
    runextNL();
    runCL('gnlabel = 1 ;');
    runextNL();
    runCL('runextTFF();');
    runextNL();
    runCL('rule');
    runCI();
    runCL('() ;');
    runextNL();
    runCL('return outbuf ;');
    runextNL();
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
    runSET();
    while (flag) {
      rulePR();
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST('.TOKENS');
    if (!flag) runBEjsfn(rname);
    runSET();
    while (flag) {
      ruleTR();
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST('.END');
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function rulePR () {
  var rname = \"PR\" ;
  var rlabel = 0 ;
  runID();
  if (flag) {
    runLB();
    runCL('function rule');
    runCI();
    runCL(' () {');
    runextLMI();
    runextNL();
    runCL('var rname = \"');
    runCI();
    runCL('\" ;');
    runextNL();
    runCL('var rlabel = 0 ;');
    runextNL();
    runTST('=');
    if (!flag) runBEjsfn(rname);
    ruleEX1();
    if (!flag) runBEjsfn(rname);
    runTST(';');
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
  } ;
} ;

function ruleTR () {
  var rname = \"TR\" ;
  var rlabel = 0 ;
  runID();
  if (flag) {
    runLB();
    runCL('function rule');
    runCI();
    runCL(' () {');
    runextLMI();
    runextNL();
    runCL('var rname = \"');
    runCI();
    runCL('\" ;');
    runextNL();
    runCL('var rlabel = 0 ;');
    runextNL();
    runTST(':');
    if (!flag) runBEjsfn(rname);
    ruleTX1();
    if (!flag) runBEjsfn(rname);
    runTST(';');
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
  } ;
} ;

function ruleEX1 () {
  var rname = \"EX1\" ;
  var rlabel = 0 ;
  ruleEX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('/');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleEX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleEX2 () {
  var rname = \"EX2\" ;
  var rlabel = 0 ;
  ruleEX3();
  if (flag) {
    runCL('if (flag) {');
    runextLMI();
    runextNL();
  } ;
  if (!flag) {
    ruleOUTPUT();
    if (flag) {
      runCL('if (true) {');
      runextLMI();
      runextNL();
    } ;
  } ;
  if (flag) {
    runSET();
    while (flag) {
      ruleEX3();
      if (flag) {
        runCL('if (!flag) runBEjsfn(rname);');
        runextNL();
      } ;
      if (!flag) {
        ruleOUTPUT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
  } ;
} ;

function ruleEX3 () {
  var rname = \"EX3\" ;
  var rlabel = 0 ;
  runID();
  if (flag) {
    runCL('rule');
    runCI();
    runCL('();');
    runextNL();
  } ;
  if (!flag) {
    runSR();
    if (flag) {
      runCL('runTST(');
      runCI();
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.ID');
    if (flag) {
      runCL('runID();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.NUMBER');
    if (flag) {
      runCL('runNUM();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.STRING');
    if (flag) {
      runCL('runSR();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('(');
    if (flag) {
      ruleEX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
  if (!flag) {
    runTST('.EMPTY');
    if (flag) {
      runCL('runSET();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('$');
    if (flag) {
      runCL('runSET();');
      runextNL();
      runCL('while (flag) {');
      runextLMI();
      runextNL();
      ruleEX3();
      if (!flag) runBEjsfn(rname);
      runCL('};');
      runextLMD();
      runextNL();
      runCL('runSET();');
      runextNL();
    } ;
  } ;
} ;

function ruleOUTPUT () {
  var rname = \"OUTPUT\" ;
  var rlabel = 0 ;
  runTST('.OUT');
  if (flag) {
    runTST('(');
    if (!flag) runBEjsfn(rname);
    runSET();
    while (flag) {
      ruleOUT1();
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST(')');
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleOUT1 () {
  var rname = \"OUT1\" ;
  var rlabel = 0 ;
  runTST('*');
  if (flag) {
    runCL('runCI();');
    runextNL();
  } ;
  if (!flag) {
    runSR();
    if (flag) {
      runCL('runCL(');
      runCI();
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runNUM();
    if (flag) {
      runCL('runextCC(');
      runCI();
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('#');
    if (flag) {
      runCL('if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;');
      runextNL();
      runCL('runCL(rlabel.toString());');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.NL');
    if (flag) {
      runCL('runextNL();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LB');
    if (flag) {
      runCL('runLB();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.TB');
    if (flag) {
      runCL('runextTB();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LM+');
    if (flag) {
      runCL('runextLMI();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LM-');
    if (flag) {
      runCL('runextLMD();');
      runextNL();
    } ;
  } ;
} ;

function ruleTX1 () {
  var rname = \"TX1\" ;
  var rlabel = 0 ;
  ruleTX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('/');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleTX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleTX2 () {
  var rname = \"TX2\" ;
  var rlabel = 0 ;
  ruleTX3();
  if (flag) {
    runCL('if (flag) {');
    runextLMI();
    runextNL();
    runSET();
    while (flag) {
      ruleTX3();
      if (flag) {
        runCL('if (!flag) return;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
  } ;
} ;

function ruleTX3 () {
  var rname = \"TX3\" ;
  var rlabel = 0 ;
  runTST('.TOKEN');
  if (flag) {
    runCL('runextTFT();');
    runextNL();
  } ;
  if (!flag) {
    runTST('.DELTOK');
    if (flag) {
      runCL('runextTFF();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('$');
    if (flag) {
      runCL('runSET();');
      runextNL();
      runCL('while (flag) {');
      runextLMI();
      runextNL();
      ruleTX3();
      if (!flag) runBEjsfn(rname);
      runCL('};');
      runextLMD();
      runextNL();
    } ;
  } ;
  if (flag) {
    runCL('runSET();');
    runextNL();
  } ;
  if (!flag) {
    runTST('.ANYBUT(');
    if (flag) {
      ruleCX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
      runCL('runextNOT();');
      runextNL();
      runCL('runextSCN();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.ANY(');
    if (flag) {
      ruleCX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
      runCL('runextSCN();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runID();
    if (flag) {
      runCL('rule');
      runCI();
      runCL('();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('(');
    if (flag) {
      ruleTX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
} ;

function ruleCX1 () {
  var rname = \"CX1\" ;
  var rlabel = 0 ;
  ruleCX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('!');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleCX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleCX2 () {
  var rname = \"CX2\" ;
  var rlabel = 0 ;
  ruleCX3();
  if (flag) {
    runTST(':');
    if (flag) {
      runCL('runextCGE(');
      runCI();
      runCL(');');
      runextNL();
      runCL('if (flag) {');
      runextLMI();
      runextNL();
      ruleCX3();
      if (!flag) runBEjsfn(rname);
      runCL('runextCLE(');
      runCI();
      runCL(');');
      runextNL();
      runextLMD();
      runCL('} ;');
      runextNL();
    } ;
    if (!flag) {
      runSET();
      if (flag) {
        runCL('runextCE(');
        runCI();
        runCL(');');
        runextNL();
      } ;
    } ;
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleCX3 () {
  var rname = \"CX3\" ;
  var rlabel = 0 ;
  runNUM();
  if (flag) {
  } ;
} ;
`

code_c["c10. use tokens, c[i12,c09], m[i12,c10]"] = `
\tADR PROGRAM
PROGRAM
\tTST '.SYNTAX'
\tBF L1
\tCLL ID
\tBE
\tLB
\tTB
\tCL 'ADR '
\tCI
\tNL
L2
\tCLL PR
\tBT L2
\tSET
\tBE
\tTST '.TOKENS'
\tBE
L3
\tCLL TR
\tBT L3
\tSET
\tBE
\tTST '.END'
\tBE
\tTB
\tCL 'END'
\tNL
L1
L4
\tR
PR
\tCLL ID
\tBF L5
\tLB
\tCI
\tNL
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST ';'
\tBE
\tTB
\tCL 'R'
\tNL
L5
L6
\tR
TR
\tCLL ID
\tBF L7
\tLB
\tCI
\tNL
\tTST ':'
\tBE
\tCLL TX1
\tBE
\tTST ';'
\tBE
\tTB
\tCL 'R'
\tNL
L7
L8
\tR
EX1
\tCLL EX2
\tBF L9
L10
\tTST '/'
\tBF L11
\tTB
\tCL 'BT L'
\tGN
\tNL
\tCLL EX2
\tBE
L11
L12
\tBT L10
\tSET
\tBE
\tLB
\tCL 'L'
\tGN
\tNL
L9
L13
\tR
EX2
\tCLL EX3
\tBF L14
\tTB
\tCL 'BF L'
\tGN
\tNL
L14
\tBT L15
\tCLL OUTPUT
\tBF L16
L16
L15
\tBF L17
L18
\tCLL EX3
\tBF L19
\tTB
\tCL 'BE'
\tNL
L19
\tBT L20
\tCLL OUTPUT
\tBF L21
L21
L20
\tBT L18
\tSET
\tBE
\tLB
\tCL 'L'
\tGN
\tNL
L17
L22
\tR
EX3
\tCLL ID
\tBF L23
\tTB
\tCL 'CLL '
\tCI
\tNL
L23
\tBT L24
\tCLL STRING
\tBF L25
\tTB
\tCL 'TST '
\tCC 39
\tCI
\tCC 39
\tNL
L25
\tBT L24
\tTST '('
\tBF L26
\tCLL EX1
\tBE
\tTST ')'
\tBE
L26
\tBT L24
\tTST '.EMPTY'
\tBF L27
\tTB
\tCL 'SET'
\tNL
L27
\tBT L24
\tTST '.LITCHR'
\tBF L28
\tTB
\tCL 'LCH'
\tNL
L28
\tBT L24
\tTST '$'
\tBF L29
\tLB
\tCL 'L'
\tGN
\tNL
\tCLL EX3
\tBE
\tTB
\tCL 'BT L'
\tGN
\tNL
\tTB
\tCL 'SET'
\tNL
L29
L24
\tR
OUTPUT
\tTST '.OUT'
\tBF L30
\tTST '('
\tBE
L31
\tCLL OUT1
\tBT L31
\tSET
\tBE
\tTST ')'
\tBE
L30
L32
\tR
OUT1
\tTST '*'
\tBF L33
\tTB
\tCL 'CI'
\tNL
L33
\tBT L34
\tCLL STRING
\tBF L35
\tTB
\tCL 'CL '
\tCC 39
\tCI
\tCC 39
\tNL
L35
\tBT L34
\tCLL NUMBER
\tBF L36
\tTB
\tCL 'CC '
\tCI
\tNL
L36
\tBT L34
\tTST '#'
\tBF L37
\tTB
\tCL 'GN'
\tNL
L37
\tBT L34
\tTST '.NL'
\tBF L38
\tTB
\tCL 'NL'
\tNL
L38
\tBT L34
\tTST '.LB'
\tBF L39
\tTB
\tCL 'LB'
\tNL
L39
\tBT L34
\tTST '.TB'
\tBF L40
\tTB
\tCL 'TB'
\tNL
L40
\tBT L34
\tTST '.LM+'
\tBF L41
\tTB
\tCL 'LMI'
\tNL
L41
\tBT L34
\tTST '.LM-'
\tBF L42
\tTB
\tCL 'LMD'
\tNL
L42
L34
\tR
TX1
\tCLL TX2
\tBF L43
L44
\tTST '/'
\tBF L45
\tTB
\tCL 'BT T'
\tGN
\tNL
\tCLL TX2
\tBE
L45
L46
\tBT L44
\tSET
\tBE
\tLB
\tCL 'T'
\tGN
\tNL
L43
L47
\tR
TX2
\tCLL TX3
\tBF L48
\tTB
\tCL 'BF T'
\tGN
\tNL
L49
\tCLL TX3
\tBF L50
\tTB
\tCL 'RF'
\tNL
L50
L51
\tBT L49
\tSET
\tBE
\tLB
\tCL 'T'
\tGN
\tNL
L48
L52
\tR
TX3
\tTST '.TOKEN'
\tBF L53
\tTB
\tCL 'TFT'
\tNL
L53
\tBT L54
\tTST '.DELTOK'
\tBF L55
\tTB
\tCL 'TFF'
\tNL
L55
\tBT L54
\tTST '$'
\tBF L56
\tLB
\tCL 'T'
\tGN
\tNL
\tCLL TX3
\tBE
\tTB
\tCL 'BT T'
\tGN
\tNL
L56
L54
\tBF L57
\tTB
\tCL 'SET'
\tNL
L57
\tBT L58
\tTST '.ANYBUT('
\tBF L59
\tCLL CX1
\tBE
\tTST ')'
\tBE
\tTB
\tCL 'NOT'
\tNL
\tTB
\tCL 'SCN'
\tNL
L59
\tBT L58
\tTST '.ANY('
\tBF L60
\tCLL CX1
\tBE
\tTST ')'
\tBE
\tTB
\tCL 'SCN'
\tNL
L60
\tBT L58
\tCLL ID
\tBF L61
\tTB
\tCL 'CLL '
\tCI
\tNL
L61
\tBT L58
\tTST '('
\tBF L62
\tCLL TX1
\tBE
\tTST ')'
\tBE
L62
L58
\tR
CX1
\tCLL CX2
\tBF L63
L64
\tTST '!'
\tBF L65
\tTB
\tCL 'BT C'
\tGN
\tNL
\tCLL CX2
\tBE
L65
L66
\tBT L64
\tSET
\tBE
\tLB
\tCL 'C'
\tGN
\tNL
L63
L67
\tR
CX2
\tCLL CX3
\tBF L68
\tTST ':'
\tBF L69
\tTB
\tCL 'CGE '
\tCI
\tNL
\tTB
\tCL 'BF D'
\tGN
\tNL
\tCLL CX3
\tBE
\tTB
\tCL 'CLE '
\tCI
\tNL
\tLB
\tCL 'D'
\tGN
\tNL
L69
\tBT L70
\tSET
\tBF L71
\tTB
\tCL 'CE '
\tCI
\tNL
L71
L70
\tBE
L68
L72
\tR
CX3
\tCLL NUMBER
\tBF L73
L73
L74
\tR
PREFIX
T75
\tCE 32
\tBT C76
\tCE 9
\tBT C76
\tCE 13
\tBT C76
\tCE 10
C76
\tSCN
\tBT T75
\tSET
\tBF T77
T77
T78
\tR
ID
\tCLL PREFIX
\tBF T79
\tTFT
\tSET
\tRF
\tCLL ALPHA
\tRF
T80
\tCLL ALPHA
\tBF T81
T81
\tBT T82
\tCLL DIGIT
\tBF T83
T83
T82
\tBT T80
\tSET
\tRF
\tTFF
\tSET
\tRF
T79
T84
\tR
NUMBER
\tCLL PREFIX
\tBF T85
\tTFT
\tSET
\tRF
\tCLL DIGIT
\tRF
T86
\tCLL DIGIT
\tBT T86
\tSET
\tRF
\tTFF
\tSET
\tRF
T85
T87
\tR
STRING
\tCLL PREFIX
\tBF T88
\tCE 39
C89
\tSCN
\tRF
\tTFT
\tSET
\tRF
T90
\tCE 13
\tBT C91
\tCE 10
\tBT C91
\tCE 39
C91
\tNOT
\tSCN
\tBT T90
\tSET
\tRF
\tTFF
\tSET
\tRF
\tCE 39
C92
\tSCN
\tRF
T88
T93
\tR
ALPHA
\tCGE 65
\tBF D94
\tCLE 90
D94
\tBT C95
\tCGE 97
\tBF D96
\tCLE 122
D96
C95
\tSCN
\tBF T97
T97
T98
\tR
DIGIT
\tCGE 48
\tBF D99
\tCLE 57
D99
C100
\tSCN
\tBF T101
T101
T102
\tR
\tEND`

code_c["c10jf. use tokens, c[i12jf,c09jf], m[i12jf,c10jf]"] = `
// PROGRAM compiler
function compiler (input) {
  inbuf = input ;
  inp = 0 ;
  outbuf = \"\" ;
  margin = 0 ;
  gnlabel = 1 ;
  runextTFF();
  rulePROGRAM() ;
  return outbuf ;
} ;

function rulePROGRAM () {
  var rname = \"PROGRAM\" ;
  var rlabel = 0 ;
  runTST('.SYNTAX');
  if (flag) {
    ruleID();
    if (!flag) runBEjsfn(rname);
    runLB();
    runCL('// ');
    runCI();
    runCL(' compiler');
    runextNL();
    runCL('function compiler (input) {');
    runextLMI();
    runextNL();
    runCL('inbuf = input ;');
    runextNL();
    runCL('inp = 0 ;');
    runextNL();
    runCL('outbuf = \"\" ;');
    runextNL();
    runCL('margin = 0 ;');
    runextNL();
    runCL('gnlabel = 1 ;');
    runextNL();
    runCL('runextTFF();');
    runextNL();
    runCL('rule');
    runCI();
    runCL('() ;');
    runextNL();
    runCL('return outbuf ;');
    runextNL();
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
    runSET();
    while (flag) {
      rulePR();
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST('.TOKENS');
    if (!flag) runBEjsfn(rname);
    runSET();
    while (flag) {
      ruleTR();
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST('.END');
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function rulePR () {
  var rname = \"PR\" ;
  var rlabel = 0 ;
  ruleID();
  if (flag) {
    runLB();
    runCL('function rule');
    runCI();
    runCL(' () {');
    runextLMI();
    runextNL();
    runCL('var rname = \"');
    runCI();
    runCL('\" ;');
    runextNL();
    runCL('var rlabel = 0 ;');
    runextNL();
    runTST('=');
    if (!flag) runBEjsfn(rname);
    ruleEX1();
    if (!flag) runBEjsfn(rname);
    runTST(';');
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
  } ;
} ;

function ruleTR () {
  var rname = \"TR\" ;
  var rlabel = 0 ;
  ruleID();
  if (flag) {
    runLB();
    runCL('function rule');
    runCI();
    runCL(' () {');
    runextLMI();
    runextNL();
    runCL('var rname = \"');
    runCI();
    runCL('\" ;');
    runextNL();
    runCL('var rlabel = 0 ;');
    runextNL();
    runTST(':');
    if (!flag) runBEjsfn(rname);
    ruleTX1();
    if (!flag) runBEjsfn(rname);
    runTST(';');
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
  } ;
} ;

function ruleEX1 () {
  var rname = \"EX1\" ;
  var rlabel = 0 ;
  ruleEX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('/');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleEX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleEX2 () {
  var rname = \"EX2\" ;
  var rlabel = 0 ;
  ruleEX3();
  if (flag) {
    runCL('if (flag) {');
    runextLMI();
    runextNL();
  } ;
  if (!flag) {
    ruleOUTPUT();
    if (flag) {
      runCL('if (true) {');
      runextLMI();
      runextNL();
    } ;
  } ;
  if (flag) {
    runSET();
    while (flag) {
      ruleEX3();
      if (flag) {
        runCL('if (!flag) runBEjsfn(rname);');
        runextNL();
      } ;
      if (!flag) {
        ruleOUTPUT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
  } ;
} ;

function ruleEX3 () {
  var rname = \"EX3\" ;
  var rlabel = 0 ;
  ruleID();
  if (flag) {
    runCL('rule');
    runCI();
    runCL('();');
    runextNL();
  } ;
  if (!flag) {
    ruleSTRING();
    if (flag) {
      runCL('runTST(');
      runextCC(39);
      runCI();
      runextCC(39);
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('(');
    if (flag) {
      ruleEX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
  if (!flag) {
    runTST('.EMPTY');
    if (flag) {
      runCL('runSET();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LITCHR');
    if (flag) {
      runCL('runextLCH();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('$');
    if (flag) {
      runCL('runSET();');
      runextNL();
      runCL('while (flag) {');
      runextLMI();
      runextNL();
      ruleEX3();
      if (!flag) runBEjsfn(rname);
      runCL('};');
      runextLMD();
      runextNL();
      runCL('runSET();');
      runextNL();
    } ;
  } ;
} ;

function ruleOUTPUT () {
  var rname = \"OUTPUT\" ;
  var rlabel = 0 ;
  runTST('.OUT');
  if (flag) {
    runTST('(');
    if (!flag) runBEjsfn(rname);
    runSET();
    while (flag) {
      ruleOUT1();
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST(')');
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleOUT1 () {
  var rname = \"OUT1\" ;
  var rlabel = 0 ;
  runTST('*');
  if (flag) {
    runCL('runCI();');
    runextNL();
  } ;
  if (!flag) {
    ruleSTRING();
    if (flag) {
      runCL('runCL(');
      runextCC(39);
      runCI();
      runextCC(39);
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    ruleNUMBER();
    if (flag) {
      runCL('runextCC(');
      runCI();
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('#');
    if (flag) {
      runCL('if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;');
      runextNL();
      runCL('runCL(rlabel.toString());');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.NL');
    if (flag) {
      runCL('runextNL();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LB');
    if (flag) {
      runCL('runLB();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.TB');
    if (flag) {
      runCL('runextTB();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LM+');
    if (flag) {
      runCL('runextLMI();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LM-');
    if (flag) {
      runCL('runextLMD();');
      runextNL();
    } ;
  } ;
} ;

function ruleTX1 () {
  var rname = \"TX1\" ;
  var rlabel = 0 ;
  ruleTX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('/');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleTX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleTX2 () {
  var rname = \"TX2\" ;
  var rlabel = 0 ;
  ruleTX3();
  if (flag) {
    runCL('if (flag) {');
    runextLMI();
    runextNL();
    runSET();
    while (flag) {
      ruleTX3();
      if (flag) {
        runCL('if (!flag) return;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
  } ;
} ;

function ruleTX3 () {
  var rname = \"TX3\" ;
  var rlabel = 0 ;
  runTST('.TOKEN');
  if (flag) {
    runCL('runextTFT();');
    runextNL();
  } ;
  if (!flag) {
    runTST('.DELTOK');
    if (flag) {
      runCL('runextTFF();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('$');
    if (flag) {
      runCL('runSET();');
      runextNL();
      runCL('while (flag) {');
      runextLMI();
      runextNL();
      ruleTX3();
      if (!flag) runBEjsfn(rname);
      runCL('};');
      runextLMD();
      runextNL();
    } ;
  } ;
  if (flag) {
    runCL('runSET();');
    runextNL();
  } ;
  if (!flag) {
    runTST('.ANYBUT(');
    if (flag) {
      ruleCX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
      runCL('runextNOT();');
      runextNL();
      runCL('runextSCN();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.ANY(');
    if (flag) {
      ruleCX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
      runCL('runextSCN();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    ruleID();
    if (flag) {
      runCL('rule');
      runCI();
      runCL('();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('(');
    if (flag) {
      ruleTX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
} ;

function ruleCX1 () {
  var rname = \"CX1\" ;
  var rlabel = 0 ;
  ruleCX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('!');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleCX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleCX2 () {
  var rname = \"CX2\" ;
  var rlabel = 0 ;
  ruleCX3();
  if (flag) {
    runTST(':');
    if (flag) {
      runCL('runextCGE(');
      runCI();
      runCL(');');
      runextNL();
      runCL('if (flag) {');
      runextLMI();
      runextNL();
      ruleCX3();
      if (!flag) runBEjsfn(rname);
      runCL('runextCLE(');
      runCI();
      runCL(');');
      runextNL();
      runextLMD();
      runCL('} ;');
      runextNL();
    } ;
    if (!flag) {
      runSET();
      if (flag) {
        runCL('runextCE(');
        runCI();
        runCL(');');
        runextNL();
      } ;
    } ;
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleCX3 () {
  var rname = \"CX3\" ;
  var rlabel = 0 ;
  ruleNUMBER();
  if (flag) {
  } ;
} ;

function rulePREFIX () {
  var rname = \"PREFIX\" ;
  var rlabel = 0 ;
  runSET();
  while (flag) {
    runextCE(32);
    if (!flag) {
      runextCE(9);
    } ;
    if (!flag) {
      runextCE(13);
    } ;
    if (!flag) {
      runextCE(10);
    } ;
    runextSCN();
    };
  runSET();
  if (flag) {
  } ;
} ;

function ruleID () {
  var rname = \"ID\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextTFT();
    runSET();
    if (!flag) return;
    ruleALPHA();
    if (!flag) return;
    runSET();
    while (flag) {
      ruleALPHA();
      if (flag) {
      } ;
      if (!flag) {
        ruleDIGIT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
  } ;
} ;

function ruleNUMBER () {
  var rname = \"NUMBER\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextTFT();
    runSET();
    if (!flag) return;
    ruleDIGIT();
    if (!flag) return;
    runSET();
    while (flag) {
      ruleDIGIT();
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
  } ;
} ;

function ruleSTRING () {
  var rname = \"STRING\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextCE(39);
    runextSCN();
    if (!flag) return;
    runextTFT();
    runSET();
    if (!flag) return;
    runSET();
    while (flag) {
      runextCE(13);
      if (!flag) {
        runextCE(10);
      } ;
      if (!flag) {
        runextCE(39);
      } ;
      runextNOT();
      runextSCN();
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
    runextCE(39);
    runextSCN();
    if (!flag) return;
  } ;
} ;

function ruleALPHA () {
  var rname = \"ALPHA\" ;
  var rlabel = 0 ;
  runextCGE(65);
  if (flag) {
    runextCLE(90);
  } ;
  if (!flag) {
    runextCGE(97);
    if (flag) {
      runextCLE(122);
    } ;
  } ;
  runextSCN();
  if (flag) {
  } ;
} ;

function ruleDIGIT () {
  var rname = \"DIGIT\" ;
  var rlabel = 0 ;
  runextCGE(48);
  if (flag) {
    runextCLE(57);
  } ;
  runextSCN();
  if (flag) {
  } ;
} ;
`

code_c["c11. accept comments, c[i13,c10]"] = `
\tADR PROGRAM
PROGRAM
\tTST '.SYNTAX'
\tBF L1
\tCLL ID
\tBE
\tLB
\tTB
\tCL 'ADR '
\tCI
\tNL
L2
\tCLL PR
\tBF L3
L3
\tBT L4
\tCLL COMMENT
\tBF L5
L5
L4
\tBT L2
\tSET
\tBE
\tTST '.TOKENS'
\tBE
L6
\tCLL TR
\tBF L7
L7
\tBT L8
\tCLL COMMENT
\tBF L9
L9
L8
\tBT L6
\tSET
\tBE
\tTST '.END'
\tBE
\tTB
\tCL 'END'
\tNL
L1
L10
\tR
PR
\tCLL ID
\tBF L11
\tLB
\tCI
\tNL
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST ';'
\tBE
\tTB
\tCL 'R'
\tNL
L11
L12
\tR
TR
\tCLL ID
\tBF L13
\tLB
\tCI
\tNL
\tTST ':'
\tBE
\tCLL TX1
\tBE
\tTST ';'
\tBE
\tTB
\tCL 'R'
\tNL
L13
L14
\tR
COMMENT
\tTST '['
\tBF L15
\tCLL CMLINE
\tBE
\tTST ']'
\tBE
\tLB
\tCL ';'
\tCI
\tNL
L15
L16
\tR
EX1
\tCLL EX2
\tBF L17
L18
\tTST '/'
\tBF L19
\tTB
\tCL 'BT L'
\tGN
\tNL
\tCLL EX2
\tBE
L19
L20
\tBT L18
\tSET
\tBE
\tLB
\tCL 'L'
\tGN
\tNL
L17
L21
\tR
EX2
\tCLL EX3
\tBF L22
\tTB
\tCL 'BF L'
\tGN
\tNL
L22
\tBT L23
\tCLL OUTPUT
\tBF L24
L24
L23
\tBF L25
L26
\tCLL EX3
\tBF L27
\tTB
\tCL 'BE'
\tNL
L27
\tBT L28
\tCLL OUTPUT
\tBF L29
L29
L28
\tBT L26
\tSET
\tBE
\tLB
\tCL 'L'
\tGN
\tNL
L25
L30
\tR
EX3
\tCLL ID
\tBF L31
\tTB
\tCL 'CLL '
\tCI
\tNL
L31
\tBT L32
\tCLL STRING
\tBF L33
\tTB
\tCL 'TST '
\tCC 39
\tCI
\tCC 39
\tNL
L33
\tBT L32
\tTST '('
\tBF L34
\tCLL EX1
\tBE
\tTST ')'
\tBE
L34
\tBT L32
\tTST '.EMPTY'
\tBF L35
\tTB
\tCL 'SET'
\tNL
L35
\tBT L32
\tTST '.LITCHR'
\tBF L36
\tTB
\tCL 'LCH'
\tNL
L36
\tBT L32
\tTST '$'
\tBF L37
\tLB
\tCL 'L'
\tGN
\tNL
\tCLL EX3
\tBE
\tTB
\tCL 'BT L'
\tGN
\tNL
\tTB
\tCL 'SET'
\tNL
L37
L32
\tR
OUTPUT
\tTST '.OUT'
\tBF L38
\tTST '('
\tBE
L39
\tCLL OUT1
\tBT L39
\tSET
\tBE
\tTST ')'
\tBE
L38
L40
\tR
OUT1
\tTST '*'
\tBF L41
\tTB
\tCL 'CI'
\tNL
L41
\tBT L42
\tCLL STRING
\tBF L43
\tTB
\tCL 'CL '
\tCC 39
\tCI
\tCC 39
\tNL
L43
\tBT L42
\tCLL NUMBER
\tBF L44
\tTB
\tCL 'CC '
\tCI
\tNL
L44
\tBT L42
\tTST '#'
\tBF L45
\tTB
\tCL 'GN'
\tNL
L45
\tBT L42
\tTST '.NL'
\tBF L46
\tTB
\tCL 'NL'
\tNL
L46
\tBT L42
\tTST '.LB'
\tBF L47
\tTB
\tCL 'LB'
\tNL
L47
\tBT L42
\tTST '.TB'
\tBF L48
\tTB
\tCL 'TB'
\tNL
L48
\tBT L42
\tTST '.LM+'
\tBF L49
\tTB
\tCL 'LMI'
\tNL
L49
\tBT L42
\tTST '.LM-'
\tBF L50
\tTB
\tCL 'LMD'
\tNL
L50
L42
\tR
TX1
\tCLL TX2
\tBF L51
L52
\tTST '/'
\tBF L53
\tTB
\tCL 'BT T'
\tGN
\tNL
\tCLL TX2
\tBE
L53
L54
\tBT L52
\tSET
\tBE
\tLB
\tCL 'T'
\tGN
\tNL
L51
L55
\tR
TX2
\tCLL TX3
\tBF L56
\tTB
\tCL 'BF T'
\tGN
\tNL
L57
\tCLL TX3
\tBF L58
\tTB
\tCL 'RF'
\tNL
L58
L59
\tBT L57
\tSET
\tBE
\tLB
\tCL 'T'
\tGN
\tNL
L56
L60
\tR
TX3
\tTST '.TOKEN'
\tBF L61
\tTB
\tCL 'TFT'
\tNL
L61
\tBT L62
\tTST '.DELTOK'
\tBF L63
\tTB
\tCL 'TFF'
\tNL
L63
\tBT L62
\tTST '$'
\tBF L64
\tLB
\tCL 'T'
\tGN
\tNL
\tCLL TX3
\tBE
\tTB
\tCL 'BT T'
\tGN
\tNL
L64
L62
\tBF L65
\tTB
\tCL 'SET'
\tNL
L65
\tBT L66
\tTST '.ANYBUT('
\tBF L67
\tCLL CX1
\tBE
\tTST ')'
\tBE
\tTB
\tCL 'NOT'
\tNL
\tTB
\tCL 'SCN'
\tNL
L67
\tBT L66
\tTST '.ANY('
\tBF L68
\tCLL CX1
\tBE
\tTST ')'
\tBE
\tTB
\tCL 'SCN'
\tNL
L68
\tBT L66
\tCLL ID
\tBF L69
\tTB
\tCL 'CLL '
\tCI
\tNL
L69
\tBT L66
\tTST '('
\tBF L70
\tCLL TX1
\tBE
\tTST ')'
\tBE
L70
L66
\tR
CX1
\tCLL CX2
\tBF L71
L72
\tTST '!'
\tBF L73
\tTB
\tCL 'BT C'
\tGN
\tNL
\tCLL CX2
\tBE
L73
L74
\tBT L72
\tSET
\tBE
\tLB
\tCL 'C'
\tGN
\tNL
L71
L75
\tR
CX2
\tCLL CX3
\tBF L76
\tTST ':'
\tBF L77
\tTB
\tCL 'CGE '
\tCI
\tNL
\tTB
\tCL 'BF D'
\tGN
\tNL
\tCLL CX3
\tBE
\tTB
\tCL 'CLE '
\tCI
\tNL
\tLB
\tCL 'D'
\tGN
\tNL
L77
\tBT L78
\tSET
\tBF L79
\tTB
\tCL 'CE '
\tCI
\tNL
L79
L78
\tBE
L76
L80
\tR
CX3
\tCLL NUMBER
\tBF L81
L81
\tBT L82
\tCLL SQUOTE
\tBF L83
\tLCH
\tBE
L83
L82
\tR
PREFIX
T84
\tCE 32
\tBT C85
\tCE 9
\tBT C85
\tCE 13
\tBT C85
\tCE 10
C85
\tSCN
\tBT T84
\tSET
\tBF T86
T86
T87
\tR
ID
\tCLL PREFIX
\tBF T88
\tTFT
\tSET
\tRF
\tCLL ALPHA
\tRF
T89
\tCLL ALPHA
\tBF T90
T90
\tBT T91
\tCLL DIGIT
\tBF T92
T92
T91
\tBT T89
\tSET
\tRF
\tTFF
\tSET
\tRF
T88
T93
\tR
NUMBER
\tCLL PREFIX
\tBF T94
\tTFT
\tSET
\tRF
\tCLL DIGIT
\tRF
T95
\tCLL DIGIT
\tBT T95
\tSET
\tRF
\tTFF
\tSET
\tRF
T94
T96
\tR
STRING
\tCLL PREFIX
\tBF T97
\tCE 39
C98
\tSCN
\tRF
\tTFT
\tSET
\tRF
T99
\tCE 13
\tBT C100
\tCE 10
\tBT C100
\tCE 39
C100
\tNOT
\tSCN
\tBT T99
\tSET
\tRF
\tTFF
\tSET
\tRF
\tCE 39
C101
\tSCN
\tRF
T97
T102
\tR
ALPHA
\tCGE 65
\tBF D103
\tCLE 90
D103
\tBT C104
\tCGE 97
\tBF D105
\tCLE 122
D105
C104
\tSCN
\tBF T106
T106
T107
\tR
DIGIT
\tCGE 48
\tBF D108
\tCLE 57
D108
C109
\tSCN
\tBF T110
T110
T111
\tR
SQUOTE
\tCLL PREFIX
\tBF T112
\tCE 39
C113
\tSCN
\tRF
T112
T114
\tR
CMLINE
\tTFT
\tSET
\tBF T115
T116
\tCE 10
\tBT C117
\tCE 13
\tBT C117
\tCE 93
C117
\tNOT
\tSCN
\tBT T116
\tSET
\tRF
\tTFF
\tSET
\tRF
T115
T118
\tR
\tEND`

code_c["c11jf. accept comments, c[i13jf,c10jf]"] = `
// PROGRAM compiler
function compiler (input) {
  inbuf = input ;
  inp = 0 ;
  outbuf = \"\" ;
  margin = 0 ;
  gnlabel = 1 ;
  runextTFF();
  rulePROGRAM() ;
  return outbuf ;
} ;

function rulePROGRAM () {
  var rname = \"PROGRAM\" ;
  var rlabel = 0 ;
  runTST('.SYNTAX');
  if (flag) {
    ruleID();
    if (!flag) runBEjsfn(rname);
    runLB();
    runCL('// ');
    runCI();
    runCL(' compiler');
    runextNL();
    runCL('function compiler (input) {');
    runextLMI();
    runextNL();
    runCL('inbuf = input ;');
    runextNL();
    runCL('inp = 0 ;');
    runextNL();
    runCL('outbuf = \"\" ;');
    runextNL();
    runCL('margin = 0 ;');
    runextNL();
    runCL('gnlabel = 1 ;');
    runextNL();
    runCL('runextTFF();');
    runextNL();
    runCL('rule');
    runCI();
    runCL('() ;');
    runextNL();
    runCL('return outbuf ;');
    runextNL();
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
    runSET();
    while (flag) {
      rulePR();
      if (flag) {
      } ;
      if (!flag) {
        ruleCOMMENT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST('.TOKENS');
    if (!flag) runBEjsfn(rname);
    runSET();
    while (flag) {
      ruleTR();
      if (flag) {
      } ;
      if (!flag) {
        ruleCOMMENT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST('.END');
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function rulePR () {
  var rname = \"PR\" ;
  var rlabel = 0 ;
  ruleID();
  if (flag) {
    runLB();
    runCL('function rule');
    runCI();
    runCL(' () {');
    runextLMI();
    runextNL();
    runCL('var rname = \"');
    runCI();
    runCL('\" ;');
    runextNL();
    runCL('var rlabel = 0 ;');
    runextNL();
    runTST('=');
    if (!flag) runBEjsfn(rname);
    ruleEX1();
    if (!flag) runBEjsfn(rname);
    runTST(';');
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
  } ;
} ;

function ruleTR () {
  var rname = \"TR\" ;
  var rlabel = 0 ;
  ruleID();
  if (flag) {
    runLB();
    runCL('function rule');
    runCI();
    runCL(' () {');
    runextLMI();
    runextNL();
    runCL('var rname = \"');
    runCI();
    runCL('\" ;');
    runextNL();
    runCL('var rlabel = 0 ;');
    runextNL();
    runTST(':');
    if (!flag) runBEjsfn(rname);
    ruleTX1();
    if (!flag) runBEjsfn(rname);
    runTST(';');
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
  } ;
} ;

function ruleCOMMENT () {
  var rname = \"COMMENT\" ;
  var rlabel = 0 ;
  runTST('[');
  if (flag) {
    ruleCMLINE();
    if (!flag) runBEjsfn(rname);
    runTST(']');
    if (!flag) runBEjsfn(rname);
    runCL('//');
    runCI();
    runextNL();
  } ;
} ;

function ruleEX1 () {
  var rname = \"EX1\" ;
  var rlabel = 0 ;
  ruleEX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('/');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleEX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleEX2 () {
  var rname = \"EX2\" ;
  var rlabel = 0 ;
  ruleEX3();
  if (flag) {
    runCL('if (flag) {');
    runextLMI();
    runextNL();
  } ;
  if (!flag) {
    ruleOUTPUT();
    if (flag) {
      runCL('if (true) {');
      runextLMI();
      runextNL();
    } ;
  } ;
  if (flag) {
    runSET();
    while (flag) {
      ruleEX3();
      if (flag) {
        runCL('if (!flag) runBEjsfn(rname);');
        runextNL();
      } ;
      if (!flag) {
        ruleOUTPUT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
  } ;
} ;

function ruleEX3 () {
  var rname = \"EX3\" ;
  var rlabel = 0 ;
  ruleID();
  if (flag) {
    runCL('rule');
    runCI();
    runCL('();');
    runextNL();
  } ;
  if (!flag) {
    ruleSTRING();
    if (flag) {
      runCL('runTST(');
      runextCC(39);
      runCI();
      runextCC(39);
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('(');
    if (flag) {
      ruleEX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
  if (!flag) {
    runTST('.EMPTY');
    if (flag) {
      runCL('runSET();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LITCHR');
    if (flag) {
      runCL('runextLCH();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('$');
    if (flag) {
      runCL('runSET();');
      runextNL();
      runCL('while (flag) {');
      runextLMI();
      runextNL();
      ruleEX3();
      if (!flag) runBEjsfn(rname);
      runCL('};');
      runextLMD();
      runextNL();
      runCL('runSET();');
      runextNL();
    } ;
  } ;
} ;

function ruleOUTPUT () {
  var rname = \"OUTPUT\" ;
  var rlabel = 0 ;
  runTST('.OUT');
  if (flag) {
    runTST('(');
    if (!flag) runBEjsfn(rname);
    runSET();
    while (flag) {
      ruleOUT1();
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST(')');
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleOUT1 () {
  var rname = \"OUT1\" ;
  var rlabel = 0 ;
  runTST('*');
  if (flag) {
    runCL('runCI();');
    runextNL();
  } ;
  if (!flag) {
    ruleSTRING();
    if (flag) {
      runCL('runCL(');
      runextCC(39);
      runCI();
      runextCC(39);
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    ruleNUMBER();
    if (flag) {
      runCL('runextCC(');
      runCI();
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('#');
    if (flag) {
      runCL('if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;');
      runextNL();
      runCL('runCL(rlabel.toString());');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.NL');
    if (flag) {
      runCL('runextNL();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LB');
    if (flag) {
      runCL('runLB();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.TB');
    if (flag) {
      runCL('runextTB();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LM+');
    if (flag) {
      runCL('runextLMI();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LM-');
    if (flag) {
      runCL('runextLMD();');
      runextNL();
    } ;
  } ;
} ;

function ruleTX1 () {
  var rname = \"TX1\" ;
  var rlabel = 0 ;
  ruleTX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('/');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleTX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleTX2 () {
  var rname = \"TX2\" ;
  var rlabel = 0 ;
  ruleTX3();
  if (flag) {
    runCL('if (flag) {');
    runextLMI();
    runextNL();
    runSET();
    while (flag) {
      ruleTX3();
      if (flag) {
        runCL('if (!flag) return;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
  } ;
} ;

function ruleTX3 () {
  var rname = \"TX3\" ;
  var rlabel = 0 ;
  runTST('.TOKEN');
  if (flag) {
    runCL('runextTFT();');
    runextNL();
  } ;
  if (!flag) {
    runTST('.DELTOK');
    if (flag) {
      runCL('runextTFF();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('$');
    if (flag) {
      runCL('runSET();');
      runextNL();
      runCL('while (flag) {');
      runextLMI();
      runextNL();
      ruleTX3();
      if (!flag) runBEjsfn(rname);
      runCL('};');
      runextLMD();
      runextNL();
    } ;
  } ;
  if (flag) {
    runCL('runSET();');
    runextNL();
  } ;
  if (!flag) {
    runTST('.ANYBUT(');
    if (flag) {
      ruleCX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
      runCL('runextNOT();');
      runextNL();
      runCL('runextSCN();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.ANY(');
    if (flag) {
      ruleCX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
      runCL('runextSCN();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    ruleID();
    if (flag) {
      runCL('rule');
      runCI();
      runCL('();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('(');
    if (flag) {
      ruleTX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
} ;

function ruleCX1 () {
  var rname = \"CX1\" ;
  var rlabel = 0 ;
  ruleCX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('!');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleCX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleCX2 () {
  var rname = \"CX2\" ;
  var rlabel = 0 ;
  ruleCX3();
  if (flag) {
    runTST(':');
    if (flag) {
      runCL('runextCGE(');
      runCI();
      runCL(');');
      runextNL();
      runCL('if (flag) {');
      runextLMI();
      runextNL();
      ruleCX3();
      if (!flag) runBEjsfn(rname);
      runCL('runextCLE(');
      runCI();
      runCL(');');
      runextNL();
      runextLMD();
      runCL('} ;');
      runextNL();
    } ;
    if (!flag) {
      runSET();
      if (flag) {
        runCL('runextCE(');
        runCI();
        runCL(');');
        runextNL();
      } ;
    } ;
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleCX3 () {
  var rname = \"CX3\" ;
  var rlabel = 0 ;
  ruleNUMBER();
  if (flag) {
  } ;
  if (!flag) {
    ruleSQUOTE();
    if (flag) {
      runextLCH();
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
} ;

function rulePREFIX () {
  var rname = \"PREFIX\" ;
  var rlabel = 0 ;
  runSET();
  while (flag) {
    runextCE(32);
    if (!flag) {
      runextCE(9);
    } ;
    if (!flag) {
      runextCE(13);
    } ;
    if (!flag) {
      runextCE(10);
    } ;
    runextSCN();
    };
  runSET();
  if (flag) {
  } ;
} ;

function ruleID () {
  var rname = \"ID\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextTFT();
    runSET();
    if (!flag) return;
    ruleALPHA();
    if (!flag) return;
    runSET();
    while (flag) {
      ruleALPHA();
      if (flag) {
      } ;
      if (!flag) {
        ruleDIGIT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
  } ;
} ;

function ruleNUMBER () {
  var rname = \"NUMBER\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextTFT();
    runSET();
    if (!flag) return;
    ruleDIGIT();
    if (!flag) return;
    runSET();
    while (flag) {
      ruleDIGIT();
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
  } ;
} ;

function ruleSTRING () {
  var rname = \"STRING\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextCE(39);
    runextSCN();
    if (!flag) return;
    runextTFT();
    runSET();
    if (!flag) return;
    runSET();
    while (flag) {
      runextCE(13);
      if (!flag) {
        runextCE(10);
      } ;
      if (!flag) {
        runextCE(39);
      } ;
      runextNOT();
      runextSCN();
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
    runextCE(39);
    runextSCN();
    if (!flag) return;
  } ;
} ;

function ruleALPHA () {
  var rname = \"ALPHA\" ;
  var rlabel = 0 ;
  runextCGE(65);
  if (flag) {
    runextCLE(90);
  } ;
  if (!flag) {
    runextCGE(97);
    if (flag) {
      runextCLE(122);
    } ;
  } ;
  runextSCN();
  if (flag) {
  } ;
} ;

function ruleDIGIT () {
  var rname = \"DIGIT\" ;
  var rlabel = 0 ;
  runextCGE(48);
  if (flag) {
    runextCLE(57);
  } ;
  runextSCN();
  if (flag) {
  } ;
} ;

function ruleSQUOTE () {
  var rname = \"SQUOTE\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextCE(39);
    runextSCN();
    if (!flag) return;
  } ;
} ;

function ruleCMLINE () {
  var rname = \"CMLINE\" ;
  var rlabel = 0 ;
  runextTFT();
  runSET();
  if (flag) {
    runSET();
    while (flag) {
      runextCE(10);
      if (!flag) {
        runextCE(13);
      } ;
      if (!flag) {
        runextCE(93);
      } ;
      runextNOT();
      runextSCN();
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
  } ;
} ;
`

code_c["c12. use comments, c[i14,c11], m[i14,c12]"] = `
\tADR PROGRAM
; Example Metacompiler Definition 
; interpreter code version 
; James M. Neighbors 
; body of compiler definition 
PROGRAM
\tTST '.SYNTAX'
\tBF L1
\tCLL ID
\tBE
\tLB
\tTB
\tCL 'ADR '
\tCI
\tNL
L2
\tCLL PR
\tBF L3
L3
\tBT L4
\tCLL COMMENT
\tBF L5
L5
L4
\tBT L2
\tSET
\tBE
\tTST '.TOKENS'
\tBE
L6
\tCLL TR
\tBF L7
L7
\tBT L8
\tCLL COMMENT
\tBF L9
L9
L8
\tBT L6
\tSET
\tBE
\tTST '.END'
\tBE
\tTB
\tCL 'END'
\tNL
L1
L10
\tR
; parsing rule definition 
PR
\tCLL ID
\tBF L11
\tLB
\tCI
\tNL
\tTST '='
\tBE
\tCLL EX1
\tBE
\tTST ';'
\tBE
\tTB
\tCL 'R'
\tNL
L11
L12
\tR
; token rule definition 
TR
\tCLL ID
\tBF L13
\tLB
\tCI
\tNL
\tTST ':'
\tBE
\tCLL TX1
\tBE
\tTST ';'
\tBE
\tTB
\tCL 'R'
\tNL
L13
L14
\tR
; comment definition 
COMMENT
\tTST '['
\tBF L15
\tCLL CMLINE
\tBE
\tTST ']'
\tBE
\tLB
\tCL ';'
\tCI
\tNL
L15
L16
\tR
; parsing expressions 
EX1
\tCLL EX2
\tBF L17
L18
\tTST '/'
\tBF L19
\tTB
\tCL 'BT L'
\tGN
\tNL
\tCLL EX2
\tBE
L19
L20
\tBT L18
\tSET
\tBE
\tLB
\tCL 'L'
\tGN
\tNL
L17
L21
\tR
EX2
\tCLL EX3
\tBF L22
\tTB
\tCL 'BF L'
\tGN
\tNL
L22
\tBT L23
\tCLL OUTPUT
\tBF L24
L24
L23
\tBF L25
L26
\tCLL EX3
\tBF L27
\tTB
\tCL 'BE'
\tNL
L27
\tBT L28
\tCLL OUTPUT
\tBF L29
L29
L28
\tBT L26
\tSET
\tBE
\tLB
\tCL 'L'
\tGN
\tNL
L25
L30
\tR
EX3
\tCLL ID
\tBF L31
\tTB
\tCL 'CLL '
\tCI
\tNL
L31
\tBT L32
\tCLL STRING
\tBF L33
\tTB
\tCL 'TST '
\tCC 39
\tCI
\tCC 39
\tNL
L33
\tBT L32
\tTST '('
\tBF L34
\tCLL EX1
\tBE
\tTST ')'
\tBE
L34
\tBT L32
\tTST '.EMPTY'
\tBF L35
\tTB
\tCL 'SET'
\tNL
L35
\tBT L32
\tTST '.LITCHR'
\tBF L36
\tTB
\tCL 'LCH'
\tNL
L36
\tBT L32
\tTST '$'
\tBF L37
\tLB
\tCL 'L'
\tGN
\tNL
\tCLL EX3
\tBE
\tTB
\tCL 'BT L'
\tGN
\tNL
\tTB
\tCL 'SET'
\tNL
L37
L32
\tR
; output expressions 
OUTPUT
\tTST '.OUT'
\tBF L38
\tTST '('
\tBE
L39
\tCLL OUT1
\tBT L39
\tSET
\tBE
\tTST ')'
\tBE
L38
L40
\tR
OUT1
\tTST '*'
\tBF L41
\tTB
\tCL 'CI'
\tNL
L41
\tBT L42
\tCLL STRING
\tBF L43
\tTB
\tCL 'CL '
\tCC 39
\tCI
\tCC 39
\tNL
L43
\tBT L42
\tCLL NUMBER
\tBF L44
\tTB
\tCL 'CC '
\tCI
\tNL
L44
\tBT L42
\tTST '#'
\tBF L45
\tTB
\tCL 'GN'
\tNL
L45
\tBT L42
\tTST '.NL'
\tBF L46
\tTB
\tCL 'NL'
\tNL
L46
\tBT L42
\tTST '.LB'
\tBF L47
\tTB
\tCL 'LB'
\tNL
L47
\tBT L42
\tTST '.TB'
\tBF L48
\tTB
\tCL 'TB'
\tNL
L48
\tBT L42
\tTST '.LM+'
\tBF L49
\tTB
\tCL 'LMI'
\tNL
L49
\tBT L42
\tTST '.LM-'
\tBF L50
\tTB
\tCL 'LMD'
\tNL
L50
L42
\tR
; token expressions 
TX1
\tCLL TX2
\tBF L51
L52
\tTST '/'
\tBF L53
\tTB
\tCL 'BT T'
\tGN
\tNL
\tCLL TX2
\tBE
L53
L54
\tBT L52
\tSET
\tBE
\tLB
\tCL 'T'
\tGN
\tNL
L51
L55
\tR
TX2
\tCLL TX3
\tBF L56
\tTB
\tCL 'BF T'
\tGN
\tNL
L57
\tCLL TX3
\tBF L58
\tTB
\tCL 'RF'
\tNL
L58
L59
\tBT L57
\tSET
\tBE
\tLB
\tCL 'T'
\tGN
\tNL
L56
L60
\tR
TX3
\tTST '.TOKEN'
\tBF L61
\tTB
\tCL 'TFT'
\tNL
L61
\tBT L62
\tTST '.DELTOK'
\tBF L63
\tTB
\tCL 'TFF'
\tNL
L63
\tBT L62
\tTST '$'
\tBF L64
\tLB
\tCL 'T'
\tGN
\tNL
\tCLL TX3
\tBE
\tTB
\tCL 'BT T'
\tGN
\tNL
L64
L62
\tBF L65
\tTB
\tCL 'SET'
\tNL
L65
\tBT L66
\tTST '.ANYBUT('
\tBF L67
\tCLL CX1
\tBE
\tTST ')'
\tBE
\tTB
\tCL 'NOT'
\tNL
\tTB
\tCL 'SCN'
\tNL
L67
\tBT L66
\tTST '.ANY('
\tBF L68
\tCLL CX1
\tBE
\tTST ')'
\tBE
\tTB
\tCL 'SCN'
\tNL
L68
\tBT L66
\tCLL ID
\tBF L69
\tTB
\tCL 'CLL '
\tCI
\tNL
L69
\tBT L66
\tTST '('
\tBF L70
\tCLL TX1
\tBE
\tTST ')'
\tBE
L70
L66
\tR
; character expressions 
CX1
\tCLL CX2
\tBF L71
L72
\tTST '!'
\tBF L73
\tTB
\tCL 'BT C'
\tGN
\tNL
\tCLL CX2
\tBE
L73
L74
\tBT L72
\tSET
\tBE
\tLB
\tCL 'C'
\tGN
\tNL
L71
L75
\tR
CX2
\tCLL CX3
\tBF L76
\tTST ':'
\tBF L77
\tTB
\tCL 'CGE '
\tCI
\tNL
\tTB
\tCL 'BF D'
\tGN
\tNL
\tCLL CX3
\tBE
\tTB
\tCL 'CLE '
\tCI
\tNL
\tLB
\tCL 'D'
\tGN
\tNL
L77
\tBT L78
\tSET
\tBF L79
\tTB
\tCL 'CE '
\tCI
\tNL
L79
L78
\tBE
L76
L80
\tR
CX3
\tCLL NUMBER
\tBF L81
L81
\tBT L82
\tCLL SQUOTE
\tBF L83
\tLCH
\tBE
L83
L82
\tR
; token definitions 
PREFIX
T84
\tCE 32
\tBT C85
\tCE 9
\tBT C85
\tCE 13
\tBT C85
\tCE 10
C85
\tSCN
\tBT T84
\tSET
\tBF T86
T86
T87
\tR
ID
\tCLL PREFIX
\tBF T88
\tTFT
\tSET
\tRF
\tCLL ALPHA
\tRF
T89
\tCLL ALPHA
\tBF T90
T90
\tBT T91
\tCLL DIGIT
\tBF T92
T92
T91
\tBT T89
\tSET
\tRF
\tTFF
\tSET
\tRF
T88
T93
\tR
NUMBER
\tCLL PREFIX
\tBF T94
\tTFT
\tSET
\tRF
\tCLL DIGIT
\tRF
T95
\tCLL DIGIT
\tBT T95
\tSET
\tRF
\tTFF
\tSET
\tRF
T94
T96
\tR
STRING
\tCLL PREFIX
\tBF T97
\tCE 39
C98
\tSCN
\tRF
\tTFT
\tSET
\tRF
T99
\tCE 13
\tBT C100
\tCE 10
\tBT C100
\tCE 39
C100
\tNOT
\tSCN
\tBT T99
\tSET
\tRF
\tTFF
\tSET
\tRF
\tCE 39
C101
\tSCN
\tRF
T97
T102
\tR
ALPHA
\tCGE 65
\tBF D103
\tCLE 90
D103
\tBT C104
\tCGE 97
\tBF D105
\tCLE 122
D105
C104
\tSCN
\tBF T106
T106
T107
\tR
DIGIT
\tCGE 48
\tBF D108
\tCLE 57
D108
C109
\tSCN
\tBF T110
T110
T111
\tR
SQUOTE
\tCLL PREFIX
\tBF T112
\tCE 39
C113
\tSCN
\tRF
T112
T114
\tR
CMLINE
\tTFT
\tSET
\tBF T115
T116
\tCE 10
\tBT C117
\tCE 13
\tBT C117
\tCE 93
C117
\tNOT
\tSCN
\tBT T116
\tSET
\tRF
\tTFF
\tSET
\tRF
T115
T118
\tR
\tEND`

code_c["c12jf. use comments, c[i14jf,c11jf], m[i14jf,c12jf]"] = `
// PROGRAM compiler
function compiler (input) {
  inbuf = input ;
  inp = 0 ;
  outbuf = \"\" ;
  margin = 0 ;
  gnlabel = 1 ;
  runextTFF();
  rulePROGRAM() ;
  return outbuf ;
} ;

// Example Metacompiler Definition 
// javascript function version 
// James M. Neighbors 
// body of compiler definition 
function rulePROGRAM () {
  var rname = \"PROGRAM\" ;
  var rlabel = 0 ;
  runTST('.SYNTAX');
  if (flag) {
    ruleID();
    if (!flag) runBEjsfn(rname);
    runLB();
    runCL('// ');
    runCI();
    runCL(' compiler');
    runextNL();
    runCL('function compiler (input) {');
    runextLMI();
    runextNL();
    runCL('inbuf = input ;');
    runextNL();
    runCL('inp = 0 ;');
    runextNL();
    runCL('outbuf = \"\" ;');
    runextNL();
    runCL('margin = 0 ;');
    runextNL();
    runCL('gnlabel = 1 ;');
    runextNL();
    runCL('runextTFF();');
    runextNL();
    runCL('rule');
    runCI();
    runCL('() ;');
    runextNL();
    runCL('return outbuf ;');
    runextNL();
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
    runSET();
    while (flag) {
      rulePR();
      if (flag) {
      } ;
      if (!flag) {
        ruleCOMMENT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST('.TOKENS');
    if (!flag) runBEjsfn(rname);
    runSET();
    while (flag) {
      ruleTR();
      if (flag) {
      } ;
      if (!flag) {
        ruleCOMMENT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST('.END');
    if (!flag) runBEjsfn(rname);
  } ;
} ;

// parsing rule definition 
function rulePR () {
  var rname = \"PR\" ;
  var rlabel = 0 ;
  ruleID();
  if (flag) {
    runLB();
    runCL('function rule');
    runCI();
    runCL(' () {');
    runextLMI();
    runextNL();
    runCL('var rname = \"');
    runCI();
    runCL('\" ;');
    runextNL();
    runCL('var rlabel = 0 ;');
    runextNL();
    runTST('=');
    if (!flag) runBEjsfn(rname);
    ruleEX1();
    if (!flag) runBEjsfn(rname);
    runTST(';');
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
  } ;
} ;

// token rule definition 
function ruleTR () {
  var rname = \"TR\" ;
  var rlabel = 0 ;
  ruleID();
  if (flag) {
    runLB();
    runCL('function rule');
    runCI();
    runCL(' () {');
    runextLMI();
    runextNL();
    runCL('var rname = \"');
    runCI();
    runCL('\" ;');
    runextNL();
    runCL('var rlabel = 0 ;');
    runextNL();
    runTST(':');
    if (!flag) runBEjsfn(rname);
    ruleTX1();
    if (!flag) runBEjsfn(rname);
    runTST(';');
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
    runextNL();
  } ;
} ;

// comment definition 
function ruleCOMMENT () {
  var rname = \"COMMENT\" ;
  var rlabel = 0 ;
  runTST('[');
  if (flag) {
    ruleCMLINE();
    if (!flag) runBEjsfn(rname);
    runTST(']');
    if (!flag) runBEjsfn(rname);
    runCL('//');
    runCI();
    runextNL();
  } ;
} ;

// parsing expressions 
function ruleEX1 () {
  var rname = \"EX1\" ;
  var rlabel = 0 ;
  ruleEX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('/');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleEX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleEX2 () {
  var rname = \"EX2\" ;
  var rlabel = 0 ;
  ruleEX3();
  if (flag) {
    runCL('if (flag) {');
    runextLMI();
    runextNL();
  } ;
  if (!flag) {
    ruleOUTPUT();
    if (flag) {
      runCL('if (true) {');
      runextLMI();
      runextNL();
    } ;
  } ;
  if (flag) {
    runSET();
    while (flag) {
      ruleEX3();
      if (flag) {
        runCL('if (!flag) runBEjsfn(rname);');
        runextNL();
      } ;
      if (!flag) {
        ruleOUTPUT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
  } ;
} ;

function ruleEX3 () {
  var rname = \"EX3\" ;
  var rlabel = 0 ;
  ruleID();
  if (flag) {
    runCL('rule');
    runCI();
    runCL('();');
    runextNL();
  } ;
  if (!flag) {
    ruleSTRING();
    if (flag) {
      runCL('runTST(');
      runextCC(39);
      runCI();
      runextCC(39);
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('(');
    if (flag) {
      ruleEX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
  if (!flag) {
    runTST('.EMPTY');
    if (flag) {
      runCL('runSET();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LITCHR');
    if (flag) {
      runCL('runextLCH();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('$');
    if (flag) {
      runCL('runSET();');
      runextNL();
      runCL('while (flag) {');
      runextLMI();
      runextNL();
      ruleEX3();
      if (!flag) runBEjsfn(rname);
      runCL('};');
      runextLMD();
      runextNL();
      runCL('runSET();');
      runextNL();
    } ;
  } ;
} ;

// output expressions 
function ruleOUTPUT () {
  var rname = \"OUTPUT\" ;
  var rlabel = 0 ;
  runTST('.OUT');
  if (flag) {
    runTST('(');
    if (!flag) runBEjsfn(rname);
    runSET();
    while (flag) {
      ruleOUT1();
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runTST(')');
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleOUT1 () {
  var rname = \"OUT1\" ;
  var rlabel = 0 ;
  runTST('*');
  if (flag) {
    runCL('runCI();');
    runextNL();
  } ;
  if (!flag) {
    ruleSTRING();
    if (flag) {
      runCL('runCL(');
      runextCC(39);
      runCI();
      runextCC(39);
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    ruleNUMBER();
    if (flag) {
      runCL('runextCC(');
      runCI();
      runCL(');');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('#');
    if (flag) {
      runCL('if (rlabel == 0) { rlabel = gnlabel; gnlabel++ ; } ;');
      runextNL();
      runCL('runCL(rlabel.toString());');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.NL');
    if (flag) {
      runCL('runextNL();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LB');
    if (flag) {
      runCL('runLB();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.TB');
    if (flag) {
      runCL('runextTB();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LM+');
    if (flag) {
      runCL('runextLMI();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.LM-');
    if (flag) {
      runCL('runextLMD();');
      runextNL();
    } ;
  } ;
} ;

// token expressions 
function ruleTX1 () {
  var rname = \"TX1\" ;
  var rlabel = 0 ;
  ruleTX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('/');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleTX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleTX2 () {
  var rname = \"TX2\" ;
  var rlabel = 0 ;
  ruleTX3();
  if (flag) {
    runCL('if (flag) {');
    runextLMI();
    runextNL();
    runSET();
    while (flag) {
      ruleTX3();
      if (flag) {
        runCL('if (!flag) return;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
    runextLMD();
    runCL('} ;');
    runextNL();
  } ;
} ;

function ruleTX3 () {
  var rname = \"TX3\" ;
  var rlabel = 0 ;
  runTST('.TOKEN');
  if (flag) {
    runCL('runextTFT();');
    runextNL();
  } ;
  if (!flag) {
    runTST('.DELTOK');
    if (flag) {
      runCL('runextTFF();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('$');
    if (flag) {
      runCL('runSET();');
      runextNL();
      runCL('while (flag) {');
      runextLMI();
      runextNL();
      ruleTX3();
      if (!flag) runBEjsfn(rname);
      runCL('};');
      runextLMD();
      runextNL();
    } ;
  } ;
  if (flag) {
    runCL('runSET();');
    runextNL();
  } ;
  if (!flag) {
    runTST('.ANYBUT(');
    if (flag) {
      ruleCX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
      runCL('runextNOT();');
      runextNL();
      runCL('runextSCN();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('.ANY(');
    if (flag) {
      ruleCX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
      runCL('runextSCN();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    ruleID();
    if (flag) {
      runCL('rule');
      runCI();
      runCL('();');
      runextNL();
    } ;
  } ;
  if (!flag) {
    runTST('(');
    if (flag) {
      ruleTX1();
      if (!flag) runBEjsfn(rname);
      runTST(')');
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
} ;

// character expressions 
function ruleCX1 () {
  var rname = \"CX1\" ;
  var rlabel = 0 ;
  ruleCX2();
  if (flag) {
    runSET();
    while (flag) {
      runTST('!');
      if (flag) {
        runCL('if (!flag) {');
        runextLMI();
        runextNL();
        ruleCX2();
        if (!flag) runBEjsfn(rname);
        runextLMD();
        runCL('} ;');
        runextNL();
      } ;
      };
    runSET();
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleCX2 () {
  var rname = \"CX2\" ;
  var rlabel = 0 ;
  ruleCX3();
  if (flag) {
    runTST(':');
    if (flag) {
      runCL('runextCGE(');
      runCI();
      runCL(');');
      runextNL();
      runCL('if (flag) {');
      runextLMI();
      runextNL();
      ruleCX3();
      if (!flag) runBEjsfn(rname);
      runCL('runextCLE(');
      runCI();
      runCL(');');
      runextNL();
      runextLMD();
      runCL('} ;');
      runextNL();
    } ;
    if (!flag) {
      runSET();
      if (flag) {
        runCL('runextCE(');
        runCI();
        runCL(');');
        runextNL();
      } ;
    } ;
    if (!flag) runBEjsfn(rname);
  } ;
} ;

function ruleCX3 () {
  var rname = \"CX3\" ;
  var rlabel = 0 ;
  ruleNUMBER();
  if (flag) {
  } ;
  if (!flag) {
    ruleSQUOTE();
    if (flag) {
      runextLCH();
      if (!flag) runBEjsfn(rname);
    } ;
  } ;
} ;

// token definitions 
function rulePREFIX () {
  var rname = \"PREFIX\" ;
  var rlabel = 0 ;
  runSET();
  while (flag) {
    runextCE(32);
    if (!flag) {
      runextCE(9);
    } ;
    if (!flag) {
      runextCE(13);
    } ;
    if (!flag) {
      runextCE(10);
    } ;
    runextSCN();
    };
  runSET();
  if (flag) {
  } ;
} ;

function ruleID () {
  var rname = \"ID\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextTFT();
    runSET();
    if (!flag) return;
    ruleALPHA();
    if (!flag) return;
    runSET();
    while (flag) {
      ruleALPHA();
      if (flag) {
      } ;
      if (!flag) {
        ruleDIGIT();
        if (flag) {
        } ;
      } ;
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
  } ;
} ;

function ruleNUMBER () {
  var rname = \"NUMBER\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextTFT();
    runSET();
    if (!flag) return;
    ruleDIGIT();
    if (!flag) return;
    runSET();
    while (flag) {
      ruleDIGIT();
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
  } ;
} ;

function ruleSTRING () {
  var rname = \"STRING\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextCE(39);
    runextSCN();
    if (!flag) return;
    runextTFT();
    runSET();
    if (!flag) return;
    runSET();
    while (flag) {
      runextCE(13);
      if (!flag) {
        runextCE(10);
      } ;
      if (!flag) {
        runextCE(39);
      } ;
      runextNOT();
      runextSCN();
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
    runextCE(39);
    runextSCN();
    if (!flag) return;
  } ;
} ;

function ruleALPHA () {
  var rname = \"ALPHA\" ;
  var rlabel = 0 ;
  runextCGE(65);
  if (flag) {
    runextCLE(90);
  } ;
  if (!flag) {
    runextCGE(97);
    if (flag) {
      runextCLE(122);
    } ;
  } ;
  runextSCN();
  if (flag) {
  } ;
} ;

function ruleDIGIT () {
  var rname = \"DIGIT\" ;
  var rlabel = 0 ;
  runextCGE(48);
  if (flag) {
    runextCLE(57);
  } ;
  runextSCN();
  if (flag) {
  } ;
} ;

function ruleSQUOTE () {
  var rname = \"SQUOTE\" ;
  var rlabel = 0 ;
  rulePREFIX();
  if (flag) {
    runextCE(39);
    runextSCN();
    if (!flag) return;
  } ;
} ;

function ruleCMLINE () {
  var rname = \"CMLINE\" ;
  var rlabel = 0 ;
  runextTFT();
  runSET();
  if (flag) {
    runSET();
    while (flag) {
      runextCE(10);
      if (!flag) {
        runextCE(13);
      } ;
      if (!flag) {
        runextCE(93);
      } ;
      runextNOT();
      runextSCN();
      };
    runSET();
    if (!flag) return;
    runextTFF();
    runSET();
    if (!flag) return;
  } ;
} ;
`

code_c["c12js. use comments, c[i14js,c[i14js,c12jf]] m[i14js,c12js]"] = `
// PROGRAM compiler
compiler = {

  compile: function (input) {
    // initialize compiler variables
    this.inbuf = input ;
    this.initialize() ;
    // call the first rule
    this.ctxpush('PROGRAM') ;
    this.rulePROGRAM() ;
    this.ctxpop() ;
    // special case handling of first rule failure
    if ((!this.eflag) && (!this.pflag)) {
      this.eflag = true ;
      this.erule = 'PROGRAM' ;
      this.einput = this.inp ; } ;
    return this.eflag ;
  },

  // Example Metacompiler Definition 
  // fully contained javascript object version 
  // James M. Neighbors 
  // body of compiler definition 
  rulePROGRAM: function () {
    this.test('.SYNTAX');
    if (this.pflag) {
      this.ctxpush('ID') ;
      this.ruleID() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) this.err();
      this.out('// ') ;
      this.out(this.token) ;
      this.out(' compiler') ;
      this.eol() ;
      this.out('compiler = {') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.eol() ;
      this.ctxpush('PREAMBLE') ;
      this.rulePREAMBLE() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) this.err();
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('PR') ;
        this.rulePR() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (this.pflag) {
        } ;
        if (!this.pflag) {
          this.ctxpush('COMMENT') ;
          this.ruleCOMMENT() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (this.pflag) {
          } ;
        } ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
      this.test('.TOKENS');
      if (!this.pflag) this.err();
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('TR') ;
        this.ruleTR() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (this.pflag) {
        } ;
        if (!this.pflag) {
          this.ctxpush('COMMENT') ;
          this.ruleCOMMENT() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (this.pflag) {
          } ;
        } ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
      this.test('.END');
      if (!this.pflag) this.err();
      this.ctxpush('POSTAMBLE') ;
      this.rulePOSTAMBLE() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) this.err();
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('}') ;
      this.eol() ;
    } ;
  } ,

  // object definition preamble 
  rulePREAMBLE: function () {
    this.out('compile: function (input) {') ;
    this.stack[this.stackframe + 2] += 2 ;
    this.eol() ;
    if (true) {
      this.out('// initialize compiler variables') ;
      this.eol() ;
      this.out('this.inbuf = input ;') ;
      this.eol() ;
      this.out('this.initialize() ;') ;
      this.eol() ;
      this.out('// call the first rule') ;
      this.eol() ;
      this.out('this.ctxpush(') ;
      this.out(String.fromCharCode(39)) ;
      this.out(this.token) ;
      this.out(String.fromCharCode(39)) ;
      this.out(') ;') ;
      this.eol() ;
      this.out('this.rule') ;
      this.out(this.token) ;
      this.out('() ;') ;
      this.eol() ;
      this.out('this.ctxpop() ;') ;
      this.eol() ;
      this.out('// special case handling of first rule failure') ;
      this.eol() ;
      this.out('if ((!this.eflag) && (!this.pflag)) {') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.out('this.eflag = true ;') ;
      this.eol() ;
      this.out('this.erule = ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(this.token) ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ;') ;
      this.eol() ;
      this.out('this.einput = this.inp ; } ;') ;
      this.stack[this.stackframe + 2] -= 2 ;
      this.eol() ;
      this.out('return this.eflag ;') ;
      this.eol() ;
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('},') ;
      this.eol() ;
      this.eol() ;
    } ;
  } ,

  // runtime and object definition postamble 
  rulePOSTAMBLE: function () {
    this.out('// runtime variables') ;
    this.eol() ;
    if (true) {
      this.out('pflag: false ,') ;
      this.eol() ;
      this.out('tflag: false ,') ;
      this.eol() ;
      this.out('eflag: false ,') ;
      this.eol() ;
      this.out('inp: 0 ,') ;
      this.eol() ;
      this.out('inbuf:  ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ,') ;
      this.eol() ;
      this.out('outbuf:  ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ,') ;
      this.eol() ;
      this.out('erule:  ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ,') ;
      this.eol() ;
      this.out('einput: 0 ,') ;
      this.eol() ;
      this.out('token: ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ,') ;
      this.eol() ;
      this.out('labelcount: 0 ,') ;
      this.eol() ;
      this.out('stackframesize: 3 ,') ;
      this.eol() ;
      this.out('stackframe: 0 ,') ;
      this.eol() ;
      this.out('stos: -1 ,') ;
      this.eol() ;
      this.out('stack: [] ,') ;
      this.eol() ;
      this.eol() ;
      this.out('initialize: function () {') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.out('// initialize for another compile') ;
      this.eol() ;
      this.out('this.pflag = false ;') ;
      this.eol() ;
      this.out('this.tflag = false ;') ;
      this.eol() ;
      this.out('this.eflag = false ;') ;
      this.eol() ;
      this.out('this.inp = 0 ;') ;
      this.eol() ;
      this.out('this.outbuf = ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ;') ;
      this.eol() ;
      this.out('this.erule = ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ;') ;
      this.eol() ;
      this.out('this.einput = 0 ;') ;
      this.eol() ;
      this.out('this.token = ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ;') ;
      this.eol() ;
      this.out('this.labelcount = 1 ;') ;
      this.eol() ;
      this.out('this.stackframe = -1 ;') ;
      this.eol() ;
      this.out('this.stos = -1 ;') ;
      this.eol() ;
      this.out('this.stack = [] ;') ;
      this.eol() ;
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('},') ;
      this.eol() ;
      this.eol() ;
      this.out('ctxpush: function (rulename){') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.out('// push and initialize a new stackframe') ;
      this.eol() ;
      this.out('var LM ;') ;
      this.eol() ;
      this.out('// new context inherits current context left margin') ;
      this.eol() ;
      this.out('LM = 0; if (this.stackframe >= 0) LM = this.stack[this.stackframe + 2] ;') ;
      this.eol() ;
      this.out('this.stos++ ;') ;
      this.eol() ;
      this.out('this.stackframe = this.stos * this.stackframesize ;') ;
      this.eol() ;
      this.out('// stackframe definition') ;
      this.eol() ;
      this.out('this.stack[this.stackframe + 0] = 0 ;        // generated label') ;
      this.eol() ;
      this.out('this.stack[this.stackframe + 1] = rulename ; // called rule name') ;
      this.eol() ;
      this.out('this.stack[this.stackframe + 2] = LM ;       // left margin') ;
      this.eol() ;
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('},') ;
      this.eol() ;
      this.eol() ;
      this.out('ctxpop: function (){') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.out('// pop and possibly deallocate old stackframe') ;
      this.eol() ;
      this.out('this.stos-- ; // pop stackframe') ;
      this.eol() ;
      this.out('this.stackframe = this.stos * this.stackframesize ;') ;
      this.eol() ;
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('},') ;
      this.eol() ;
      this.eol() ;
      this.out('out: function (s){') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.out('// output string') ;
      this.eol() ;
      this.out('var i ;') ;
      this.eol() ;
      this.out('// if newline last output, add left margin before string') ;
      this.eol() ;
      this.out('if (this.outbuf.charAt(this.outbuf.length - 1) == ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(92)) ;
      this.out('n') ;
      this.out(String.fromCharCode(39)) ;
      this.out(') {') ;
      this.eol() ;
      this.out('  i = this.stack[this.stackframe + 2] ;') ;
      this.eol() ;
      this.out('  while (i>0) { this.outbuf += ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ; i-- } ; } ;') ;
      this.eol() ;
      this.out('this.outbuf += s ;') ;
      this.eol() ;
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('},') ;
      this.eol() ;
      this.eol() ;
      this.out('eol: function (){') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.out('// output end of line') ;
      this.eol() ;
      this.out('this.outbuf += ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(92)) ;
      this.out('n') ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ;') ;
      this.eol() ;
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('},') ;
      this.eol() ;
      this.eol() ;
      this.out('test: function (s) {') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.out('// test for a string in the input') ;
      this.eol() ;
      this.out('var i ;') ;
      this.eol() ;
      this.out('// delete whitespace') ;
      this.eol() ;
      this.out('while ((this.inbuf.charAt(this.inp) == ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(')  ||') ;
      this.eol() ;
      this.out('       (this.inbuf.charAt(this.inp) == ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(92)) ;
      this.out('n') ;
      this.out(String.fromCharCode(39)) ;
      this.out(') ||') ;
      this.eol() ;
      this.out('       (this.inbuf.charAt(this.inp) == ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(92)) ;
      this.out('r') ;
      this.out(String.fromCharCode(39)) ;
      this.out(') ||') ;
      this.eol() ;
      this.out('       (this.inbuf.charAt(this.inp) == ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(92)) ;
      this.out('t') ;
      this.out(String.fromCharCode(39)) ;
      this.out(') ) this.inp++ ;') ;
      this.eol() ;
      this.out('// test string case insensitive') ;
      this.eol() ;
      this.out('this.pflag = true ; i = 0 ;') ;
      this.eol() ;
      this.out('while (this.pflag && (i < s.length) && ((this.inp+i) < this.inbuf.length) )') ;
      this.eol() ;
      this.out('{ this.pflag = (s.charAt(i).toUpperCase() ==') ;
      this.eol() ;
      this.out('                this.inbuf.charAt(this.inp+i).toUpperCase()) ;') ;
      this.eol() ;
      this.out('  i++ ; } ;') ;
      this.eol() ;
      this.out('this.pflag = this.pflag && (i == s.length) ;') ;
      this.eol() ;
      this.out('// advance input if found') ;
      this.eol() ;
      this.out('if (this.pflag) this.inp = this.inp + s.length ;') ;
      this.eol() ;
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('},') ;
      this.eol() ;
      this.eol() ;
      this.out('err: function () {') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.out('// compilation error, provide error indication and context') ;
      this.eol() ;
      this.out('this.eflag = true ;') ;
      this.eol() ;
      this.out('this.erule = this.stack[this.stackframe + 1] ;') ;
      this.eol() ;
      this.out('this.einput = this.inp ;') ;
      this.eol() ;
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('}') ;
      this.eol() ;
      this.eol() ;
    } ;
  } ,

  // parsing rule definition 
  rulePR: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.out('rule') ;
      this.out(this.token) ;
      this.out(': function () {') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.test('=');
      if (!this.pflag) this.err();
      this.ctxpush('EX1') ;
      this.ruleEX1() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) this.err();
      this.test(';');
      if (!this.pflag) this.err();
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('} ,') ;
      this.eol() ;
      this.eol() ;
    } ;
  } ,

  // token rule definition 
  ruleTR: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.out('rule') ;
      this.out(this.token) ;
      this.out(': function () {') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.test(':');
      if (!this.pflag) this.err();
      this.ctxpush('TX1') ;
      this.ruleTX1() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) this.err();
      this.test(';');
      if (!this.pflag) this.err();
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('} ,') ;
      this.eol() ;
      this.eol() ;
    } ;
  } ,

  // comment definition 
  ruleCOMMENT: function () {
    this.test('[');
    if (this.pflag) {
      this.ctxpush('CMLINE') ;
      this.ruleCMLINE() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) this.err();
      this.test(']');
      if (!this.pflag) this.err();
      this.out('//') ;
      this.out(this.token) ;
      this.eol() ;
    } ;
  } ,

  // parsing expressions 
  ruleEX1: function () {
    this.ctxpush('EX2') ;
    this.ruleEX2() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.pflag = true ;
      while (this.pflag) {
        this.test('/');
        if (this.pflag) {
          this.out('if (!this.pflag) {') ;
          this.stack[this.stackframe + 2] += 2 ;
          this.eol() ;
          this.ctxpush('EX2') ;
          this.ruleEX2() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
          this.stack[this.stackframe + 2] -= 2 ;
          this.out('} ;') ;
          this.eol() ;
        } ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleEX2: function () {
    this.ctxpush('EX3') ;
    this.ruleEX3() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.out('if (this.pflag) {') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
    } ;
    if (!this.pflag) {
      this.ctxpush('OUTPUT') ;
      this.ruleOUTPUT() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (this.pflag) {
        this.out('if (true) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
      } ;
    } ;
    if (this.pflag) {
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('EX3') ;
        this.ruleEX3() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (this.pflag) {
          this.out('if (!this.pflag) this.err();') ;
          this.eol() ;
        } ;
        if (!this.pflag) {
          this.ctxpush('OUTPUT') ;
          this.ruleOUTPUT() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (this.pflag) {
          } ;
        } ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('} ;') ;
      this.eol() ;
    } ;
  } ,

  ruleEX3: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.out('this.ctxpush(') ;
      this.out(String.fromCharCode(39)) ;
      this.out(this.token) ;
      this.out(String.fromCharCode(39)) ;
      this.out(') ;') ;
      this.eol() ;
      this.out('this.rule') ;
      this.out(this.token) ;
      this.out('() ;') ;
      this.eol() ;
      this.out('this.ctxpop() ;') ;
      this.eol() ;
      this.out('if (this.eflag) return ;') ;
      this.eol() ;
    } ;
    if (!this.pflag) {
      this.ctxpush('STRING') ;
      this.ruleSTRING() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (this.pflag) {
        this.out('this.test(') ;
        this.out(String.fromCharCode(39)) ;
        this.out(this.token) ;
        this.out(String.fromCharCode(39)) ;
        this.out(');') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('(');
      if (this.pflag) {
        this.ctxpush('EX1') ;
        this.ruleEX1() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.test(')');
        if (!this.pflag) this.err();
      } ;
    } ;
    if (!this.pflag) {
      this.test('.EMPTY');
      if (this.pflag) {
        this.out('this.pflag = true ;') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('.LITCHR');
      if (this.pflag) {
        this.out('this.token = this.inbuf.charCodeAt(this.inp) ;') ;
        this.eol() ;
        this.out('this.inp++ ;') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('$');
      if (this.pflag) {
        this.out('this.pflag = true ;') ;
        this.eol() ;
        this.out('while (this.pflag) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.ctxpush('EX3') ;
        this.ruleEX3() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('} ;') ;
        this.eol() ;
        this.out('this.pflag = true ;') ;
        this.eol() ;
      } ;
    } ;
  } ,

  // output expressions 
  ruleOUTPUT: function () {
    this.test('.OUT');
    if (this.pflag) {
      this.test('(');
      if (!this.pflag) this.err();
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('OUT1') ;
        this.ruleOUT1() ;
        this.ctxpop() ;
        if (this.eflag) return ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
      this.test(')');
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleOUT1: function () {
    this.test('*');
    if (this.pflag) {
      this.out('this.out(this.token) ;') ;
      this.eol() ;
    } ;
    if (!this.pflag) {
      this.ctxpush('STRING') ;
      this.ruleSTRING() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (this.pflag) {
        this.out('this.out(') ;
        this.out(String.fromCharCode(39)) ;
        this.out(this.token) ;
        this.out(String.fromCharCode(39)) ;
        this.out(') ;') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.ctxpush('NUMBER') ;
      this.ruleNUMBER() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (this.pflag) {
        this.out('this.out(String.fromCharCode(') ;
        this.out(this.token) ;
        this.out(')) ;') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('#');
      if (this.pflag) {
        this.out('if (this.stack[this.stackframe + 0] == 0) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('this.stack[this.stackframe + 0] = this.labelcount ;') ;
        this.eol() ;
        this.out('this.labelcount++ ; } ;') ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.eol() ;
        this.out('this.out(this.stack[this.stackframe + 0]) ;') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('.NL');
      if (this.pflag) {
        this.out('this.eol() ;') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('.LB');
      if (this.pflag) {
      } ;
    } ;
    if (!this.pflag) {
      this.test('.TB');
      if (this.pflag) {
        this.out('this.out(') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(92)) ;
        this.out('t') ;
        this.out(String.fromCharCode(39)) ;
        this.out(') ;') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('.LM+');
      if (this.pflag) {
        this.out('this.stack[this.stackframe + 2] += 2 ;') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('.LM-');
      if (this.pflag) {
        this.out('this.stack[this.stackframe + 2] -= 2 ;') ;
        this.eol() ;
      } ;
    } ;
  } ,

  // token expressions 
  ruleTX1: function () {
    this.ctxpush('TX2') ;
    this.ruleTX2() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.pflag = true ;
      while (this.pflag) {
        this.test('/');
        if (this.pflag) {
          this.out('if (!this.pflag) {') ;
          this.stack[this.stackframe + 2] += 2 ;
          this.eol() ;
          this.ctxpush('TX2') ;
          this.ruleTX2() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
          this.stack[this.stackframe + 2] -= 2 ;
          this.out('} ;') ;
          this.eol() ;
        } ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleTX2: function () {
    this.ctxpush('TX3') ;
    this.ruleTX3() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.out('if (this.pflag) {') ;
      this.stack[this.stackframe + 2] += 2 ;
      this.eol() ;
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('TX3') ;
        this.ruleTX3() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (this.pflag) {
          this.out('if (!this.pflag) return;') ;
          this.eol() ;
        } ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
      this.stack[this.stackframe + 2] -= 2 ;
      this.out('} ;') ;
      this.eol() ;
    } ;
  } ,

  ruleTX3: function () {
    this.test('.TOKEN');
    if (this.pflag) {
      this.out('this.tflag = true ; ') ;
      this.eol() ;
      this.out('this.token = ') ;
      this.out(String.fromCharCode(39)) ;
      this.out(String.fromCharCode(39)) ;
      this.out(' ;') ;
      this.eol() ;
    } ;
    if (!this.pflag) {
      this.test('.DELTOK');
      if (this.pflag) {
        this.out('this.tflag = false ;') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('$');
      if (this.pflag) {
        this.out('this.pflag = true ;') ;
        this.eol() ;
        this.out('while (this.pflag) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.ctxpush('TX3') ;
        this.ruleTX3() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('};') ;
        this.eol() ;
      } ;
    } ;
    if (this.pflag) {
      this.out('this.pflag = true ;') ;
      this.eol() ;
    } ;
    if (!this.pflag) {
      this.test('.ANYBUT(');
      if (this.pflag) {
        this.ctxpush('CX1') ;
        this.ruleCX1() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.test(')');
        if (!this.pflag) this.err();
        this.out('this.pflag = !this.pflag ;') ;
        this.eol() ;
        this.out('if (this.pflag) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;') ;
        this.eol() ;
        this.out('this.inp++ } ;') ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('.ANY(');
      if (this.pflag) {
        this.ctxpush('CX1') ;
        this.ruleCX1() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.test(')');
        if (!this.pflag) this.err();
        this.out('if (this.pflag) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;') ;
        this.eol() ;
        this.out('this.inp++ } ;') ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.ctxpush('ID') ;
      this.ruleID() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (this.pflag) {
        this.out('this.ctxpush(') ;
        this.out(String.fromCharCode(39)) ;
        this.out(this.token) ;
        this.out(String.fromCharCode(39)) ;
        this.out(') ;') ;
        this.eol() ;
        this.out('this.rule') ;
        this.out(this.token) ;
        this.out('() ;') ;
        this.eol() ;
        this.out('this.ctxpop() ;') ;
        this.eol() ;
        this.out('if (this.eflag) return ;') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('(');
      if (this.pflag) {
        this.ctxpush('TX1') ;
        this.ruleTX1() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.test(')');
        if (!this.pflag) this.err();
      } ;
    } ;
  } ,

  // character expressions 
  ruleCX1: function () {
    this.out('this.pflag = ') ;
    this.stack[this.stackframe + 2] += 2 ;
    this.eol() ;
    if (true) {
      this.ctxpush('CX2') ;
      this.ruleCX2() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) this.err();
      this.pflag = true ;
      while (this.pflag) {
        this.test('!');
        if (this.pflag) {
          this.out(' ||') ;
          this.eol() ;
          this.ctxpush('CX2') ;
          this.ruleCX2() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
        } ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
      this.stack[this.stackframe + 2] -= 2 ;
      this.out(' ;') ;
      this.eol() ;
    } ;
  } ,

  ruleCX2: function () {
    this.ctxpush('CX3') ;
    this.ruleCX3() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.test(':');
      if (this.pflag) {
        this.out('((this.inbuf.charCodeAt(this.inp) >= ') ;
        this.out(this.token) ;
        this.out(') &&') ;
        this.eol() ;
        this.ctxpush('CX3') ;
        this.ruleCX3() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.out(' (this.inbuf.charCodeAt(this.inp) <= ') ;
        this.out(this.token) ;
        this.out(')  )') ;
      } ;
      if (!this.pflag) {
        this.pflag = true ;
        if (this.pflag) {
          this.out('(this.inbuf.charCodeAt(this.inp) == ') ;
          this.out(this.token) ;
          this.out(') ') ;
        } ;
      } ;
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleCX3: function () {
    this.ctxpush('NUMBER') ;
    this.ruleNUMBER() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
    } ;
    if (!this.pflag) {
      this.ctxpush('SQUOTE') ;
      this.ruleSQUOTE() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (this.pflag) {
        this.token = this.inbuf.charCodeAt(this.inp) ;
        this.inp++ ;
        if (!this.pflag) this.err();
      } ;
    } ;
  } ,

  // token definitions 
  rulePREFIX: function () {
    this.pflag = true ;
    while (this.pflag) {
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 32)  ||
        (this.inbuf.charCodeAt(this.inp) == 9)  ||
        (this.inbuf.charCodeAt(this.inp) == 13)  ||
        (this.inbuf.charCodeAt(this.inp) == 10)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
    };
    this.pflag = true ;
    if (this.pflag) {
    } ;
  } ,

  ruleID: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.ctxpush('ALPHA') ;
      this.ruleALPHA() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('ALPHA') ;
        this.ruleALPHA() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (this.pflag) {
        } ;
        if (!this.pflag) {
          this.ctxpush('DIGIT') ;
          this.ruleDIGIT() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (this.pflag) {
          } ;
        } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleNUMBER: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.ctxpush('DIGIT') ;
      this.ruleDIGIT() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('DIGIT') ;
        this.ruleDIGIT() ;
        this.ctxpop() ;
        if (this.eflag) return ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleSTRING: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 39)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.pflag = 
          (this.inbuf.charCodeAt(this.inp) == 13)  ||
          (this.inbuf.charCodeAt(this.inp) == 10)  ||
          (this.inbuf.charCodeAt(this.inp) == 39)  ;
        this.pflag = !this.pflag ;
        if (this.pflag) {
          if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
          this.inp++ } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 39)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleALPHA: function () {
    this.pflag = 
      ((this.inbuf.charCodeAt(this.inp) >= 65) &&
       (this.inbuf.charCodeAt(this.inp) <= 90)  ) ||
      ((this.inbuf.charCodeAt(this.inp) >= 97) &&
       (this.inbuf.charCodeAt(this.inp) <= 122)  ) ;
    if (this.pflag) {
      if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
      this.inp++ } ;
    if (this.pflag) {
    } ;
  } ,

  ruleDIGIT: function () {
    this.pflag = 
      ((this.inbuf.charCodeAt(this.inp) >= 48) &&
       (this.inbuf.charCodeAt(this.inp) <= 57)  ) ;
    if (this.pflag) {
      if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
      this.inp++ } ;
    if (this.pflag) {
    } ;
  } ,

  ruleSQUOTE: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 39)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleCMLINE: function () {
    this.tflag = true ; 
    this.token = '' ;
    this.pflag = true ;
    if (this.pflag) {
      this.pflag = true ;
      while (this.pflag) {
        this.pflag = 
          (this.inbuf.charCodeAt(this.inp) == 10)  ||
          (this.inbuf.charCodeAt(this.inp) == 13)  ||
          (this.inbuf.charCodeAt(this.inp) == 93)  ;
        this.pflag = !this.pflag ;
        if (this.pflag) {
          if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
          this.inp++ } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  // runtime variables
  pflag: false ,
  tflag: false ,
  eflag: false ,
  inp: 0 ,
  inbuf:  '' ,
  outbuf:  '' ,
  erule:  '' ,
  einput: 0 ,
  token: '' ,
  labelcount: 0 ,
  stackframesize: 3 ,
  stackframe: 0 ,
  stos: -1 ,
  stack: [] ,

  initialize: function () {
    // initialize for another compile
    this.pflag = false ;
    this.tflag = false ;
    this.eflag = false ;
    this.inp = 0 ;
    this.outbuf = '' ;
    this.erule = '' ;
    this.einput = 0 ;
    this.token = '' ;
    this.labelcount = 1 ;
    this.stackframe = -1 ;
    this.stos = -1 ;
    this.stack = [] ;
  },

  ctxpush: function (rulename){
    // push and initialize a new stackframe
    var LM ;
    // new context inherits current context left margin
    LM = 0; if (this.stackframe >= 0) LM = this.stack[this.stackframe + 2] ;
    this.stos++ ;
    this.stackframe = this.stos * this.stackframesize ;
    // stackframe definition
    this.stack[this.stackframe + 0] = 0 ;        // generated label
    this.stack[this.stackframe + 1] = rulename ; // called rule name
    this.stack[this.stackframe + 2] = LM ;       // left margin
  },

  ctxpop: function (){
    // pop and possibly deallocate old stackframe
    this.stos-- ; // pop stackframe
    this.stackframe = this.stos * this.stackframesize ;
  },

  out: function (s){
    // output string
    var i ;
    // if newline last output, add left margin before string
    if (this.outbuf.charAt(this.outbuf.length - 1) == '\\n') {
      i = this.stack[this.stackframe + 2] ;
      while (i>0) { this.outbuf += ' ' ; i-- } ; } ;
    this.outbuf += s ;
  },

  eol: function (){
    // output end of line
    this.outbuf += '\\n' ;
  },

  test: function (s) {
    // test for a string in the input
    var i ;
    // delete whitespace
    while ((this.inbuf.charAt(this.inp) == ' ')  ||
           (this.inbuf.charAt(this.inp) == '\\n') ||
           (this.inbuf.charAt(this.inp) == '\\r') ||
           (this.inbuf.charAt(this.inp) == '\\t') ) this.inp++ ;
    // test string case insensitive
    this.pflag = true ; i = 0 ;
    while (this.pflag && (i < s.length) && ((this.inp+i) < this.inbuf.length) )
    { this.pflag = (s.charAt(i).toUpperCase() ==
                    this.inbuf.charAt(this.inp+i).toUpperCase()) ;
      i++ ; } ;
    this.pflag = this.pflag && (i == s.length) ;
    // advance input if found
    if (this.pflag) this.inp = this.inp + s.length ;
  },

  err: function () {
    // compilation error, provide error indication and context
    this.eflag = true ;
    this.erule = this.stack[this.stackframe + 1] ;
    this.einput = this.inp ;
  }

}`

code_c["c01ajs. demo, AEXP compile assignments c[i02a,c12js]"] = `
// AEXP compiler
compiler = {

  compile: function (input) {
    // initialize compiler variables
    this.inbuf = input ;
    this.initialize() ;
    // call the first rule
    this.ctxpush('AEXP') ;
    this.ruleAEXP() ;
    this.ctxpop() ;
    // special case handling of first rule failure
    if ((!this.eflag) && (!this.pflag)) {
      this.eflag = true ;
      this.erule = 'AEXP' ;
      this.einput = this.inp ; } ;
    return this.eflag ;
  },

  ruleAEXP: function () {
    this.ctxpush('AS') ;
    this.ruleAS() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('AS') ;
        this.ruleAS() ;
        this.ctxpop() ;
        if (this.eflag) return ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleAS: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.out('\\t') ;
      this.out('address ') ;
      this.out(this.token) ;
      this.eol() ;
      this.test(':=');
      if (!this.pflag) this.err();
      this.ctxpush('RX1') ;
      this.ruleRX1() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) this.err();
      this.out('\\t') ;
      this.out('store') ;
      this.eol() ;
      this.test(';');
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleRX1: function () {
    this.ctxpush('RX2') ;
    this.ruleRX2() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.test('=');
      if (this.pflag) {
        this.ctxpush('RX2') ;
        this.ruleRX2() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.out('\\t') ;
        this.out('eq') ;
        this.eol() ;
      } ;
      if (!this.pflag) {
        this.test('<');
        if (this.pflag) {
          this.ctxpush('RX2') ;
          this.ruleRX2() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
          this.out('\\t') ;
          this.out('lt') ;
          this.eol() ;
        } ;
      } ;
      if (!this.pflag) {
        this.test('>');
        if (this.pflag) {
          this.ctxpush('RX2') ;
          this.ruleRX2() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
          this.out('\\t') ;
          this.out('gt') ;
          this.eol() ;
        } ;
      } ;
      if (!this.pflag) {
        this.test('<=');
        if (this.pflag) {
          this.ctxpush('RX2') ;
          this.ruleRX2() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
          this.out('\\t') ;
          this.out('le') ;
          this.eol() ;
        } ;
      } ;
      if (!this.pflag) {
        this.test('>=');
        if (this.pflag) {
          this.ctxpush('RX2') ;
          this.ruleRX2() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
          this.out('\\t') ;
          this.out('ge') ;
          this.eol() ;
        } ;
      } ;
      if (!this.pflag) {
        this.pflag = true ;
        if (this.pflag) {
        } ;
      } ;
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleRX2: function () {
    this.test('~');
    if (this.pflag) {
      this.ctxpush('EX0') ;
      this.ruleEX0() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) this.err();
      this.out('\\t') ;
      this.out('not') ;
      this.eol() ;
    } ;
    if (!this.pflag) {
      this.ctxpush('EX0') ;
      this.ruleEX0() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (this.pflag) {
      } ;
    } ;
  } ,

  ruleEX0: function () {
    this.ctxpush('EX1') ;
    this.ruleEX1() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.test('<-');
      if (this.pflag) {
        this.ctxpush('EX1') ;
        this.ruleEX1() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.out('\\t') ;
        this.out('shl') ;
        this.eol() ;
      } ;
      if (!this.pflag) {
        this.test('->');
        if (this.pflag) {
          this.ctxpush('EX2') ;
          this.ruleEX2() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
          this.out('\\t') ;
          this.out('shr') ;
          this.eol() ;
        } ;
      } ;
      if (!this.pflag) {
        this.pflag = true ;
        if (this.pflag) {
        } ;
      } ;
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleEX1: function () {
    this.ctxpush('EX2') ;
    this.ruleEX2() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.pflag = true ;
      while (this.pflag) {
        this.test('+');
        if (this.pflag) {
          this.ctxpush('EX2') ;
          this.ruleEX2() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
          this.out('\\t') ;
          this.out('add') ;
          this.eol() ;
        } ;
        if (!this.pflag) {
          this.test('-');
          if (this.pflag) {
            this.ctxpush('EX2') ;
            this.ruleEX2() ;
            this.ctxpop() ;
            if (this.eflag) return ;
            if (!this.pflag) this.err();
            this.out('\\t') ;
            this.out('sub') ;
            this.eol() ;
          } ;
        } ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleEX2: function () {
    this.ctxpush('EX3') ;
    this.ruleEX3() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.pflag = true ;
      while (this.pflag) {
        this.test('*');
        if (this.pflag) {
          this.ctxpush('EX3') ;
          this.ruleEX3() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
          this.out('\\t') ;
          this.out('mpy') ;
          this.eol() ;
        } ;
        if (!this.pflag) {
          this.test('/');
          if (this.pflag) {
            this.ctxpush('EX3') ;
            this.ruleEX3() ;
            this.ctxpop() ;
            if (this.eflag) return ;
            if (!this.pflag) this.err();
            this.out('\\t') ;
            this.out('div') ;
            this.eol() ;
          } ;
        } ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleEX3: function () {
    this.ctxpush('EX4') ;
    this.ruleEX4() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.pflag = true ;
      while (this.pflag) {
        this.test('^');
        if (this.pflag) {
          this.ctxpush('EX3') ;
          this.ruleEX3() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (!this.pflag) this.err();
          this.out('\\t') ;
          this.out('exp') ;
          this.eol() ;
        } ;
      } ;
      this.pflag = true ;
      if (!this.pflag) this.err();
    } ;
  } ,

  ruleEX4: function () {
    this.test('+');
    if (this.pflag) {
      this.ctxpush('EX5') ;
      this.ruleEX5() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) this.err();
    } ;
    if (!this.pflag) {
      this.test('-');
      if (this.pflag) {
        this.ctxpush('EX5') ;
        this.ruleEX5() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.out('\\t') ;
        this.out('minus') ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.ctxpush('EX5') ;
      this.ruleEX5() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (this.pflag) {
      } ;
    } ;
  } ,

  ruleEX5: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.out('\\t') ;
      this.out('load ') ;
      this.out(this.token) ;
      this.eol() ;
    } ;
    if (!this.pflag) {
      this.ctxpush('NUMBER') ;
      this.ruleNUMBER() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (this.pflag) {
        this.out('\\t') ;
        this.out('literal ') ;
        this.out(this.token) ;
        this.eol() ;
      } ;
    } ;
    if (!this.pflag) {
      this.test('(');
      if (this.pflag) {
        this.ctxpush('EX1') ;
        this.ruleEX1() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (!this.pflag) this.err();
        this.test(')');
        if (!this.pflag) this.err();
      } ;
    } ;
  } ,

  rulePREFIX: function () {
    this.pflag = true ;
    while (this.pflag) {
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 32)  ||
        (this.inbuf.charCodeAt(this.inp) == 9)  ||
        (this.inbuf.charCodeAt(this.inp) == 13)  ||
        (this.inbuf.charCodeAt(this.inp) == 10)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
    };
    this.pflag = true ;
    if (this.pflag) {
    } ;
  } ,

  ruleID: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.pflag = 
        ((this.inbuf.charCodeAt(this.inp) >= 65) &&
         (this.inbuf.charCodeAt(this.inp) <= 90)  ) ||
        ((this.inbuf.charCodeAt(this.inp) >= 97) &&
         (this.inbuf.charCodeAt(this.inp) <= 122)  ) ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.pflag = 
          ((this.inbuf.charCodeAt(this.inp) >= 65) &&
           (this.inbuf.charCodeAt(this.inp) <= 90)  ) ||
          ((this.inbuf.charCodeAt(this.inp) >= 97) &&
           (this.inbuf.charCodeAt(this.inp) <= 122)  ) ;
        if (this.pflag) {
          if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
          this.inp++ } ;
        if (this.pflag) {
        } ;
        if (!this.pflag) {
          this.pflag = 
            ((this.inbuf.charCodeAt(this.inp) >= 48) &&
             (this.inbuf.charCodeAt(this.inp) <= 57)  ) ;
          if (this.pflag) {
            if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
            this.inp++ } ;
          if (this.pflag) {
          } ;
        } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleNUMBER: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.pflag = 
        ((this.inbuf.charCodeAt(this.inp) >= 48) &&
         (this.inbuf.charCodeAt(this.inp) <= 57)  ) ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.pflag = 
          ((this.inbuf.charCodeAt(this.inp) >= 48) &&
           (this.inbuf.charCodeAt(this.inp) <= 57)  ) ;
        if (this.pflag) {
          if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
          this.inp++ } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  // runtime variables
  pflag: false ,
  tflag: false ,
  eflag: false ,
  inp: 0 ,
  inbuf:  '' ,
  outbuf:  '' ,
  erule:  '' ,
  einput: 0 ,
  token: '' ,
  labelcount: 0 ,
  stackframesize: 3 ,
  stackframe: 0 ,
  stos: -1 ,
  stack: [] ,

  initialize: function () {
    // initialize for another compile
    this.pflag = false ;
    this.tflag = false ;
    this.eflag = false ;
    this.inp = 0 ;
    this.outbuf = '' ;
    this.erule = '' ;
    this.einput = 0 ;
    this.token = '' ;
    this.labelcount = 1 ;
    this.stackframe = -1 ;
    this.stos = -1 ;
    this.stack = [] ;
  },

  ctxpush: function (rulename){
    // push and initialize a new stackframe
    var LM ;
    // new context inherits current context left margin
    LM = 0; if (this.stackframe >= 0) LM = this.stack[this.stackframe + 2] ;
    this.stos++ ;
    this.stackframe = this.stos * this.stackframesize ;
    // stackframe definition
    this.stack[this.stackframe + 0] = 0 ;        // generated label
    this.stack[this.stackframe + 1] = rulename ; // called rule name
    this.stack[this.stackframe + 2] = LM ;       // left margin
  },

  ctxpop: function (){
    // pop and possibly deallocate old stackframe
    this.stos-- ; // pop stackframe
    this.stackframe = this.stos * this.stackframesize ;
  },

  out: function (s){
    // output string
    var i ;
    // if newline last output, add left margin before string
    if (this.outbuf.charAt(this.outbuf.length - 1) == '\\n') {
      i = this.stack[this.stackframe + 2] ;
      while (i>0) { this.outbuf += ' ' ; i-- } ; } ;
    this.outbuf += s ;
  },

  eol: function (){
    // output end of line
    this.outbuf += '\\n' ;
  },

  test: function (s) {
    // test for a string in the input
    var i ;
    // delete whitespace
    while ((this.inbuf.charAt(this.inp) == ' ')  ||
           (this.inbuf.charAt(this.inp) == '\\n') ||
           (this.inbuf.charAt(this.inp) == '\\r') ||
           (this.inbuf.charAt(this.inp) == '\\t') ) this.inp++ ;
    // test string case insensitive
    this.pflag = true ; i = 0 ;
    while (this.pflag && (i < s.length) && ((this.inp+i) < this.inbuf.length) )
    { this.pflag = (s.charAt(i).toUpperCase() ==
                    this.inbuf.charAt(this.inp+i).toUpperCase()) ;
      i++ ; } ;
    this.pflag = this.pflag && (i == s.length) ;
    // advance input if found
    if (this.pflag) this.inp = this.inp + s.length ;
  },

  err: function () {
    // compilation error, provide error indication and context
    this.eflag = true ;
    this.erule = this.stack[this.stackframe + 1] ;
    this.einput = this.inp ;
  }

}`

code_c["c13js. accept backup c[i15js,c[i15js,c12js]], m[i15js,c13js]"] = `
// PROGRAM compiler
compiler = {

  compile: function (input) {
    // initialize compiler variables
    this.inbuf = input ;
    this.initialize() ;
    // call the first rule
    this.ctxpush('PROGRAM') ;
    this.rulePROGRAM() ;
    this.ctxpop() ;
    // special case handling of first rule failure
    if ((!this.eflag) && (!this.pflag)) {
      this.eflag = true ;
      this.erule = 'PROGRAM' ;
      this.einput = this.inp ; } ;
    return this.eflag ;
  },

  // Example Metacompiler Definition 
  // fully contained javascript object version with backup 
  // James M. Neighbors 
  // body of compiler definition 
  rulePROGRAM: function () {
    this.test('.SYNTAX');
    if (this.pflag) {
      while (!this.eflag) {
        this.ctxpush('ID') ;
        this.ruleID() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.out('// ') ;
        this.out(this.token) ;
        this.out(' compiler') ;
        this.eol() ;
        this.out('compiler = {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.eol() ;
        this.ctxpush('PREAMBLE') ;
        this.rulePREAMBLE() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.ctxpush('PR') ;
          this.rulePR() ;
          this.ctxpop() ;
          if (this.pflag) {
            while (!this.eflag) {
              break }
          } ;
          if ((!this.pflag) && (!this.eflag)) {
            this.ctxpush('COMMENT') ;
            this.ruleCOMMENT() ;
            this.ctxpop() ;
            if (this.pflag) {
              while (!this.eflag) {
                break }
            } ;
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.test('.TOKENS');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.ctxpush('TR') ;
          this.ruleTR() ;
          this.ctxpop() ;
          if (this.pflag) {
            while (!this.eflag) {
              break }
          } ;
          if ((!this.pflag) && (!this.eflag)) {
            this.ctxpush('COMMENT') ;
            this.ruleCOMMENT() ;
            this.ctxpop() ;
            if (this.pflag) {
              while (!this.eflag) {
                break }
            } ;
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.test('.END');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.ctxpush('POSTAMBLE') ;
        this.rulePOSTAMBLE() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('}') ;
        this.eol() ;
        break }
    } ;
  } ,

  // object definition preamble 
  rulePREAMBLE: function () {
    this.out('compile: function (input) {') ;
    this.stack[this.stackframe + 2] += 2 ;
    this.eol() ;
    if (true) {
      while (!this.eflag) {
        this.out('// initialize compiler variables') ;
        this.eol() ;
        this.out('this.inbuf = input ;') ;
        this.eol() ;
        this.out('this.initialize() ;') ;
        this.eol() ;
        this.out('// call the first rule') ;
        this.eol() ;
        this.out('this.ctxpush(') ;
        this.out(String.fromCharCode(39)) ;
        this.out(this.token) ;
        this.out(String.fromCharCode(39)) ;
        this.out(') ;') ;
        this.eol() ;
        this.out('this.rule') ;
        this.out(this.token) ;
        this.out('() ;') ;
        this.eol() ;
        this.out('this.ctxpop() ;') ;
        this.eol() ;
        this.out('// special case handling of first rule failure') ;
        this.eol() ;
        this.out('if ((!this.eflag) && (!this.pflag)) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('this.eflag = true ;') ;
        this.eol() ;
        this.out('this.erule = ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(this.token) ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ;') ;
        this.eol() ;
        this.out('this.einput = this.inp ; } ;') ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.eol() ;
        this.out('return this.eflag ;') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('},') ;
        this.eol() ;
        this.eol() ;
        break }
    } ;
  } ,

  // runtime and object definition postamble 
  rulePOSTAMBLE: function () {
    this.out('// runtime variables') ;
    this.eol() ;
    if (true) {
      while (!this.eflag) {
        this.out('pflag: false ,') ;
        this.eol() ;
        this.out('tflag: false ,') ;
        this.eol() ;
        this.out('eflag: false ,') ;
        this.eol() ;
        this.out('inp: 0 ,') ;
        this.eol() ;
        this.out('inbuf:  ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ,') ;
        this.eol() ;
        this.out('outbuf:  ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ,') ;
        this.eol() ;
        this.out('erule:  ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ,') ;
        this.eol() ;
        this.out('einput: 0 ,') ;
        this.eol() ;
        this.out('token: ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ,') ;
        this.eol() ;
        this.out('labelcount: 0 ,') ;
        this.eol() ;
        this.out('stackframesize: 6 ,') ;
        this.eol() ;
        this.out('stackframe: 0 ,') ;
        this.eol() ;
        this.out('stos: -1 ,') ;
        this.eol() ;
        this.out('stack: [] ,') ;
        this.eol() ;
        this.eol() ;
        this.out('initialize: function () {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('// initialize for another compile') ;
        this.eol() ;
        this.out('this.pflag = false ;') ;
        this.eol() ;
        this.out('this.tflag = false ;') ;
        this.eol() ;
        this.out('this.eflag = false ;') ;
        this.eol() ;
        this.out('this.inp = 0 ;') ;
        this.eol() ;
        this.out('this.outbuf = ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ;') ;
        this.eol() ;
        this.out('this.erule = ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ;') ;
        this.eol() ;
        this.out('this.einput = 0 ;') ;
        this.eol() ;
        this.out('this.token = ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ;') ;
        this.eol() ;
        this.out('this.labelcount = 1 ;') ;
        this.eol() ;
        this.out('this.stackframe = -1 ;') ;
        this.eol() ;
        this.out('this.stos = -1 ;') ;
        this.eol() ;
        this.out('this.stack = [] ;') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('},') ;
        this.eol() ;
        this.eol() ;
        this.out('ctxpush: function (rulename){') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('// push and initialize a new stackframe') ;
        this.eol() ;
        this.out('var LM ;') ;
        this.eol() ;
        this.out('// new context inherits current context left margin') ;
        this.eol() ;
        this.out('LM = 0; if (this.stackframe >= 0) LM = this.stack[this.stackframe + 2] ;') ;
        this.eol() ;
        this.out('this.stos++ ;') ;
        this.eol() ;
        this.out('this.stackframe = this.stos * this.stackframesize ;') ;
        this.eol() ;
        this.out('// stackframe definition') ;
        this.eol() ;
        this.out('this.stack[this.stackframe + 0] = 0 ;        // generated label') ;
        this.eol() ;
        this.out('this.stack[this.stackframe + 1] = rulename ; // called rule name') ;
        this.eol() ;
        this.out('this.stack[this.stackframe + 2] = LM ;       // left margin') ;
        this.eol() ;
        this.out('// clear additional stackframe backtracking entries') ;
        this.eol() ;
        this.out('this.bkclear() ;') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('},') ;
        this.eol() ;
        this.eol() ;
        this.out('ctxpop: function (){') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('// pop and possibly deallocate old stackframe') ;
        this.eol() ;
        this.out('this.stos-- ; // pop stackframe') ;
        this.eol() ;
        this.out('this.stackframe = this.stos * this.stackframesize ;') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('},') ;
        this.eol() ;
        this.eol() ;
        this.out('out: function (s){') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('// output string') ;
        this.eol() ;
        this.out('var i ;') ;
        this.eol() ;
        this.out('// if newline last output, add left margin before string') ;
        this.eol() ;
        this.out('if (this.outbuf.charAt(this.outbuf.length - 1) == ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(92)) ;
        this.out('n') ;
        this.out(String.fromCharCode(39)) ;
        this.out(') {') ;
        this.eol() ;
        this.out('  i = this.stack[this.stackframe + 2] ;') ;
        this.eol() ;
        this.out('  while (i>0) { this.outbuf += ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ; i-- } ; } ;') ;
        this.eol() ;
        this.out('this.outbuf += s ;') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('},') ;
        this.eol() ;
        this.eol() ;
        this.out('eol: function (){') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('// output end of line') ;
        this.eol() ;
        this.out('this.outbuf += ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(92)) ;
        this.out('n') ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ;') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('},') ;
        this.eol() ;
        this.eol() ;
        this.out('test: function (s) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('// test for a string in the input') ;
        this.eol() ;
        this.out('var i ;') ;
        this.eol() ;
        this.out('// delete whitespace') ;
        this.eol() ;
        this.out('while ((this.inbuf.charAt(this.inp) == ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(')  ||') ;
        this.eol() ;
        this.out('       (this.inbuf.charAt(this.inp) == ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(92)) ;
        this.out('n') ;
        this.out(String.fromCharCode(39)) ;
        this.out(') ||') ;
        this.eol() ;
        this.out('       (this.inbuf.charAt(this.inp) == ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(92)) ;
        this.out('r') ;
        this.out(String.fromCharCode(39)) ;
        this.out(') ||') ;
        this.eol() ;
        this.out('       (this.inbuf.charAt(this.inp) == ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(92)) ;
        this.out('t') ;
        this.out(String.fromCharCode(39)) ;
        this.out(') ) this.inp++ ;') ;
        this.eol() ;
        this.out('// test string case insensitive') ;
        this.eol() ;
        this.out('this.pflag = true ; i = 0 ;') ;
        this.eol() ;
        this.out('while (this.pflag && (i < s.length) && ((this.inp+i) < this.inbuf.length) )') ;
        this.eol() ;
        this.out('{ this.pflag = (s.charAt(i).toUpperCase() ==') ;
        this.eol() ;
        this.out('                this.inbuf.charAt(this.inp+i).toUpperCase()) ;') ;
        this.eol() ;
        this.out('  i++ ; } ;') ;
        this.eol() ;
        this.out('this.pflag = this.pflag && (i == s.length) ;') ;
        this.eol() ;
        this.out('// advance input if found') ;
        this.eol() ;
        this.out('if (this.pflag) this.inp = this.inp + s.length ;') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('},') ;
        this.eol() ;
        this.eol() ;
        this.out('bkerr: function () {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('// compilation error, provide error indication and context') ;
        this.eol() ;
        this.out('this.eflag = true ;') ;
        this.eol() ;
        this.out('this.erule = this.stack[this.stackframe + 1] ;') ;
        this.eol() ;
        this.out('this.einput = this.inp ;') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('},') ;
        this.eol() ;
        this.eol() ;
        this.out('bkset: function () {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('// set backtrack context on stack') ;
        this.eol() ;
        this.out('this.stack[this.stackframe + 3] = this.inp ;           // input position') ;
        this.eol() ;
        this.out('this.stack[this.stackframe + 4] = this.outbuf.length ; // output position') ;
        this.eol() ;
        this.out('this.stack[this.stackframe + 5] = this.token ;         // current token') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('},') ;
        this.eol() ;
        this.eol() ;
        this.out('bkclear: function () {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('// clear backtrack context on stack') ;
        this.eol() ;
        this.out('this.stack[this.stackframe + 3] = -1 ; // input position') ;
        this.eol() ;
        this.out('this.stack[this.stackframe + 4] = -1 ; // output position') ;
        this.eol() ;
        this.out('this.stack[this.stackframe + 5] = ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ; // current token') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('},') ;
        this.eol() ;
        this.eol() ;
        this.out('bkrestore: function () {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.out('// restore context for backtracking') ;
        this.eol() ;
        this.out('this.eflag = false ;') ;
        this.eol() ;
        this.out('this.inp = this.stack[this.stackframe + 3] ;           // input position') ;
        this.eol() ;
        this.out('this.outbuf = this.outbuf.substring(0,this.stack[this.stackframe + 4]) ; // output position') ;
        this.eol() ;
        this.out('this.token = this.stack[this.stackframe + 5] ;         // current token') ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('}') ;
        this.eol() ;
        this.eol() ;
        break }
    } ;
  } ,

  // parsing rule definition 
  rulePR: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('rule') ;
        this.out(this.token) ;
        this.out(': function () {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.test('=');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.ctxpush('EX1') ;
        this.ruleEX1() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.test(';');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('} ,') ;
        this.eol() ;
        this.eol() ;
        break }
    } ;
  } ,

  // token rule definition 
  ruleTR: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('rule') ;
        this.out(this.token) ;
        this.out(': function () {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.test(':');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.ctxpush('TX1') ;
        this.ruleTX1() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.test(';');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('} ,') ;
        this.eol() ;
        this.eol() ;
        break }
    } ;
  } ,

  // comment definition 
  ruleCOMMENT: function () {
    this.test('[');
    if (this.pflag) {
      while (!this.eflag) {
        this.ctxpush('CMLINE') ;
        this.ruleCMLINE() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.test(']');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.out('//') ;
        this.out(this.token) ;
        this.eol() ;
        break }
    } ;
  } ,

  // parsing expressions 
  ruleEX1: function () {
    this.ctxpush('EX2') ;
    this.ruleEX2() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.test('/');
          if (this.pflag) {
            while (!this.eflag) {
              this.out('if ((!this.pflag) && (!this.eflag)) {') ;
              this.stack[this.stackframe + 2] += 2 ;
              this.eol() ;
              this.ctxpush('EX2') ;
              this.ruleEX2() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              this.stack[this.stackframe + 2] -= 2 ;
              this.out('} ;') ;
              this.eol() ;
              break }
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleEX2: function () {
    this.ctxpush('EX3') ;
    this.ruleEX3() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('if (this.pflag) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('OUTPUT') ;
      this.ruleOUTPUT() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          this.out('if (true) {') ;
          this.stack[this.stackframe + 2] += 2 ;
          this.eol() ;
          break }
      } ;
    } ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('while (!this.eflag) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.ctxpush('EX3') ;
          this.ruleEX3() ;
          this.ctxpop() ;
          if (this.pflag) {
            while (!this.eflag) {
              this.out('if (!this.pflag) this.bkerr();') ;
              this.eol() ;
              this.out('if (this.eflag) break ;') ;
              this.eol() ;
              break }
          } ;
          if ((!this.pflag) && (!this.eflag)) {
            this.ctxpush('OUTPUT') ;
            this.ruleOUTPUT() ;
            this.ctxpop() ;
            if (this.pflag) {
              while (!this.eflag) {
                break }
            } ;
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.out('break }') ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.eol() ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('} ;') ;
        this.eol() ;
        break }
    } ;
  } ,

  ruleEX3: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('this.ctxpush(') ;
        this.out(String.fromCharCode(39)) ;
        this.out(this.token) ;
        this.out(String.fromCharCode(39)) ;
        this.out(') ;') ;
        this.eol() ;
        this.out('this.rule') ;
        this.out(this.token) ;
        this.out('() ;') ;
        this.eol() ;
        this.out('this.ctxpop() ;') ;
        this.eol() ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('STRING') ;
      this.ruleSTRING() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.test(') ;
          this.out(String.fromCharCode(39)) ;
          this.out(this.token) ;
          this.out(String.fromCharCode(39)) ;
          this.out(');') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('(');
      if (this.pflag) {
        while (!this.eflag) {
          this.ctxpush('EX1') ;
          this.ruleEX1() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.test(')');
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.EMPTY');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.pflag = true ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.LITCHR');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.token = this.inbuf.charCodeAt(this.inp) ;') ;
          this.eol() ;
          this.out('this.inp++ ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.PASS');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.inp = 0 ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('$');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.pflag = true ;') ;
          this.eol() ;
          this.out('while (this.pflag & !this.eflag) {') ;
          this.stack[this.stackframe + 2] += 2 ;
          this.eol() ;
          this.ctxpush('EX3') ;
          this.ruleEX3() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.stack[this.stackframe + 2] -= 2 ;
          this.out('} ;') ;
          this.eol() ;
          this.out('this.pflag = !this.eflag ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('[');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.bkset() ;') ;
          this.eol() ;
          this.ctxpush('EX1') ;
          this.ruleEX1() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.pflag = true ;
          while (this.pflag & !this.eflag) {
            this.test('|');
            if (this.pflag) {
              while (!this.eflag) {
                this.out('if (!this.pflag) {') ;
                this.stack[this.stackframe + 2] += 2 ;
                this.eol() ;
                this.out('if (this.eflag) this.bkrestore() ;') ;
                this.eol() ;
                this.ctxpush('EX1') ;
                this.ruleEX1() ;
                this.ctxpop() ;
                if (!this.pflag) this.bkerr();
                if (this.eflag) break ;
                this.stack[this.stackframe + 2] -= 2 ;
                this.out('} ;') ;
                this.eol() ;
                break }
            } ;
          } ;
          this.pflag = !this.eflag ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.test(']');
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.out('if (this.eflag) this.bkrestore() ;') ;
          this.eol() ;
          this.out('this.bkclear() ;') ;
          this.eol() ;
          break }
      } ;
    } ;
  } ,

  // output expressions 
  ruleOUTPUT: function () {
    this.test('.OUT');
    if (this.pflag) {
      while (!this.eflag) {
        this.test('(');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.ctxpush('OUT1') ;
          this.ruleOUT1() ;
          this.ctxpop() ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.test(')');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleOUT1: function () {
    this.test('*');
    if (this.pflag) {
      while (!this.eflag) {
        this.out('this.out(this.token) ;') ;
        this.eol() ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('STRING') ;
      this.ruleSTRING() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.out(') ;
          this.out(String.fromCharCode(39)) ;
          this.out(this.token) ;
          this.out(String.fromCharCode(39)) ;
          this.out(') ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('NUMBER') ;
      this.ruleNUMBER() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.out(String.fromCharCode(') ;
          this.out(this.token) ;
          this.out(')) ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('#');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('if (this.stack[this.stackframe + 0] == 0) {') ;
          this.stack[this.stackframe + 2] += 2 ;
          this.eol() ;
          this.out('this.stack[this.stackframe + 0] = this.labelcount ;') ;
          this.eol() ;
          this.out('this.labelcount++ ; } ;') ;
          this.stack[this.stackframe + 2] -= 2 ;
          this.eol() ;
          this.out('this.out(this.stack[this.stackframe + 0]) ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.NL');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.eol() ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.LB');
      if (this.pflag) {
        while (!this.eflag) {
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.TB');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.out(') ;
          this.out(String.fromCharCode(39)) ;
          this.out(String.fromCharCode(92)) ;
          this.out('t') ;
          this.out(String.fromCharCode(39)) ;
          this.out(') ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.LM+');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.stack[this.stackframe + 2] += 2 ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.LM-');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.stack[this.stackframe + 2] -= 2 ;') ;
          this.eol() ;
          break }
      } ;
    } ;
  } ,

  // token expressions 
  ruleTX1: function () {
    this.ctxpush('TX2') ;
    this.ruleTX2() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.test('/');
          if (this.pflag) {
            while (!this.eflag) {
              this.out('if (!this.pflag) {') ;
              this.stack[this.stackframe + 2] += 2 ;
              this.eol() ;
              this.ctxpush('TX2') ;
              this.ruleTX2() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              this.stack[this.stackframe + 2] -= 2 ;
              this.out('} ;') ;
              this.eol() ;
              break }
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleTX2: function () {
    this.ctxpush('TX3') ;
    this.ruleTX3() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('if (this.pflag) {') ;
        this.stack[this.stackframe + 2] += 2 ;
        this.eol() ;
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.ctxpush('TX3') ;
          this.ruleTX3() ;
          this.ctxpop() ;
          if (this.pflag) {
            while (!this.eflag) {
              this.out('if (!this.pflag) return;') ;
              this.eol() ;
              break }
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out('} ;') ;
        this.eol() ;
        break }
    } ;
  } ,

  ruleTX3: function () {
    this.test('.TOKEN');
    if (this.pflag) {
      while (!this.eflag) {
        this.out('this.tflag = true ; ') ;
        this.eol() ;
        this.out('this.token = ') ;
        this.out(String.fromCharCode(39)) ;
        this.out(String.fromCharCode(39)) ;
        this.out(' ;') ;
        this.eol() ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.DELTOK');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.tflag = false ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('$');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.pflag = true ;') ;
          this.eol() ;
          this.out('while (this.pflag) {') ;
          this.stack[this.stackframe + 2] += 2 ;
          this.eol() ;
          this.ctxpush('TX3') ;
          this.ruleTX3() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.stack[this.stackframe + 2] -= 2 ;
          this.out('};') ;
          this.eol() ;
          break }
      } ;
    } ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('this.pflag = true ;') ;
        this.eol() ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.ANYBUT(');
      if (this.pflag) {
        while (!this.eflag) {
          this.ctxpush('CX1') ;
          this.ruleCX1() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.test(')');
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.out('this.pflag = !this.pflag ;') ;
          this.eol() ;
          this.out('if (this.pflag) {') ;
          this.stack[this.stackframe + 2] += 2 ;
          this.eol() ;
          this.out('if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;') ;
          this.eol() ;
          this.out('this.inp++ } ;') ;
          this.stack[this.stackframe + 2] -= 2 ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.ANY(');
      if (this.pflag) {
        while (!this.eflag) {
          this.ctxpush('CX1') ;
          this.ruleCX1() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.test(')');
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.out('if (this.pflag) {') ;
          this.stack[this.stackframe + 2] += 2 ;
          this.eol() ;
          this.out('if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;') ;
          this.eol() ;
          this.out('this.inp++ } ;') ;
          this.stack[this.stackframe + 2] -= 2 ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('ID') ;
      this.ruleID() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          this.out('this.ctxpush(') ;
          this.out(String.fromCharCode(39)) ;
          this.out(this.token) ;
          this.out(String.fromCharCode(39)) ;
          this.out(') ;') ;
          this.eol() ;
          this.out('this.rule') ;
          this.out(this.token) ;
          this.out('() ;') ;
          this.eol() ;
          this.out('this.ctxpop() ;') ;
          this.eol() ;
          this.out('if (this.eflag) return ;') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('(');
      if (this.pflag) {
        while (!this.eflag) {
          this.ctxpush('TX1') ;
          this.ruleTX1() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.test(')');
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          break }
      } ;
    } ;
  } ,

  // character expressions 
  ruleCX1: function () {
    this.out('this.pflag = ') ;
    this.stack[this.stackframe + 2] += 2 ;
    this.eol() ;
    if (true) {
      while (!this.eflag) {
        this.ctxpush('CX2') ;
        this.ruleCX2() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.test('!');
          if (this.pflag) {
            while (!this.eflag) {
              this.out(' ||') ;
              this.eol() ;
              this.ctxpush('CX2') ;
              this.ruleCX2() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              break }
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.stack[this.stackframe + 2] -= 2 ;
        this.out(' ;') ;
        this.eol() ;
        break }
    } ;
  } ,

  ruleCX2: function () {
    this.ctxpush('CX3') ;
    this.ruleCX3() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.test(':');
        if (this.pflag) {
          while (!this.eflag) {
            this.out('((this.inbuf.charCodeAt(this.inp) >= ') ;
            this.out(this.token) ;
            this.out(') &&') ;
            this.eol() ;
            this.ctxpush('CX3') ;
            this.ruleCX3() ;
            this.ctxpop() ;
            if (!this.pflag) this.bkerr();
            if (this.eflag) break ;
            this.out(' (this.inbuf.charCodeAt(this.inp) <= ') ;
            this.out(this.token) ;
            this.out(')  )') ;
            break }
        } ;
        if ((!this.pflag) && (!this.eflag)) {
          this.pflag = true ;
          if (this.pflag) {
            while (!this.eflag) {
              this.out('(this.inbuf.charCodeAt(this.inp) == ') ;
              this.out(this.token) ;
              this.out(') ') ;
              break }
          } ;
        } ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleCX3: function () {
    this.ctxpush('NUMBER') ;
    this.ruleNUMBER() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('SQUOTE') ;
      this.ruleSQUOTE() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          this.token = this.inbuf.charCodeAt(this.inp) ;
          this.inp++ ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          break }
      } ;
    } ;
  } ,

  // token definitions 
  rulePREFIX: function () {
    this.pflag = true ;
    while (this.pflag) {
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 32)  ||
        (this.inbuf.charCodeAt(this.inp) == 9)  ||
        (this.inbuf.charCodeAt(this.inp) == 13)  ||
        (this.inbuf.charCodeAt(this.inp) == 10)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
    };
    this.pflag = true ;
    if (this.pflag) {
    } ;
  } ,

  ruleID: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.ctxpush('ALPHA') ;
      this.ruleALPHA() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('ALPHA') ;
        this.ruleALPHA() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (this.pflag) {
        } ;
        if (!this.pflag) {
          this.ctxpush('DIGIT') ;
          this.ruleDIGIT() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (this.pflag) {
          } ;
        } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleNUMBER: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.ctxpush('DIGIT') ;
      this.ruleDIGIT() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('DIGIT') ;
        this.ruleDIGIT() ;
        this.ctxpop() ;
        if (this.eflag) return ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleSTRING: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 39)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.pflag = 
          (this.inbuf.charCodeAt(this.inp) == 13)  ||
          (this.inbuf.charCodeAt(this.inp) == 10)  ||
          (this.inbuf.charCodeAt(this.inp) == 39)  ;
        this.pflag = !this.pflag ;
        if (this.pflag) {
          if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
          this.inp++ } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 39)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleALPHA: function () {
    this.pflag = 
      ((this.inbuf.charCodeAt(this.inp) >= 65) &&
       (this.inbuf.charCodeAt(this.inp) <= 90)  ) ||
      ((this.inbuf.charCodeAt(this.inp) >= 97) &&
       (this.inbuf.charCodeAt(this.inp) <= 122)  ) ;
    if (this.pflag) {
      if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
      this.inp++ } ;
    if (this.pflag) {
    } ;
  } ,

  ruleDIGIT: function () {
    this.pflag = 
      ((this.inbuf.charCodeAt(this.inp) >= 48) &&
       (this.inbuf.charCodeAt(this.inp) <= 57)  ) ;
    if (this.pflag) {
      if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
      this.inp++ } ;
    if (this.pflag) {
    } ;
  } ,

  ruleSQUOTE: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 39)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleCMLINE: function () {
    this.tflag = true ; 
    this.token = '' ;
    this.pflag = true ;
    if (this.pflag) {
      this.pflag = true ;
      while (this.pflag) {
        this.pflag = 
          (this.inbuf.charCodeAt(this.inp) == 10)  ||
          (this.inbuf.charCodeAt(this.inp) == 13)  ||
          (this.inbuf.charCodeAt(this.inp) == 93)  ;
        this.pflag = !this.pflag ;
        if (this.pflag) {
          if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
          this.inp++ } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  // runtime variables
  pflag: false ,
  tflag: false ,
  eflag: false ,
  inp: 0 ,
  inbuf:  '' ,
  outbuf:  '' ,
  erule:  '' ,
  einput: 0 ,
  token: '' ,
  labelcount: 0 ,
  stackframesize: 6 ,
  stackframe: 0 ,
  stos: -1 ,
  stack: [] ,

  initialize: function () {
    // initialize for another compile
    this.pflag = false ;
    this.tflag = false ;
    this.eflag = false ;
    this.inp = 0 ;
    this.outbuf = '' ;
    this.erule = '' ;
    this.einput = 0 ;
    this.token = '' ;
    this.labelcount = 1 ;
    this.stackframe = -1 ;
    this.stos = -1 ;
    this.stack = [] ;
  },

  ctxpush: function (rulename){
    // push and initialize a new stackframe
    var LM ;
    // new context inherits current context left margin
    LM = 0; if (this.stackframe >= 0) LM = this.stack[this.stackframe + 2] ;
    this.stos++ ;
    this.stackframe = this.stos * this.stackframesize ;
    // stackframe definition
    this.stack[this.stackframe + 0] = 0 ;        // generated label
    this.stack[this.stackframe + 1] = rulename ; // called rule name
    this.stack[this.stackframe + 2] = LM ;       // left margin
    // clear additional stackframe backtracking entries
    this.bkclear() ;
  },

  ctxpop: function (){
    // pop and possibly deallocate old stackframe
    this.stos-- ; // pop stackframe
    this.stackframe = this.stos * this.stackframesize ;
  },

  out: function (s){
    // output string
    var i ;
    // if newline last output, add left margin before string
    if (this.outbuf.charAt(this.outbuf.length - 1) == '\\n') {
      i = this.stack[this.stackframe + 2] ;
      while (i>0) { this.outbuf += ' ' ; i-- } ; } ;
    this.outbuf += s ;
  },

  eol: function (){
    // output end of line
    this.outbuf += '\\n' ;
  },

  test: function (s) {
    // test for a string in the input
    var i ;
    // delete whitespace
    while ((this.inbuf.charAt(this.inp) == ' ')  ||
           (this.inbuf.charAt(this.inp) == '\\n') ||
           (this.inbuf.charAt(this.inp) == '\\r') ||
           (this.inbuf.charAt(this.inp) == '\\t') ) this.inp++ ;
    // test string case insensitive
    this.pflag = true ; i = 0 ;
    while (this.pflag && (i < s.length) && ((this.inp+i) < this.inbuf.length) )
    { this.pflag = (s.charAt(i).toUpperCase() ==
                    this.inbuf.charAt(this.inp+i).toUpperCase()) ;
      i++ ; } ;
    this.pflag = this.pflag && (i == s.length) ;
    // advance input if found
    if (this.pflag) this.inp = this.inp + s.length ;
  },

  bkerr: function () {
    // compilation error, provide error indication and context
    this.eflag = true ;
    this.erule = this.stack[this.stackframe + 1] ;
    this.einput = this.inp ;
  },

  bkset: function () {
    // set backtrack context on stack
    this.stack[this.stackframe + 3] = this.inp ;           // input position
    this.stack[this.stackframe + 4] = this.outbuf.length ; // output position
    this.stack[this.stackframe + 5] = this.token ;         // current token
  },

  bkclear: function () {
    // clear backtrack context on stack
    this.stack[this.stackframe + 3] = -1 ; // input position
    this.stack[this.stackframe + 4] = -1 ; // output position
    this.stack[this.stackframe + 5] = '' ; // current token
  },

  bkrestore: function () {
    // restore context for backtracking
    this.eflag = false ;
    this.inp = this.stack[this.stackframe + 3] ;           // input position
    this.outbuf = this.outbuf.substring(0,this.stack[this.stackframe + 4]) ; // output position
    this.token = this.stack[this.stackframe + 5] ;         // current token
  }

}`

code_c["c01bjs. demo, AEXP2 assignments compiler c[i02b,c13js]"] = `
// AEXP2 compiler
compiler = {

  compile: function (input) {
    // initialize compiler variables
    this.inbuf = input ;
    this.initialize() ;
    // call the first rule
    this.ctxpush('AEXP2') ;
    this.ruleAEXP2() ;
    this.ctxpop() ;
    // special case handling of first rule failure
    if ((!this.eflag) && (!this.pflag)) {
      this.eflag = true ;
      this.erule = 'AEXP2' ;
      this.einput = this.inp ; } ;
    return this.eflag ;
  },

  ruleAEXP2: function () {
    this.ctxpush('AS') ;
    this.ruleAS() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.ctxpush('AS') ;
          this.ruleAS() ;
          this.ctxpop() ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleAS: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('\\t') ;
        this.out('address ') ;
        this.out(this.token) ;
        this.eol() ;
        this.test(':=');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.ctxpush('RX1') ;
        this.ruleRX1() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.out('\\t') ;
        this.out('store') ;
        this.eol() ;
        this.test(';');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleRX1: function () {
    this.ctxpush('RX2') ;
    this.ruleRX2() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.bkset() ;
        this.test('=');
        if (this.pflag) {
          while (!this.eflag) {
            this.ctxpush('RX2') ;
            this.ruleRX2() ;
            this.ctxpop() ;
            if (!this.pflag) this.bkerr();
            if (this.eflag) break ;
            this.out('\\t') ;
            this.out('eq') ;
            this.eol() ;
            break }
        } ;
        if (!this.pflag) {
          if (this.eflag) this.bkrestore() ;
          this.test('<');
          if (this.pflag) {
            while (!this.eflag) {
              this.ctxpush('RX2') ;
              this.ruleRX2() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              this.out('\\t') ;
              this.out('lt') ;
              this.eol() ;
              break }
          } ;
        } ;
        if (!this.pflag) {
          if (this.eflag) this.bkrestore() ;
          this.test('>');
          if (this.pflag) {
            while (!this.eflag) {
              this.ctxpush('RX2') ;
              this.ruleRX2() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              this.out('\\t') ;
              this.out('gt') ;
              this.eol() ;
              break }
          } ;
        } ;
        if (!this.pflag) {
          if (this.eflag) this.bkrestore() ;
          this.test('<=');
          if (this.pflag) {
            while (!this.eflag) {
              this.ctxpush('RX2') ;
              this.ruleRX2() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              this.out('\\t') ;
              this.out('le') ;
              this.eol() ;
              break }
          } ;
        } ;
        if (!this.pflag) {
          if (this.eflag) this.bkrestore() ;
          this.test('>=');
          if (this.pflag) {
            while (!this.eflag) {
              this.ctxpush('RX2') ;
              this.ruleRX2() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              this.out('\\t') ;
              this.out('ge') ;
              this.eol() ;
              break }
          } ;
        } ;
        if (!this.pflag) {
          if (this.eflag) this.bkrestore() ;
          this.pflag = true ;
          if (this.pflag) {
            while (!this.eflag) {
              break }
          } ;
        } ;
        if (this.eflag) this.bkrestore() ;
        this.bkclear() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleRX2: function () {
    this.test('~');
    if (this.pflag) {
      while (!this.eflag) {
        this.ctxpush('EX0') ;
        this.ruleEX0() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.out('\\t') ;
        this.out('not') ;
        this.eol() ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('EX0') ;
      this.ruleEX0() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          break }
      } ;
    } ;
  } ,

  ruleEX0: function () {
    this.ctxpush('EX1') ;
    this.ruleEX1() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.test('<-');
        if (this.pflag) {
          while (!this.eflag) {
            this.ctxpush('EX1') ;
            this.ruleEX1() ;
            this.ctxpop() ;
            if (!this.pflag) this.bkerr();
            if (this.eflag) break ;
            this.out('\\t') ;
            this.out('shl') ;
            this.eol() ;
            break }
        } ;
        if ((!this.pflag) && (!this.eflag)) {
          this.test('->');
          if (this.pflag) {
            while (!this.eflag) {
              this.ctxpush('EX2') ;
              this.ruleEX2() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              this.out('\\t') ;
              this.out('shr') ;
              this.eol() ;
              break }
          } ;
        } ;
        if ((!this.pflag) && (!this.eflag)) {
          this.pflag = true ;
          if (this.pflag) {
            while (!this.eflag) {
              break }
          } ;
        } ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleEX1: function () {
    this.ctxpush('EX2') ;
    this.ruleEX2() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.bkset() ;
          this.test('+');
          if (this.pflag) {
            while (!this.eflag) {
              this.ctxpush('EX2') ;
              this.ruleEX2() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              this.out('\\t') ;
              this.out('add') ;
              this.eol() ;
              break }
          } ;
          if (!this.pflag) {
            if (this.eflag) this.bkrestore() ;
            this.test('-');
            if (this.pflag) {
              while (!this.eflag) {
                this.ctxpush('EX2') ;
                this.ruleEX2() ;
                this.ctxpop() ;
                if (!this.pflag) this.bkerr();
                if (this.eflag) break ;
                this.out('\\t') ;
                this.out('sub') ;
                this.eol() ;
                break }
            } ;
          } ;
          if (this.eflag) this.bkrestore() ;
          this.bkclear() ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleEX2: function () {
    this.ctxpush('EX3') ;
    this.ruleEX3() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.test('*');
          if (this.pflag) {
            while (!this.eflag) {
              this.ctxpush('EX3') ;
              this.ruleEX3() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              this.out('\\t') ;
              this.out('mpy') ;
              this.eol() ;
              break }
          } ;
          if ((!this.pflag) && (!this.eflag)) {
            this.test('/');
            if (this.pflag) {
              while (!this.eflag) {
                this.ctxpush('EX3') ;
                this.ruleEX3() ;
                this.ctxpop() ;
                if (!this.pflag) this.bkerr();
                if (this.eflag) break ;
                this.out('\\t') ;
                this.out('div') ;
                this.eol() ;
                break }
            } ;
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleEX3: function () {
    this.ctxpush('EX4') ;
    this.ruleEX4() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.test('^');
          if (this.pflag) {
            while (!this.eflag) {
              this.ctxpush('EX3') ;
              this.ruleEX3() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              this.out('\\t') ;
              this.out('exp') ;
              this.eol() ;
              break }
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
  } ,

  ruleEX4: function () {
    this.test('+');
    if (this.pflag) {
      while (!this.eflag) {
        this.ctxpush('EX5') ;
        this.ruleEX5() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('-');
      if (this.pflag) {
        while (!this.eflag) {
          this.ctxpush('EX5') ;
          this.ruleEX5() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.out('\\t') ;
          this.out('minus') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('EX5') ;
      this.ruleEX5() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          break }
      } ;
    } ;
  } ,

  ruleEX5: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('\\t') ;
        this.out('load ') ;
        this.out(this.token) ;
        this.eol() ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('NUMBER') ;
      this.ruleNUMBER() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          this.out('\\t') ;
          this.out('literal ') ;
          this.out(this.token) ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('(');
      if (this.pflag) {
        while (!this.eflag) {
          this.ctxpush('EX0') ;
          this.ruleEX0() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.test(')');
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          break }
      } ;
    } ;
  } ,

  rulePREFIX: function () {
    this.pflag = true ;
    while (this.pflag) {
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 32)  ||
        (this.inbuf.charCodeAt(this.inp) == 9)  ||
        (this.inbuf.charCodeAt(this.inp) == 13)  ||
        (this.inbuf.charCodeAt(this.inp) == 10)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
    };
    this.pflag = true ;
    if (this.pflag) {
    } ;
  } ,

  ruleID: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.pflag = 
        ((this.inbuf.charCodeAt(this.inp) >= 65) &&
         (this.inbuf.charCodeAt(this.inp) <= 90)  ) ||
        ((this.inbuf.charCodeAt(this.inp) >= 97) &&
         (this.inbuf.charCodeAt(this.inp) <= 122)  ) ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.pflag = 
          ((this.inbuf.charCodeAt(this.inp) >= 65) &&
           (this.inbuf.charCodeAt(this.inp) <= 90)  ) ||
          ((this.inbuf.charCodeAt(this.inp) >= 97) &&
           (this.inbuf.charCodeAt(this.inp) <= 122)  ) ;
        if (this.pflag) {
          if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
          this.inp++ } ;
        if (this.pflag) {
        } ;
        if (!this.pflag) {
          this.pflag = 
            ((this.inbuf.charCodeAt(this.inp) >= 48) &&
             (this.inbuf.charCodeAt(this.inp) <= 57)  ) ;
          if (this.pflag) {
            if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
            this.inp++ } ;
          if (this.pflag) {
          } ;
        } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleNUMBER: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.pflag = 
        ((this.inbuf.charCodeAt(this.inp) >= 48) &&
         (this.inbuf.charCodeAt(this.inp) <= 57)  ) ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.pflag = 
          ((this.inbuf.charCodeAt(this.inp) >= 48) &&
           (this.inbuf.charCodeAt(this.inp) <= 57)  ) ;
        if (this.pflag) {
          if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
          this.inp++ } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  // runtime variables
  pflag: false ,
  tflag: false ,
  eflag: false ,
  inp: 0 ,
  inbuf:  '' ,
  outbuf:  '' ,
  erule:  '' ,
  einput: 0 ,
  token: '' ,
  labelcount: 0 ,
  stackframesize: 6 ,
  stackframe: 0 ,
  stos: -1 ,
  stack: [] ,

  initialize: function () {
    // initialize for another compile
    this.pflag = false ;
    this.tflag = false ;
    this.eflag = false ;
    this.inp = 0 ;
    this.outbuf = '' ;
    this.erule = '' ;
    this.einput = 0 ;
    this.token = '' ;
    this.labelcount = 1 ;
    this.stackframe = -1 ;
    this.stos = -1 ;
    this.stack = [] ;
  },

  ctxpush: function (rulename){
    // push and initialize a new stackframe
    var LM ;
    // new context inherits current context left margin
    LM = 0; if (this.stackframe >= 0) LM = this.stack[this.stackframe + 2] ;
    this.stos++ ;
    this.stackframe = this.stos * this.stackframesize ;
    // stackframe definition
    this.stack[this.stackframe + 0] = 0 ;        // generated label
    this.stack[this.stackframe + 1] = rulename ; // called rule name
    this.stack[this.stackframe + 2] = LM ;       // left margin
    // clear additional stackframe backtracking entries
    this.bkclear() ;
  },

  ctxpop: function (){
    // pop and possibly deallocate old stackframe
    this.stos-- ; // pop stackframe
    this.stackframe = this.stos * this.stackframesize ;
  },

  out: function (s){
    // output string
    var i ;
    // if newline last output, add left margin before string
    if (this.outbuf.charAt(this.outbuf.length - 1) == '\\n') {
      i = this.stack[this.stackframe + 2] ;
      while (i>0) { this.outbuf += ' ' ; i-- } ; } ;
    this.outbuf += s ;
  },

  eol: function (){
    // output end of line
    this.outbuf += '\\n' ;
  },

  test: function (s) {
    // test for a string in the input
    var i ;
    // delete whitespace
    while ((this.inbuf.charAt(this.inp) == ' ')  ||
           (this.inbuf.charAt(this.inp) == '\\n') ||
           (this.inbuf.charAt(this.inp) == '\\r') ||
           (this.inbuf.charAt(this.inp) == '\\t') ) this.inp++ ;
    // test string case insensitive
    this.pflag = true ; i = 0 ;
    while (this.pflag && (i < s.length) && ((this.inp+i) < this.inbuf.length) )
    { this.pflag = (s.charAt(i).toUpperCase() ==
                    this.inbuf.charAt(this.inp+i).toUpperCase()) ;
      i++ ; } ;
    this.pflag = this.pflag && (i == s.length) ;
    // advance input if found
    if (this.pflag) this.inp = this.inp + s.length ;
  },

  bkerr: function () {
    // compilation error, provide error indication and context
    this.eflag = true ;
    this.erule = this.stack[this.stackframe + 1] ;
    this.einput = this.inp ;
  },

  bkset: function () {
    // set backtrack context on stack
    this.stack[this.stackframe + 3] = this.inp ;           // input position
    this.stack[this.stackframe + 4] = this.outbuf.length ; // output position
    this.stack[this.stackframe + 5] = this.token ;         // current token
  },

  bkclear: function () {
    // clear backtrack context on stack
    this.stack[this.stackframe + 3] = -1 ; // input position
    this.stack[this.stackframe + 4] = -1 ; // output position
    this.stack[this.stackframe + 5] = '' ; // current token
  },

  bkrestore: function () {
    // restore context for backtracking
    this.eflag = false ;
    this.inp = this.stack[this.stackframe + 3] ;           // input position
    this.outbuf = this.outbuf.substring(0,this.stack[this.stackframe + 4]) ; // output position
    this.token = this.stack[this.stackframe + 5] ;         // current token
  }

}`

code_c["c00a. demo, compiled assignments c[i01a,c01bjs] "] = `
\taddress fern
\tliteral 5
\tliteral 6
\tadd
\tstore
\taddress ace
\tload fern
\tliteral 5
\tmpy
\tstore
\taddress waldo
\tload fern
\tload alpha
\tload beta
\tminus
\tload gamma
\texp
\tdiv
\tadd
\tstore
\taddress fern
\tliteral 5
\tliteral 6
\tle
\tstore
\taddress ace
\tload fern
\tliteral 5
\tmpy
\tload bob
\tge
\tstore
\taddress waldo
\tload fern
\tload alpha
\tshl
\tload beta
\tload gamma
\tshr
\tle
\tstore`

code_c["c03js. Meta II reordered, c[i04a,c13js]"] = `
// PROGRAM compiler
compiler = {

  compile: function (input) {
    // initialize compiler variables
    this.inbuf = input ;
    this.initialize() ;
    // call the first rule
    this.ctxpush('PROGRAM') ;
    this.rulePROGRAM() ;
    this.ctxpop() ;
    // special case handling of first rule failure
    if ((!this.eflag) && (!this.pflag)) {
      this.eflag = true ;
      this.erule = 'PROGRAM' ;
      this.einput = this.inp ; } ;
    return this.eflag ;
  },

  rulePROGRAM: function () {
    this.test('.SYNTAX');
    if (this.pflag) {
      while (!this.eflag) {
        this.ctxpush('ID') ;
        this.ruleID() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.out('\\t') ;
        this.out('ADR ') ;
        this.out(this.token) ;
        this.eol() ;
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.ctxpush('ST') ;
          this.ruleST() ;
          this.ctxpop() ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.test('.END');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.out('\\t') ;
        this.out('END') ;
        this.eol() ;
        break }
    } ;
  } ,

  ruleST: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out(this.token) ;
        this.eol() ;
        this.test('=');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.ctxpush('EX1') ;
        this.ruleEX1() ;
        this.ctxpop() ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.test('.,');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.out('\\t') ;
        this.out('R') ;
        this.eol() ;
        break }
    } ;
  } ,

  ruleEX1: function () {
    this.ctxpush('EX2') ;
    this.ruleEX2() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.test('/');
          if (this.pflag) {
            while (!this.eflag) {
              this.out('\\t') ;
              this.out('BT L') ;
              if (this.stack[this.stackframe + 0] == 0) {
                this.stack[this.stackframe + 0] = this.labelcount ;
                this.labelcount++ ; } ;
              this.out(this.stack[this.stackframe + 0]) ;
              this.eol() ;
              this.ctxpush('EX2') ;
              this.ruleEX2() ;
              this.ctxpop() ;
              if (!this.pflag) this.bkerr();
              if (this.eflag) break ;
              break }
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.out('L') ;
        if (this.stack[this.stackframe + 0] == 0) {
          this.stack[this.stackframe + 0] = this.labelcount ;
          this.labelcount++ ; } ;
        this.out(this.stack[this.stackframe + 0]) ;
        this.eol() ;
        break }
    } ;
  } ,

  ruleEX2: function () {
    this.ctxpush('EX3') ;
    this.ruleEX3() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('\\t') ;
        this.out('BF L') ;
        if (this.stack[this.stackframe + 0] == 0) {
          this.stack[this.stackframe + 0] = this.labelcount ;
          this.labelcount++ ; } ;
        this.out(this.stack[this.stackframe + 0]) ;
        this.eol() ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('OUTPUT') ;
      this.ruleOUTPUT() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          break }
      } ;
    } ;
    if (this.pflag) {
      while (!this.eflag) {
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.ctxpush('EX3') ;
          this.ruleEX3() ;
          this.ctxpop() ;
          if (this.pflag) {
            while (!this.eflag) {
              this.out('\\t') ;
              this.out('BE') ;
              this.eol() ;
              break }
          } ;
          if ((!this.pflag) && (!this.eflag)) {
            this.ctxpush('OUTPUT') ;
            this.ruleOUTPUT() ;
            this.ctxpop() ;
            if (this.pflag) {
              while (!this.eflag) {
                break }
            } ;
          } ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.out('L') ;
        if (this.stack[this.stackframe + 0] == 0) {
          this.stack[this.stackframe + 0] = this.labelcount ;
          this.labelcount++ ; } ;
        this.out(this.stack[this.stackframe + 0]) ;
        this.eol() ;
        break }
    } ;
  } ,

  ruleEX3: function () {
    this.ctxpush('ID') ;
    this.ruleID() ;
    this.ctxpop() ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('\\t') ;
        this.out('CLL ') ;
        this.out(this.token) ;
        this.eol() ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('STRING') ;
      this.ruleSTRING() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          this.out('\\t') ;
          this.out('TST ') ;
          this.out(this.token) ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.ID');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('\\t') ;
          this.out('ID') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.NUMBER');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('\\t') ;
          this.out('NUM') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.STRING');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('\\t') ;
          this.out('SR') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('(');
      if (this.pflag) {
        while (!this.eflag) {
          this.ctxpush('EX1') ;
          this.ruleEX1() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.test(')');
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.EMPTY');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('\\t') ;
          this.out('SET') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('$');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('L') ;
          if (this.stack[this.stackframe + 0] == 0) {
            this.stack[this.stackframe + 0] = this.labelcount ;
            this.labelcount++ ; } ;
          this.out(this.stack[this.stackframe + 0]) ;
          this.eol() ;
          this.ctxpush('EX3') ;
          this.ruleEX3() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          this.out('\\t') ;
          this.out('BT L') ;
          if (this.stack[this.stackframe + 0] == 0) {
            this.stack[this.stackframe + 0] = this.labelcount ;
            this.labelcount++ ; } ;
          this.out(this.stack[this.stackframe + 0]) ;
          this.eol() ;
          this.out('\\t') ;
          this.out('SET') ;
          this.eol() ;
          break }
      } ;
    } ;
  } ,

  ruleOUTPUT: function () {
    this.test('.OUT');
    if (this.pflag) {
      while (!this.eflag) {
        this.test('(');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.pflag = true ;
        while (this.pflag & !this.eflag) {
          this.ctxpush('OUT1') ;
          this.ruleOUT1() ;
          this.ctxpop() ;
        } ;
        this.pflag = !this.eflag ;
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        this.test(')');
        if (!this.pflag) this.bkerr();
        if (this.eflag) break ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('.LABEL');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('\\t') ;
          this.out('LB') ;
          this.eol() ;
          this.ctxpush('OUT1') ;
          this.ruleOUT1() ;
          this.ctxpop() ;
          if (!this.pflag) this.bkerr();
          if (this.eflag) break ;
          break }
      } ;
    } ;
    if (this.pflag) {
      while (!this.eflag) {
        this.out('\\t') ;
        this.out('OUT') ;
        this.eol() ;
        break }
    } ;
  } ,

  ruleOUT1: function () {
    this.test('*1');
    if (this.pflag) {
      while (!this.eflag) {
        this.out('\\t') ;
        this.out('GN1') ;
        this.eol() ;
        break }
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('*2');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('\\t') ;
          this.out('GN2') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.test('*');
      if (this.pflag) {
        while (!this.eflag) {
          this.out('\\t') ;
          this.out('CI') ;
          this.eol() ;
          break }
      } ;
    } ;
    if ((!this.pflag) && (!this.eflag)) {
      this.ctxpush('STRING') ;
      this.ruleSTRING() ;
      this.ctxpop() ;
      if (this.pflag) {
        while (!this.eflag) {
          this.out('\\t') ;
          this.out('CL ') ;
          this.out(this.token) ;
          this.eol() ;
          break }
      } ;
    } ;
  } ,

  rulePREFIX: function () {
    this.pflag = true ;
    while (this.pflag) {
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 32)  ||
        (this.inbuf.charCodeAt(this.inp) == 9)  ||
        (this.inbuf.charCodeAt(this.inp) == 13)  ||
        (this.inbuf.charCodeAt(this.inp) == 10)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
    };
    this.pflag = true ;
    if (this.pflag) {
    } ;
  } ,

  ruleID: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.ctxpush('ALPHA') ;
      this.ruleALPHA() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('ALPHA') ;
        this.ruleALPHA() ;
        this.ctxpop() ;
        if (this.eflag) return ;
        if (this.pflag) {
        } ;
        if (!this.pflag) {
          this.ctxpush('DIGIT') ;
          this.ruleDIGIT() ;
          this.ctxpop() ;
          if (this.eflag) return ;
          if (this.pflag) {
          } ;
        } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleNUMBER: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.ctxpush('DIGIT') ;
      this.ruleDIGIT() ;
      this.ctxpop() ;
      if (this.eflag) return ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.ctxpush('DIGIT') ;
        this.ruleDIGIT() ;
        this.ctxpop() ;
        if (this.eflag) return ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleSTRING: function () {
    this.ctxpush('PREFIX') ;
    this.rulePREFIX() ;
    this.ctxpop() ;
    if (this.eflag) return ;
    if (this.pflag) {
      this.tflag = true ; 
      this.token = '' ;
      this.pflag = true ;
      if (!this.pflag) return;
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 39)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
      this.pflag = true ;
      while (this.pflag) {
        this.pflag = 
          (this.inbuf.charCodeAt(this.inp) == 13)  ||
          (this.inbuf.charCodeAt(this.inp) == 10)  ||
          (this.inbuf.charCodeAt(this.inp) == 39)  ;
        this.pflag = !this.pflag ;
        if (this.pflag) {
          if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
          this.inp++ } ;
      };
      this.pflag = true ;
      if (!this.pflag) return;
      this.pflag = 
        (this.inbuf.charCodeAt(this.inp) == 39)  ;
      if (this.pflag) {
        if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
        this.inp++ } ;
      if (!this.pflag) return;
      this.tflag = false ;
      this.pflag = true ;
      if (!this.pflag) return;
    } ;
  } ,

  ruleALPHA: function () {
    this.pflag = 
      ((this.inbuf.charCodeAt(this.inp) >= 65) &&
       (this.inbuf.charCodeAt(this.inp) <= 90)  ) ||
      ((this.inbuf.charCodeAt(this.inp) >= 97) &&
       (this.inbuf.charCodeAt(this.inp) <= 122)  ) ;
    if (this.pflag) {
      if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
      this.inp++ } ;
    if (this.pflag) {
    } ;
  } ,

  ruleDIGIT: function () {
    this.pflag = 
      ((this.inbuf.charCodeAt(this.inp) >= 48) &&
       (this.inbuf.charCodeAt(this.inp) <= 57)  ) ;
    if (this.pflag) {
      if (this.tflag) this.token += this.inbuf.charAt(this.inp) ;
      this.inp++ } ;
    if (this.pflag) {
    } ;
  } ,

  // runtime variables
  pflag: false ,
  tflag: false ,
  eflag: false ,
  inp: 0 ,
  inbuf:  '' ,
  outbuf:  '' ,
  erule:  '' ,
  einput: 0 ,
  token: '' ,
  labelcount: 0 ,
  stackframesize: 6 ,
  stackframe: 0 ,
  stos: -1 ,
  stack: [] ,

  initialize: function () {
    // initialize for another compile
    this.pflag = false ;
    this.tflag = false ;
    this.eflag = false ;
    this.inp = 0 ;
    this.outbuf = '' ;
    this.erule = '' ;
    this.einput = 0 ;
    this.token = '' ;
    this.labelcount = 1 ;
    this.stackframe = -1 ;
    this.stos = -1 ;
    this.stack = [] ;
  },

  ctxpush: function (rulename){
    // push and initialize a new stackframe
    var LM ;
    // new context inherits current context left margin
    LM = 0; if (this.stackframe >= 0) LM = this.stack[this.stackframe + 2] ;
    this.stos++ ;
    this.stackframe = this.stos * this.stackframesize ;
    // stackframe definition
    this.stack[this.stackframe + 0] = 0 ;        // generated label
    this.stack[this.stackframe + 1] = rulename ; // called rule name
    this.stack[this.stackframe + 2] = LM ;       // left margin
    // clear additional stackframe backtracking entries
    this.bkclear() ;
  },

  ctxpop: function (){
    // pop and possibly deallocate old stackframe
    this.stos-- ; // pop stackframe
    this.stackframe = this.stos * this.stackframesize ;
  },

  out: function (s){
    // output string
    var i ;
    // if newline last output, add left margin before string
    if (this.outbuf.charAt(this.outbuf.length - 1) == '\\n') {
      i = this.stack[this.stackframe + 2] ;
      while (i>0) { this.outbuf += ' ' ; i-- } ; } ;
    this.outbuf += s ;
  },

  eol: function (){
    // output end of line
    this.outbuf += '\\n' ;
  },

  test: function (s) {
    // test for a string in the input
    var i ;
    // delete whitespace
    while ((this.inbuf.charAt(this.inp) == ' ')  ||
           (this.inbuf.charAt(this.inp) == '\\n') ||
           (this.inbuf.charAt(this.inp) == '\\r') ||
           (this.inbuf.charAt(this.inp) == '\\t') ) this.inp++ ;
    // test string case insensitive
    this.pflag = true ; i = 0 ;
    while (this.pflag && (i < s.length) && ((this.inp+i) < this.inbuf.length) )
    { this.pflag = (s.charAt(i).toUpperCase() ==
                    this.inbuf.charAt(this.inp+i).toUpperCase()) ;
      i++ ; } ;
    this.pflag = this.pflag && (i == s.length) ;
    // advance input if found
    if (this.pflag) this.inp = this.inp + s.length ;
  },

  bkerr: function () {
    // compilation error, provide error indication and context
    this.eflag = true ;
    this.erule = this.stack[this.stackframe + 1] ;
    this.einput = this.inp ;
  },

  bkset: function () {
    // set backtrack context on stack
    this.stack[this.stackframe + 3] = this.inp ;           // input position
    this.stack[this.stackframe + 4] = this.outbuf.length ; // output position
    this.stack[this.stackframe + 5] = this.token ;         // current token
  },

  bkclear: function () {
    // clear backtrack context on stack
    this.stack[this.stackframe + 3] = -1 ; // input position
    this.stack[this.stackframe + 4] = -1 ; // output position
    this.stack[this.stackframe + 5] = '' ; // current token
  },

  bkrestore: function () {
    // restore context for backtracking
    this.eflag = false ;
    this.inp = this.stack[this.stackframe + 3] ;           // input position
    this.outbuf = this.outbuf.substring(0,this.stack[this.stackframe + 4]) ; // output position
    this.token = this.stack[this.stackframe + 5] ;         // current token
  }

}`

input_i["ia14. with \\t \\n and {}"] = `.SYNTAX PROGRAM
  [ Example Metacompiler Definition ]
  [ interpreter code version ]
  [ James M. Neighbors ]
  
  [ body of compiler definition ]
  PROGRAM = '.SYNTAX' ID {.LB \\t 'ADR ' * \\n}
            $(PR / COMMENT)  
            '.TOKENS'
            $(TR / COMMENT)
            '.END' {\\t 'END' \\n};
  
  [ parsing rule definition ]
  PR = ID {.LB * \\n} '=' EX1 ';' {\\t 'R' \\n}; 
  
  [ token rule definition ]
  TR = ID {.LB * \\n} ':' TX1 ';' {\\t 'R' \\n};
  
  [ comment definition ]
  COMMENT = '[' CMLINE ']' {.LB ';' * \\n};
  
  [ parsing expressions ]
  EX1 = EX2 $('/' {\\t 'BT L'# \\n} EX2 )
        {.LB 'L'# \\n};
  
  EX2 = (EX3 {\\t 'BF L'# \\n} / OUTPUT)
        $(EX3 {\\t 'BE' \\n} / OUTPUT)
        {.LB 'L'# \\n};
  
  EX3 = ID        {\\t 'CLL '* \\n}        /
        STRING    {\\t 'TST ' 39 * 39 \\n} /
        '(' EX1 ')'                            /
        '.EMPTY'  {\\t 'SET' \\n}          /
        '.LITCHR' {\\t 'LCH' \\n}          /
        '$' {.LB 'L'# \\n} EX3 {\\t 'BT L'# \\n} {\\t 'SET' \\n};
  
  [ output expressions ]
  OUTPUT = '{' $OUT1 '}';
  
  OUT1 = '*'     {\\t 'CI' \\n}          /
         STRING  {\\t 'CL ' 39 * 39 \\n} /
         NUMBER  {\\t 'CC '* \\n}        /
         '#'     {\\t 'GN' \\n}          /
         '\\n'    {\\t 'NL' \\n}          /
         '.LB'   {\\t 'LB' \\n}          /
         '\\t'    {\\t 'TB' \\n}          /
         '.LM+'  {\\t 'LMI' \\n}         /
         '.LM-'  {\\t 'LMD' \\n}         ;
  
  [ token expressions ]
  TX1 = TX2 $('/' {\\t 'BT T'# \\n} TX2) 
        {.LB 'T'# \\n};
  
  TX2 = TX3 {\\t 'BF T'# \\n}
        $(TX3 {\\t 'RF' \\n} )
        {.LB 'T'# \\n};
  
  TX3 = ( '.TOKEN'         {\\t 'TFT' \\n} /
          '.DELTOK'        {\\t 'TFF' \\n} /
          '$' {.LB 'T'# \\n} TX3 {\\t 'BT T'# \\n} ) 
                           {\\t 'SET' \\n}               /
        '.ANYBUT(' CX1 ')' {\\t 'NOT' \\n \\t 'SCN' \\n} /
        '.ANY(' CX1 ')'    {\\t 'SCN' \\n}               /
        ID                 {\\t 'CLL ' * \\n}            /
        '(' TX1 ')'                                          ;
  
  [ character expressions ]            
  CX1 = CX2 $('!' {\\t 'BT C'# \\n} CX2) {.LB 'C'# \\n} ;
  CX2 = CX3 (':' {\\t 'CGE ' * \\n} {\\t 'BF D'# \\n} 
                 CX3
                 {\\t 'CLE ' * \\n} {.LB 'D' # \\n} /
             .EMPTY {\\t 'CE ' * \\n}                   ) ;
  CX3 = NUMBER / SQUOTE .LITCHR ;
  
  [ token definitions ]
  .TOKENS
  
  PREFIX : $.ANY(32!9!13!10) ;
  ID     : PREFIX .TOKEN ALPHA $(ALPHA/DIGIT) .DELTOK ;
  NUMBER : PREFIX .TOKEN DIGIT $DIGIT .DELTOK ;
  STRING : PREFIX .ANY(39) .TOKEN $.ANYBUT(13!10!39) .DELTOK .ANY(39) ;
  ALPHA  : .ANY('A:'Z!'a:'z) ;
  DIGIT  : .ANY('0:'9) ;
  SQUOTE : PREFIX .ANY('') ;
  CMLINE : .TOKEN $.ANYBUT(10!13!']) .DELTOK ;
  
  .END`;

code_c["ca12. with \\t \\n {}"] = `	ADR PROGRAM
; Example Metacompiler Definition 
; interpreter code version 
; James M. Neighbors 
; body of compiler definition 
PROGRAM
	TST '.SYNTAX'
	BF L1
	CLL ID
	BE
	LB
	TB
	CL 'ADR '
	CI
	NL
L2
	CLL PR
	BF L3
L3
	BT L4
	CLL COMMENT
	BF L5
L5
L4
	BT L2
	SET
	BE
	TST '.TOKENS'
	BE
L6
	CLL TR
	BF L7
L7
	BT L8
	CLL COMMENT
	BF L9
L9
L8
	BT L6
	SET
	BE
	TST '.END'
	BE
	TB
	CL 'END'
	NL
L1
L10
	R
; parsing rule definition 
PR
	CLL ID
	BF L11
	LB
	CI
	NL
	TST '='
	BE
	CLL EX1
	BE
	TST ';'
	BE
	TB
	CL 'R'
	NL
L11
L12
	R
; token rule definition 
TR
	CLL ID
	BF L13
	LB
	CI
	NL
	TST ':'
	BE
	CLL TX1
	BE
	TST ';'
	BE
	TB
	CL 'R'
	NL
L13
L14
	R
; comment definition 
COMMENT
	TST '['
	BF L15
	CLL CMLINE
	BE
	TST ']'
	BE
	LB
	CL ';'
	CI
	NL
L15
L16
	R
; parsing expressions 
EX1
	CLL EX2
	BF L17
L18
	TST '/'
	BF L19
	TB
	CL 'BT L'
	GN
	NL
	CLL EX2
	BE
L19
L20
	BT L18
	SET
	BE
	LB
	CL 'L'
	GN
	NL
L17
L21
	R
EX2
	CLL EX3
	BF L22
	TB
	CL 'BF L'
	GN
	NL
L22
	BT L23
	CLL OUTPUT
	BF L24
L24
L23
	BF L25
L26
	CLL EX3
	BF L27
	TB
	CL 'BE'
	NL
L27
	BT L28
	CLL OUTPUT
	BF L29
L29
L28
	BT L26
	SET
	BE
	LB
	CL 'L'
	GN
	NL
L25
L30
	R
EX3
	CLL ID
	BF L31
	TB
	CL 'CLL '
	CI
	NL
L31
	BT L32
	CLL STRING
	BF L33
	TB
	CL 'TST '
	CC 39
	CI
	CC 39
	NL
L33
	BT L32
	TST '('
	BF L34
	CLL EX1
	BE
	TST ')'
	BE
L34
	BT L32
	TST '.EMPTY'
	BF L35
	TB
	CL 'SET'
	NL
L35
	BT L32
	TST '.LITCHR'
	BF L36
	TB
	CL 'LCH'
	NL
L36
	BT L32
	TST '$'
	BF L37
	LB
	CL 'L'
	GN
	NL
	CLL EX3
	BE
	TB
	CL 'BT L'
	GN
	NL
	TB
	CL 'SET'
	NL
L37
L32
	R
; output expressions 
OUTPUT
	TST '{'
	BF L38
L39
	CLL OUT1
	BT L39
	SET
	BE
	TST '}'
	BE
L38
L40
	R
OUT1
	TST '*'
	BF L41
	TB
	CL 'CI'
	NL
L41
	BT L42
	CLL STRING
	BF L43
	TB
	CL 'CL '
	CC 39
	CI
	CC 39
	NL
L43
	BT L42
	CLL NUMBER
	BF L44
	TB
	CL 'CC '
	CI
	NL
L44
	BT L42
	TST '#'
	BF L45
	TB
	CL 'GN'
	NL
L45
	BT L42
	TST '\\n'
	BF L46
	TB
	CL 'NL'
	NL
L46
	BT L42
	TST '.LB'
	BF L47
	TB
	CL 'LB'
	NL
L47
	BT L42
	TST '\\t'
	BF L48
	TB
	CL 'TB'
	NL
L48
	BT L42
	TST '.LM+'
	BF L49
	TB
	CL 'LMI'
	NL
L49
	BT L42
	TST '.LM-'
	BF L50
	TB
	CL 'LMD'
	NL
L50
L42
	R
; token expressions 
TX1
	CLL TX2
	BF L51
L52
	TST '/'
	BF L53
	TB
	CL 'BT T'
	GN
	NL
	CLL TX2
	BE
L53
L54
	BT L52
	SET
	BE
	LB
	CL 'T'
	GN
	NL
L51
L55
	R
TX2
	CLL TX3
	BF L56
	TB
	CL 'BF T'
	GN
	NL
L57
	CLL TX3
	BF L58
	TB
	CL 'RF'
	NL
L58
L59
	BT L57
	SET
	BE
	LB
	CL 'T'
	GN
	NL
L56
L60
	R
TX3
	TST '.TOKEN'
	BF L61
	TB
	CL 'TFT'
	NL
L61
	BT L62
	TST '.DELTOK'
	BF L63
	TB
	CL 'TFF'
	NL
L63
	BT L62
	TST '$'
	BF L64
	LB
	CL 'T'
	GN
	NL
	CLL TX3
	BE
	TB
	CL 'BT T'
	GN
	NL
L64
L62
	BF L65
	TB
	CL 'SET'
	NL
L65
	BT L66
	TST '.ANYBUT('
	BF L67
	CLL CX1
	BE
	TST ')'
	BE
	TB
	CL 'NOT'
	NL
	TB
	CL 'SCN'
	NL
L67
	BT L66
	TST '.ANY('
	BF L68
	CLL CX1
	BE
	TST ')'
	BE
	TB
	CL 'SCN'
	NL
L68
	BT L66
	CLL ID
	BF L69
	TB
	CL 'CLL '
	CI
	NL
L69
	BT L66
	TST '('
	BF L70
	CLL TX1
	BE
	TST ')'
	BE
L70
L66
	R
; character expressions 
CX1
	CLL CX2
	BF L71
L72
	TST '!'
	BF L73
	TB
	CL 'BT C'
	GN
	NL
	CLL CX2
	BE
L73
L74
	BT L72
	SET
	BE
	LB
	CL 'C'
	GN
	NL
L71
L75
	R
CX2
	CLL CX3
	BF L76
	TST ':'
	BF L77
	TB
	CL 'CGE '
	CI
	NL
	TB
	CL 'BF D'
	GN
	NL
	CLL CX3
	BE
	TB
	CL 'CLE '
	CI
	NL
	LB
	CL 'D'
	GN
	NL
L77
	BT L78
	SET
	BF L79
	TB
	CL 'CE '
	CI
	NL
L79
L78
	BE
L76
L80
	R
CX3
	CLL NUMBER
	BF L81
L81
	BT L82
	CLL SQUOTE
	BF L83
	LCH
	BE
L83
L82
	R
; token definitions 
PREFIX
T84
	CE 32
	BT C85
	CE 9
	BT C85
	CE 13
	BT C85
	CE 10
C85
	SCN
	BT T84
	SET
	BF T86
T86
T87
	R
ID
	CLL PREFIX
	BF T88
	TFT
	SET
	RF
	CLL ALPHA
	RF
T89
	CLL ALPHA
	BF T90
T90
	BT T91
	CLL DIGIT
	BF T92
T92
T91
	BT T89
	SET
	RF
	TFF
	SET
	RF
T88
T93
	R
NUMBER
	CLL PREFIX
	BF T94
	TFT
	SET
	RF
	CLL DIGIT
	RF
T95
	CLL DIGIT
	BT T95
	SET
	RF
	TFF
	SET
	RF
T94
T96
	R
STRING
	CLL PREFIX
	BF T97
	CE 39
C98
	SCN
	RF
	TFT
	SET
	RF
T99
	CE 13
	BT C100
	CE 10
	BT C100
	CE 39
C100
	NOT
	SCN
	BT T99
	SET
	RF
	TFF
	SET
	RF
	CE 39
C101
	SCN
	RF
T97
T102
	R
ALPHA
	CGE 65
	BF D103
	CLE 90
D103
	BT C104
	CGE 97
	BF D105
	CLE 122
D105
C104
	SCN
	BF T106
T106
T107
	R
DIGIT
	CGE 48
	BF D108
	CLE 57
D108
C109
	SCN
	BF T110
T110
T111
	R
SQUOTE
	CLL PREFIX
	BF T112
	CE 39
C113
	SCN
	RF
T112
T114
	R
CMLINE
	TFT
	SET
	BF T115
T116
	CE 10
	BT C117
	CE 13
	BT C117
	CE 93
C117
	NOT
	SCN
	BT T116
	SET
	RF
	TFF
	SET
	RF
T115
T118
	R
	END`;

input_i['ia06. replaced .OUT with {} & add STORE AND LOAD variable by name'] = `.SYNTAX METAII
METAII = '.SYNTAX' .ID {'ADR ' *}
          $ ST
          '.END' {'END'};
ST = .ID .LABEL * '=' EX1 ';' {'R'};
EX1 = EX2 $('/' {'BT ' *1} EX2 )
      .LABEL *1 ;
EX2 = (EX3 {'BF ' *1} / OUTPUT)
      $(EX3 {'BE'} / OUTPUT)
      .LABEL *1 ;
EX3 = .ID       {'CLL '*} /
      .STRING   {'TST '*} /
      '.ID'     {'ID'}    /
      '.NUMBER' {'NUM'}   /
      '.STRING' {'SR'}    /
      '.STORENAMEARR' .ID {'STORENAMEARR '*}    /
      '.STORENAME' .ID {'STORENAME '*}    /
      '(' EX1 ')'             /
      '.EMPTY'  {'SET'}   /
      '$' .LABEL *1 EX3 {'BT ' *1} {'SET'} ;
OUTPUT = ('{'$OUT1 '}' /
          '.LABEL' {'LB'} OUT1)
         {'OUT'};
OUT1 = '*1'    {'GN1'}  /
       '*2'    {'GN2'}  /
       '*N' .ID {'LOADNAME '*}/
       '*'     {'CI'}   /
       .STRING {'CL '*} ;
.END`;
code_c["ca04 with {} instead of .OUT()"] = `	ADR METAII
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
	TST '.STORENAMEARR'
	BF L26
	ID
	BE
	CL 'STORENAMEARR '
	CI
	OUT
L26
	BT L21
	TST '.STORENAME'
	BF L27
	ID
	BE
	CL 'STORENAME '
	CI
	OUT
L27
	BT L21
	TST '('
	BF L28
	CLL EX1
	BE
	TST ')'
	BE
L28
	BT L21
	TST '.EMPTY'
	BF L29
	CL 'SET'
	OUT
L29
	BT L21
	TST '$'
	BF L30
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
L30
L21
	R
OUTPUT
	TST '{'
	BF L31
L32
	CLL OUT1
	BT L32
	SET
	BE
	TST '}'
	BE
L31
	BT L33
	TST '.LABEL'
	BF L34
	CL 'LB'
	OUT
	CLL OUT1
	BE
L34
L33
	BF L35
	CL 'OUT'
	OUT
L35
L36
	R
OUT1
	TST '*1'
	BF L37
	CL 'GN1'
	OUT
L37
	BT L38
	TST '*2'
	BF L39
	CL 'GN2'
	OUT
L39
	BT L38
	TST '*N'
	BF L40
	ID
	BE
	CL 'LOADNAME '
	CI
	OUT
L40
	BT L38
	TST '*'
	BF L41
	CL 'CI'
	OUT
L41
	BT L38
	SR
	BF L42
	CL 'CL '
	CI
	OUT
L42
L38
	R
	END`;
input_i["ia07. compile SQL to EOSIO"] = `.SYNTAX SQL2EOS
SQL2EOS = 'CREATE' 'TABLE' .ID .STORENAME TheTableName '('
  $FIELD
')'
  OUTTEMPLATE;
FIELD = FIELDNAME FIELDTYPE ',';
FIELDNAME = .ID .STORENAMEARR fieldName;
FIELDTYPE = .ID .STORENAMEARR fieldType;
OUTTEMPLATE = 
{ '#include <eosio/eosio.hpp>' }
{ 'using namespace eosio;' }
{ 'class [[eosio::contract("' *N TheTableName '")]] '
  *N TheTableName ' : public eosio::contract {' }
{ '  public:' }
{ '  private:' }
{     'struct [[eosio::table]] rowstruct {' }
*NARR fieldName { *N fielName *N fieldType ';' }
{     '  uint64_t primary_key() const { return key.value; }' }
{     '};' }
{     'using address_index = eosio::multi_index<"people"_n, rowstruct>;' }
{ '};' };

.END`;



input_i["ia07. CREATE TABLE"] = `CREATE TABLE customers (
  accountname name,
  id int,
  firstname string,
  yearofbirth int,
)`;
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