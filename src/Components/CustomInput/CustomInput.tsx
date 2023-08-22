import { ChangeEvent } from "react";

interface CustomInputProps {
    name: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    length: number;
    placeholder: string;
    stateValidate: boolean;
    error: string;
}

export function CustomInput({
    name,
    onChange,
    length,
    placeholder,
    stateValidate,
    error,
}: CustomInputProps) {
    return (
        <div className="flex flex-col ">
            <label
                htmlFor={name}
                className={`py-[4px] text-[9px] font-extrabold uppercase tracking-[.15rem] ${
                    stateValidate ? "text-Smokey-grey" : "text-Light-red"
                }`}
            >
                {name}
            </label>
            <input
                className={`${
                    stateValidate
                        ? "border-Light-grey placeholder:text-Smokey-grey"
                        : "border-Light-red text-Light-red placeholder:text-Light-red focus:outline-none"
                } w-[80%] rounded-lg border-[1px] border-Light-grey p-2 text-[20px] font-black placeholder:text-[20px] placeholder:font-[800] xs:w-[110px] xs:px-4 `}
                type="text"
                placeholder={placeholder}
                id={name}
                name={name}
                required
                minLength={length}
                maxLength={length}
                onChange={(e) => onChange(e)}
            />
            {!stateValidate ?? (
                <span className="pt-2 text-[10px] text-Light-red">{error}</span>
            )}
        </div>
    );
}
