import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ColorInput from '../../../components/inputs/ColorInput'

describe('ColorInput component', () => {
    it('updates preview when valid hex is entered', async () => {
        render(<ColorInput />)
        const input = screen.getByLabelText(/hex/i) as HTMLInputElement
        await userEvent.clear(input)
        await userEvent.type(input, '#00ff00')
        input.blur()
        // Should render the hex code in the preview line
        expect(await screen.findByText(/#00ff00/i)).toBeInTheDocument()
    })

    it('shows fallback text when EyeDropper not supported', () => {
        render(<ColorInput />)
        expect(screen.getByText(/EyeDropper not supported/i)).toBeInTheDocument()
    })
})
