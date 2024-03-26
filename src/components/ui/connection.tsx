"use client";

import { useUserContext } from '@/app/context/UserContext';
import { Loader2Icon } from 'lucide-react';
import { FC } from 'react'

interface connectionProps {

}

const Connection: FC<connectionProps> = ({ }) => {
    const { connected } = useUserContext();

    return (
        <div className='flex justify-start w-48 text-2xl'>
            <div className='flex gap-2 items-center h-1'>
                {connected ?
                    <span className='rounded-full h-5 w-5 bg-green-500'></span> :
                    <Loader2Icon size={30} className='animate-spin' />
                }
                {connected ? <p>Online</p> : <p>Conectando</p>}
            </div>
        </div>
    )
}

export default Connection