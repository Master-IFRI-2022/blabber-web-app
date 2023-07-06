import SmallProfil from "../../assets/SmallProfile.png";
import DefaultProfil from "../../assets/dp.png"
import { HiEdit, HiArchive, HiUserRemove, HiOutlinePencilAlt, HiUserCircle } from "react-icons/hi"
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default () => {
  const actions = [
    {
      title: "Profil",
      icon: <HiUserCircle></HiUserCircle>,
      action: "",
    },
    {
      title: "Archiver",
      icon: <HiArchive></HiArchive>,
      action: "",
    },
    {
      title: "Bloquer",
      icon: <HiUserRemove></HiUserRemove>,
      action: "",
    },
  ];
  const [showmdp, setShowmdp] = useState(false);

  const user = useSelector((state) => state.users.users);
  const accessToken = useSelector((state) => state.users.accesstoken);
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const [error, seterror] = useState('');
  const [succ1, setsucc1] = useState('');

  const [inscriForm, setInscriForm] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    mdp: "",
    conf_mdp: "",
  });

  const Inscripinfos = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    setInscriForm({ ...inscriForm, [name]: value })
  }



  const actionItems = actions.map((element) => (
    <div key={element.title} className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-[#F0E9FC] flex justify-center items-center">
        {element.icon}
      </div>
      <div className="text-[#FABC3B]">{element.title}</div>
    </div>
  ));


  const enregistrement = (e) => {
    if (2 > 0 ) {
      if (inscriForm.email.match(regex)) {
        if (2 > 0) {
          seterror(null)

          axios.patch(`http://localhost:3030/users/${user._id}`,  {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          {
            action : "UPDATE_INFOS",
            lastname: inscriForm.nom,
            firstname: inscriForm.prenom,
            username: inscriForm.username,
            email: inscriForm.email,
            // password: inscriForm.mdp,
          }).then((ret) => {
            if (ret) {
              console.log("Succes");
              setsucc1("Infos mises à jour")

              // setClicInsc(!clicInsc); setClicCon(!clicCon)
            } else {

            }
          }).catch((err) => {
            console.log(err);
            console.log(inscriForm);
            console.log(accessToken);
            console.log(user._id);
            // console.log(err);
            // if (err.response.data.data.hasOwnProperty('password')) {
            //   // L'attribut existe dans l'objet
            //   console.log(err.response.data.data.password.message);
            //   seterror(err.response.data.data.password.message)
            // } else {
            //   if (err.response.data.data.hasOwnProperty('username')) {
            //     console.log(err.response.data.data.username.message);
            //     seterror(err.response.data.data.username.message)
            //   } else {
            //     console.log(err.response.data.data.email.message);
            //     seterror(err.response.data.data.email.message)
            //   }

        
            // }

        

          })
        } else {
          seterror("The two passwords must not be the same")
          // console.log(error);
        }
      } else {
        seterror("email invalid")
      }
    } else {
      seterror("Password must contain at least 8 charaters")
    }




  }


  // const componentDidMount =(e) => {
  //   axios.get('http://localhost:3030', {
  //     headers: {
  //       Authorization: 'Bearer VOTRE_JETON_D_AUTHENTIFICATION',
  //     },
  //   })
  //     .then(response => {
  //       const userData = response.data;
  //       // Faites quelque chose avec les données de l'utilisateur
  //     })
  //     .catch(error => {
  //       console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur :', error);
  //     });
  // }

  useEffect(() => {
    if (user) {
      setInscriForm({
        nom: user.firstname,
        prenom: user.lastname,
        username: user.username,
        email: user.email,
        // mdp: user.firstname,
        // conf_mdp: "motdepasse",
      });
    }
  }, []);




  return (
    <div className="space-y-10">
      {/* <div className="flex flex-col items-center text-center ">
        <div className="w-32 h-32 rounded-full bg-gray-400">
          <img
            src={SmallProfil}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="font-bold text-xl uppercase">ASHA HAYES{"ss"}</div>

        <div className="text-[#7C5800] text-[11px] px-10">asha.hayes@ash.eu</div>

        <div className="text-[#7C5800] text-[11px]">@ashayes</div>

      </div> */}

      {/* <div className="flex justify-between items-center">{"ee"}</div> */}

      <div className="h-[400px] flex-1  ">

        <h1 className='font-bold text-4xl max-w-sm mt-10 text-gray-600 '>
          Profil Utilisateur
        </h1>

        {error && (
          <p className='max-w-sm mt-6 text-xm mb-5 text-red-500'>
            {
              error
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

        {showmdp && (
          <div className='max-w-sm flex  text-violet-400 py-4'>
            {/* <label>Mot de passe</label> */}
            <input className='p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 w-2/3 mx-2
             focus:bg-gray-200 focus:outline-none' type="password" name='mdp'
              placeholder='Ancien mot de passe' value={inscriForm.mdp} onChange={Inscripinfos} />
            <input className='p-2 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 w-2/3 mx-2
             focus:bg-gray-200 focus:outline-none' type="password" name='conf_mdp'
              placeholder='Nouveau mot de passe' value={inscriForm.conf_mdp} />
          </div>
        )}

        {showmdp ? (
          <div>
            <div className='w-1/3 bg-blue-500 rounded-md text-white text-center mt-11 h-7
          shadow-lg shadow-blue-400/50 cursor-pointer hover:shadow-blue-800/50'
            >
              Mettre à jour le profil
            </div>

          </div>

        ) : (
          <div className="justify-between flex max-w-sm">
            <div className='w-1/3 bg-blue-500 rounded-md text-white text-center mt-11 h-7
                shadow-lg shadow-blue-400/50 cursor-pointer hover:shadow-blue-800/50'
              onClick={() => { setShowmdp(true) }}
            >
              Modifier le mot de passe
            </div>
            <div className='w-1/3 bg-blue-500 rounded-md text-white text-center mt-11 h-7
                shadow-lg shadow-blue-400/50 cursor-pointer hover:shadow-blue-800/50'
              onClick={() => {enregistrement() }}
            >
              Mettre à jour
            </div>
          </div>
        )
        }





      </div>



      <div className="space-y-4">
        {/* <div className="font-bold text-xl uppercase">Images</div>
        <div className="grid grid-cols-3 gap-2">
          
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
        </div> */}
      </div>
    </div>
  );
};
