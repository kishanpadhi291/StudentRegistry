/**
 * StudentDetail Component
 *
 * This component displays detailed information about a student.
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The ID of the student to retrieve details for.
 *
 * @returns {React.ReactElement} The rendered student detail component.
 *
 * @example
 * // Usage of the StudentDetail component:
 * // Import the StudentDetail component and use it in your component.
 * import StudentDetail from './StudentDetail';
 *
 * // Use the StudentDetail component.
 * const MyComponent = () => {
 *   return (
 *     <StudentDetail id="studentId" />
 *   );
 * };
 */
'use client'
import Card from '@/components/Card/Card'
import { selectedStudent } from '@/lib/student-slice'
import { useEffect, useState } from 'react'
import { Box, Button, Typography, CardContent } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { useSelector } from 'react-redux'
import { StoreState } from '@/lib/store/store'
import FormModel from '../FormModel/FormModel'
/**
 * @typedef {Object} StudentData
 * @property {Students} student - The detailed information about the student.
 */

/**
 * StudentDetail Component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The ID of the student to retrieve details for.
 *
 * @returns {React.ReactElement} The rendered student detail component.
 */

const StudentDetail = ({ id }: { id: string }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [editId, setEditId] = useState<string | null>(null)
	const router = useRouter()
	const curStudent = useSelector(
		(state: StoreState) => state.student.currentStudent
	)
	const dispatch = useAppDispatch()

	const onClickBackHandler = () => {
		router.push('/')
	}
	const onClickEditHandler = () => {
		setEditId(id)
	}

	useEffect(() => {
		dispatch(selectedStudent(id))
		setIsLoading(false)
	}, [])

	useEffect(() => {
		dispatch(selectedStudent(id))
	}, [editId])

	return (
		<>
			<div className='header-main-wrap'>
				<Box className='header-wrap'>
					<div className='header'>
						<Typography variant='h3' className='header-text'>
							Student Details
						</Typography>
					</div>
					<div className='header-button'>
						<Button
							variant='contained'
							color='primary'
							className='add-student-btn'
							onClick={onClickEditHandler}
						>
							Edit
						</Button>
						<Button
							variant='contained'
							color='primary'
							className='add-student-btn'
							onClick={onClickBackHandler}
						>
							Back
						</Button>
					</div>
				</Box>
			</div>
			{isLoading ? (
				<div className='loader' data-testid='loader'>
					<CircularProgress />
				</div>
			) : (
				<div className='details'>
					{/* Card component for styling */}
					<Card>
						{/* Card content section */}
						<CardContent className='card-content-wrapper'>
							<div className='card-item'>
								<div className='item-wrap'>
									<div>Name</div>
									<div className='dots-wrap'>:</div>
									<div>
										{curStudent!.firstName} {curStudent!.middleName}{' '}
										{curStudent!.lastName}
									</div>
								</div>
								<div className='item-wrap'>
									<div>Email</div>
									<div className='dots-wrap'>:</div>
									<div>{curStudent!.email}</div>
								</div>
								<div className='item-wrap'>
									<div>PhoneNumber</div>
									<div className='dots-wrap'>:</div>
									<div> {curStudent!.contactNumber}</div>
								</div>
								<div className='item-wrap'>
									<div>Gender</div>
									<div className='dots-wrap'>:</div>
									<div> {curStudent!.gender}</div>
								</div>
								<div className='item-wrap'>
									<div>College </div>
									<div className='dots-wrap'>:</div>
									<div> {curStudent!.collegeName}</div>
								</div>
								<div className='item-wrap'>
									<div>Department</div>
									<div className='dots-wrap'>:</div>
									<div> {curStudent!.department}</div>
								</div>
								<div className='item-wrap'>
									<div>Hobbies</div>
									<div className='dots-wrap'>:</div>
									<div> {curStudent!.hobbies}</div>
								</div>
								<div className='item-wrap'>
									<div>DOB</div>
									<div className='dots-wrap'>:</div>
									<div> {curStudent!.dob}</div>
								</div>
							</div>
						</CardContent>
					</Card>
					{editId && (
						<FormModel id={editId} onClose={setEditId} detail={true} />
					)}
				</div>
			)}
		</>
	)
}

export default StudentDetail
