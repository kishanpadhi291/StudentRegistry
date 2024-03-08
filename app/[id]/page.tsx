/**
 * Details Page Component
 *
 * This is a Next.js dynamic page component that renders the details of a student based on the 'id' parameter.
 *
 * @component
 *
 * @param {object} params - The parameters object containing the 'id' parameter.
 * @param {object} params.params - The 'params' object with 'id' parameter.
 * @param {string} params.params.id - The unique identifier for the student.
 *
 * @returns {React.ReactNode} The rendered details page component.
 *
 * @throws {Error} Throws an error if there is an issue fetching data from the API.
 *
 * @example
 * // Usage in a Next.js page:
 * // This component is automatically invoked by Next.js for the dynamic route /details/[id].
 * // It receives the 'id' parameter from the route and fetches student details from the API.
 * // It renders the details page with student information.
 * const DetailsPage = ({ params }) => {
 *   const content = page({ params });
 *   return <>{content}</>;
 * };
 *
 * // The 'params' object should have the 'id' parameter.
 * const id = '123';
 * const content = page({ params: { id } });
 * // Render the content wherever needed.
 */
import StudentDetails from '@/components/StudentDetails/StudentDetails'
import './page.scss'

// This is a Next.js dynamic page component.
// It receives the `params` object with 'id' parameter.

const page = async ({ params }: { params: { id: string } }) => {
	// Extract the `id` from the route parameters.
	const id = params.id

	// Render the details page.
	return <StudentDetails id={id} />
}

// Export the page component for Next.js to use.
export default page
