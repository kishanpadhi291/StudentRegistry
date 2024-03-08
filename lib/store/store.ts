/**
 * @module store
 * @description
 * Redux store configuration and types.
 */

import { configureStore } from '@reduxjs/toolkit'
import studentSlice, { Students } from 'lib/student-slice'

/**
 * @typedef {Object} StoreState
 * @property {Object} form - Form-related state.
 * @property {Students[]} form.students - Array of student data.
 * @property {number} form.added - Counter for tracking additions.
 */
// Define the structure of the Redux store state.
export interface StoreState {
	student: {
		students: Students[] // Array of student data
		currentStudent: Students | null | undefined
	}
}

/**
 * Redux store for managing the application state.
 * @type {Object}
 * @const {Object} store - Configured Redux store.
 */
// Configure the Redux store using @reduxjs/toolkit.
export const store = configureStore({
	reducer: {
		student: studentSlice, // Combine with the studentSlice reducer
	},
})

/**
 * Type for the dispatch function for actions.
 * @type {Function}
 * @typedef {Function} AppDispatch
 */
// Define the type of the dispatch function for actions.
export type AppDispatch = typeof store.dispatch

/**
 * Type for the RootState, representing the entire Redux store state.
 * @type {Object}
 * @typedef {Object} RootState
 */
// Define the type for the RootState, representing the entire Redux store state.
export type RootState = ReturnType<typeof store.getState>
