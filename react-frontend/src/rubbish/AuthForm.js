// import React from "react";
// import {useContext, useState} from "react";
// import {GlobalContext} from "../stores/GlobalStore";
//
// const AuthForm = props => {
//     const {state, dispatch} = useContext(GlobalContext);
//     const {user} = state;
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [isOk, setIsOk] = useState(false);
//
//
//     const [isLogin, setIsLogin] = useState(true);
//
//     // const submitAction = async (event) => {
//     //     event.preventDefault();
//     //
//     //     const email = emailRef.current.value;
//     //     const password = passwordRef.current.value;
//     //
//     //     // TODO Tutaj dodaj walidacje
//     //
//     //     // Ustawiiamy zmienna isProcessing na true po to zeby kompoent wiedzial ze wlasnie trwa
//     //     // proces rejestracji i ze przetwarzamy request i zeby w tym czasie nie mozna bylo np
//     //     // jeszcze wcisnac przycisku rejestracji
//     //     setIsProcessing(true);
//     //
//     //     let url;
//     //
//     //     if (isLogin) {
//     //         // Jestesmy w trybie LOGOWANIA
//     //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5JqVtNcErcFpV41fSP6KSxbnyOHRKwD8';
//     //     } else {
//     //         // Jestesmy w trybie REJESTRACJI
//     //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5JqVtNcErcFpV41fSP6KSxbnyOHRKwD8';
//     //     }
//     //
//     //     // Teraz przechwytujemy odpowiedz
//     //     // returnSecureToken === true zwroci z requesta specjalny token, ktory potem bedzie mozna
//     //     // wykorzystac dalej
//     //     const response = await fetch(
//     //         url, {
//     //             method: 'POST',
//     //             body: JSON.stringify({email, password, returnSecureToken: true}),
//     //             headers: {
//     //                 'Content-Type': 'application/json'
//     //             }
//     //         }
//     //     );
//     //
//     //     // Tutaj jak juz skonczylo sie przetwarzanie - newazne czy dobrze czy zle to zmieniasz
//     //     // isProcessing na false i np mozna naciskac kolejnuy raz logowanie / rejestracje
//     //     setIsProcessing(false);
//     //
//     //     if (response.ok) {
//     //         const responseBody = await response.json();
//     //         if (isLogin) {
//     //             console.log('Logowanie zakonczone sukcesem');
//     //             setMessage(`User ${responseBody.email} logged in`);
//     //             // drugi argument to czas po ktorym ma nastapic automatyczne wylogowanie
//     //             authCtx.login(responseBody.token, 300000);
//     //         } else {
//     //             console.log('Rejestracja zakonczona sukcesem');
//     //             setMessage(`User ${responseBody.email} registered`);
//     //         }
//     //         setIsOk(true);
//     //
//     //         // Po 3 sekundach po zalogowaniu lub zarejstrowaniu ustaw mnie na stronie glownej
//     //         setTimeout(() => history.replace('/'), 3000);
//     //     } else {
//     //         const errorResponse = await response.json();
//     //         console.log(errorResponse);
//     //         const errorMessage = errorResponse.error.message;
//     //         setMessage(errorMessage);
//     //         setIsOk(false);
//     //     }
//     // }
//
//
//     const switchAuthModeHandler = () => {
//         setIsLogin(prevState => !prevState);
//     }
//
//     return (
//         <section className="container">
//             <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
//             <form onSubmit={c => console.log(c)}>
//                 <div className="form-group">
//                     <label htmlFor="login">Login</label>
//                     <input
//                         type="login"
//                         id="login"
//                         required
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         required
//                         className="form-control"
//                     />
//                 </div>
//
//                 <div>
//                     {/*
//                         Albo sie logujesz albo rejestrujesz w zaleznosci od trybu ktory wybierzesz.
//                         Jezeli trwa przetwarzanie requesta to wtedy zamiast przycisku masz komunikat
//                     */}
//                     {
//                         !isProcessing &&
//                         <button className="btn btn-success mt-2">{isLogin ? 'Login' : 'Register'}</button>
//                     }
//                     {
//                         isProcessing &&
//                         <p className="text-primary">Processing request ...</p>
//                     }
//
//                     {/*
//                         Przycisk ponizej pozwala nam na wybranie w ktorym trybie pracujemy: rejestracja czy logowanie
//                     */}
//                     <button
//                         type="button"
//                         className="btn btn-primary mt-2 mx-2"
//                         onClick={switchAuthModeHandler}
//                     >
//                         {isLogin ? 'Register' : 'Login'}
//                     </button>
//                 </div>
//             </form>
//             <div className="mt-3">
//                 {!isOk && <h3 className="text-danger">{"DANGER"}</h3>}
//                 {isOk && <h3 className="text-success">{"SUCCESS"}</h3>}
//             </div>
//         </section>
//     );
// }
//
//
// export default AuthForm;