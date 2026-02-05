"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Event } from "../../page";
import { useState } from "react";
import LandScapeView from "./landscape-view";
import ModernArtView from "./modern-art-view";
import HolidaysView from "./holidays-view";
import TravelView from "./travel-view";

interface Props {
    open: boolean;
    onOpenChangeAction: (open: boolean) => void;
    event: Event;
}

export default function BackgroundChangeSheet({open, onOpenChangeAction, event}: Props) {
    const [view, setView] = useState<"main" | "landscape" | "modern-art" | "holydays" | "travel">("main")
    return(
    <Sheet open={open} onOpenChange={onOpenChangeAction}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Change Background</SheetTitle>
          <SheetDescription>
            Change the background of the event <strong>{event.name}</strong>
          </SheetDescription>
        </SheetHeader>
            {view == "main" && (
                <div className="grid grid-cols-2 gap-2 px-2">
                {[
                    {
                        src: "https://cdn.pixabay.com/photo/2020/06/21/09/48/hill-5324149_1280.jpg",
                        label: "Landscapes",
                        onClick: () =>setView("landscape")
                    },
                    {
                        src: "https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_1280.jpg",
                        label: "Modern Art",
                        onClick: () => setView("modern-art")
                    },
                    {
                        src: "https://cdn.pixabay.com/photo/2017/12/13/00/23/christmas-background-3015776_1280.jpg",
                        label: "Holidays",
                        onClick: () => setView("holydays")
                    },
                    {
                        src: "https://cdn.pixabay.com/photo/2021/10/14/15/11/cathedral-6709412_1280.jpg",
                        label: "Travel",
                        onClick: () => setView("travel")
                    },
                ].map((item) => (
                    <Button
                        key={item.label}
                        variant="outline"
                        className="
                            relative p-0 overflow-hidden
                            aspect-square
                            group
                            h-40 w-full
                            mr-2
                        "
                        onClick={item.onClick}
                    >
                        <img
                            src={item.src}
                            alt={item.label}
                            className="w-full h-40 object-cover"
                        />

                        {/* Hover Overlay */}
                        <div
                            className="
                                absolute inset-0
                                flex items-center justify-center
                                bg-black/40
                                backdrop-blur-sm
                                opacity-0
                                group-hover:opacity-100
                                transition-opacity
                            "
                        >
                            <span className="text-white text-lg font-semibold tracking-wide">
                                {item.label}
                            </span>
                        </div>
                    </Button>
                ))}
            </div>
            )}

            {view == "landscape" && (
                <LandScapeView setView={setView}/>
            )}
            {view == "modern-art" && (
                <ModernArtView setView={setView}/>
            )}
            {view == "holydays" && (
                <HolidaysView setView={setView}/>
            )}
            {view == "travel" && (
                <TravelView setView={setView}/>
            )}


      </SheetContent>
    </Sheet>
    )
}