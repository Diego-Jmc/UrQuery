:- module(lexing, [identifier/3, ws/2]).
:- use_module(library(dcg/basics)).
:- reexport(library(dcg/basics), [number/3]).

identifier(I) --> blanks, [C],{letter(C)}, rest_identifier(R), blanks, {atom_codes(I, [C|R])}.
rest_identifier([C|R]) --> [C], {letter(C);num(C)}, {!}, rest_identifier(R).
rest_identifier([]) --> [].

letter(C) :- code_type(C, alpha).
num(C) :- code_type(C, digit).

is_id(A) :- atom_codes(A, Codes), phrase(identifier, Codes).


ws --> (" ";"\t";"\n";"\r"), ws.
ws -->  [].

