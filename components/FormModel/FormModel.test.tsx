import FormModel from '@/components/FormModel/FormModel'
import { Provider } from 'react-redux'
import { store } from '@/lib/store/store'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('FormModel', () => {
	it('Renders FormModel Successfully.', () => {
		const { container } = render(
			<Provider store={store}>
				<FormModel />
			</Provider>
		)
		expect(container).toBeTruthy()
	})

	it('Checks for button present in document', () => {
		render(
			<Provider store={store}>
				<FormModel />
			</Provider>
		)
		expect(
			screen.getByRole('button', { name: 'addStudentIcon Add Student' })
		).toBeInTheDocument()
		expect(screen.queryByText('Student Registration Form')).toBeNull()
	})

	it('Submits form with valid data', async () => {
		render(
			<Provider store={store}>
				<FormModel />
			</Provider>
		)

		const addDataButton = screen.getByRole('button', {
			name: 'addStudentIcon Add Student',
		})
		expect(addDataButton).toBeInTheDocument()

		fireEvent.click(addDataButton)
		expect(screen.getByText('First Name')).toBeInTheDocument()
		expect(screen.getByText('Middle Name')).toBeInTheDocument()
		expect(screen.getByText('Surname')).toBeInTheDocument()
		expect(screen.getByText('Email')).toBeInTheDocument()
		expect(screen.getByText('Contact')).toBeInTheDocument()
		expect(screen.getByText('Gender')).toBeInTheDocument()
		expect(screen.getByText('College Name')).toBeInTheDocument()
		expect(screen.getByText('Department')).toBeInTheDocument()
		expect(screen.getByText('Hobbies')).toBeInTheDocument()
	})
})
