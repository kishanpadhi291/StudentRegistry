/**
 * FormModel Component
 *
 * This component represents a modal form for student registration or editing.
 *
 * @component
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} [props.id] - The ID of the student for editing. If present, the form is in edit mode.
 * @param {string} [props.detail] - Identifier to know if call is from detail page.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} [props.onClose] - A function to handle modal closure.
 *
 * @returns {React.ReactElement} The rendered form modal component.
 *
 * @example
 * // Usage of the FormModel component:
 * // Import the FormModel component and use it in your component.
 * import FormModel from './FormModel';
 *
 * // Use the FormModel component with optional parameters.
 * const MyComponent = () => {
 *   const handleClose = (id) => {
 *     // Handle modal closure
 *   };
 *
 *   return (
 *     <FormModel id="123" onClose={handleClose} />
 *   );
 * };
 */
import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import { useAppDispatch } from '@/lib/hooks/hooks'
import HobbiesDropdown from '@/utils/studentFormUtils/HobbiesDropdown/HobbiesDropdown'
import DatePicker from '@/utils/studentFormUtils/DatePicker'
import './formModel.scss'
import { StoreState } from '@/lib/store/store'
import { useSelector } from 'react-redux'
import {
	addNewStudent,
	saveEditedStudent,
	selectedStudent,
} from '@/lib/student-slice'
import addStudentIcon from '../../assets/addStudent.svg'
import closeBtnIcon from '../../assets/closeBtn.svg'
import Image from 'next/image'

export default function FormModel({
	id,
	detail,
	onClose,
}: {
	id?: string
	detail?: boolean
	onClose?: React.Dispatch<React.SetStateAction<string | null>>
}) {
	const [open, setOpen] = useState(false)
	const currentStudent = useSelector(
		(state: StoreState) => state.student.currentStudent
	)

	const dispatch = useAppDispatch()

	// Memoized functions using useMemo and useCallback
	const handleOpen = useCallback(() => setOpen(true), [])
	const handleClose = useCallback(() => {
		setOpen(false)
		onClose?.(null)
		id = undefined
	}, [onClose])

	useEffect(() => {
		if (id) {
			dispatch(selectedStudent(id))
			handleOpen()
		}
	}, [])

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const student = {
			firstName: formData.get('firstName'),
			middleName: formData.get('middleName'),
			lastName: formData.get('lastName'),
			email: formData.get('email'),
			contactNumber: formData.get('contactNumber'),
			gender: formData.get('gender'),
			collegeName: formData.get('collegeName'),
			department: formData.get('department'),
			dob: formData.get('dob'),
			hobbies: formData.get('hobbies'),
		}
		if (id) {
			try {
				dispatch(saveEditedStudent({ id, student }))
				toast.success('Student Updated Successfully')
				onClose?.(null)
				setOpen(false)
			} catch (error) {
				toast.error(`Error:${error}`)
			}
		} else {
			try {
				dispatch(addNewStudent(student))
				toast.success('Student Added Successfully')
				onClose?.(null)
				setOpen(false)
			} catch (error) {
				toast.error(`Error:${error}`)
			}
		}
	}

	return (
		<div className='header-main-wrap'>
			<Box className='header-wrap'>
				<div className='header'>
					<Typography variant='h3' className='header-text'>
						Student List
					</Typography>
				</div>
				<div className='header-button'>
					<Button
						variant='contained'
						color='primary'
						onClick={handleOpen}
						className='add-student-btn'
					>
						<Image src={addStudentIcon} alt='addStudentIcon' />
						Add Student
					</Button>
				</div>
			</Box>
			<Modal
				open={open!}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box className='student-registry-form-container'>
					<div className='modal-header'>
						<Typography variant='h3'>Student Registration Form</Typography>
						<div className='close-btn' onClick={handleClose}>
							<Image src={closeBtnIcon} alt='closeBtnIcon' />
						</div>
					</div>
					<form onSubmit={submitHandler} className='form-wrap'>
						<div className='modal-body'>
							<Grid container spacing={3}>
								<Grid item lg={4} sm={6} xs={12}>
									<TextField
										label='First Name'
										name='firstName'
										defaultValue={currentStudent?.firstName}
										fullWidth
										required
									/>
								</Grid>
								<Grid item lg={4} sm={6} xs={12}>
									<TextField
										label='Middle Name'
										name='middleName'
										defaultValue={currentStudent?.middleName}
										fullWidth
										required
									/>
								</Grid>
								<Grid item lg={4} sm={6} xs={12}>
									<TextField
										label='Surname'
										name='lastName'
										defaultValue={currentStudent?.lastName}
										fullWidth
										required
									/>
								</Grid>
								<Grid item lg={4} sm={6} xs={12}>
									<TextField
										label='Email'
										name='email'
										type='email'
										defaultValue={currentStudent?.email}
										fullWidth
										required
									/>
								</Grid>
								<Grid item lg={4} sm={6} xs={12}>
									<TextField
										label='Contact'
										name='contactNumber'
										type='number'
										defaultValue={currentStudent?.contactNumber}
										fullWidth
										required
										onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
											e.target.value = Math.max(0, parseInt(e.target.value))
												.toString()
												.slice(0, 10)
										}}
									/>
								</Grid>
								<Grid item lg={4} sm={6} xs={12}>
									<FormControl fullWidth required>
										<InputLabel>Gender</InputLabel>
										<Select
											label='Gender'
											name='gender'
											defaultValue={currentStudent?.gender}
										>
											<MenuItem value='male'>Male</MenuItem>
											<MenuItem value='female'>Female</MenuItem>
											<MenuItem value='other'>Other</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item lg={8} sm={6} xs={12}>
									<TextField
										label='College Name'
										name='collegeName'
										type='text'
										defaultValue={currentStudent?.collegeName}
										fullWidth
										required
									/>
								</Grid>
								<Grid item lg={4} sm={6} xs={12}>
									<FormControl fullWidth required>
										<InputLabel>Department</InputLabel>
										<Select
											label='Department'
											name='department'
											defaultValue={currentStudent?.department}
										>
											<MenuItem value='IT'>IT</MenuItem>
											<MenuItem value='CE'>CE</MenuItem>
											<MenuItem value='CS'>CS</MenuItem>
											<MenuItem value='other'>Other</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item lg={8} sm={6} xs={12}>
									<div className='hobbies-wrap'>
										<HobbiesDropdown defaultValue={currentStudent?.hobbies} />
									</div>
								</Grid>
								<Grid item lg={4} sm={6} xs={12}>
									<DatePicker
										label='DOB'
										name='dob'
										value={id ? currentStudent?.dob : ''}
									/>
								</Grid>
							</Grid>
						</div>
						<Grid container justifyContent='center' className='modal-footer'>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								className='submit-btn'
							>
								{id ? 'Edit' : 'Submit'}
							</Button>
						</Grid>
					</form>
				</Box>
			</Modal>
		</div>
	)
}
