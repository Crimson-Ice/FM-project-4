export function SubmitButton() {
    return (
        <div className="flex h-14 w-full items-center justify-center py-12 xs:py-8">
            <div className="absolute z-0 h-[1px] w-[80%] bg-Light-grey xs:relative"></div>
            <button
                type="submit"
                className="z-10 cursor-pointer rounded-full bg-Purple p-4"
            >
                <img
                    className="max-w-[25px] xs:max-w-none"
                    src="icon-arrow.svg"
                    alt="arrow icon"
                />
            </button>
        </div>
    );
}
