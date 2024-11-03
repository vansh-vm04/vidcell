"use client";
import React from "react";
import HomeCard from "./HomeCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker';

const MeetingTypeList = () => {
  const [meetingState, setmeetingState] = useState<
    isInstantMeeting | isJoiningMeeting | isScheduleMeeting | undefined
  >(undefined);
  const router = useRouter();
  const user = useUser();
  const client = useStreamVideoClient();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetails, setcallDetails] = useState<Call>()
  const {toast} = useToast();

  const joinMeeting = ()=>{
    router.push(values.link);
  }

  const createMeeting = async () => {
    if(!user || !client) return;
    try {
      if(!values.dateTime){
        toast({title:"Please select date and time"})
        return;
      }
      const callType = 'default';
      const callId = crypto.randomUUID();
      const call = client.call(callType,callId);
      
      if(!call) throw new Error("Failed to create call");

      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({data:{
        starts_at:startAt,
        custom:{
          description
        }
      }})

      setcallDetails(call);
      if(!values.description){
        router.push(`/meeting/${call.id}?personal=true`);
      }
      toast({title:"Meeting Created"})
    } catch (error) {
      console.log(error)
      toast({title:"Failed to create meeting"})
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className="grid items-center w-full grid-flow-row gap-5 sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-2">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => {
          setmeetingState("isInstantMeeting");
        }}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        handleClick={() => {
          setmeetingState("isJoiningMeeting");
        }}
        className="bg-blue-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => {
          setmeetingState("isScheduleMeeting");
        }}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        handleClick={() => {
          router.push("/recordings");
        }}
        className="bg-yellow-1"
      />
      {!callDetails? (
        <MeetingModal
        isOpen={meetingState == "isScheduleMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Create Meeting"
        className="text-center"
        buttonText="Schedule Meeting"
        handleClick={() => createMeeting()}
        >
          <div className="flex w-full flex-col gap-2.5 text-white">
            <label htmlFor="description" className="text-white text-base">Add a description</label>
            <Textarea
             className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none  "
             onChange={(e)=>{
              setvalues({...values,description:e.target.value})}}
             />
          </div>
          <div className="flex w-full flex-col gap-2.5 text-white">
          <label htmlFor="description" className="text-white text-base">Select Date and Time</label>
          <ReactDatePicker 
            selected={values.dateTime}
            onChange={(date)=>setvalues({...values,dateTime:date!})}
            showTimeSelect
            timeFormat="HH:mm"
            timeCaption="time"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full bg-dark-3 rounded p-2 focus:outline-0"
          />
          </div>
        </MeetingModal>
      ):(
        <MeetingModal
        isOpen={meetingState == "isScheduleMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Meeting Created"
        className="text-center"
        buttonText="Copy Meeting Link"
        buttonIcon="/icons/copy.svg"
        handleClick={() => {
          navigator.clipboard.writeText(meetingLink)
          toast({title:'Link Copied'})
        }}
        image="/icons/checked.svg"
      />
      )}

      <MeetingModal
        isOpen={meetingState == "isInstantMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start meeting"
        handleClick={() => createMeeting()}
      />
      <MeetingModal
        isOpen={meetingState == "isJoiningMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Join Meeting"
        className="text-center"
        buttonText="Join"
        handleClick={() => joinMeeting()}
        >
          <div className="flex w-full flex-col gap-2.5 text-white">
            <label htmlFor="description" className="text-white text-base">Enter Meeting ID</label>
            <Textarea
             className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none "
             onChange={(e)=>{
              setvalues({...values,link:e.target.value})}}
             />
          </div>
        </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
