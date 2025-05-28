import './globals.css';

export const metadata = {
  title: 'DS & ML Visualization Tool',
  description: 'Interactive data structure and ML algorithm visualizer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
