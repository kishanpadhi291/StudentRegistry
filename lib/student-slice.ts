import { dummyData } from '@/utils/data/dummy-data'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
/**
 * Represents a student object.
 * @typedef {Object} Students
 * @property {string} [_id] - The unique identifier for the student.
 * @property {string} [firstName] - The first name of the student.
 * @property {string} [middleName] - The middle name of the student.
 * @property {string} [lastName] - The last name of the student.
 * @property {string} [email] - The email address of the student.
 * @property {number} [contactNumber] - The contact number of the student.
 * @property {string} [gender] - The gender of the student.
 * @property {string} [collegeName] - The name of the college the student belongs to.
 * @property {string} [department] - The department of the student.
 * @property {string} [hobbies] - The hobbies of the student.
 * @property {string} [dob] - The date of birth of the student.
 */

export interface Students {
	_id?: string
	firstName?: string
	middleName?: string
	lastName?: string
	email?: string
	contactNumber?: number
	gender?: string
	collegeName?: string
	department?: string
	hobbies?: string
	dob?: string
}
/**
 * Represents the state of the student slice in the Redux store.
 * @typedef {Object} StudentState
 * @property {Students[]} filteredstudents - An array of filtered student data.
 * @property {Students[]} allstudents - An array of all student data.
 * @property {Students | null | undefined} currentStudent - The currently selected student.
 */
interface StudentState {
	filteredstudents: Students[]
	allstudents: Students[]
	currentStudent: Students | null | undefined
}

/**
 * Represents the initial state for the student slice.
 * @type {StudentState}
 */
const initialState: StudentState = {
	filteredstudents: dummyData,
	allstudents: dummyData,
	currentStudent: null,
}

/**
 * Redux toolkit slice for managing student data.
 * @type {Slice<StudentState>}
 */
const studentSlice = createSlice({
	initialState,
	name: 'studentSlice',
	reducers: {
		/**
		 * Search for students based on a search term.
		 * @param {StudentState} state - The current state.
		 * @param {PayloadAction<string>} action - The action containing the search term.
		 */
		searchStudents: (state, action) => {
			const searchTerm = action.payload.toLowerCase()
			const filterStudents = state.allstudents.filter((student) =>
				['firstName', 'lastName', 'collegeName'].some((field) =>
					(student[field as keyof Students] as string)
						.toLowerCase()
						.includes(searchTerm)
				)
			)
			state.filteredstudents = filterStudents
		},
		/**
		 * Select a specific student.
		 * @param {StudentState} state - The current state.
		 * @param {PayloadAction<string>} action - The action containing the student ID.
		 */
		selectedStudent: (state, action) => {
			const studentId = action.payload
			state.currentStudent =
				state.allstudents.find((student) => student._id === studentId) ?? null
		},
		/**
		 * Clear the currently selected student.
		 * @param {StudentState} state - The current state.
		 */
		clearSelectedStudent: (state) => {
			state.currentStudent = null
		},
		/**
		 * Add a new student to the state.
		 * @param {StudentState} state - The current state.
		 * @param {PayloadAction<Students>} action - The action containing the new student data.
		 */
		addNewStudent: (state, action) => {
			const studentUuid = uuidv4()
			const newStudent = { _id: studentUuid, ...action.payload }
			state.allstudents.push(newStudent)
			state.filteredstudents.push(newStudent)
		},
		/**
		 * Save edits to a student in the state.
		 * @param {StudentState} state - The current state.
		 * @param {PayloadAction<{ id: string, student: Students }>} action - The action containing the student ID and updated data.
		 */
		saveEditedStudent: (state, action) => {
			const { id, student } = action.payload
			state.allstudents = updateStudentList(state.allstudents, id, student)
			state.filteredstudents = updateStudentList(
				state.filteredstudents,
				id,
				student
			)
		},
		/**
		 * Delete a student from the state.
		 * @param {StudentState} state - The current state.
		 * @param {PayloadAction<string>} action - The action containing the student ID to be deleted.
		 */
		deleteStudent: (state, action) => {
			const studentId = action.payload
			state.allstudents = state.allstudents.filter(
				(student) => student._id !== studentId
			)
			state.filteredstudents = state.filteredstudents.filter(
				(student) => student._id !== studentId
			)
		},
	},
})

/**
 * Update a list of students with the edited data for a specific student.
 * @param {Students[]} students - The list of students to update.
 * @param {string} id - The ID of the student to update.
 * @param {Students} updatedStudent - The updated data for the student.
 * @returns {Students[]} The updated list of students.
 */
const updateStudentList = (
	students: Students[],
	id: string,
	updatedStudent: Students
): Students[] => {
	return students.map((student) =>
		student._id === id ? { _id: id, ...updatedStudent } : student
	)
}

/**
 * Actions generated by the student slice.
 * @namespace
 */
export const {
	searchStudents,
	addNewStudent,
	saveEditedStudent,
	selectedStudent,
	clearSelectedStudent,
	deleteStudent,
} = studentSlice.actions

export default studentSlice.reducer
