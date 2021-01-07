var programCounter;
var programCode;
var inputPointer;
var inbuf;
var outbuf;
var margin;
var stackframesize = 5; // stack frame size (0=gn1, 1=gn2, 2=programCounter, 3=rule, 4=lm)
var stackframe; // stack frame pointer into stack array
// runtime variables
var exitlevel; // interpreter exit flag
var flag; // parser control flag
var symbolarg; // argument for order codes with symbol arguments 
var stringarg; // argument for order codes with string arguments
var gnlabel; // next numeric label to use
var token; // token string from parse
var outstr; // output string from code ejection
var tokenflag; // collecting token characters
function spaces(){
  while(/[ \t\n]/.test(inbuf.charAt(inputPointer))){ inputPointer++ };
}
function findlabel(s){
  programCounter = programCode.indexOf('\n'+s+'\n');
  if(programCounter >= 0){
    programCounter += s.length + 1;
  }else{
    console.log('label '+s+' not found!\n');
    exitlevel = true;
  }
}
function out(s){ // out - if necessary move to margin before output of s
  if((margin > 0) && (outstr.length == 0)) {
    var col = 0; // advance to left margin
    while (col < margin) { outstr += ' '; col++; };
  }
  outstr += s;
}
var vm = {
  TST: (s) => {
    var i;
    spaces();
    flag = true; i = 0; // test string case insensitive
    while(flag && (i < s.length)){
      flag = (s.charAt(i).toUpperCase() == inbuf.charAt(inputPointer+i).toUpperCase());
      i++;
    }
    if(flag){
      inputPointer += s.length; // advance input if found
    }
  },
  ID: () => {
    spaces();
    flag = ( /[a-zA-Z]/.test(inbuf.charAt(inputPointer)) );
    if(flag) {
      token = '';
      while (flag){
        token += inbuf.charAt(inputPointer);
        inputPointer++;
        flag = ( /[a-zA-Z0-9]/.test(inbuf.charAt(inputPointer)) );
      }
      flag = true;
    }
  },
  NUM: () => {
    spaces();
    flag = ( /[0-9]/.test(inbuf.charAt(inputPointer)) );
    if(flag) {
      token = '';
      while (flag){
        token += inbuf.charAt(inputPointer);
        inputPointer++;
        flag = ( /[0-9]/.test(inbuf.charAt(inputPointer)) );
      }
      flag = true;
    }
  },
  SR: () => {
    spaces();
    flag = (inbuf.charAt(inputPointer) == '\'');
    if(flag) {
      token = '';
      while (flag){
        token = token + inbuf.charAt(inputPointer);
        inputPointer++;
        flag = (inbuf.charAt(inputPointer) != '\'');
      }
      token += '\'';
      inputPointer++;
      flag = true;
    }
  },
  ADR: () => {
    gnlabel = 1;
    inputPointer = 0;
    margin = 0;
    stackframe = 0; // initialize first stackframe 
    stack[stackframe * stackframesize + 0] = 0;         // GN1  also GN (extended only)
    stack[stackframe * stackframesize + 1] = 0;         // GN2
    stack[stackframe * stackframesize + 2] = -1;        // return programCounter value
    stack[stackframe * stackframesize + 3] = symbolarg; // rule name called for error messages
    stack[stackframe * stackframesize + 4] = margin;    // left margin (extended only)
    findlabel(symbolarg);
  },
  CLL: () => {
    stackframe++; // push and initialize a new stackframe
    stack[stackframe * stackframesize + 0] = 0;         // GN1  also GN (extended only)
    stack[stackframe * stackframesize + 1] = 0;         // GN2
    stack[stackframe * stackframesize + 2] = programCounter;// return programCounter value
    stack[stackframe * stackframesize + 3] = symbolarg; // rule name called for error messages
    stack[stackframe * stackframesize + 4] = margin;    // left margin (needed on backtrack)
    findlabel(symbolarg);
  },
  END: () => {
    exitlevel = true;
    if(!flag){ console.log('first rule "'+ stack[stackframe * stackframesize + 3] + '" failed'); }
  },
  R: () => {
    if(stackframe == 0){
      vm.END();
      return;
    };
    programCounter = stack[stackframe * stackframesize + 2]; // return programCounter
    margin = stack[stackframe * stackframesize + 4];
    stackframe--;                                // pop stackframe
  },
  SET: () => { flag = true; },
  B:   () => { findlabel(symbolarg); },
  BT:  () => { if( flag) findlabel(symbolarg); },
  BF:  () => { if(!flag) findlabel(symbolarg); },
  BE:  () => {
    var i; var j; var h;
    var msg; var ctx;
    if(flag) return; // only halt if there is an error
    msg = 'SYNTAX ERROR:\n' +
          'rule:' + stack[stackframe * stackframesize + 3] + '\n' +
          'last token:' + token + '\n' +
          'out string:' + outstr + '\n' +
          'INPUT:' + '\n'; 
    // provide scan context
    i = inputPointer - 20;  if(i < 0) i = 0;
    j = inputPointer + 20;  if(j > inbuf.length) j = inbuf.length;
    ctx = inbuf.substring(i,inputPointer) + '<scan>' + inbuf.substring(inputPointer,j);
    msg += ctx + '\n\n' + 'CHAR CODES:\n';
    // ensure all character codes are visible
    for (var h = 0; h < ctx.length; h++){
      { if(ctx.charCodeAt(h) <= 32) 
          { msg += '<' + ctx.charCodeAt(h) + '>'; }
        else
          { msg += ctx.charAt(h); }
      }
    }
    msg += '\n';
    console.log(msg);
    exitlevel = true;
  },
  CL: (s) => { out(s); },
  CI: () => { out(token); },
  GN1: () => {
    if(stack[stackframe * stackframesize + 0] == 0){
      stack[stackframe * stackframesize + 0] = gnlabel;
      gnlabel++;
    }
    out('L' + stack[stackframe * stackframesize + 0]);
  },
  GN2: () => {
    if(stack[stackframe * stackframesize + 1] == 0) {
      stack[stackframe * stackframesize + 1] = gnlabel;
      gnlabel++;
    }
    out('B' + stack[stackframe * stackframesize + 1]);
  },
  LB:  () => { outstr = ''; },
  OUT: () => { outbuf += outstr + '\n'; outstr = '\t'; },
  NL:  () => { outbuf += outstr + '\n'; outstr = ''; }, // output current line with new line char
  TB:  () => { out('\t'); }, // TB - add a tab to the output
  GN:  () => { // GN - generate unique number (extended only, compare with vm-GN1)
    if(stack[stackframe * stackframesize + 0] == 0){
      stack[stackframe * stackframesize + 0] = gnlabel;
      gnlabel++;
    }
    out(stack[stackframe * stackframesize + 0]);
  },
  LMI: ()  => { margin += 2; }, // LMI - increase left margin (extended only)
  LMD: ()  => { margin -= 2; }, // LMD - decrease left margin (extended only)
  CE:  (s) => { flag = (inbuf.charCodeAt(inputPointer) == s); }, // CE  - compare input char to code for equal
  CGE: (s) => { flag = (inbuf.charCodeAt(inputPointer) >= s); }, // CGE - compare input char to code for greater or equal
  CLE: (s) => { flag = (inbuf.charCodeAt(inputPointer) <= s); }, // CLE - compare input char to code for less or equal
  LCH: ()  => { token = inbuf.charCodeAt(inputPointer); inputPointer++; }, // LCH - literal char code to token buffer (extended only)
  NOT: ()  => { flag = !flag; }, // NOT - invert parse flag
  TFT: ()  => { tokenflag = true; token = ''; }, // TFT - set token flag true and clear token
  TFF: ()  => { tokenflag = false; }, // TFF - set token flag false
  SCN: ()  => { // SCN - if flag, scan input character; if token flag, add to token (extended only)
    if(flag) { // if taking token, add to token
      if(tokenflag) token = token + inbuf.charAt(inputPointer);
      inputPointer++; // scan the character
    }
  },
  CC: (s) => { outstr += String.fromCharCode(s); }, // CC - copy char code to output
}
function argstring (){
  stringarg = '';
  // find the beginning of the string 
  while (programCode.charAt(programCounter) != '\''){ programCounter++; }
  // concat string together
  programCounter++;
  while (programCode.charAt(programCounter) != '\''){
    stringarg += programCode.charAt(programCounter);
    programCounter++;
  }
  programCounter++; // skip terminating single quote
}
function argsymbol(){
  symbolarg = ''; // reset symbol 
  // skip over the operator (not tab and not blank)
  while ((programCode.charAt(programCounter) != ' ') && (programCode.charAt(programCounter) != '\t')) programCounter++;
  // skip over tabs or blanks 
  while ((programCode.charAt(programCounter) == ' ') || (programCode.charAt(programCounter) == '\t')) programCounter++;
  // accrete symbol of alpha and numeral
  while ( ((programCode.charAt(programCounter) >= 'A') && (programCode.charAt(programCounter) <= 'Z')) ||
          ((programCode.charAt(programCounter) >= 'a') && (programCode.charAt(programCounter) <= 'z')) ||
          ((programCode.charAt(programCounter) >= '0') && (programCode.charAt(programCounter) <= '9')) ){
    symbolarg = symbolarg + programCode.charAt(programCounter);
    programCounter++;
  }
}
function InterpretOp () {
  var oc = programCounter;
  var op = '';
  // accrete operator of upper alpha and numeral
  while ( (oc < programCode.length) &&
          (((programCode.charAt(oc) >= 'A') && (programCode.charAt(oc) <= 'Z')) ||
           ((programCode.charAt(oc) >= '0') && (programCode.charAt(oc) <= '9'))) ){
    op += programCode.charAt(oc);
    oc++;
  }
  if(/\b(ADR|B|BT|BF|CLL|CE|CGE|CLE|CC)\b/.test(op)){ argsymbol(); }
  if(/\b(CL|TST)\b/.test(op)){ argstring(); }// sets the stringarg
  if(/\bRF\b/.test(op)){
    if(!flag){ vm['R'](); }
    return;
  }
  if(/\bPFF\b/.test(op)){
    flag = false;
    return;
  }
  if(/\bPFT\b/.test(op)){
    flag = true;
    return;
  }
  if(!vm[op]){
    console.log('ERROR: unknown interpret op \''+op+'\'');
    exitlevel = true;
    return;
  }
  vm[op](stringarg);
}
function META_II(input, code){
  stack = new Array(600); // create stack of stackframes
  inbuf = input; // snap copy of the input and interpreter 
  programCode = code;
  outbuf = ''; // clear the output
  outstr = '\t'; // default initial output to command field (override with LB)
  programCounter = 0;
  exitlevel = false;
  while (true) {
    while (programCode.charAt(programCounter) != '\t'){ programCounter++; } // skip to the next operator which is prefaced by a '\t' 
    programCounter++;
    InterpretOp();
    if(exitlevel){ return outbuf; }
  }
}
inpExample = `
fern  := 5 + 6;
ace   := fern * 5;
waldo := fern + alpha / -beta^gamma;`;
codeExample = `
	ADR AEXP
AEXP
	CLL AS
	BF L1
L2
	CLL AS
	BT L2
	SET
	BE
L1
L3
	R
AS
	ID
	BF L4
	CL 'address '
	CI
	OUT
	TST ':='
	BE
	CLL EX1
	BE
	CL 'store'
	OUT
	TST ';'
	BE
L4
L5
	R
EX1
	CLL EX2
	BF L6
L7
	TST '+'
	BF L8
	CLL EX2
	BE
	CL 'add'
	OUT
L8
	BT L9
	TST '-'
	BF L10
	CLL EX2
	BE
	CL 'sub'
	OUT
L10
L9
	BT L7
	SET
	BE
L6
L11
	R
EX2
	CLL EX3
	BF L12
L13
	TST '*'
	BF L14
	CLL EX3
	BE
	CL 'mpy'
	OUT
L14
	BT L15
	TST '/'
	BF L16
	CLL EX3
	BE
	CL 'div'
	OUT
L16
L15
	BT L13
	SET
	BE
L12
L17
	R
EX3
	CLL EX4
	BF L18
L19
	TST '^'
	BF L20
	CLL EX3
	BE
	CL 'exp'
	OUT
L20
L21
	BT L19
	SET
	BE
L18
L22
	R
EX4
	TST '+'
	BF L23
	CLL EX5
	BE
L23
	BT L24
	TST '-'
	BF L25
	CLL EX5
	BE
	CL 'minus'
	OUT
L25
	BT L24
	CLL EX5
	BF L26
L26
L24
	R
EX5
	ID
	BF L27
	CL 'load '
	CI
	OUT
L27
	BT L28
	NUM
	BF L29
	CL 'literal '
	CI
	OUT
L29
	BT L28
	TST '('
	BF L30
	CLL EX1
	BE
	TST ')'
	BE
L30
L28
	R
	END`;
exports.META_II = META_II;
