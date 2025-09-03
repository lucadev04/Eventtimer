"use client";

import styles from "../page.module.css";
import { useRef } from "react";
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

const CustomizePanel = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);

  const uploadImage = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
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
              <TabsContent value="design">Some design stuff</TabsContent>
              <TabsContent value="background">change background</TabsContent>
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
