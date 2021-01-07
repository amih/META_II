var programCounter, programCode, inputPointer, inbuf, outbuf, margin, exitlevel, flag, symbolarg, stringarg, gnlabel, token, outstr, tokenflag;
var stackframe, stackframesize = 5; // stack frame size (0=gn1, 1=gn2, 2=programCounter, 3=rule, 4=lm)
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
  if((margin > 0) && (outstr.length == 0)) { outstr += ' '.repeat(margin); }
  outstr += s;
}
var vm = {
  TST: (s) => {
    s = s.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    var result = inbuf.substr(inputPointer).match(new RegExp('^[ \t\n]*(?<arg>' + s + ')', 'i'));
    flag = !!result;
    if(flag){
      token = result.groups.arg;
      inputPointer += result[0].length;
    }
  },
  ID: () => {
    var result = inbuf.substr(inputPointer).match(/^[ \t\n]*(?<arg>[a-zA-Z][a-zA-Z0-9]*)/);
    flag = !!result;
    if(flag){
      token = result.groups.arg;
      inputPointer += result[0].length;
    }
  },
  NUM: () => {
    var result = inbuf.substr(inputPointer).match(/^[ \t\n]*(?<arg>[0-9]*)/);
    flag = result.groups.arg.length > 0;
    token = result.groups.arg;
    inputPointer += result[0].length;
  },
  SR: () => {
    var result = inbuf.substr(inputPointer).match(/^[ \t\n]*\'(?<arg>[^\']*)/);
    flag = result.groups.arg.length > 0;
    token = result.groups.arg;
    inputPointer += result[0].length + 1;
  },
  ADR: () => {
    [ gnlabel, inputPointer, margin, stackframe ] = [ 1, 0, 0, 0 ];
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
      if(ctx.charCodeAt(h) <= 32){
        msg += '<' + ctx.charCodeAt(h) + '>';
      }else{
        msg += ctx.charAt(h);
      }
    }
    console.log(msg + '\n');
    exitlevel = true;
  },
  CL:  (s) => { out(s); },
  CI:  ( ) => { out(token); },
  GN1: ( ) => {
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
  NL:  () => { outbuf += outstr + '\n'; outstr = ''  ; },
  TB:  () => { out('\t'); }, // add a tab to the output
  GN:  () => { // generate unique number (extended only, compare with vm-GN1)
    if(stack[stackframe * stackframesize + 0] == 0){
      stack[stackframe * stackframesize + 0] = gnlabel;
      gnlabel++;
    }
    out(stack[stackframe * stackframesize + 0]);
  },
  LMI: ()  => { margin += 2; }, // increase left margin (extended only)
  LMD: ()  => { margin -= 2; }, // decrease left margin (extended only)
  CE:  (s) => { flag = (inbuf.charCodeAt(inputPointer) == s); }, // compare input char to code for equal
  CGE: (s) => { flag = (inbuf.charCodeAt(inputPointer) >= s); }, // compare input char to code for greater or equal
  CLE: (s) => { flag = (inbuf.charCodeAt(inputPointer) <= s); }, // compare input char to code for less or equal
  LCH: ()  => { token = inbuf.charCodeAt(inputPointer); inputPointer++; }, // literal char code to token buffer (extended only)
  NOT: ()  => { flag = !flag; }, // invert parse flag
  TFT: ()  => { tokenflag = true; token = ''; }, // set token flag true and clear token
  TFF: ()  => { tokenflag = false; }, // set token flag false
  SCN: ()  => { // if flag, scan input character; if token flag, add to token (extended only)
    if(flag) { // if taking token, add to token
      if(tokenflag) token = token + inbuf.charAt(inputPointer);
      inputPointer++; // scan the character
    }
  },
  CC: (s) => { outstr += String.fromCharCode(s); }, // copy char code to output
}
function argstring (){
  var result = programCode.substr(programCounter).match(/^[^']*'(?<argstring>[^']*)/);
  stringarg = result.groups.argstring;
  programCounter += result[0].length;
}
function argsymbol(){
  // skip non white space, then skip white space, then capture argument, 'BF L8' (Branch if flag is FALSE to label L8) --> 'L8'
  var result = programCode.substr(programCounter).match(/^[^ \t]*[ \t]*(?<argsymbol>[a-zA-Z0-9]*)/);
  symbolarg = result.groups.argsymbol;
  programCounter += result[0].length;
}
function InterpretOp () {
  op = /[A-Z0-9]*/.exec(programCode.substr(programCounter))[0];
  if(/\b(ADR|B|BT|BF|CLL|CE|CGE|CLE|CC)\b/.test(op)){ argsymbol(); }
  if(/\b(CL|TST)\b/.test(op)){ argstring(); }// sets the stringarg
  if(/\bRF\b/.test(op)){ if(!flag){ vm['R'](); } return; }
  if(/\bPFF\b/.test(op)){ flag = false; return; }
  if(/\bPFT\b/.test(op)){ flag = true; return; }
  if(!vm[op]){
    console.log('ERROR: unknown interpret op \''+op+'\'');
    exitlevel = true;
    return;
  }
  vm[op](stringarg);
}
function META_II(input, code){
  [ stack, inbuf, programCode, outbuf, outstr, programCounter, exitlevel ] = [ new Array(600), input, code, '', '\t', 0, false ];
  while (true) {
    // skip forward until after \t
    programCounter += /^[^\t]*/.exec(programCode.substr(programCounter))[0].length + 1;
    InterpretOp();
    if(exitlevel){ return outbuf; }
  }
}
exports.META_II = META_II;
inpExample = `
fern  := 5 + 61;
ace   := fern * 432;
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
