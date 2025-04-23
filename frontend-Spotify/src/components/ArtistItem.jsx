import React from 'react'
import { useNavigate } from 'react-router-dom';

const ArtistItem = ({image, name, decs, id}) => {
  const navigate = useNavigate();
    return (
      <div onClick={() => navigate(`/artist/${id}`)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] w-[156px] ' >
          <img className='max-w-[156px] max-h-[156px] rounded' src={image} alt="" />
          <p className='font-bold mt-2 mb-1'>{name}</p>
          <p className='text-slate-200 text-sm'>{decs}</p>
      </div>
    )
}

export default ArtistItem