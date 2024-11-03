import { cn } from '@/lib/utils';
import { PaginatedGridLayout, SpeakerLayout, CallParticipantsList,CallControls,CallStatsButton, useCallStateHooks, CallingState, } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { LayoutList } from 'lucide-react';
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger, } from './ui/dropdown-menu';
import { Users2Icon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
import { useRouter } from 'next/navigation';


type LayoutType= 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const router = useRouter();
  const [layout, setLayout] = useState<LayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const {useCallCallingState} = useCallStateHooks();
  const callingState =  useCallCallingState();
  if(callingState !== CallingState.JOINED){
    return <Loader/>
  }


  const CallLayout =()=>{
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout/>
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition={'left'}/>
      default:
        return <SpeakerLayout participantsBarPosition={'right'}/>
    }
  }

  return (
    <section className='h-screen w-full overflow-hidden text-white relative pt-4'>
      <div className='flex size-full items-center justify-center relative'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout/>
        </div>
          <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block': showParticipants,})}>
          <CallParticipantsList onClose={()=>{setShowParticipants(false)}}/>
          </div>
      </div>
      <div className='bottom-0 fixed flex-wrap flex items-center justify-center gap-5 w-full'>
        <CallControls onLeave={()=>router.push('/')}/>
        <DropdownMenu>
          <DropdownMenuTrigger
           className='bg-dark-1 hover:bg-dark-3 rounded-full px-2 py-2'
          >
            <LayoutList size={20} className='text-white'/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-dark-1 border-dark-1 text-white flex flex-col flex-center'>
            {['Grid','Speaker-left','Speaker-right'].map((item,index)=>{
              return <div key={index}>
                <DropdownMenuItem
               className='cursor-pointer'
               onClick={()=>setLayout(item.toLowerCase() as LayoutType)} >
                {item}
                </DropdownMenuItem>
                </div>
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button className='bg-dark-1 rounded-full px-2 py-2 hover:bg-dark-3'
          onClick={()=>setShowParticipants((prev)=>!prev)}
        >
          <Users2Icon size={20} className='text-white'/>
        </button>
        {isPersonalRoom && <EndCallButton/> }
      </div>
    </section>
  )
}

export default MeetingRoom