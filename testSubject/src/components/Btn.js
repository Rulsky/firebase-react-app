import styled from 'styled-components'

const Btn = styled.button`
  background-color: ${({ bgc }) => bgc};
  border-radius: 4px;
  border: ${({ brdc }) => `3px solid ${brdc}`};
  font-size: 1rem;
  margin: 1rem;
  padding: .5rem;
  transition: .35s ease-in-out;
  outline: none;
`

export default Btn
