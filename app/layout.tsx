import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { APP_NAME, APP_DESCRIPTION } from '@/app/lib/constants';

const openSans = Open_Sans({
	subsets: ['latin'],
	fallback: ['Arial', 'sans-serif'],
});

export const metadata: Metadata = {
	title: {
		template: `%s | ${APP_NAME}`,
		default: APP_NAME,
	},
	description: APP_DESCRIPTION,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${openSans.className} antialiased`}>{children}</body>
		</html>
	);
}
