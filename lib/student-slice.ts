import { dummyData } from '@/utils/data/dummy-data'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
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

const initialState: {
	students: Students[]
	currentStudent: Students | null | undefined
	changed: number
} = {
	students: dummyData,
	currentStudent: null,
	changed: 0,
}

const studentSlice = createSlice({
	initialState,
	name: 'studentSlice',
	reducers: {
		selectedStudent: (state, action) => {
			const Student = state.students.find(
				(student) => student._id === action.payload
			)
			const targetStudent = { ...Student }
			state.currentStudent = targetStudent
		},
		clearSelectedStudent: (state) => {
			state.currentStudent = null
		},
		addNewStudent: (state, action) => {
			let studentUuid = uuidv4()
			action.payload['_id'] = studentUuid
			state.students.push(action.payload)
		},
		saveEditedStudent: (state, action) => {
			state.students = state.students.map((student) => {
				if (student._id === action.payload.id) {
					return { _id: action.payload.id, ...action.payload.student }
				}
				return student
			})
		},

		deleteStudent: (state, action) => {
			state.students = state.students.filter(
				(student) => student._id !== action.payload
			)
		},
	},
})

export const {
	addNewStudent,
	saveEditedStudent,
	selectedStudent,
	clearSelectedStudent,
	deleteStudent,
} = studentSlice.actions
export default studentSlice.reducer
