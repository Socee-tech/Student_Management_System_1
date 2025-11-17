import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-background text-primary flex">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Topbar />
            </div>
        </div>
    )
}
