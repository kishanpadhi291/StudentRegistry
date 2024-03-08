/**
 * Custom Redux Hook: useAppDispatch
 *
 * A custom hook that returns the `AppDispatch` function from the Redux store.
 * The `AppDispatch` function is used to dispatch actions to the Redux store.
 *
 * @function
 * @name useAppDispatch
 *
 * @returns {AppDispatch} The `AppDispatch` function for dispatching actions.
 *
 * @example
 * // Usage of the useAppDispatch hook:
 * // Import the useAppDispatch hook and use it in a functional component.
 * import { useAppDispatch } from './path-to-your-hook-file';
 *
 * // Inside a functional component:
 * const MyComponent = () => {
 *   const dispatch = useAppDispatch();
 *
 *   // Dispatching an action using the AppDispatch function.
 *   dispatch(myActionCreator());
 *
 *   // Component implementation...
 * };
 */
import { useDispatch } from 'react-redux'
import type { AppDispatch } from 'lib/store/store'

// Custom hook: useAppDispatch
// Returns the AppDispatch function from the Redux store,
// which is used to dispatch actions to the Redux store.
export const useAppDispatch: () => AppDispatch = useDispatch
