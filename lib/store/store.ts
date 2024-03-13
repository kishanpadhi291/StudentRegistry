/**
 * @module store
 * @description
 * Redux store configuration and types.
 */

import { configureStore } from '@reduxjs/toolkit'
import studentSlice, { Students } from 'lib/student-slice'

/**
 * Represents the state of the Redux store.
 * @typedef {Object} StoreState
 * @property {Object} student - The student-related state.
 * @property {Students[]} student.filteredstudents - An array of filtered student data.
 * @property {Students | null | undefined} student.currentStudent - The currently selected student.
 */
export interface StoreState {
	student: {
		filteredstudents: Students[] // Array of student data
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
