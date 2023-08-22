import { InputAge } from "./Components/InputAge/Index";
import { ShowAge } from "./Components/ShowAge";

function App() {
    return (
        <div className="flex h-full w-full items-center justify-center bg-Off-white">
            <div className="w-[37%] min-w-[90%] rounded-2xl rounded-ee-[140px] bg-White p-8 xs:h-[50%] xs:min-h-[430px] xs:min-w-[560px]">
                <InputAge />
                <ShowAge />
            </div>
        </div>
    );
}

export default App;
