/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react'

// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs'

import { Animations } from './Animations'
import { Previews } from './Previews'
import ToolBox from './ToolBox'

export interface SidePanelProps {
  className?: string
}

export function SidePanel({ className }: SidePanelProps) {
  return (
    <div className={`border-r border-slate-600 p-4 bg-stone-600 ${className}`}>
      <Tabs colorScheme="orange">
        <TabList>
          <Tab>Slides</Tab>
          <Tab>Animations</Tab>
          <Tab>Toolbox</Tab>
        </TabList>
        <TabPanels>
          <Previews />
          <Animations />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            <ToolBox />
          </div>
        </TabPanels>
      </Tabs>

      {/* <Tabs defaultValue="slides">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="slides">Slides</TabsTrigger>
          <TabsTrigger value="animations">Animations</TabsTrigger>
          <TabsTrigger value="toolbox">Toolbox</TabsTrigger>
        </TabsList>

        <TabsContent value="slides">
          <Previews />
        </TabsContent>
        <TabsContent value="animations">
          <Animations />
        </TabsContent>
        <TabsContent value="toolbox">
          <ToolBox />
        </TabsContent>
      </Tabs> */}
    </div>
  )
}
