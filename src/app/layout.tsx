import './globals.css';

export const metadata = {
  title: 'DS & ML Visualization Tool',
  description: 'Interactive data structure and ML algorithm visualizer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="h-full flex flex-col bg-background dark:bg-gray-800">
          {children}
        </div>
      </body>
    </html>
  );
}
