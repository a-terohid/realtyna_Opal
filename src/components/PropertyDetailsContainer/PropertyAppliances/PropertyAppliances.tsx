import Icon from '@mdi/react'
import React from 'react'

interface IProps {
  list: {
    name: string
    icon: string
  }[]
}

const PropertyAppliances: React.FC<IProps> = ({ list }) => {
  // if item from property exist in appliance then show it

  return (
    <section className='col-span-full flex flex-col items-start justify-center gap-[.875rem]'>
      <h2 className='text-2xl font-bold text-black'>Appliances</h2>
      <div className='grid w-full grid-cols-2 place-items-start gap-[1.5625rem] rounded-[.9375rem] p-[.9375rem] shadow-primary sm:auto-cols-fr sm:grid-flow-col sm:grid-rows-6 md:grid-rows-6 lg:grid-rows-5'>
        {list.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-center gap-[.5rem]  whitespace-nowrap'
          >
            <div className='flex size-[1.875rem] items-center justify-center rounded-[.3125rem] shadow-primary'>
              <Icon
                path={item.icon}
                size={1}
              />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PropertyAppliances
