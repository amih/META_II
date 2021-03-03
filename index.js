let vm = {
  findlabel: (s) => {
    vm.programCounter = vm.programCode.indexOf('\n' + s + '\n');
    if(vm.programCounter >= 0){
      vm.programCounter += s.length + 1;
    }else{
      console.log('label ' + s + ' not found!');
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
  ID_NUM_SR: (regex, quote) => {
    var result = vm.inbuf.substr(vm.inputPointer).match(regex);
    vm.flag = !!result;
    if(vm.flag){
      vm.token = quote + result.groups.arg + quote;
      vm.inputPointer += result[0].length + quote.length;
    }
  },
  CLL: (arg, isADR = false) => {
    if(isADR){ [ vm.gnlabel, vm.inputPointer, vm.margin, vm.stackframe ] = [ 1, 0, 0, 0 ]; }else{ vm.stackframe++; }
    vm.stack[vm.stackframe * vm.stackframesize + 0] = 0;         // GN1  also GN (extended only)
    vm.stack[vm.stackframe * vm.stackframesize + 1] = isADR ? -1 : vm.programCounter;// return programCounter value
    vm.stack[vm.stackframe * vm.stackframesize + 2] = vm.symbolarg; // rule name called for error messages
    vm.stack[vm.stackframe * vm.stackframesize + 3] = vm.margin;    // left margin (needed on backtrack)
    vm.findlabel(vm.symbolarg);
  },
  END: () => {
    vm.exitlevel = true;
    if(!vm.flag){ console.log('first rule "'+ vm.stack[vm.stackframe * vm.stackframesize + 3] + '" failed'); }
  },
  R: () => {
    if(vm.stackframe == 0){ vm.END(); return; };
    vm.programCounter = vm.stack[vm.stackframe * vm.stackframesize + 1];
    vm.margin = vm.stack[vm.stackframe * vm.stackframesize + 3];
    vm.stackframe--;
  },
  SET: () => { vm.flag = true; },
  B:   () => { vm.findlabel(vm.symbolarg); },
  BT:  () => { if( vm.flag) vm.findlabel(vm.symbolarg); },
  BF:  () => { if(!vm.flag) vm.findlabel(vm.symbolarg); },
  BE:  () => {
    if(vm.flag) return; // only halt if there is an error
    const i = Math.max(0, vm.inputPointer - 20);
    const j = Math.min(vm.inbuf.length, vm.inputPointer + 20);
    console.log('SYNTAX ERROR:\nrule:' + vm.stack[vm.stackframe * vm.stackframesize + 3] + '\nlast token:' + vm.token + '\n' +
    'out string:' + vm.outstr + '\nINPUT:' + '\n' + vm.inbuf.substring(i,vm.inputPointer) + '<scan>' + vm.inbuf.substring(vm.inputPointer,j));
    vm.exitlevel = true;
  },
  CL:  (s) => { vm.out(s); },
  CI:  ()  => { vm.out(vm.token); },
  GN1: ()  => {
    if(vm.stack[vm.stackframe * vm.stackframesize] == 0){
      vm.stack[vm.stackframe * vm.stackframesize] = vm.gnlabel++;
    }
    vm.out('L' + vm.stack[vm.stackframe * vm.stackframesize]);
  },
  GN:  () => { // generate unique number (extended only, compare with vm-GN1)
    if(vm.stack[vm.stackframe * vm.stackframesize] == 0){
      vm.stack[vm.stackframe * vm.stackframesize] = vm.gnlabel++;
    }
    vm.out(vm.stack[vm.stackframe * vm.stackframesize]);
  },
  LB:  () => { vm.outstr = ''; },
  OUT: () => { vm.outbuf += vm.outstr + '\n'; vm.outstr = '\t'; },
  NL:  () => { vm.outbuf += vm.outstr + '\n'; vm.outstr = ''  ; },
  TB:  () => { vm.out('\t'); }, // add a tab to the output
  LMI: ()  => { vm.margin += 2; },
  LMD: ()  => { vm.margin -= 2; },
  CE:  (s) => { vm.flag = (vm.inbuf.charCodeAt(vm.inputPointer) == parseInt(s, 10)); },
  CGE: (s) => { vm.flag = (vm.inbuf.charCodeAt(vm.inputPointer) >= parseInt(s, 10)); },
  CLE: (s) => { vm.flag = (vm.inbuf.charCodeAt(vm.inputPointer) <= parseInt(s, 10)); },
  LCH: ()  => { vm.token = vm.inbuf.charCodeAt(vm.inputPointer); vm.inputPointer++; },
  NOT: ()  => { vm.flag = !vm.flag; },
  TFT: ()  => { vm.tokenflag = true; vm.token = ''; },
  TFF: ()  => { vm.tokenflag = false; },
  SCN: ()  => {
    if(vm.flag) {
      if(vm.tokenflag){
        vm.token += vm.inbuf.charAt(vm.inputPointer);
      }
      vm.inputPointer++;
    }
  },
  CC: (s) => { vm.outstr += String.fromCharCode(s); }, // copy char code to output, expect s to be a number in string.
  STORENAME: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    vm.namedVariables[vm.symbolarg] = vm.token;
  },
  PREPARE: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    vm.prepare = vm.namedVariables[vm.symbolarg];
  },
  PREPAREARRLENGTH: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    vm.prepare = vm.namedVariables[vm.symbolarg].arr.length;
  },
  LOADIDX: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    vm.out(vm.prepare.arr[vm.namedVariables[vm.symbolarg]]);
  },
  COMPARE: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    vm.flag = (vm.namedVariables[vm.symbolarg] == vm.prepare);
  },
  INCVAR: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    vm.namedVariables[vm.symbolarg]++;
  },
  INITVAR: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    vm.namedVariables[vm.symbolarg] = 0;
  },
  ARRLENGTH: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    vm.out(vm.namedVariables[vm.symbolarg].arr.length);
  },
  LOADNAME: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    vm.out(vm.namedVariables[vm.symbolarg]);
  },
  STORENAMEARR: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    if(!vm.namedVariables[vm.symbolarg]){ vm.namedVariables[vm.symbolarg] = { arr: [], idx: -1 }; } // idx will be used in output loops to track where we are.
    vm.namedVariables[vm.symbolarg].arr.push(vm.token);
  },
  LOADNAMEARR: () => {
    vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); // the variable name
    vm.out(vm.namedVariables[vm.symbolarg]);
  },
  argsymbol:(regex) => {
    var result = vm.programCode.substr(vm.programCounter).match(regex);
    vm.symbolarg = result.groups.argument;
    vm.programCounter += result[0].length;
  },
  InterpretOp() {
    let op = /[A-Za-z0-9_]*/.exec(vm.programCode.substr(vm.programCounter))[0];
    if(/\bADR\b/.test(op)){ vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); vm.CLL(vm.symbolarg, true); return; }
    if(/\b(B|BT|BF|CLL|CE|CGE|CLE|CC)\b/.test(op)){ vm.argsymbol(/^[^ \t]*[ \t]*(?<argument>[a-zA-Z0-9_]*)/); vm[op](vm.symbolarg); return; }
    if(/\b(CL|TST)\b/.test(op)){ vm.argsymbol(/^[^']*'(?<argument>[^']*)/); vm[op](vm.symbolarg); return; }
    if(/\bRF\b/.test(op)){ if(!vm.flag){ vm['R'](); } return; }
    if(/\bPFF\b/.test(op)){ vm.flag = false; return; }
    if(/\bPFT\b/.test(op)){ vm.flag = true; return; }
    switch (op) {
      case 'ID' : vm.ID_NUM_SR(/^[ \t\n]*(?<arg>[a-zA-Z][a-zA-Z0-9]*)/, ''); return;
      case 'NUM': vm.ID_NUM_SR(/^[ \t\n]*(?<arg>[0-9]+)/, '')              ; return;
      case 'SR' : vm.ID_NUM_SR(/^[ \t\n]*\'(?<arg>[^\']*)/, "'")           ; return;
    }
    if(!vm[op]){ console.log('ERROR: unknown interpret op \''+op+'\''); vm.exitlevel = true; return; }
    vm[op]();
  },
  META_II: (input, code) => {
    vm.namedVariables = {};
    [ vm.stack, vm.inbuf, vm.programCode, vm.outbuf ] = [ new Array(600), input, code, '' ];
    [ vm.outstr, vm.programCounter, vm.exitlevel ] = [ '\t', 0, false ];
    [ vm.flag, vm.tokenflag, vm.symbolarg, vm.token, vm.stackframesize ] = [ false, false, '', '', 4 ];
    opCounterPreventInfiniteLoop = 0;
    while (true) {
      if(opCounterPreventInfiniteLoop>300000){ console.log('too many commands?'); return vm.outbuf;}
      vm.programCounter += /^[^\t]*/.exec(vm.programCode.substr(vm.programCounter))[0].length + 1;
      vm.InterpretOp();
      opCounterPreventInfiniteLoop++;
      if(vm.exitlevel){ return vm.outbuf; }
    }
  },
};
exports.vm = vm;
