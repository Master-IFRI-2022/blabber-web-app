import React from 'react'
import getRandomTailwindColor from "../../utilities/random_color"


export default function ContactItem({contact, actions=false}) {
  return (
    <div className={`w-full my-4 flex flex-row ${actions?'justify-between':'justify-start'} items-center`}>
        <div className="flex gap-6">
            <div className={`relative inline-flex items-center justify-center w-14 h-14 overflow-hidden ${getRandomTailwindColor()} rounded-full`}>
                <span className={`text-white font-bold text-xl`}>{contact.nom.charAt(0)}{contact.prenoms.charAt(0)}</span>
            </div>
            <div className="font-medium flex justify-center flex-col">
                <div className="text-black">{contact.nom} {contact.prenoms}</div>
                <div className="text-sm text-gray-500">{contact.description}</div>
            </div>
        </div>
        {
            actions && (
                <div className='flex flex-row items-center justify-between'>
                   { actions.map((action,index) => <a key={index} href={`/${action.url}/${index}`} className={`${action.className} p-2 px-6 mx-2`} id={index}>{action.name}</a>)}
                </div>
            )
        }
    </div>
  )
}
