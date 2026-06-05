import {
  mdiPause,
  mdiPlay,
  mdiSkipBackward,
  mdiSkipForward,
  mdiVolumeHigh,
  mdiVolumeOff
} from "@mdi/js"
import Icon from "@mdi/react"
import type { HTMLReactParserOptions } from "html-react-parser"
import parser, { domToReact, Element } from "html-react-parser"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"

import { cn } from "@/utils/helpers"

import { Button } from "../Button"
import { Progress } from "../Progress"
import { Slider } from "../Slider"

type VideoProps = {
  src: string
  className?: string
  type: "video"
  setDivHeight?: React.Dispatch<React.SetStateAction<number>>
}

type AudioProps = {
  src: string
  className?: string
  type: "audio"
  bgImage: string
  title: string
  tags?: string
  desc?: string
}

type PlayerProps = VideoProps | AudioProps

const Player: React.FC<PlayerProps> = (props) => {
  const { src, type, className } = props

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [videoTime, setVideoTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    if (props.type === "video" && props.setDivHeight) {
      const { setDivHeight } = props
      // Function to update the divHeight state with the latest div height
      const updateDivHeight = () => {
        if (videoRef.current) {
          const height = videoRef.current.clientHeight
          setDivHeight(height)
        }
      }

      // Call the updateDivHeight function when the component mounts and whenever the window resizes
      window.addEventListener("resize", updateDivHeight)
      updateDivHeight() // Call it immediately after mounting

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", updateDivHeight)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const vid = videoRef.current

    if (vid) {
      vid.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const vid = videoRef.current

    if (vid) {
      if (playing) {
        vid
          .play()
          .then(() => setVideoTime(vid.duration))
          .catch((error) => console.error("Video play error:", error))
      } else {
        vid.pause()
      }
    }
  }, [playing])

  useEffect(() => {
    if (videoRef.current) {
      const intervalId = setInterval(() => {
        setCurrentTime(videoRef.current!.currentTime)
        setProgress((videoRef.current!.currentTime / videoTime) * 100)
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [videoTime])

  const fastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5
    }
  }

  const revert = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5
    }
  }

  const toggleVolume = () => {
    setVolume((prevVolume) => (prevVolume === 0 ? 1 : 0)) // Toggle between 0 and 1
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === "p") {
        return (
          <span
            className={cn(
              "line-clamp-2 max-w-[60%] text-sm font-normal text-[#EBEBEB]"
            )}
          >
            {domToReact(domNode.children, options)}
          </span>
        )
      }
    }
  }

  return (
    <div
      className={cn(
        "group relative flex w-full flex-col rounded-[15px] shadow-primary",
        className,
        type === "audio"
          ? `items-center justify-start overflow-hidden before:absolute before:inset-0 before:z-[1] before:block before:rounded-[15px] before:backdrop-blur-sm before:content-[""]`
          : "items-center justify-center"
      )}
    >
      {type === "video" ? (
        <video
          ref={videoRef}
          className="size-full rounded-[15px] bg-white"
          src={src}
        ></video>
      ) : (
        <>
          <audio ref={videoRef} src={src}></audio>
          <Image
            src={props.bgImage}
            fill
            sizes="20vw"
            alt="podcast_img"
            className="absolute inset-0 flex size-full items-center justify-center rounded-[15px] bg-white object-cover"
          />
        </>
      )}

      <div
        className={cn(
          "absolute left-0 right-0 mx-auto flex w-full rounded-full opacity-100 group-hover:opacity-100",
          type === "audio"
            ? "z-[2] flex-col items-start justify-start gap-2 p-3 text-white"
            : "items-center justify-center gap-4",
          playing && type === "video" && "opacity-0"
        )}
      >
        {type === "video" ? (
          <>
            <button aria-label="skip backward" onClick={revert}>
              <Icon path={mdiSkipBackward} size={1} />
            </button>
            <Button
              aria-label="play / pause"
              size={"icon"}
              className="size-[45px]"
              onClick={() => setPlaying(!playing)}
            >
              <Icon path={playing ? mdiPause : mdiPlay} size={1} />
            </Button>
            <button onClick={fastForward} aria-label="skip forward">
              <Icon path={mdiSkipForward} size={1} />
            </button>
          </>
        ) : type === "audio" ? (
          <>
            <span className="text-base font-semibold">{props.title}</span>
            {parser(props.desc!, options)}
            <div className="flex w-full flex-wrap items-center justify-start gap-2">
              {props.tags &&
                props.tags.split(",").map((tag, index) => (
                  <span
                    className="bg-neutral-gradient rounded-full px-3 py-1 text-xs "
                    key={index}
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="absolute bottom-4 z-[2] flex w-[calc(100%-24px)] items-center justify-center gap-2 rounded-full border border-gray-3/10 bg-gray-2/70 px-3 py-1.5 opacity-0 transition-all group-hover:opacity-100">
        <button
          aria-label="play / pause podcast"
          onClick={() => setPlaying(!playing)}
        >
          <Icon path={playing ? mdiPause : mdiPlay} size={1} />
        </button>
        <span className="whitespace-nowrap text-[15px] font-semibold text-gray-20">
          {Math.floor(currentTime / 60) +
            ":" +
            ("0" + Math.floor(currentTime % 60)).slice(-2)}
        </span>
        <div className="w-full">
          <Progress
            aria-label="time progress"
            value={progress}
            className="h-2"
          />
        </div>
        <span className="whitespace-nowrap text-[15px] font-semibold text-gray-20">
          {Math.floor(videoTime / 60) +
            ":" +
            ("0" + Math.floor(videoTime % 60)).slice(-2)}
        </span>
        <button aria-label="toggle volume" onClick={toggleVolume}>
          <Icon
            className="text-gray-20"
            path={volume === 0 ? mdiVolumeOff : mdiVolumeHigh}
            size={0.8}
          />
        </button>
        <Slider
          aria-label="volume slider"
          className="w-20"
          onValueChange={(e) => setVolume(e[0] / 100)}
          defaultValue={[volume * 100]}
          max={100}
          step={1}
        />
      </div>
    </div>
  )
}

export default Player
