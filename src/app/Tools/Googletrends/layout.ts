/**
 *  @FileID          app\Tools\Googletrends\layout.ts
 *  @Description     Currently, there is no description available.
 *  @Author          @MeetBhingradiya
 *  
 *  -----------------------------------------------------------------------------
 *  Copyright (c) 2025 Meet Bhingradiya
 *  All rights reserved.
 *  
 *  This file is part of the @MeetBhingradiya's Portfolio project and is protected under copyright
 *  law. Unauthorized copying of this file, via any medium, is strictly prohibited
 *  without explicit permission from the author.
 *  
 *  -----------------------------------------------------------------------------
 *  @created 13/01/25 11:34 AM IST (Kolkata +5:30 UTC)
 *  @modified 14/01/25 3:22 PM IST (Kolkata +5:30 UTC)
 */

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Google Trends Querys for Bing - Meet Bhingradiya",
    description: "Copy Querys from Google Trends for Bing",
    icons: "/favicon.ico",
    keywords: [
        "Meet Bhingradiya",
        "Meet",
        "Bhingradiya",
        "Portfolio",
        "Tools",
        "Google Trends",
        "Google Trends Querys",
        "Google Trends Bing",
        "Copy Google Trends Querys",
    ]
}

// @ File
export default function ToolsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children
}