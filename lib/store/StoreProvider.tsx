/**
 * @module StoreProvider
 * @description
 * Provider component for wrapping the entire application with the Redux store.
 * Utilizes the Provider component from react-redux to make the store available
 * to all components in the component tree.
 *
 * @param {Object} props - React component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the Redux store.
 *
 * @returns {React.ReactNode} - JSX wrapping the children with the Redux store provider.
 *
 * @example
 * // Usage in a component:
 * import { StoreProvider } from '@/lib/store/StoreProvider';
 *
 * const App = () => {
 *   return (
 *     <StoreProvider>
 *       {/* Your components here that need access to the Redux store *\/}
 *     </StoreProvider>
 *   );
 * };
 */
'use client'
import { Provider } from 'react-redux'
import { store } from 'lib/store/store'

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* Use the Provider component to provide the Redux store to the entire component tree. */}
			<Provider store={store}>{children}</Provider>
		</>
	)
}
