/* eslint-disable @next/next/no-img-element */
/* import "react-image-crop/dist/ReactCrop.css" */

import type { FC } from "react"
import React, { useRef, useState } from "react"
import toast from "react-hot-toast"

/* import type { Crop, PixelCrop } from "react-image-crop"
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop" */
import { formatBytes, getCustomDate, IsSameUrl } from "@/utils/helpers"

import { Button } from "../Button"
import { CanvasPreview } from "../CanvasPreview/CanvasPreview"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../Dialog"
import Loading from "../Loading"

interface ICropUploaderModalProp {
  isOpen: boolean
  onToggle: () => void
  onUpload: (image: File) => void
  image: File | null
  setImage: (file: File | null) => void
  isLoading: boolean
}

/* function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
} */

const CropUploaderModal: FC<ICropUploaderModalProp> = ({
  isOpen,
  onToggle,
  onUpload,
  image,
  setImage,
  isLoading
}): JSX.Element => {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  /* const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>() */
  const [croppedImage, setCroppedImage] = useState<string>()

  /* useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        const result = await CanvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          1,
          0,
          image?.type
        )
        setCroppedImage(result as string)
      }
    },
    100,
    [completedCrop, crop]
  )

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    !crop && setCrop(centerAspectCrop(width, height, 1))
  } */

  const saveResult = async (): Promise<void> => {
    if (image) {
      try {
        if (croppedImage) {
          const file = await fetch(croppedImage)
            .then((r) => r.blob())
            .then(
              (blobFile) =>
                new File(
                  [blobFile],
                  Math.floor(Math.random() * 10000) +
                    getCustomDate(new Date().toISOString()) +
                    "." +
                    image.name.split(".").pop()
                )
            )
          const format = formatBytes(file.size)
          if (IsSameUrl(format.format, "MB") && format.size > 2) {
            toast.error("Please Upload smaller photo!")
          } else {
            setTimeout(() => {}, 200)
            onUpload(file)
          }
        } else {
          const format = formatBytes(image.size)
          if (IsSameUrl(format.format, "MB") && format.size > 2) {
            toast.error("Please Upload smaller photo!")
          } else {
            setTimeout(() => {}, 200)
            onUpload(image)
          }
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      toast.error("please select a file to crop")
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setImage(null)
        onToggle()
      }}
    >
      <DialogContent className="flex w-full flex-col items-center justify-between gap-4 rounded-[15px]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>

        {/* <ReactCrop
          crop={crop}
          onChange={(crop, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          keepSelection={true}
          className="max-h-full max-w-full"
        >
          <img
            ref={imgRef}
            alt="Crop me"
            onLoad={onImageLoad}
            className="max-h-full object-contain"
            src={image ? URL.createObjectURL(image) : ""}
          />
        </ReactCrop> */}

        {/* {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              objectFit: "contain",
              width: 0,
              height: 0
            }}
          />
        )} */}
        <Button
          disabled={isLoading}
          type="button"
          className="relative py-1.5"
          onClick={saveResult}
        >
          {isLoading ? "Uploading..." : "Save"}
          {isLoading && (
            <Loading
              wrapperClass="absolute right-0"
              className="size-5 text-white"
            />
          )}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export { CropUploaderModal }
