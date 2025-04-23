"use client"
import { useEffect, useState } from "react";

type props = {
    placeholder: string,
    label: string,
    id: string;
}

export const CustomTextarea = ({ placeholder, label, id }: props) => {
    return (
        <div className="input w-full flex flex-col">
            <label htmlFor={id} className="text-xl mb-1 capitalize">{label}</label>
            <textarea id={id} placeholder={placeholder} className="py-2 min-h-[100px] max-h-[300px] resize-y font-light bg-none border-0 border-b-2 border-b-[#D0D0D0]" />
        </div>
    )
}
