import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setView:  Dispatch<SetStateAction<"main" | "landscape" | "modern-art" | "holydays" | "travel">>
}


export default function LandScapeView({setView}: Props) {
    return(
        <Button variant="ghost" className="text-left justify-start" onClick={() => setView("main")}><ChevronLeft/> Back</Button>
    )
}