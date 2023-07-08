import React from 'react'
import getRandomTailwindColor from "../../utilities/random_color"


export default function ContactItem({contact, actions=false}) {
  return (
    <div className={`w-full my-4 flex flex-row ${actions?'justify-between':'justify-start'} items-center`}>
        <div className="flex gap-6">
            <div className={`relative inline-flex items-center justify-center w-14 h-14 overflow-hidden ${getRandomTailwindColor()} rounded-full`}>
                <span className={`text-white font-bold text-xl`}>{contact.firstname.charAt(0)}{contact.lastname.charAt(0)}</span>
            </div>
            <div className="font-medium flex justify-center flex-col">
                <div className="text-black">{contact.lastname} {contact.firstname}</div>
                <div className="text-sm text-gray-500">{"J'utilise Blabber"}</div>
            </div>
        </div>
        {
            actions && (
                <div className='flex flex-row items-center justify-between'>
                   { actions.map((action,index) => <a key={index} onClick={()=>action.url(contact._id)} className={`${action.className} p-2 px-6 mx-2 cursor-pointer`} id={index}>{action.name}</a>)}
                </div>
            )
        }
    </div>
  )
}
