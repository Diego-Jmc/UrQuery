
:- module(parsing, [identifier/3, ws/2]).
:- use_module(lexing).


urquery([L | R]) -->  ws, let(L), ws, urquery(R), {!}.
urquery([]) --> [].

let(let(X, E, U)) --> ws, "let", ws, id(X), ws, "=", ws, expr(E), ws, "in" ,ur_query(U).

ur_query(U) --> tagquery(U).

tagquery(tagquery(A,F,B)) --> ws , "<", tag(A) , ws  ,">",ws,forquery(F),ws,"</",ws , tag(B) , ">".

forquery(forquery(I,E,V))-->  ws ,"for", ws , qvar(I)  , ws , "in" , ws , exprquery(E) , ws , "return" ,ws,varquery(V).

tag(tag(I))-->xml_unqualified_identifier(I).

exprquery(exprquery(S,X)) --> sourcequery(S) , startxpath(X).

sourcequery(sourcequery(D)) --> docpath(D) ; qvar(D).

docpath(docpath(E)) --> "doc" , "(" , expr(E) ,")".

varquery(varquery(V)) --> vartag(V) ; varpath(V).

vartag(vartag(A,VP,B)) --> "<",tag(A),">","{",varpath(VP),"}","</",tag(B),">".

varpath(varpath(Q)) --> qvar(Q).

startxpath(startxpath(X)) --> "/" , xpath(X).

xpath(xpath(X)) --> tag(X) ; xpath(X) , "/" , tag(X).



qvar(qvar(I)) --> "$" , identifier(I).

id(id(I)) --> identifier(I).
num(num(N)) -->  number(N).
xml_unqualified_identifier(I) --> identifier(I).

expr(X) --> id(X);num(X).



generate(UrAst, OutputFilename) :-
     open(OutputFilename, write, Stream), 
	 toJS(UrAst, JSAst),
	 emit(JSAst, Stream),
	 close(Stream)
.





toJS([let(id(A), id(B), tagquery(tag(C), forquery(qvar(D), exprquery(sourcequery(docpath(id(E))), startxpath(xpath(tag(F)))), varquery(vartag(tag(G), varpath(qvar(H)), tag(I)))), tag(J)))],
js(function(functionParam(E),nameTagConst(C),paramTag(C)),forFunction(param(A),const(C),fun(E),const(D),xxpath(F),varname(C),tagParam(G),forVar(H),yield(I),mainvarName(E),mainReturn(E)))
).

toJS([let(id(A), id(B), tagquery(tag(C), forquery(qvar(D), exprquery(sourcequery(qvar(E)), startxpath(xpath(tag(F)))), varquery(vartag(tag(G), varpath(qvar(H)), tag(I)))), tag(J)))],
js(function(functionParam(E),nameTagConst(C),paramTag(C)),forFunction(param(A),const(C),fun(E),const(D),xxpath(F),varname(C),tagParam(G),forVar(H),yield(I),mainvarName(E),mainReturn(E)))
).


emit(js(function(functionParam(A),nameTagConst(B),paramTag(C)),forFunction(param(D),const(E),fun(F),const(G),xxpath(H),varname(I),tagParam(J),forVar(K),yield(M),mainvarName(N),mainReturn(L))) , Stream):-
  format(Stream, 
  
  '
  import {ur_doc, ur_evaluate, ur_tag, ur_active_doc} from ''./urquery.mjs''

function urQuery_01(~s){
const ~s_tag = children => ur_tag(''~s'', children) 
abstrae el ul
function* for_01(~s){ 
const xpathResultIter = ur_evaluate(ur_doc(~s), ''/~s'')
const ~s_tag = child => ur_tag(''~s'', child) 

for (~s of xpathResultIter){
yield ~s_ag(~s)
}
}
return ul_tag([...for_01(uri)])
}

function main(){
let ~s = ur_active_doc() 
return urQuery_01(~s) 
} 
  '  
  
  , [A,B,C,D,E,F,G,I,J,K,M,N,L]) 
.




test_01 :-
   Ast = urquery([let(id('ad'), id('ad'), tagquery(tag('ad'), forquery(qvar('ad'), exprquery(sourcequery(docpath(id('ad'))), startxpath(xpath(tag('ad')))), varquery(vartag(tag('ad'), varpath(qvar('ad')), tag('ad')))), tag('ad')))]),
   Filename = 'test02.js',
   generate(Ast, Filename)
.

%%%%%%%%%%%%%%%%%%%%%%%%%% Lexer Xquery Utils %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

test02(L):-
File = 'test.txt',
    read_file_to_codes(File, Codes, []),
    atom_codes(Input, Codes),
    format('Input=~n~s~n', [Input]),
    phrase(urquery(L), Codes)
.


test(L,JsAst) :- 
    File = 'test.txt',
    read_file_to_codes(File, Codes, []),
    atom_codes(Input, Codes),
    format('Input=~n~s~n', [Input]),
    phrase(urquery(L), Codes),
	UrAst = urquery(L),
	toJS(UrAst,JsAst),!,Filename = 'estasi.js',
	generate(UrAst, Filename)
.
