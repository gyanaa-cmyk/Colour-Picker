import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PaletteView from '../../../components/palettes/PaletteView'
import { useSeedSlice } from '../../../state/useSeedSlice'
import { toAllSpaces } from '../../../engine/color-space'

describe('PaletteView', () => {
    it('renders swatches for complementary by default', async () => {
        useSeedSlice.setState({ seed: toAllSpaces('#3366ff') })
        render(<PaletteView />)
        const swatches = await screen.findAllByRole('img')
        expect(swatches.length).toBe(2)
    })
})
