import { useDispatch } from "react-redux";
import { CustomInput } from "../CustomInput";
import { SubmitButton } from "../SubmitButton";
import { ChangeEvent, FormEvent, useState } from "react";
import { changeAge } from "../../Redux/ageSlice";

export function InputAge() {
    const dispatch = useDispatch();
    const [birthDate, setBirthDate] = useState([
        {
            name: "day",
            value: "",
            stateValidate: true,
            error: "",
        },
        {
            name: "month",
            value: "",
            stateValidate: true,
            error: "",
        },
        {
            name: "year",
            value: "",
            stateValidate: true,
            error: "",
        },
    ]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
        const value = event.target.value;
        let id: number;
        let min: number;
        let max: number;

        switch (name) {
            case "day":
                id = 0;
                min = 1;
                max = 31;
                break;
            case "month":
                id = 1;
                min = 1;
                max = 12;
                break;
            case "year":
                id = 2;
                min = 0;
                max = 2022;
                break;
            default:
                console.log("bug handle change");
                return;
        }

        setBirthDate((birthDate) =>
            birthDate.map((obj, index) =>
                index === id
                    ? {
                          ...obj,
                          stateValidate:
                              value !== "" &&
                              parseInt(value) >= min &&
                              parseInt(value) <= max,
                          error:
                              (parseInt(value) < min ||
                                  parseInt(value) > max) &&
                              name === "day"
                                  ? `Must be a valid day`
                                  : (parseInt(value) < min ||
                                        parseInt(value) > max) &&
                                    name === "month"
                                  ? `Must be a valid month`
                                  : parseInt(value) > max && name === "year"
                                  ? `Must be in the past`
                                  : birthDate[id].error,
                          value: value,
                      }
                    : obj,
            ),
        );
    }

    function handleValidForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validateAndUpdate = (index: number) => {
            setBirthDate((birthDate) =>
                birthDate.map((oldObj, oldIndex) =>
                    oldIndex === index
                        ? { ...oldObj, stateValidate: false }
                        : oldObj,
                ),
            );
        };

        const inputTemp = birthDate.map((obj, index) => {
            const action = { id: index, state: false };
            if (obj.value === "") {
                validateAndUpdate(index);
                return action;
            } else if (
                (obj.name === "day" || obj.name === "month") &&
                obj.value.length !== 2
            ) {
                validateAndUpdate(index);
                return action;
            } else if (obj.name === "year" && obj.value.length !== 4) {
                validateAndUpdate(index);
                return action;
            }
            return { id: index, state: true };
        });

        if (inputTemp.every((obj) => obj.state === true)) {
            dateToAge();
        }
    }

    function dateToAge() {
        const currentDate = new Date();
        const birthDateBis = new Date(
            parseInt(birthDate[2].value), // Année de naissance
            parseInt(birthDate[1].value) - 1, // Mois de naissance (commence à 0)
            parseInt(birthDate[0].value), // Jour de naissance
        );

        let yearDiff = currentDate.getFullYear() - birthDateBis.getFullYear();
        let monthDiff = currentDate.getMonth() - birthDateBis.getMonth();
        let dayDiff = currentDate.getDate() - birthDateBis.getDate();

        // Si le jour de naissance n'est pas encore arrivé ce mois-ci
        if (dayDiff < 0) {
            monthDiff--;
            const lastMonthDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0,
            );
            dayDiff = lastMonthDate.getDate() + dayDiff;
        }

        // Si le mois de naissance n'est pas encore arrivé cette année
        if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
        }

        dispatch(
            changeAge([
                String(dayDiff).padStart(2, "0"),
                String(monthDiff).padStart(2, "0"),
                String(yearDiff).padStart(2, "0"),
            ]),
        );
    }

    return (
        <form
            onSubmit={handleValidForm}
            className="flex w-full flex-col justify-between"
        >
            <div className="flex w-full flex-row justify-between xs:w-[76%]">
                <CustomInput
                    name="day"
                    onChange={handleChange}
                    length={2}
                    placeholder="DD"
                    stateValidate={birthDate[0].stateValidate}
                    error={birthDate[0].error}
                />
                <CustomInput
                    name="month"
                    onChange={handleChange}
                    length={2}
                    placeholder="MM"
                    stateValidate={birthDate[1].stateValidate}
                    error={birthDate[1].error}
                />
                <CustomInput
                    name="year"
                    onChange={handleChange}
                    length={4}
                    placeholder="YYYY"
                    stateValidate={birthDate[2].stateValidate}
                    error={birthDate[2].error}
                />
            </div>
            <SubmitButton />
        </form>
    );
}
