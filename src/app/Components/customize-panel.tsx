"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModeToggle from "./mode-toggle";
import { useEvents } from "../states/localStorage";

const CustomizePanel = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const updateEvent = useEvents((state) => state.updateEvent);

  const uploadImage = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const eventName = searchParams.get("event");
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateEvent(eventName, {
        background: imageUrl,
      });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Customize</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Customize</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-2">
            <Tabs defaultValue="design">
              <TabsList>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="effects">Effects</TabsTrigger>
              </TabsList>
              <TabsContent value="design">
                <ModeToggle />
              </TabsContent>
              <TabsContent value="background">
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    ref={inputFile}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <Button onClick={uploadImage}>Upload image</Button>
                  <Button>Search images</Button>
                </div>
              </TabsContent>
              <TabsContent value="effects">add effects</TabsContent>
            </Tabs>
          </div>
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomizePanel;
