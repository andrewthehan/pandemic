import useScreenOrientation from "../hooks/ScreenOrientation";
import View from "./View";

type Props = {
  setView: (view: View) => void;
};

export default function ActionView({ setView }: Props) {
  const screenOrientation = useScreenOrientation();
  return (
    <div
      className="w-full h-full flex flex-wrap justify-stretch items-stretch"
      style={{
        flexDirection:
          screenOrientation === "landscape-primary" ||
          screenOrientation === "landscape-secondary"
            ? "row"
            : "column",
      }}
    >
      <button
        className="flex-1 text-3xl bg-green-700"
        onClick={() => setView(View.READ_CHIP)}
      >
        Read chip
      </button>
      <button
        className="flex-1 text-3xl bg-indigo-600"
        onClick={() => setView(View.CONTACT)}
      >
        Contact
      </button>
      <button
        className="flex-1 text-3xl bg-rose-800"
        onClick={() => setView(View.ACTIVATE_VACCINE)}
      >
        Activate vaccine
      </button>
      <button
        className="flex-[0.5] text-xl bg-slate-500"
        onClick={() => setView(View.END)}
      >
        End game
      </button>
    </div>
  );
}
