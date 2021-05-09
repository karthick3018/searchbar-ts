import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SearchBox from '../components/inputField';
import '@testing-library/jest-dom/extend-expect'

describe('On name enter', () => {
    it('updates on change', () => {
      
      const { queryByPlaceholderText,queryByText } = render(<SearchBox />)
  
      const searchInput = queryByPlaceholderText(`Enter your friend's name`)
  
      fireEvent.change(searchInput, { target: { value: 'testName' } })
  
      expect(searchInput.value).toBe('testName');

      
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })

      const getListItem = queryByText(`Karthick Raja`);

      expect(getListItem?.innerHTML).toBe('Karthick Raja ');


    })
  })
