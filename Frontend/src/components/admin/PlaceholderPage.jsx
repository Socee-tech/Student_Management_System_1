import React from 'react'

export default function PlaceholderPage({ title }) {
    return (
        <div className="p-4 bg-cream rounded-xl min-h-[12rem]">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-sm text-primary/70">This is a placeholder for the {title} page.</p>
        </div>
    )
}
