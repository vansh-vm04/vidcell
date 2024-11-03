import React, { useEffect, useState } from 'react'
import { useCall, VideoPreview,DeviceSettings } from '@stream-io/video-react-sdk'
import { Button } from './ui/button';

const MeetingSetup = ({setisSetupComplete}:{setisSetupComplete:(value:boolean)=>void}) => {
  const [isMicCamToggeledOn, setisMicCamToggeledOn] = useState(false);
  const call = useCall();

  if(!call) throw new Error("Usecall must be used within streamcall component");

  useEffect(() => {
    if(isMicCamToggeledOn){
      call?.camera.disable();
      call?.microphone.disable();
    }
    else{
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggeledOn,call?.camera,call?.microphone])

  
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview/>
      <div className='flex h-16 items-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium'>
          <input type="checkbox"
           checked={isMicCamToggeledOn}
           onChange={(e)=>{setisMicCamToggeledOn(e.target.checked)}}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings/>
      </div>
      <Button className='bg-green-500 text-white rounded-md py-2.5 px-4'
        onClick={()=>{
          call.join();
          setisSetupComplete(true);
        }}
      >Join Meeting</Button>
    </div>
  )
}

export default MeetingSetup