import PowerButton from '../components/PowerButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex justify-center items-center h-screen w-screen">
      <style>
        {`
           @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&display=swap');
            `}
      </style>
      <div className="flex flex-col h-full w-full justify-center items-center gap-10 text-center relative ">
        <div className="relative bg-gray-800 rounded-lg p-8 shadow-2xl border-4 border-gray-700 h-4/5 w-4/5 flex justify-center">
          {children}
        </div>
        <PowerButton />
      </div>
    </div>
  );
}
