import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const timeTag = now
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .slice(-2);
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);
  return (
    <section className="flex items-center size-full flex-col gap-5 text-white">
      <div className="w-full flex flex-col justify-between p-6 h-[300px] rounded-[20px] bg-hero bg-cover">
        <div>
          <h2 className="glassmorphism w-[244px] text-center rounded h-fit p-2">
            Upcoming meeting on 12:30pm
          </h2>
        </div>

        <div className="flex flex-col w-[274px] h-1/2 justify-center">
          <h1 className="text-6xl font-bold">
            {time}
            <small className="text-xl font-thin"> {timeTag}</small>
          </h1>

          <h2 className="rounded text-xl text-blue-200 h-fit p-2">{date}</h2>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
