'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import { useRouter } from 'next/navigation';
import Loader from './Loader';



const CallList = ({type}:{type:'upcoming'|'recordings'|'ended'}) => {

  const {endedCalls,upcomingCalls,callRecordings,isLoading} = useGetCalls();
  const [recording, setRecording] = useState<CallRecording[]>([]);
  const router = useRouter();
  

  useEffect(() => {
    try {
      const fetchRecordings = async ()=>{
        const callData = await Promise.all(callRecordings?.map((meeting)=>meeting.queryRecordings()) ?? []);
        const recordings = callData.filter(call=>call.recordings.length>0).flatMap(call=>call.recordings);
        setRecording(recordings);
       }
       if(type=='recordings') fetchRecordings();
    } catch (error) {
      console.log(error);
    }
  }, [type,callRecordings]);
  

  const getCalls = ()=>{
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recording;
      case 'upcoming':
        return upcomingCalls;
        default:
          return [];
    }
  }

  const getNoCallsMessage = ()=>{
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'recordings':
        return 'No Recordings';
      case 'upcoming':
        return 'No Upcoming Calls';
        default:
          return '';
    }
  }

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if(isLoading) return <Loader/>;

  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording)=>(
         <MeetingCard
          key={(meeting as Call).id}
          icon= {type == 'ended'? '/icons/previous.svg':type == 'recordings'? '/icons/recordings.svg': '/icons/upcoming.svg'}
          title= {(meeting as Call).state?.custom.description.substring(0,20) || 'No Description'}
          date= {(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording).start_time?.toLocaleString()}
          isPreviousMeeting= {type === 'ended'}
          buttonIcon1= {type == 'recordings'? '/icons/play.svg': undefined}
          handleClick= {type == 'recordings'?()=> router.push(`${(meeting as CallRecording).url}`):()=> router.push(`/meeting/${(meeting as Call).id}`)}
          link= {type == 'recordings' ? `${(meeting as CallRecording).url}` : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
          buttonText= {type == 'recordings'? 'Play' : 'Start'}
        />
        )):(
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  )
}

export default CallList