/**
 * StudentTable Component
 *
 * This component displays a table of student data with search, edit, and delete functionalities.
 *
 * @component
 *
 * @returns {React.ReactElement} The rendered student table component.
 *
 * @example
 * // Usage of the StudentTable component:
 * // Import the StudentTable component and use it in your component.
 * import StudentTable from './StudentTable';
 *
 * // Use the StudentTable component.
 * const MyComponent = () => {
 *   return (
 *     <StudentTable />
 *   );
 * };
 */
'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { IconButton, Box, Tooltip, CircularProgress } from '@mui/material'

import './studentTable.scss'
import { useRouter } from 'next/navigation'
import FormModel from '../FormModel/FormModel'
import { useSelector } from 'react-redux'
import { StoreState } from '@/lib/store/store'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { ToastContainer, toast } from 'react-toastify'
import {
	DataGrid,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid'
import { deleteStudent, clearSelectedStudent } from '@/lib/student-slice'
import Image from 'next/image'
import showBtnIcon from '../../assets/showBtnIcon.svg'
import editBtnIcon from '../../assets/editBtnIcon.svg'
import deleteBtnIcon from '../../assets/deleteBtnIcon.svg'
import dataGridDownArrowIcon from '../../assets/dataGridDownArrowIcon.svg'

function capitalizeFirstLetter(str: string) {
	return str ? str[0].toUpperCase() + str.slice(1) : ''
}
export default function StudentTable() {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const studentsData = useSelector(
		(state: StoreState) => state.student.students
	)
	const [editData, setEditData] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const columns = [
		{ field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
		{ field: 'email', headerName: 'Email', flex: 1, minWidth: 150 },
		{ field: 'contactNumber', headerName: 'Contact', flex: 1, minWidth: 150 },
		{ field: 'gender', headerName: 'Gender', flex: 1, minWidth: 150 },
		{ field: 'collegeName', headerName: 'College', flex: 1, minWidth: 150 },
		{ field: 'department', headerName: 'Department', flex: 1, minWidth: 150 },
		{ field: 'hobbies', headerName: 'Hobbies', flex: 1, minWidth: 150 },
		{ field: 'dob', headerName: 'DOB', flex: 1, minWidth: 150 },
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			minWidth: 150,
			hideable: false,
			renderCell: (params: any) => (
				<div className='btn-group-wrap'>
					<Tooltip title='Show'>
						<IconButton onClick={(e) => handleRowClick(params?.id)}>
							<Image src={showBtnIcon} alt='showBtnIcon' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Edit'>
						<IconButton onClick={(e) => handleEditClick(params?.id)}>
							<Image src={editBtnIcon} alt='editBtnIcon' />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete'>
						<IconButton onClick={(e) => handleDeleteClick(params?.id)}>
							<Image src={deleteBtnIcon} alt='deleteBtnIcon' />
						</IconButton>
					</Tooltip>
				</div>
			),
		},
	]
	const rowsForDataGrid = studentsData
		?.map((row) => ({
			id: row._id,
			name: `${capitalizeFirstLetter(row.lastName!)} ${capitalizeFirstLetter(
				row.firstName!
			)}`,
			email: row.email,
			contactNumber: row.contactNumber,
			gender: row.gender,
			collegeName: row.collegeName,
			department: row.department,
			hobbies: row.hobbies,
			dob: row.dob,
		}))
		.reverse()

	useEffect(() => {
		dispatch(clearSelectedStudent())
		setIsLoading(false)
	}, [studentsData])
	useEffect(() => {
		dispatch(clearSelectedStudent())
	}, [])

	const handleEditClick = useCallback(
		(data: string) => {
			setEditData(data!)
		},
		[] // Empty dependency array as it doesn't depend on external variables
	)

	const handleDeleteClick = useCallback(
		async (id: string) => {
			try {
				const result = confirm('Want to Delete?')
				if (result) {
					dispatch(deleteStudent(id))
					toast.success('Student Deleted Successfully')
				}
			} catch (error) {
				console.error('Error deleting student:', error)
				toast.error('Failed to delete student')
			}
		},
		[dispatch]
	)

	const handleRowClick = useCallback(
		(id: string) => {
			router.push(`/${id}`)
		},
		[router]
	)

	function CustomToolbar() {
		return (
			<div>
				<button onClick={() => console.log('Custom button clicked')}>
					Custom Button
				</button>
			</div>
		)
	}

	return (
		<>
			<ToastContainer />
			<Box>
				<FormModel />
			</Box>
			{/* <Container fixed maxWidth='xl'> */}
			{isLoading ? (
				<div className='loader'>
					<CircularProgress />
				</div>
			) : (
				<div className='table-wrapper'>
					<DataGrid
						rowHeight={40}
						columnHeaderHeight={40}
						rows={rowsForDataGrid}
						columns={columns}
						slots={{
							toolbar: () => (
								<div className='abc'>
									<GridToolbarContainer>
										<GridToolbarColumnsButton
											endIcon={
												<Image
													src={dataGridDownArrowIcon}
													alt='dataGridDownArrowIcon'
												/>
											}
										/>
										<GridToolbarFilterButton />
										<GridToolbarDensitySelector
											endIcon={
												<Image
													src={dataGridDownArrowIcon}
													alt='dataGridDownArrowIcon'
												/>
											}
										/>
										<GridToolbarExport
											endIcon={
												<Image
													src={dataGridDownArrowIcon}
													alt='dataGridDownArrowIcon'
												/>
											}
										/>
									</GridToolbarContainer>
								</div>
							),
						}}
						pagination
					/>
				</div>
			)}
			{editData && <FormModel id={editData} onClose={setEditData} />}
		</>
	)
}
