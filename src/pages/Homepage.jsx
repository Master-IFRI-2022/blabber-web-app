import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { recupUsers, recupAccesstoken, setrefresh } from '../feature/UserSlice';
import { useSelector } from "react-redux";

// import { useNavigate } from 'react-router-dom';


// import "./homepage.scss"

const Homepage = () => {
    // const navigate = useNavigate();
    const [modifmdp, setModifmdp] = useState(false);
    // const [errInsc, setErrInsc] = useState()
    const dispatch = useDispatch();
    const userr = useSelector((state) => state.users.users);
    const accessToken = useSelector((state) => state.users.accesstoken);
    const refresh = useSelector((state) => state.users.refresh);







    // const conn = () => {
    //     try {



    //         axios.post("http://localhost:3030/authentication", data, { headers }).then((ret) => {
    //             if (ret) {
    //                 // console.log("Succes");
    //                 dispatch(recupUsers(ret.data));
    //                 localStorage.setItem("users", JSON.stringify(ret.data));
    //             } else {

    //             }
    //         }).catch((err) => {
    //             // seterror(err.response.data.message);
    //             console.log(err.response.data.message);
    //         })


    //     } catch (e) { }
    // }
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const [error, seterror] = useState('');
    const [succ1, setsucc1] = useState('');
    const [connectForm, setConnectForm] = useState({
        email: "",
        mdp: "",
    });
    const [inscriForm, setInscriForm] = useState({
        nom: "",
        prenom: "",
        username: "",
        email: "",
        mdp: "",
        conf_mdp: "",
    });
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [mess, setMess] = useState("Commencer");
    const [clic1, setClic1] = useState(false);
    const [clicCon, setClicCon] = useState(false);
    const [clicInsc, setClicInsc] = useState(false);
    const [con_cont, setCon_cont] = useState(true);

    const Connectinfos = (e) => {
        const { name, value } = e.target;
        // console.log(name);
        setConnectForm({ ...connectForm, [name]: value })
    }
    const Inscripinfos = (e) => {
        const { name, value } = e.target;
        // console.log(name);
        setInscriForm({ ...inscriForm, [name]: value })
    }
    const enregistrement = (e) => {
        seterror(null)
        setsucc1(null)
        if (inscriForm.mdp.length > 8 || inscriForm.mdp.length == 8) {
            if (inscriForm.email.match(regex)) {
                if (inscriForm.mdp === inscriForm.conf_mdp) {

                    axios.post("http://localhost:3030/users", {
                        lastname: inscriForm.nom,
                        firstname: inscriForm.prenom,
                        username: inscriForm.username,
                        email: inscriForm.email,
                        password: inscriForm.mdp,
                    }).then((ret) => {
                        if (ret) {
                            console.log("Succes");
                            setsucc1("Utilisateur créé")
                            seterror(null)
                            setInscriForm({
                                nom: "",
                                prenom: "",
                                username: "",
                                email: "",
                                mdp: "",
                                conf_mdp: "",
                            })
                            // setClicInsc(!clicInsc); setClicCon(!clicCon)
                        } else {

                        }
                    }).catch((err) => {
                        console.log(err);
                        if (err.response.data.data.hasOwnProperty('password')) {
                            // L'attribut existe dans l'objet
                            console.log(err.response.data.data.password.message);
                            seterror(err.response.data.data.password.message)
                        } else {
                            if (err.response.data.data.hasOwnProperty('username')) {
                                console.log(err.response.data.data.username.message);
                                seterror(err.response.data.data.username.message)
                            } else {
                                console.log(err.response.data.data.email.message);
                                seterror(err.response.data.data.email.message)
                            }

                            // L'attribut n'existe pas dans l'objet
                        }

                        // console.log(err.response);
                        // seterror(err.response.data.data.password.message)


                    })
                } else {
                    seterror("The two passwords must be the same")
                    setsucc1(null)
                    // console.log(error);
                }
            } else {
                seterror("email invalid")
                setsucc1(null)

            }
        } else {
            seterror("Password must contain at least 8 charaters")
            setsucc1(null)

        }




    }

    const autocon = () => {
        if (JSON.parse(localStorage.getItem("users") + "") && refresh == true) {
            window.location.href = "/Contacts"

        } else {
            setClic1(!clic1); setClicCon(!clicCon)
        }
    }

    const connexion = (e) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODg0OTM5OTQsImV4cCI6MTY5MTA4NTk5NCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjY0YTQ1OWU1ZjU4NGFjNGFjMjg3ZDBkZiIsImp0aSI6ImYwZjExZjk5LWYyZWEtNDYxYS1iMjI5LWM4MzE2ZTdiZTYxZSJ9.dnXFL7wUASuinmSHwwNdbtDcjyVHPed8Y5lyjKBzWwc"


        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const data = {
            // strategy: "local",
            // email: "kala@gmail.com",
            // password: "Azerty1@",
            strategy: "local",
            email: connectForm.email,
            password: connectForm.mdp,
        }

        if (connectForm.email && connectForm.mdp) {
            axios.post("http://localhost:3030/authentication", {
                strategy: "local",
                email: connectForm.email,
                password: connectForm.mdp,
            }).then((ret) => {
                if (ret) {
                    // window.location.href = "/Discussions"
                    // console.log(ret.data);
                    // console.log(ret.data.accessToken);
                    dispatch(recupUsers(ret.data.user));
                    dispatch(recupAccesstoken(ret.data.accessToken));
                    localStorage.setItem("users", JSON.stringify(ret.data.user));
                    localStorage.setItem("accessToken", JSON.stringify(ret.data.accessToken));
                    localStorage.setItem("refresh", JSON.stringify(refresh));
                    pauseThenExecute()
                } else {
                    window.location.href = "/Discussions"
                    //console.log("error");
                }
            }).catch((err) => {
                seterror("Mot de passe ou nom d'utilisateur incorrect");
                console.log(err.response.data.message);
            })
        } else {
            seterror("Veuillez remplir tous les champs")
        }


    }

    async function pauseThenExecute() {
        // Pause d'une seconde
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Exécuter l'instruction après la pause
        window.location.href = "/Contacts"
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("refresh") + "")) {
            if (JSON.parse(localStorage.getItem("users") + "") && JSON.parse(localStorage.getItem("refresh") + "") == true) {
                setMess('Se connecter en tant que ' + JSON.parse(localStorage.getItem("users") + "").username)
            }
        }

    }, []);

    return (
        <div className='w-full py-[90px] px-[110px] h-full '>
            {!modifmdp ? (
                <div>
                    {clic1 ? (
                        <img src="./blab3.png" alt="" className='h-12' />
                    ) : (
                        <></>
                    )}
                    <div className='flex'>
                        {/* ********************************    Accueil   **************************************** */}
                        <div className={`w-1/2 pl-16 flex-row ${!clic1 ? "block" : "hidden"}`}>
                            <div className='h-20 max-w-[360px]'>
                                <img src='./blab3.png' className='' />

                            </div>
                            <h1 className='font-bold text-4xl max-w-sm mt-10 text-gray-600 '>
                                Connectez-vous avec votre famille et vos amis
                            </h1>
                            <p className='max-w-sm mt-14 text-gray-600 text-xs'>
                                Grâce à blabber, garder le contact avec vos proches n'a jamais été aussi
                                facile et amusant
                            </p>

                            <div className='w-[360px] bg-blue-500 rounded-md text-white text-center mt-11 h-7
                        shadow-lg shadow-blue-400/50 cursor-pointer hover:shadow-blue-800/50'
                                onClick={(e) => { autocon() }} >
                                {mess}
                            </div>
                            <div className={`w-[360px] ${user ? "block" : "hidden"}`}>
                                <p className='text-xs text-center mt-5 text-blue-600 underline cursor-pointer'>
                                    Se connecter à un autre compte
                                </p>
                            </div>
                        </div>
                        {/* ********************************    Connexion   **************************************** */}
                        <div className={`w-1/2 pl-16 flex-row ${clicCon ? "block" : "hidden"}`}>
                            <h1 className='font-bold text-4xl max-w-sm mt-10 text-gray-600 '>
                                Connexion
                            </h1>
                            <p className='max-w-sm mt-6 text-gray-600 text-xm mb-5'>
                                Grâce à blabber, garder le contact avec vos proches n'a jamais été aussi
                                facile et amusant
                            </p>

                            {error && (
                                <p className='max-w-sm mt-6 text-xm mb-5 text-red-500'>
                                    {
                                        error
                                    }
                                </p>
                            )}

                            <div className='max-w-sm flex flex-col text-violet-400 py-8'>
                                {/* <label>Mot de passe</label> */}
                                <input className='p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500
                         focus:bg-gray-200 focus:outline-none' type="text" name='email'
                                    placeholder='Adresse email' value={connectForm.email} onChange={Connectinfos} />
                            </div>

                            <div className='max-w-sm flex flex-col text-violet-400'>
                                {/* <label>Mot de passe</label> */}
                                <input className='p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500
                         focus:bg-gray-200 focus:outline-none' type="password" name='mdp'
                                    placeholder='Mot de passe' value={connectForm.mdp} onChange={Connectinfos} />
                            </div>
                            <div className='max-w-sm flex'>
                                <input type="checkbox" className='mt-5' value={refresh}
                                    onChange={(e) => {
                                        setCon_cont(!con_cont); console.log(refresh); dispatch(setrefresh(!refresh));
                                    }}
                                    // checked={con_cont === true ? true : false}
                                    checked={refresh === true ? true : false}
                                />
                                <p
                                    className='text-xs text-center mt-5 ml-7 text-blue-600 underline cursor-pointer'>
                                    Rester connecté(e)
                                </p>
                            </div>
                            <div className='max-w-sm bg-blue-500 rounded-md text-white text-center mt-11 h-7
                            shadow-lg shadow-blue-400/50 cursor-pointer hover:shadow-blue-800/50'
                                onClick={(e) => {
                                    // setClic1(!clic1); setClicCon(!clicCon);
                                    //   navigate('/dc');
                                    connexion()

                                    // window.location.href = "/Discussions"
                                }}>
                                Se connecter
                            </div>


                            <p className='max-w-sm text-xs text-center mt-8 text-blue-600 underline cursor-pointer'
                                onClick={(e) => { setClicCon(!clicCon); setClicInsc(!clicInsc); seterror("") }}>
                                Pas de compte? S'inscrire
                            </p>


                        </div>
                        {/* ********************************    Inscription   **************************************** */}
                        <div className={`w-1/2 pl-16 flex-row ${clicInsc ? "block" : "hidden"}`}>
                            <h1 className='font-bold text-4xl max-w-sm mt-10 text-gray-600 '>
                                Inscription
                            </h1>
                            <p className='max-w-sm mt-6 text-gray-600 text-xm mb-5'>
                                Grâce à blabber, garder le contact avec vos proches n'a jamais été aussi
                                facile et amusant
                            </p>
                            {error && (
                                <p className='max-w-sm mt-6 text-xm mb-5 text-red-500'>
                                    {
                                        error
                                    }
                                </p>
                            )}
                            {succ1 && (
                                <p className='max-w-sm mt-6 text-xm mb-5 text-green-500'>
                                    {
                                        succ1
                                    }
                                </p>
                            )}
                            <div className='max-w-sm flex  text-violet-400 py-4'>
                                {/* <label>Mot de passe</label> */}
                                <input className='p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 w-2/3 mx-2
                         focus:bg-gray-200 focus:outline-none' type="text" name='email'
                                    placeholder='Adresse email' value={inscriForm.email} onChange={Inscripinfos} />
                                <input className='p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 w-2/3 mx-2
                         focus:bg-gray-200 focus:outline-none' type="text" name='username'
                                    placeholder="Nom d'utilisateur" value={inscriForm.username} onChange={Inscripinfos} />
                            </div>

                            <div className='max-w-sm flex  text-violet-400 py-4'>
                                {/* <label>Mot de passe</label> */}
                                <input className='p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 w-2/3 mx-2
                         focus:bg-gray-200 focus:outline-none' type="text" name='nom'
                                    placeholder='Nom' value={inscriForm.nom} onChange={Inscripinfos} />
                                <input className='p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 w-2/3 mx-2
                         focus:bg-gray-200 focus:outline-none' type="text" name='prenom'
                                    placeholder='Prénom' value={inscriForm.prenom} onChange={Inscripinfos} />
                            </div>
                            <div className='max-w-sm flex  text-violet-400 py-4'>
                                {/* <label>Mot de passe</label> */}
                                <input className='p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 w-2/3 mx-2
                         focus:bg-gray-200 focus:outline-none' type="password" name='mdp'
                                    placeholder='Mot de passe' value={inscriForm.mdp} onChange={Inscripinfos} />
                                <input className='p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 w-2/3 mx-2
                         focus:bg-gray-200 focus:outline-none' type="password" name='conf_mdp'
                                    placeholder='Confirmer du mot de passe' value={inscriForm.conf_mdp} onChange={Inscripinfos} />
                            </div>

                            <div className='max-w-sm bg-blue-500 rounded-md text-white text-center mt-11 h-7
                            shadow-lg shadow-blue-400/50 cursor-pointer hover:shadow-blue-800/50'
                                onClick={(e) => {
                                    // setClicInsc(!clicInsc); setClic1(!clic1);
                                    enregistrement()
                                }}>
                                Créer mon compte
                            </div>
                            <p className='max-w-sm text-xs text-center mt-8 text-blue-600 underline cursor-pointer'
                                onClick={(e) => { setClicInsc(!clicInsc); setClicCon(!clicCon); seterror(""); setsucc1("") }}>
                                Déjà membre? Se connecter
                            </p>


                        </div>




                        <div className='w-1/2  '>
                            <img src='./blab33.png' className=' w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='flex'>

                    </div>
                </div>
            )

            }



        </div>
    );
};

export default Homepage;