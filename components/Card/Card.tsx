/**
 * Card Component
 *
 * A simple card component that wraps its children in a styled container.
 *
 * @component
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 *
 * @returns {React.ReactElement} The rendered card component.
 *
 * @example
 * // Usage of the Card component:
 * // Import the Card component and use it to wrap other components or content.
 * import Card from './Card';
 *
 * // Use the Card component in another component's render method.
 * const MyComponent = () => {
 *   return (
 *     <Card>
 *       Content to be placed inside the card
 *       <div>
 *         <h2>Title</h2>
 *         <p>Some text content.</p>
 *       </div>
 *     </Card>
 *   );
 * };
 */
import React, { ReactNode } from 'react'
import './card.scss'

// Define the prop types for the Card component
interface CardProps {
	children: ReactNode
}

// Card component that wraps its children in a styled container
const Card: React.FC<CardProps> = ({ children }) => {
	return (
		<div className='card-container'>
			{/* Render the child components */}
			{children}
		</div>
	)
}

// Export the Card component for use in the application.
export default Card
