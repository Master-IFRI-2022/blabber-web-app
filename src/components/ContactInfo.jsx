import SmallProfil from "../assets/SmallProfile.png";
import DefaultProfil from "../assets/dp.png"
import {HiEdit,HiArchive,HiUserRemove,HiOutlinePencilAlt, HiUserCircle} from "react-icons/hi"
import axios from 'axios';

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
      icon:<HiUserRemove></HiUserRemove>,
      action: "",
    },
  ];

 

  const actionItems = actions.map((element) => (
    <div key={element.title} className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-[#F0E9FC] flex justify-center items-center">
        {element.icon}
      </div>
      <div className="text-[#FABC3B]">{element.title}</div>
    </div>
  ));

  /*const componentDidMount =(e) => {
    axios.get('http://localhost:3030', {
      headers: {
        Authorization: 'access_token',
      },
    })
      .then(response => {
        const userData = response.data;
        
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur :', error);
      });
  }*/


 

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center text-center ">
        <div className="w-32 h-32 rounded-full bg-gray-400">
          <img
            src={SmallProfil}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="font-bold text-xl uppercase">ASHA HAYES</div>

        <div className="text-[#7C5800] text-[11px] px-10">asha.hayes@ash.eu</div>

        <div className="text-[#7C5800] text-[11px]">@ashayes</div>

      </div>

      <div className="flex justify-between items-center">{actionItems}</div>

    

    <div className="space-y-4">
        <div className="font-bold text-xl uppercase">Images</div>
        <div className="grid grid-cols-3 gap-2">
          
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
            <div className="w-24 h-24 rounded-xl bg-gray-100"></div>
        </div>
    </div>
    </div>
  );
};
