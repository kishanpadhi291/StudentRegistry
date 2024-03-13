/**
 * @module HobbiesDropdown
 * @description
 * HobbiesDropdown component for rendering a dropdown to select hobbies.
 *
 * @param {Object} props - React component props.
 * @param {undefined|string|string[]} [props.defaultValue] - Optional default value for selected hobbies.
 *
 * @returns {React.ReactNode} - JSX rendering the hobbies dropdown component.
 *
 * @example
 * // Usage in a component:
 * import HobbiesDropdown from '@/path/to/HobbiesDropdown';
 *
 * const MyComponent = () => {
 *   return (
 *     <HobbiesDropdown
 *       defaultValue={['Reading', 'Coding']}
 *     />
 *   );
 * };
 */

// Import necessary React components and Material-UI elements
import React, { useEffect, useMemo, useCallback } from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { hobbies } from '@/utils/data/hobbies-data'

// Constants for styling the dropdown
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

// Function to determine the styling of each item in the dropdown
function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	}
}

// HobbiesDropdown component
const HobbiesDropdown = ({
	defaultValue,
}: {
	defaultValue?: undefined | string
}) => {
	const theme = useTheme()
	const [personName, setPersonName] = React.useState<string[]>([])
	// Use useMemo to memoize the styles calculation
	const styles = useMemo(() => {
		return hobbies.reduce((acc, name) => {
			acc[name] = getStyles(name, personName, theme)
			return acc
		}, {} as Record<string, React.CSSProperties>)
	}, [personName, theme])

	// Set initial values based on defaultValue
	useEffect(() => {
		// Assuming defaultValue is a prop passed to your component
		if (defaultValue) {
			const check = defaultValue.split(',')

			// Use a temporary array to accumulate values
			const personNamesArray: string[] = []

			check.forEach((value) => {
				// Split each value by ',' and add to the temporary array
				personNamesArray.push(
					...(typeof value === 'string' ? value.split(',') : [value])
				)
			})

			// Set the PersonName state with the accumulated array
			setPersonName(personNamesArray)
		}
	}, [defaultValue])

	// Handle change in selected items
	const handleChange = useCallback(
		(event: SelectChangeEvent<typeof personName>) => {
			const {
				target: { value },
			} = event
			setPersonName(typeof value === 'string' ? value.split(',') : value)
		},
		[]
	)

	return (
		<div>
			{/* Dropdown for selecting hobbies */}
			<FormControl sx={{ width: '100%' }}>
				<InputLabel id='demo-multiple-chip-label'>Hobbies</InputLabel>
				<Select
					labelId='demo-multiple-chip-label'
					id='demo-multiple-chip'
					multiple
					name='hobbies'
					value={personName}
					onChange={handleChange}
					input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
					renderValue={(selected) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{/* Display selected hobbies as chips */}
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{/* Render menu items for each hobby */}
					{hobbies.map((name) => (
						<MenuItem key={name} value={name} sx={styles[name]}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}

export default HobbiesDropdown
