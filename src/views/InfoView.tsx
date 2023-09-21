import View from "./View";

type Props = {
  setView: (view: View) => void;
};

function Normal() {
  return <span className="text-green-700">Normal</span>;
}

function Infected() {
  return <span className="text-rose-800">Infected</span>;
}

export default function InfoView({ setView }: Props) {
  return (
    <div className="w-full h-full py-6 px-4 flex flex-col justify-between items-stretch">
      <div className="text-4xl text-center">Info</div>
      <div className="flex-1">
        <div className="text-slate-400">
          <div className="my-1">
            <b>Play time</b>: 5 minute set up + 10 minute gameplay
          </div>
          <div className="my-1">
            <b>Players</b>: 4-12
          </div>
          <div className="my-1">
            <b>Required</b>: 1 NFC chip per person
          </div>
        </div>
        <div className="my-4">
          <b>Pandemic</b> is a social deduction game.
        </div>
        <div className="my-4">
          <b>Roles</b>
          <div className="pl-4">
            <div className="my-2">
              <b>Doctors</b> want to collect as many vaccines as possible.
              Doctors don't know what role other people are. A doctor wins if
              they have at least 3 vaccines at the end of the game.
            </div>
            <div className="my-2">
              <b>Imposters</b> want to infect as many people as possible.
              Imposters know who the other imposters are. An imposter wins if at
              least half the group rounded down is infected at the end of the
              game.
            </div>
          </div>
        </div>
        <div className="my-4">
          Players take turns in <b>clockwise</b> order performing 1 of 3
          actions:
        </div>
        <div className="pl-4">
          <div className="my-4">
            <b>Read chip</b>
            <div className="pl-4">
              Check your status (vaccine count and infection status).
            </div>
          </div>
          <div className="my-4">
            <b>Contact</b>
            <div className="pl-4">
              Contact another player.
              <div>
                <Normal /> + <Normal /> =
                <div className="pl-4">
                  Each player receives 1 vaccine. However, connecting with the
                  same person twice will not produce another vaccine.
                </div>
              </div>
              <div>
                <Infected /> + <Infected /> =
                <div className="pl-4">Nothing happens.</div>
              </div>
              <div>
                <Normal /> + <Infected /> =
                <div className="pl-4">
                  If the normal player has at least 1 vaccine, the infected
                  player becomes cured and a vaccine is spent. Otherwise, the
                  normal player becomes infected.
                </div>
              </div>
            </div>
          </div>
          <div className="my-4">
            <b>Activate vaccine</b>
            <div className="pl-4">
              Spend a vaccine to cure your infection. A vaccine is spent
              regardless of whether you were infected.
            </div>
          </div>
        </div>
        <div className="my-2">
          Inspired by:{" "}
          <a
            href="https://liarsgame.fandom.com/wiki/Round_IV_Qualifier"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-300"
          >
            Liar Game
          </a>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="rounded border-2 mb-6 px-6 py-2 text-2xl"
          onClick={() => setView(View.HOME)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
