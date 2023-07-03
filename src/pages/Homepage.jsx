import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// import "./homepage.scss"

const Homepage = () => {
    // const navigate = useNavigate();
    const [modifmdp, setModifmdp] = useState(false);
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


    useEffect(() => {
        if (user) {
            setMess('Se connecter en tant que ' + user)
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
                                onClick={(e) => { setClic1(!clic1); setClicCon(!clicCon) }} >
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
                                <input type="checkbox" className='mt-5'
                                    onChange={(e) => {
                                        setCon_cont(!con_cont); console.log(con_cont);
                                    }}
                                    checked={con_cont === true ? true : false}
                                />
                                <p className='text-xs text-center mt-5 ml-7 text-blue-600 underline cursor-pointer'>
                                    Rester connecté(e)
                                </p>
                            </div>
                            <div className='max-w-sm bg-blue-500 rounded-md text-white text-center mt-11 h-7
                            shadow-lg shadow-blue-400/50 cursor-pointer hover:shadow-blue-800/50'
                                onClick={(e) => {
                                    // setClic1(!clic1); setClicCon(!clicCon);
                                    //   navigate('/dc');
                                    window.location.href = "/Discussions"
                                }}>
                                Se connecter
                            </div>
                            <p className='max-w-sm text-xs text-center mt-8 text-blue-600 underline cursor-pointer'
                                onClick={(e) => { setClicCon(!clicCon); setClicInsc(!clicInsc) }}>
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
                                onClick={(e) => { setClicInsc(!clicInsc); setClic1(!clic1) }}>
                                Créer mon compte
                            </div>
                            <p className='max-w-sm text-xs text-center mt-8 text-blue-600 underline cursor-pointer'
                                onClick={(e) => { setClicInsc(!clicInsc); setClicCon(!clicCon) }}>
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