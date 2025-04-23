"use client"
import { useEffect, useState } from "react";

type props = {
    type: string,
    placeholder: string,
    label: string,
    id: string;
}

export const CustomInput = ({ type, placeholder, label, id }: props) => {
    const [value, setValue] = useState("")

    const clearPhoneNumber = (input: any) => {
        let onlyNumbers = input.replace(/\D/g, '');

        if (onlyNumbers.startsWith('0')) {
            onlyNumbers = onlyNumbers.substring(1);
        }

        return onlyNumbers;
    }

    useEffect(() => {
        if (value == '') return
        if (type == "phoneNumber") {
            setValue((prev) => clearPhoneNumber(prev))
        }
    }, [value])
    return (
        <div className="input w-full flex flex-col">
            <label htmlFor={id} className="text-xl mb-1 capitalize">{label}</label>
            <input type={type} id={id} placeholder={placeholder} value={value} onInput={(e: any) => setValue(e.target.value)} className="py-2 font-light bg-none border-0 border-b-2 border-b-[#D0D0D0]" />
        </div>
    )
}
