let vm = (() => { return {
  // programCounter: 0, programCode: '', inputPointer: 0, inbuf: '', outbuf: '', margin: 0, exitlevel: 0, flag: false, symbolarg: '',
  // gnlabel: '', token: '', outstr: '', tokenflag: false, stackframe: [], stackframesize: 4, opCounter: 0,// stackframe (0=gn1, 1=programCounter, 2=rule, 3=lm)
  findlabel: (s) => {
    vm.programCounter = vm.programCode.indexOf('\n'+s+'\n');
    if(vm.programCounter >= 0){
      vm.programCounter += s.length + 1;
    }else{
      console.log('label '+s+' not found!\n');
      vm.exitlevel = true;
    }
  },
  out: (s) => {
    if(vm.outstr.length == 0) { vm.outstr += ' '.repeat(vm.margin); }
    vm.outstr += s;
  },
  TST: (s) => {
    s = s.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    var result = vm.inbuf.substr(vm.inputPointer).match(new RegExp('^[ \t\n]*(?<arg>' + s + ')', 'i'));
    vm.flag = !!result;
    if(vm.flag){
      vm.inputPointer += result[0].length;
    }
  },
  ID: () => {
    var result = vm.inbuf.substr(vm.inputPointer).match(/^[ \t\n]*(?<arg>[a-zA-Z][a-zA-Z0-9]*)/);
    vm.flag = !!result;
    if(vm.flag){
      vm.token = result.groups.arg;
      vm.inputPointer += result[0].length;
    }
  },
  NUM: () => {
    var result = vm.inbuf.substr(vm.inputPointer).match(/^[ \t\n]*(?<arg>[0-9]+)/); // NB: [0-9]+ (the plus instead of asterisk) meaning, at least one digit!
    vm.flag = !!result;
    if(vm.flag){
      vm.token = result.groups.arg;
      vm.inputPointer += result[0].length;
    }
  },
  SR: () => {
    var result = vm.inbuf.substr(vm.inputPointer).match(/^[ \t\n]*\'(?<arg>[^\']*)/);
    vm.flag = !!result;
    if(vm.flag){
      vm.token = "'" + result.groups.arg + "'";
      vm.inputPointer += result[0].length + 1;
    }
  },
  ADR: () => {
    [ vm.gnlabel, vm.inputPointer, vm.margin, vm.stackframe ] = [ 1, 0, 0, 0 ];
    vm.stack[vm.stackframe * vm.stackframesize + 0] = 0;         // GN1  also GN (extended only)
    vm.stack[vm.stackframe * vm.stackframesize + 1] = -1;        // return programCounter value
    vm.stack[vm.stackframe * vm.stackframesize + 2] = vm.symbolarg; // rule name called for error messages
    vm.stack[vm.stackframe * vm.stackframesize + 3] = vm.margin;    // left margin (extended only)
    vm.findlabel(vm.symbolarg);
  },
  CLL: () => {
    vm.stackframe++; // push and initialize a new stackframe
    vm.stack[vm.stackframe * vm.stackframesize + 0] = 0;         // GN1  also GN (extended only)
    vm.stack[vm.stackframe * vm.stackframesize + 1] = vm.programCounter;// return programCounter value
    vm.stack[vm.stackframe * vm.stackframesize + 2] = vm.symbolarg; // rule name called for error messages
    vm.stack[vm.stackframe * vm.stackframesize + 3] = vm.margin;    // left margin (needed on backtrack)
    vm.findlabel(vm.symbolarg);
  },
  END: () => {
    vm.exitlevel = true;
    if(!vm.flag){ console.log('first rule "'+ vm.stack[vm.stackframe * vm.stackframesize + 3] + '" failed'); }
  },
  R: () => {
    if(vm.stackframe == 0){
      vm.END();
      return;
    };
    vm.programCounter = vm.stack[vm.stackframe * vm.stackframesize + 1]; // return programCounter
    vm.margin = vm.stack[vm.stackframe * vm.stackframesize + 3];
    vm.stackframe--;                                // pop stackframe
  },
  SET: () => { vm.flag = true; },
  B:   () => { vm.findlabel(vm.symbolarg); },
  BT:  () => { if( vm.flag) vm.findlabel(vm.symbolarg); },
  BF:  () => { if(!vm.flag) vm.findlabel(vm.symbolarg); },
  BE:  () => {
    var i; var j; var h;
    var msg; var ctx;
    if(vm.flag) return; // only halt if there is an error
    msg = 'SYNTAX ERROR:\n' +
          'rule:' + vm.stack[vm.stackframe * vm.stackframesize + 3] + '\n' +
          'last token:' + vm.token + '\n' +
          'out string:' + vm.outstr + '\n' +
          'INPUT:' + '\n'; 
    // provide scan context
    i = vm.inputPointer - 20;  if(i < 0) i = 0;
    j = vm.inputPointer + 20;  if(j > vm.inbuf.length) j = vm.inbuf.length;
    ctx = vm.inbuf.substring(i,vm.inputPointer) + '<scan>' + vm.inbuf.substring(vm.inputPointer,j);
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
    vm.exitlevel = true;
  },
  CL:  (s) => { vm.out(s); },
  CI:  ()  => { vm.out(vm.token); },
  GN1: ()  => {
    if(vm.stack[vm.stackframe * vm.stackframesize + 0] == 0){
      vm.stack[vm.stackframe * vm.stackframesize + 0] = vm.gnlabel;
      vm.gnlabel++;
    }
    vm.out('L' + vm.stack[vm.stackframe * vm.stackframesize + 0]);
  },
  LB:  () => { vm.outstr = ''; },
  OUT: () => { vm.outbuf += vm.outstr + '\n'; vm.outstr = '\t'; },
  NL:  () => { vm.outbuf += vm.outstr + '\n'; vm.outstr = ''  ; },
  TB:  () => { vm.out('\t'); }, // add a tab to the output
  GN:  () => { // generate unique number (extended only, compare with vm-GN1)
    if(vm.stack[vm.stackframe * vm.stackframesize + 0] == 0){
      vm.stack[vm.stackframe * vm.stackframesize + 0] = vm.gnlabel;
      vm.gnlabel++;
    }
    vm.out(vm.stack[vm.stackframe * vm.stackframesize + 0]);
  },
  LMI: ()  => { vm.margin += 2; }, // increase left margin (extended only)
  LMD: ()  => { vm.margin -= 2; }, // decrease left margin (extended only)
  CE:  (s) => { vm.flag = (vm.inbuf.charCodeAt(vm.inputPointer) == parseInt(s, 10)); }, // compare input char to code for equal
  CGE: (s) => { vm.flag = (vm.inbuf.charCodeAt(vm.inputPointer) >= parseInt(s, 10)); }, // compare input char to code for greater or equal
  CLE: (s) => { vm.flag = (vm.inbuf.charCodeAt(vm.inputPointer) <= parseInt(s, 10)); }, // compare input char to code for less or equal
  LCH: ()  => { vm.token = vm.inbuf.charCodeAt(vm.inputPointer); vm.inputPointer++; }, // literal char code to token buffer (extended only)
  NOT: ()  => { vm.flag = !vm.flag; }, // invert parse flag
  TFT: ()  => { vm.tokenflag = true; vm.token = ''; }, // set token flag true and clear token
  TFF: ()  => { vm.tokenflag = false; }, // set token flag false
  SCN: ()  => { // if flag, scan input character; if token flag, add to token (extended only)
    if(vm.flag) { // if taking token, add to token
      if(vm.tokenflag){
        vm.token += vm.inbuf.charAt(vm.inputPointer);
      }
      vm.inputPointer++; // scan the character
    }
  },
  CC: (s) => { vm.outstr += String.fromCharCode(s); }, // copy char code to output
  argstring:() => {
    var result = vm.programCode.substr(vm.programCounter).match(/^[^']*'(?<argument>[^']*)/);
    vm.symbolarg = result.groups.argument;
    vm.programCounter += result[0].length;
  },
  argsymbol:() => {
    var result = vm.programCode.substr(vm.programCounter).match(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/);
    vm.symbolarg = result.groups.argument;
    vm.programCounter += result[0].length;
  },
  InterpretOp() {
    let op = /[A-Za-z0-9_]*/.exec(vm.programCode.substr(vm.programCounter))[0];
    if(/\b(ADR|B|BT|BF|CLL|CE|CGE|CLE|CC)\b/.test(op)){ vm.argsymbol(); vm[op](vm.symbolarg); return; }
    if(/\b(CL|TST)\b/.test(op)){ vm.argstring(); vm[op](vm.symbolarg); return; }
    if(/\bRF\b/.test(op)){ if(!vm.flag){ vm['R'](); } return; }
    if(/\bPFF\b/.test(op)){ vm.flag = false; return; }
    if(/\bPFT\b/.test(op)){ vm.flag = true; return; }
    if(!vm[op]){ console.log('ERROR: unknown interpret op \''+op+'\''); vm.exitlevel = true; return; }
    vm[op]();
  },
  META_II: (input, code) => {
    [ vm.stack, vm.inbuf, vm.programCode, vm.outbuf ] = [ new Array(600), input, code, '' ];
    [ vm.outstr, vm.programCounter, vm.exitlevel, vm.opCounter ] = [ '\t', 0, false, 0 ];
    vm.flag = false;
    vm.tokenflag  =false;
    vm.symbolarg = '';
    vm.token = '';
    vm.stackframesize = 4;
    vm.opCounter = 0;
    while (true) {
      if(vm.opCounter>56000){ console.log('too many commands?'+vm.opCounter); return vm.outbuf;}
      vm.programCounter += /^[^\t]*/.exec(vm.programCode.substr(vm.programCounter))[0].length + 1;
      vm.InterpretOp();
      vm.opCounter++;
      if(vm.exitlevel){ console.log('programCounter:'+vm.opCounter); return vm.outbuf; }
    }
  },
}})();
exports.vm = vm;
