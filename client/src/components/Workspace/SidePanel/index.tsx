/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { Animations } from './Animations'
import { Previews } from './Previews'
import ToolBox from './ToolBox'

export interface SidePanelProps {
  className?: string
}

export function SidePanel({ className }: SidePanelProps) {
  return (
    <div
      className={`w-80 border-r border-slate-600 p-2 bg-stone-800 ${className}`}
    >
      <Tabs colorScheme="orange">
        <TabList>
          <Tab>Slides</Tab>
          <Tab>Animations</Tab>
          <Tab>Toolbox</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Previews />
          </TabPanel>

          <TabPanel>
            <Animations />
          </TabPanel>
          <TabPanel>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
