import SmallProfil from "../assets/smallProfil.png";
import DefaultProfil from "../assets/dp.png"
import {HiEdit,HiArchive,HiUserRemove,HiOutlinePencilAlt} from "react-icons/hi"

export default () => {
  const actions = [
    {
      title: "Éditer",
      icon: <HiOutlinePencilAlt></HiOutlinePencilAlt>,
      action: "",
    },
    {
      title: "Archiver",
      icon: <HiArchive></HiArchive>,
      action: "",
    },
    {
      title: "Quitter",
      icon:<HiUserRemove></HiUserRemove>,
      action: "",
    },
  ];

  const members = [
    {
        fullname : "Vous",
        role : "ADMIN"
    },
    {
        fullname : "Winston Churchill",
        role : "ADMIN"
    },
    {
        fullname : "Charles De Gaulle",
        role : ""
    },
    {
        fullname : "Harry Truman",
        role : ""
    }

    
  ]

  const actionItems = actions.map((element) => (
    <div key={element.title} className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-[#F0E9FC] flex justify-center items-center">
        {element.icon}
      </div>
      <div className="text-[#FABC3B]">{element.title}</div>
    </div>
  ));


  const memberItems = members.map((element)=>(
    <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center">
            <div className="rounded-full bg-gray-100"><img className="object-fit w-6 h-6" src={DefaultProfil} alt="" /></div>
            <div className="text-[#1A1C1E]">{element.fullname}</div>
        </div>
        <div className="flex items-center space-x-4">
        {element.role == 'ADMIN' ? <div className="text-[#73777F] text-sm">Admin</div>: ""}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 19.3582C15.302 19.3582 19.6 15.0601 19.6 9.7582C19.6 4.45627 15.302 0.158203 10 0.158203C4.69809 0.158203 0.400024 4.45627 0.400024 9.7582C0.400024 15.0601 4.69809 19.3582 10 19.3582ZM6.40002 8.5582H4.00002V10.9582H6.40002V8.5582ZM16 8.5582H13.6V10.9582H16V8.5582ZM8.80002 8.5582H11.2V10.9582H8.80002V8.5582Z" fill="#43474E"/>
            </svg>

        </div>
    </div>
  ))

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-32 h-32 rounded-full bg-gray-400">
          <img
            src={SmallProfil}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="font-bold text-xl uppercase">Partage de l’europe</div>

        <div className="text-[#43474E] text-[11px] px-10">
          Cette conversation regroupe les <br /> principaux décideurs parmi les
          alliés pour s’entendre sur le partage des influences en Europe.
          Socialisme vs Communisme vs Démocratie : Qui triomphera ?
        </div>

        <div className="text-[#7C5800] text-[11px]">
          Créée le 17 Juillet 1945
        </div>

      </div>

      <div className="flex justify-between items-center">{actionItems}</div>

    <div>
        <div className="text-xl font-bold pb-6">Membres (5)</div>
        <div className="rounded-lg cursor-pointer bg-primary text-white flex items-center justify-center px-4 py-2">Ajouter un membre</div>
        <div className="space-y-6 pt-4">
            {memberItems}
        </div>
    </div>

    <div className="space-y-4">
        <div className="font-bold text-xl">Images</div>
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
