import WordBank from '../components/WordBank';

export default function WordBankPage() {
  return (
    <div className="gameContainer flex  flex-col items-center">
      <WordBank />

      <div>
        <div>add word</div>
        <div>create new wordBank</div>
        <div>save wordBanks</div>
        <div>delete WordBank</div>
      </div>
    </div>
  );
}
