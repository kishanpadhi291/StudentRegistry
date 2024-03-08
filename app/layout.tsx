/**
 * Root Layout Component
 *
 * The RootLayout component wraps the entire application with the StoreProvider,
 * sets the language attribute for HTML, and applies the Inter font styling to the body.
 *
 * @component
 *
 * @param {object} props - The properties of the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the RootLayout.
 *
 * @returns {React.ReactNode} The rendered RootLayout component.
 *
 * @example
 * // Usage in a Next.js page:
 * import RootLayout from '@/components/layout/RootLayout';
 * const MyPage = () => (
 *   <RootLayout>
 *     {/* Your page content here *\/}
 *   </RootLayout>
 * );
 */
import { StoreProvider } from '@/lib/store/StoreProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.scss'

// Load the Inter font with the 'latin' subset
const inter = Inter({ subsets: ['latin'] })

// Metadata for the page
export const metadata: Metadata = {
	title: 'Student Registry',
	description: 'Student CRUD operations',
	icons: {
		icon: 'https://res.cloudinary.com/ddhrf759q/image/upload/v1709032404/kzowepi274d9mvhpqt1g.png',
	},
}

// RootLayout component that wraps the entire application with StoreProvider
// It sets the language attribute for HTML and applies the Inter font styling to the body
const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<StoreProvider>
			{/* Define the HTML document with lang attribute */}
			<html lang='en'>
				{/* Apply the Inter font styling to the body */}
				<body className={inter.className}>
					{/* Render the child components */}
					{children}
				</body>
			</html>
		</StoreProvider>
	)
}

// Export the RootLayout component for use in the application.
export default RootLayout
