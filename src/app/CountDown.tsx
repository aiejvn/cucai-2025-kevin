"use client"

import { NextFont } from "next/dist/compiled/@next/font";
import { Pixelify_Sans } from "next/font/google";
import { useState, useEffect } from "react";


const PixelifySans = Pixelify_Sans({
  subsets: ["cyrillic", "latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

export function Countdown({font}:{font:NextFont}){
    const CUCAIDate = new Date('March 8, 2025 00:00:00').getTime();
    const [diff, setDiff] = useState({
        "days":0,
        "hours":0,
        "minutes":0,
        "seconds":0,
    });

    useEffect(() => {
        const calcTimeLeft = () => {
            const now = new Date().getTime();
            let time_remaining = {
                "days":0,
                "hours":0,
                "minutes":0,
                "seconds":0,
            }
    
            const difference = CUCAIDate - now;
            if (difference > 0) {
                time_remaining = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            // return <div>
            //     {Math.floor(diff / (1000 * 60 * 60 * 24))}:{Math.floor((diff / (1000 * 60 * 60)) % 24)}:{Math.floor((diff / (1000 * 60)) % 60)}: {Math.floor((diff / 1000) % 60)}
            // </div>
            return time_remaining;
        }

        const timer = setInterval(() => {
            setDiff(calcTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [CUCAIDate])



    return(
        <div 
            className={"text-2xl " + font.className} 
            style={{color: "rgba(23, 20, 86, 1)"}}>
                {(CUCAIDate - new Date().getTime() > 0) ? `${diff.days} Days, ${diff.hours} Hours, ${diff.minutes} Minutes, and ${diff.seconds} Seconds` : "COUNTDOWN HAS ENDED"}
            {/* <h1 className={font.className}>{calcTimeLeft()}</h1> */}
        </div>
    )
}