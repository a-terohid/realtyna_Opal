/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/common/Dialog"

interface IProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ListingsModal: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex h-[90%] w-full flex-col items-center justify-between gap-4 ">
        <DialogHeader>
          <DialogTitle>tes Gallery</DialogTitle>
        </DialogHeader>
        test
      </DialogContent>
    </Dialog>
  )
}

export default ListingsModal
