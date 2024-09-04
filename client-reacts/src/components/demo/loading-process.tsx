import React from 'react'
import "@/App.css";
export default function LoadingProcess() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    )
}
