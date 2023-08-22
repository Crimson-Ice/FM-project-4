import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ageState } from "../../Redux/ageSlice";

export function ShowAge() {
    const age = useSelector((state: { age: ageState }) => state.age);
    const [displayedAge, setDisplayedAge] = useState(["- -", "- -", "- -"]);
    const [animeting, setAnimeting] = useState(false);

    useEffect(() => {
        if (age.year === "- -" || age.month === "- -" || age.day === "- -")
            return;
        setDisplayedAge(["00", "00", "00"]);
        setAnimeting(true);
    }, [age]);

    useEffect(() => {
        if (!animeting) return;

        const ageLabel = ["year", "month", "day"];

        const interval = setInterval(() => {
            setDisplayedAge((displayedAge) => {
                if (
                    displayedAge.every(
                        (value, index) =>
                            value === age[ageLabel[index] as keyof ageState],
                    )
                ) {
                    setAnimeting(false);
                    clearInterval(interval);
                }
                return displayedAge.map((value, index) => {
                    const targetValue = parseInt(
                        age[ageLabel[index] as keyof ageState],
                    );
                    const currentValue = parseInt(value);
                    const newValue =
                        currentValue < targetValue
                            ? (currentValue + 1).toString().padStart(2, "0")
                            : targetValue.toString().padStart(2, "0");
                    return newValue;
                });
            });
        }, 75); // Vitesse de l'animation (en millisecondes)

        return () => {
            clearInterval(interval);
        };
    }, [animeting]);

    return (
        <div className="flex flex-col leading-tight xs:leading-[1.10]">
            <span className="font-[Poppins-ExtraBoldItalic] text-[13vw] tracking-tight xs:text-[70px]">
                <span className="font-[Poppins-ExtraBoldItalic] text-[13vw] tracking-tight text-Purple xs:text-[70px] ">
                    {displayedAge[0]}
                </span>
                years
            </span>
            <span className="font-[Poppins-ExtraBoldItalic] text-[13vw] tracking-tight xs:text-[70px]">
                <span className="font-[Poppins-ExtraBoldItalic] text-[14vw] tracking-tight text-Purple xs:text-[70px]">
                    {displayedAge[1]}
                </span>
                months
            </span>
            <span className="font-[Poppins-ExtraBoldItalic] text-[13vw] tracking-tight xs:text-[70px]">
                <span className="font-[Poppins-ExtraBoldItalic] text-[13vw] tracking-tight text-Purple xs:text-[70px]">
                    {displayedAge[2]}
                </span>
                days
            </span>
        </div>
    );
}
