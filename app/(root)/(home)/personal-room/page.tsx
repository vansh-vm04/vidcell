'use client'
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useGetCallById } from '@/hooks/useGetCallById';

const PersonalRoom = () => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const {user} = useUser();
  const meetingID = user?.id;
  const {call} = useGetCallById(meetingID!);
 

  const startRoom = async ()=>{
    if (!client || !user) return;
    const newCall = client?.call('default',meetingID!);
    if(!call){
      await newCall?.getOrCreate({data:{
        starts_at:new Date(Date.now()).toISOString(),
        custom:{
          description: `${user?.username}'s Meeting`,
        }
      }})
    }
    router.push(`/meeting/${meetingID!}?personal=true`);
      toast({title:"Meeting Started"})
  }

  const {toast} = useToast();
  const Table = ({title,description}:{title:string,description:string})=>{
    return <div className='w-full flex flex-col'>
      <h1 className='font-semibold'>{title}:</h1>
      <p className='text-wrap'>{description}</p>
    </div>
  }
 
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}`;
  return (
    <div className='flex size-full flex-col gap-7 text-white'>
      <h1 className='text-3xl font-bold'>
        Personal Meeting Room
      </h1>
      <Table title='Topic' description={`${user?.username}'s Meeting`}/>
      <Table title='Meeting Id' description={`${meetingID!}`}/>
      <Table title='Invite Link' description={`${meetingLink!}`}/>
      <div className='flex gap-4'>
        <Button onClick={()=>startRoom()} className='bg-blue-1'>
          Start Meeting
        </Button>
        <Button className='bg-dark-4' onClick={()=>{
          navigator.clipboard.writeText(meetingLink!)
          toast({title:'Invitation Copied'})
          }}>
          Copy Invitation
        </Button>
      </div>
    </div>
  )
}

export default PersonalRoom