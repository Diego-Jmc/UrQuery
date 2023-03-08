

/*
Service for adding two numbers
URI: /compile
VERB: POST
Body 
    Expects:JSON {"script":"Some_Text"}
    
Returns: {"accepted":true, "answer": some_message, "date": some_date}    if data ok
         {"accepted":false, "answer":"", "msg":some_error_message} othwerwise
             
author: loriacarlos@gmail.com
since: 2022
*/


:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_log)).
:- use_module(parsing).

:- use_module(library(http/html_write)).

% URL handlers.
:- http_handler('/compile', handle_request, [method(post)]).
:- http_handler('/', home, []).



handle_request(Request) :-
    http_read_json_dict(Request, Query),
    solve(Query, Solution),
    reply_json_dict(Solution).

server(Port) :-
    http_server(http_dispatch, [port(Port)]).


set_setting(http:logfile, 'service_log_file.log').



%%%%%%%%%%%%%%%%%%%%%%%%%% BUSINESS LOGIC %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


solve(_{script:Text}, _{answer:N, date: X}) :-
    toUrQueryTree(Text,Tree),
	parsing:toJS(Tree,JsAst),
	open('javascript.txt', write, Stream), 
	parsing:emit(JsAst,Stream),!,
	close(Stream),
	 read_file_to_codes('javascript.txt', JsCodes, []),
	 atom_codes(JsInput, JsCodes),
	format('~n~s~n', [JsInput]),
	N = JsInput,
    today(X)
.




toUrQueryTree(I,T):-atom_codes(I, Codes),phrase(parsing:urquery(T), Codes).

toJSTree(UrT,JsT):- parsing:toJS(UrT,JsT).

today(Today) :- get_time(X), format_time(atom(Today), '%Y-%m-%d,%T', X).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

home(_Request) :-
        reply_html_page(title('Mini Compile Service'),
                        [ h1('To use it:'),
                          p([h4('Send a post messsage'),
                             h4('URI:/compile'),
                             h4('body: JSON data of the form {"data": "Some text"}'),
                             h4('Service Responds with JSON as follows:'),
                             ul([li('{accepted:true, answer:a+b}    if data ok'),
                                 li('{accepted:false, answer:0, msg:some_error_message} othwerwise')])
                            ])
                        ]).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% MAIN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- initialization
    format('*** Starting Server ***~n', []),
    (current_prolog_flag(argv, [SPort | _]) -> true ; SPort='8000'),
    atom_number(SPort, Port),
    format('*** Serving on port ~d *** ~n', [Port]),
    server(Port).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%