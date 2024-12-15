"use client"

import React from 'react';
import "@Styles/Footer.sass";
import { motion } from 'framer-motion';
import { Config } from "@Config/index";
import { getRelativeTime } from '@Utils/Relativetime';
import { Tooltip } from '@nextui-org/react';
import {
    Contrast,
    DarkMode,
    GitHub,
    Instagram,
    Language,
    LightMode,
    LinkedIn,
    YouTube
} from '@mui/icons-material';

const Links: Array<{
    Label: string;
    URL: string;
    Component: React.ReactNode;
    isEnable: boolean;
}> = [
        {
            Label: "LinkedIn",
            URL: "https://www.linkedin.com/in/meetbhingradiya/",
            Component: <LinkedIn />,
            isEnable: true,
        },
        {
            Label: "GitHub",
            URL: "https://github.com/MeetBhingradiya",
            Component: <GitHub />,
            isEnable: true,
        },
        {
            Label: "Instagram",
            URL: "https://www.instagram.com/_meet_bhingradiya_/",
            Component: <Instagram />,
            isEnable: false,
        },
        {
            Label: "YouTube",
            URL: "https://www.youtube.com/@MeetBhingradiya",
            Component: <YouTube />,
            isEnable: false,
        },
        {
            Label: "StackOverflow",
            URL: "https://stackoverflow.com/users/19279518/meet-bhingradiya",
            Component: (
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" className="stackoverflowsvg">
                    <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z" />
                </svg>
            ),
            isEnable: false,
        },
        {
            Label: "Discord",
            URL: "https://discord.gg/3j2Zt5fU",
            Component: (
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                </svg>
            ),
            isEnable: false,
        },
        {
            Label: "Mail",
            URL: "mailto:meetbhingradiya85@gmail.com",
            Component: (
                <svg xmlns="http://www.w3.org/2000/svg" className="stackoverflowsvg" width="32" height="32" role="img" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
            ),
            isEnable: false,
        }
    ];

function Footer() {
    return (
        <motion.div
            className="footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
        >
            <motion.div
                className="Social"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: "easeInOut" }}
            >
                {
                    Links.map((item, index) => {
                        if (item.isEnable) {
                            return (
                                <Tooltip key={index} content={item.Label} placement="top">
                                    <a href={item.URL}>
                                        {item.Component}
                                    </a>
                                </Tooltip>
                            );
                        }
                    })
                }
            </motion.div>
            All rights reserved. Meet Bhingradiya © 2021 - {new Date().getFullYear()}
            <div className="flex items-center">
                <Tooltip content="Language" placement="top">
                    <div className="Version">
                        <Language />
                    </div>
                </Tooltip>
                <Tooltip content="Toggle Theme" placement="top">
                    <div className="Version">
                        <Contrast />
                        <LightMode />
                        <DarkMode />
                    </div>
                </Tooltip>
                <Tooltip content="Version Changelog" placement="top">
                    <motion.a
                        href={`https://github.com/MeetBhingradiya/MeetBhingradiya/blob/${Config.visiblebranch}/ChangeLog.md`}
                        target="_blank"
                        className="Version"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
                    >
                        v{Config.version} | {getRelativeTime(new Date(Config.releasedate))}
                    </motion.a>
                </Tooltip>
            </div>
        </motion.div>
    )
}

export default Footer