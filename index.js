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
var vm = {}; // the virtual machine commands

function spaces(){
  while(/[ \t\n]/.test(inbuf.charAt(inputPointer))){ inputPointer++ };
}

function findlabel(s){
  var found;// fast goto
  programCounter = programCode.indexOf('\n'+s+'\n');
  found = (programCounter >= 0);
  if (found){
    programCounter = programCounter + s.length + 1;
  }else{
    console.log('label '+s+' not found!\n');
    exitlevel = true;
  }
}

vm.TST = (s) => {
  var i;
  spaces();
  flag = true; i = 0; // test string case insensitive
  while(flag && (i < s.length)){
    flag = (s.charAt(i).toUpperCase() == inbuf.charAt(inputPointer+i).toUpperCase());
    i++;
  }
  if(flag){
    inputPointer = inputPointer + s.length; // advance input if found
  }
}

vm.ID = () => {
  spaces();
  flag = ( /[a-zA-Z]/.test(inbuf.charAt(inputPointer)) );
  if (flag) {
    token = '';
    while (flag){
      token = token + inbuf.charAt(inputPointer);
      inputPointer++;
      flag = ( /[a-zA-Z0-9]/.test(inbuf.charAt(inputPointer)) );
    }
    flag = true;
  }
}

vm.NUM = () => {
  spaces();
  flag = ( /[0-9]/.test(inbuf.charAt(inputPointer)) );
  if (flag) {
    token = '';
    while (flag){
      token = token + inbuf.charAt(inputPointer);
      inputPointer++;
      flag = ( /[0-9]/.test(inbuf.charAt(inputPointer)) );
    }
    flag = true;
  }
}

vm.SR = () => {
  spaces();
  flag = (inbuf.charAt(inputPointer) == '\'');
  if (flag) {
    token = '';
    while (flag){
      token = token + inbuf.charAt(inputPointer);
      inputPointer++;
      flag = (inbuf.charAt(inputPointer) != '\'');
    }
    token = token + '\'';
    inputPointer++;
    flag = true;
  }
}

vm.ADR = () => {
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
}

vm.CLL = () => {
  stackframe++; // push and initialize a new stackframe
  stack[stackframe * stackframesize + 0] = 0;         // GN1  also GN (extended only)
  stack[stackframe * stackframesize + 1] = 0;         // GN2
  stack[stackframe * stackframesize + 2] = programCounter;// return programCounter value
  stack[stackframe * stackframesize + 3] = symbolarg; // rule name called for error messages
  stack[stackframe * stackframesize + 4] = margin;    // left margin (needed on backtrack)
  findlabel(symbolarg);
}

vm.END = () => {
  exitlevel = true;
  if (!flag){ console.log('first rule "'+ stack[stackframe * stackframesize + 3] + '" failed'); }
}

vm.R = () => {
  if (stackframe == 0){
    vm.END();
    return;
  };
  programCounter = stack[stackframe * stackframesize + 2]; // return programCounter
  margin = stack[stackframe * stackframesize + 4];
  stackframe--;                                // pop stackframe
}

vm.SET = () => {
  flag = true;
}

vm.B = () => {
  findlabel(symbolarg);
}

vm.BT = () => {
  if (flag) findlabel(symbolarg);
}

vm.BF = () => {
  if (! flag) findlabel(symbolarg);
}

vm.BE = ()  => {
  var i; var j; var h;
  var msg; var ctx;
  if (flag) return; // only halt if there is an error
  msg = 'SYNTAX ERROR:\n' +
        'rule:' + stack[stackframe * stackframesize + 3] + '\n' +
        'last token:' + token + '\n' +
        'out string:' + outstr + '\n' +
        'INPUT:' + '\n'; 
  // provide scan context
  i = inputPointer - 20;  if (i < 0) i = 0;
  j = inputPointer + 20;  if (j > inbuf.length) j = inbuf.length;
  ctx = inbuf.substring(i,inputPointer) + '<scan>' + inbuf.substring(inputPointer,j);
  msg += ctx + '\n\n' + 'CHAR CODES:\n';
  // ensure all character codes are visible
  for (var h = 0; h < ctx.length; h++){
    { if (ctx.charCodeAt(h) <= 32) 
        { msg += '<' + ctx.charCodeAt(h) + '>'; }
      else
        { msg += ctx.charAt(h); }
    }
  }
  msg += '\n';
  console.log(msg);
  exitlevel = true;
}

vm.CL = (s) => {
  out(s);
}

vm.CI = () => {
  out(token);
}

vm.GN1 = () => {
  if (stack[stackframe * stackframesize + 0] == 0){
    stack[stackframe * stackframesize + 0] = gnlabel;
    gnlabel++;
  }
  out('L' + stack[stackframe * stackframesize + 0]);
}

vm.GN2 = () => {
  if (stack[stackframe * stackframesize + 1] == 0) {
    stack[stackframe * stackframesize + 1] = gnlabel;
    gnlabel++;
  }
  out('B' + stack[stackframe * stackframesize + 1]);
}

vm.LB = () => {
  outstr = '';
}

vm.OUT = () => {
  outbuf += outstr + '\n';
  outstr = '\t';
}

// extended runtime order codes not in original Meta II paper
function out(s){ // out - if necessary move to margin before output of s
  var col;
  if ((margin > 0) && (outstr.length == 0)) {
    col = 0; // advance to left margin
    while (col < margin) { outstr = outstr + ' '; col++; };
  }
  outstr += s;
}
// extensions to provide label and nested output definition
// NL - generate newline (extended only, compare with vm.OUT)
vm.NL = () => {
  // output current line
  outbuf += outstr + '\n';
  outstr = '';
}

vm.TB = () => { // TB - add a tab to the output
  out('\t');
}

// GN - generate unique number (extended only, compare with vm.GN1)
vm.GN = () => {
  if (stack[stackframe * stackframesize + 0] == 0){
    stack[stackframe * stackframesize + 0] = gnlabel;
    gnlabel++;
  }
  out(stack[stackframe * stackframesize + 0]);
}

// LMI - increase left margin (extended only)
vm.LMI = () => {
  margin += 2;
}

// LMD - decrease left margin (extended only)
vm.LMD = () => {
  margin -= 2;
}

// extensions to provide token definition
// CE  - compare input char to code for equal
vm.CE = (s) => {
  flag = (inbuf.charCodeAt(inputPointer) == s);
}

// CGE - compare input char to code for greater or equal
vm.CGE = (s) => {
  flag = (inbuf.charCodeAt(inputPointer) >= s);
}

// CLE - compare input char to code for less or equal
vm.CLE = (s) => {
  flag = (inbuf.charCodeAt(inputPointer) <= s);
}

// LCH - literal char code to token buffer (extended only)
vm.LCH = () => {
  token = inbuf.charCodeAt(inputPointer);
  inputPointer++; // scan the character
}

// NOT - invert parse flag
vm.NOT = () => {
  flag = !flag;
}

// TFT - set token flag true and clear token
vm.TFT = () => {
  tokenflag = true;
  token = '';
}

// TFF - set token flag false
vm.TFF = () => {
  tokenflag = false;
}

// SCN - if flag, scan input character; if token flag, add to token (extended only)
vm.SCN = () => {
  if (flag) { // if taking token, add to token
    if (tokenflag) token = token + inbuf.charAt(inputPointer);
    inputPointer++; // scan the character
  }
}

// CC - copy char code to output
vm.CC = (s) => {
  outstr = outstr + String.fromCharCode(s);
}

function argstring (){
  stringarg = '';
  // find the beginning of the string 
  while (programCode.charAt(programCounter) != '\''){ programCounter++; }
  // concat string together
  programCounter++;
  while (programCode.charAt(programCounter) != '\''){
    stringarg = stringarg + programCode.charAt(programCounter);
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
  var oc;
  var op;
  // assumes programCounter on operator in line
  oc = programCounter; op = '';
  // accrete operator of upper alpha and numeral
  while ( (oc < programCode.length) &&
          (((programCode.charAt(oc) >= 'A') && (programCode.charAt(oc) <= 'Z')) ||
           ((programCode.charAt(programCounter) >= 'a') && (programCode.charAt(programCounter) <= 'z')) ||
           ((programCode.charAt(oc) >= '0') && (programCode.charAt(oc) <= '9'))) ){
    op = op + programCode.charAt(oc); oc++;
  }
  // intrepreter op case branch
  switch (op) {
    case 'ADR': argsymbol(); vm.ADR(); return;          // ADR - specify starting rule
    case 'B':   argsymbol(); vm.B(); return;            // B   - unconditional branch to label
    case 'BT':  argsymbol(); vm.BT(); return;           // BT  - branch if switch true to label
    case 'BF':  argsymbol(); vm.BF(); return;           // BF  - branch if switch false to label
    case 'BE':  vm.BE(); return;                        // BE  - branch if switch false to error halt
    case 'CLL': argsymbol(); vm.CLL(); return;          // CLL - call rule at label
    case 'CL':  argstring(); vm.CL(stringarg); return;  // CL  - copy given string argument to output
    case 'CI':  vm.CI(); return;                        // CI  - copy scanned token to output
    case 'END': vm.END(); return;                       // END - pseudo op, end of source
    case 'GN1': vm.GN1(); return;                       // GN1 - make and output label 1
    case 'GN2': vm.GN2(); return;                       // GN2 - make and output label 2
    case 'ID':  vm.ID(); return;                        // ID  - recognize identifier token
    case 'LB':  vm.LB(); return;                        // LB  - start output in label field
    case 'NUM': vm.NUM(); return;                       // NUM - recognize number token 
    case 'OUT': vm.OUT(); return;                       // OUT - output out buffer with new line
    case 'R':   vm.R(); return;                         // R   - return from rule call with CLL
    case 'SET': vm.SET(); return;                       // SET - set switch true
    case 'SR':  vm.SR(); return;                        // SR  - recognize string token including single quotes
    case 'TST': argstring(); vm.TST(stringarg); return; // TST - test for given string argument, if found set switch
    case 'GN':  vm.GN(); return;                     // GN  - make and output unique number
    case 'LMI': vm.LMI(); return;                    // LMI - left margin increase
    case 'LMD': vm.LMD(); return;                    // LMD - left margin decrease
    case 'NL':  vm.NL(); return;                     // NL  - new line output
    case 'TB':  vm.TB(); return;                     // TB  - output a tab
    case 'CE':  argsymbol(); vm.CE(symbolarg); return;        // CE  - compare input char to code for equal
    case 'CGE': argsymbol(); vm.CGE(symbolarg); return;       // CGE - compare input char to code for greater or equal
    case 'CLE': argsymbol(); vm.CLE(symbolarg); return;       // CLE - compare input char to code for less or equal
    case 'LCH': vm.LCH(); return;                     // LCH - literal character code to token as string
    case 'NOT': vm.NOT(); return;                     // NOT - complement flag
    case 'RF':  if (!flag) vm.R(); return;               // RF  - return if switch false
    case 'SCN': vm.SCN(); return;                     // SCN - if flag, scan input character; if token flag, add to token
    case 'TFF': vm.TFF(); return;                     // TFF - token flag set to false
    case 'TFT': vm.TFT(); return;                     // TFT - token flag set to true
    // extensions for backtracking, error handling, and char code output
    case 'PFF': flag = false; return;                    // PFF - parse flag set to false
    case 'PFT': flag = true; return;                     // PFT - parse flag set to true (AKA SET)
    case 'CC':  argsymbol(); vm.CC(symbolarg); return;        // CC - copy char code to output
    default:
      console.log('ERROR: unknown interpret op \''+op+'\'');
      exitlevel = true;
  }  
  // if(/(ADR|B|BT|BF|CLL|CE|CGE|CLE|CC)/.test(op)){
  //   argsymbol();
  //   vm[op]();
  //   return;
  // }
  // if(/(CL|TST)/.test(op)){
  //   argstring();
  //   vm[op](stringarg);
  //   return;
  // }
  // if(/RF/.test(op)){
  //   if (!flag){ vm.R(); }
  //   return;
  // }
  // if(/PFF/.test(op)){
  //   flag = false;
  //   return;
  // }
  // if(/PFT/.test(op)){
  //   flag = true;
  //   return;
  // }
  // if(!vm[op]){
  //   console.log('ERROR: unknown interpret op \''+op+'\'');
  //   exitlevel = true;
  // }
  // vm[op]();
  // return;
}

function META_II(inputPointer, code){
  stack = new Array(600); // create stack of stackframes
  inbuf = inputPointer; // snap copy of the input and interpreter 
  programCode = code;
  outbuf = ''; // clear the output
  outstr = '\t'; // default initial output to command field (override with LB)
  programCounter = 0;
  exitlevel = false;
  while (true) {
    // skip to the next operator which is prefaced by a '\t' 
    while (programCode.charAt(programCounter) != '\t'){
      programCounter++;
    }
    programCounter++;
    InterpretOp();
    if (exitlevel) break;
  }
  return outbuf;
}

inpExample = `
fern:=5+6;
ace:=fern*5;
waldo:=fern+alpha/-beta^gamma;
`;
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
	END
`;
exports.META_II = META_II;
