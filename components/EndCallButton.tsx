import React from 'react'
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const {useLocalParticipant} = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOwner = localParticipant && call?.state.createdBy.id === localParticipant.userId;

  return (
    <div>
    {isMeetingOwner && <button
         className='bg-red-600 flex items-center justify-center gap-2 rounded-sm px-4 py-2 hover:bg-red-500'
         onClick={async()=>{
          await call.endCall();
           router.push("/");
          }}
         >
          End call for everyone<LogOut size={20} className='text-white'/>
        </button>}
        </div>
  )
}

export default EndCallButton