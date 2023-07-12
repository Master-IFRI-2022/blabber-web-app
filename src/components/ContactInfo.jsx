import SmallProfil from "../../assets/SmallProfile.png";
import BigProfil from '../../assets/bigProfil.png'
// import SmallProfil from "../assets/smallProfil.png"
import DefaultProfil from "../../assets/dp.png"
import { HiEdit, HiArchive, HiUserRemove, HiOutlinePencilAlt, HiUserCircle } from "react-icons/hi"
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setImage } from "../../feature/UserSlice";


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
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.users);
  const accessToken = useSelector((state) => state.users.accesstoken);
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const [error, seterror] = useState('');
  const [errormdp, seterrormdp] = useState('');
  const [succ1, setsucc1] = useState('');
  const [succ1mdp, setsucc1mdp] = useState('');
  const [image, setImage] = useState(null);
  const [imageprof, setImageprof] = useState(null);
  const [formDataValue, setFormDataValue] = useState({
    action: "UPDATE_INFOS"
  });


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

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    console.log(image);
  };

  async function pauseThenExecute(e) {
    // Pause d'une seconde
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch(setImage(imageprof))
    // Exécuter l'instruction après la pause
    // window.location.href = "/Discussions"
  }

  const mettreImg = (e) => {
    // console.log(e);
    setImageprof(e)
    const im1 = e
    console.log(im1);
    // pauseThenExecute()
    // dispatch(setImage(e))
  }

  const handleSubmit = async (event) => {
    // event.preventDefault();

    if (image) {
      try {
        // console.log(formData);
        let formData = new FormData();
        formData.append('file', image);
        formData.append('action', formDataValue.action);

        const token = 'YOUR_AUTH_TOKEN'; // Remplacez par votre véritable token d'authentification

        const response = await fetch('http://localhost:3030/users', {
          method: 'PATCH',
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            // "Content-Type": "multipart/form-data"
          },
          body: formData
        });
        const responseData = await response.json();
        if (response.ok) {
          console.log('Image envoyée avec succès');
          console.log(responseData.photoUrl);
          // const im1 = responseData.photoUrl;
          mettreImg(responseData.photoUrl)
          // Réinitialiser le formulaire après l'envoi
          setImage(null);
        } else {
          console.log(formData);
          // console.log(formData);
          console.error('Erreur lors de l\'envoi de l\'image');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'envoi de l\'image:', error);
      }
    }
  };

  const majmdp = () => {
    seterrormdp(null)
    setsucc1mdp(null)
    if (inscriForm.mdp != "" && inscriForm.conf_mdp != "") {
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };

      axios.patch(`http://localhost:3030/users/${user._id}`,
        {
          action: "CHANGE_PASSWORD",
          currentPassword: inscriForm.mdp,
          newPassword: inscriForm.conf_mdp
          // password: inscriForm.mdp,
        }, { headers }).then((ret) => {
          if (ret) {
            console.log("Succes");
            setsucc1mdp("Mot de passe mis à jour")
            setInscriForm({
              nom: user.lastname,
              prenom: user.firstname,
              username: user.username,
              email: user.email,
              mdp: "",
              conf_mdp: "",
            });

            // setClicInsc(!clicInsc); setClicCon(!clicCon)
          } else {

          }
        }).catch((err) => {
          // console.log(err.response.data.message);
          console.log(err);
          console.log(inscriForm.mdp);
          seterrormdp(err.response.data.message)
        })

    } else {
      seterrormdp("Veuillez remplir tous les champs")
    }


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
    seterror(null)
    setsucc1(null)
    if (inscriForm.nom != "" && inscriForm.prenom != "" && inscriForm.email != "" && inscriForm.email != "" && inscriForm.username != "") {
      if (inscriForm.email.match(regex)) {
        if (2 > 0) {

          const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          };


          axios.patch(`http://localhost:3030/users/${user._id}`,
            {
              action: "UPDATE_INFOS",
              lastname: inscriForm.nom,
              firstname: inscriForm.prenom,
              username: inscriForm.username,
              email: inscriForm.email,
              // password: inscriForm.mdp,
            }, { headers }).then((ret) => {
              if (ret) {
                console.log("Succes");
                setsucc1("Infos mises à jour")
                dispatch(setUsers(inscriForm))
                handleSubmit()

                // setClicInsc(!clicInsc); setClicCon(!clicCon)
              } else {

              }
            }).catch((err) => {
              console.log(err);
              console.log(inscriForm);
              console.log(accessToken);
              console.log(user._id);
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


              }



            })
        } else {
          seterror("The two passwords must not be the same")
          // console.log(error);
        }
      } else {
        seterror("email invalide")
      }
    } else {
      seterror("Veuillez remplir tous les champs")
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
        nom: user.lastname,
        prenom: user.firstname,
        username: user.username,
        email: user.email,
        mdp: "",
        conf_mdp: "",
      });
      if (user.photoUrl) {
        setImageprof(user.photoUrl)
        console.log(imageprof);
      }
    }
  }, []);




  return (

    <div className="px-12 py-2 h-full ">

      <div className="rounded-xl bg-gray-700 h-[200px]">
        <img src={BigProfil} alt="" className="w-full h-full" />

      </div>

      {/* <label for="file3">
        <img src={SmallProfil} alt="" className="  rounded-full w-32 h-32" />
        <input type="file" style={{ display: "none" }}
          id="file3" accept="image/*" onChange={handleImageChange} />
      </label> */}

      <div className="flex space-x-4 relative px-12" >
        <div className="w-32 h-32 rounded-full bg-gray-400 absolute -top-8">
          {/* <img src={SmallProfil} alt="" className="w-full h-full rounded-full" /> */}
          <label for="file3">
            {imageprof != null ? (
              <img src={`http://localhost:3030/${imageprof}`} alt="" className="w-full h-full rounded-full" />
            ) : (
              <img src={SmallProfil} alt="" className="w-full h-full rounded-full" />
            )}
            <input type="file" style={{ display: "none" }}
              id="file3" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <div className="pl-32 pt-4">
          <div className="text-2xl font-semibold">{user.email}</div>
          <div>{user.username}</div>
        </div>
      </div>

      <div className="pt-12 pb-16">

        {/* <ContactInfo/> */}
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

            {showmdp ? (
              <></>
            ) : (
              <div>

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




                <div className="justify-between  max-w-sm">
                  {/* <div className='w-1/3 bg-blue-500 rounded-md text-white text-center mt-11 h-7
                shadow-lg shadow-blue-400/50 cursor-pointer hover:shadow-blue-800/50'
                  onClick={() => { setShowmdp(true) }}
                >
                  Modifier le mot de passe
                </div> */}
                  <div className='w-full bg-blue-500 rounded-md text-white text-center mt-11 h-7
                shadow-lg shadow-blue-400/50 cursor-pointer hover:shadow-blue-800/50'
                    onClick={() => { enregistrement() }}
                  >
                    Mettre à jour
                  </div>
                  <p className='w-full  rounded-md text-blue-500 text-center mt-11 h-7
                cursor-pointer hover:shadow-blue-800/50 underline'
                    onClick={() => { setShowmdp(!showmdp) }}
                  >
                    Changer le mot de passe
                  </p>
                </div>

                {/* <form onSubmit={handleSubmit}> */}
                {/* <label for="file3">
                  <img src={SmallProfil} alt="" className="  rounded-full w-32 h-32" />
                  <input type="file" style={{ display: "none" }}
                    id="file3" accept="image/*" onChange={handleImageChange} />
                </label> */}
                {/* <button onClick={() => { handleSubmit() }}>Envoyer</button> */}
                {/* </form> */}


              </div>
            )

            }





            {showmdp && (
              <div className='max-w-sm  text-violet-400 py-4'>

                {errormdp && (
                  <p className='max-w-sm mt-6 text-xm mb-5 text-red-500'>
                    {
                      errormdp
                    }
                  </p>
                )}
                {succ1mdp && (
                  <p className='max-w-sm mt-6 text-xm mb-5 text-green-500'>
                    {
                      succ1mdp
                    }
                  </p>
                )}
                {/* <label>Mot de passe</label> */}
                <input className='w-full p-2 m-7 rounded-lg bg-gray-200 mt-2 focus:border-blue-500 mx-2
             focus:bg-gray-200 focus:outline-none' type="password" name='mdp'
                  placeholder='Ancien mot de passe' value={inscriForm.mdp} onChange={Inscripinfos} />
                <input className='w-full p-2 m-7 rounded-lg bg-gray-200 mt-2 focus:border-blue-500  mx-2
             focus:bg-gray-200 focus:outline-none' type="password" name='conf_mdp'
                  placeholder='Nouveau mot de passe' value={inscriForm.conf_mdp} onChange={Inscripinfos} />

                <div className='w-full bg-blue-500 rounded-md text-white text-center mt-11 h-7
                shadow-lg shadow-blue-400/50 cursor-pointer hover:shadow-blue-800/50'
                  onClick={() => { majmdp() }}
                >
                  Mettre à jour le mot de passe
                </div>
                <p className='w-full  rounded-md text-blue-500 text-center mt-11 h-7
                cursor-pointer hover:shadow-blue-800/50 underline'
                  onClick={() => { setShowmdp(!showmdp); seterrormdp(null); setsucc1mdp(null) }}
                >
                  Infos profil
                </p>
              </div>
            )
            }

          </div>
        </div>
      </div>
    </div>


  );
};
